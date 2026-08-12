import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';

const STORAGE_KEY = 'cafe_ertugrul_menu_v1';
const PASSCODE_KEY = 'cafe_ertugrul_admin_passcode';
const DEFAULT_PASSCODE = 'Ertugrul@2026';

// Helper to initialize local storage for development
const initStorage = () => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MENU_ITEMS));
    }
  } catch (err) {
    console.error('Failed to initialize local storage:', err);
  }
};

initStorage();

export const dbService = {
  // Get all items (Cloudflare D1 / LocalStorage)
  getMenuItems: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : MENU_ITEMS;
    } catch (err) {
      console.error('Error fetching menu items:', err);
      return MENU_ITEMS;
    }
  },

  // Async Cloudflare D1 fetch
  fetchFromCloudflareD1: async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const d1Items = await res.json();
        if (Array.isArray(d1Items) && d1Items.length > 0) {
          const formatted = d1Items.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : null,
            isVeg: Boolean(item.is_veg),
            description: item.description,
            image: item.image,
            isAvailable: Boolean(item.is_available)
          }));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
          return formatted;
        }
      }
    } catch (err) {
      console.log('Running on local storage mode or static preview:', err.message);
    }
    return dbService.getMenuItems();
  },

  // Get dynamic categories with updated counts
  getCategories: () => {
    const items = dbService.getMenuItems();
    const activeItems = items.filter(i => i.isAvailable !== false);
    
    return MENU_CATEGORIES.map(cat => {
      if (cat.id === 'all') {
        return { ...cat, count: activeItems.length };
      }
      const catCount = activeItems.filter(i => i.category === cat.id).length;
      return { ...cat, count: catCount };
    });
  },

  // Add a new dish with Cloudflare D1 sync & security key
  addMenuItem: async (newItem, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const newId = current.length > 0 ? Math.max(...current.map(i => i.id)) + 1 : 1;
      
      const itemToAdd = {
        id: newId,
        name: newItem.name.trim(),
        category: newItem.category,
        price: Number(newItem.price),
        originalPrice: newItem.originalPrice ? Number(newItem.originalPrice) : null,
        isVeg: Boolean(newItem.isVeg),
        description: newItem.description.trim(),
        image: newItem.image || './images/biryani.png',
        popular: Boolean(newItem.popular),
        rating: 5.0,
        isAvailable: true,
        createdAt: new Date().toISOString()
      };

      // Try Cloudflare D1 post
      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode
          },
          body: JSON.stringify({ action: 'add', item: itemToAdd })
        });
      } catch (e) {
        console.log('Saved to LocalStorage mode.');
      }

      const updatedList = [itemToAdd, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true, item: itemToAdd };
    } catch (err) {
      console.error('Error adding menu item:', err);
      return { success: false, error: err.message };
    }
  },

  // Update existing dish
  updateMenuItem: async (id, updatedFields, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            originalPrice: updatedFields.originalPrice ? Number(updatedFields.originalPrice) : item.originalPrice,
          };
        }
        return item;
      });

      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode
          },
          body: JSON.stringify({ action: 'update', id, updatedFields })
        });
      } catch (e) {}

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Toggle stock availability
  toggleStock: async (id, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.map(item => {
        if (item.id === id) {
          return { ...item, isAvailable: item.isAvailable === false ? true : false };
        }
        return item;
      });

      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode
          },
          body: JSON.stringify({ action: 'toggle_stock', id })
        });
      } catch (e) {}

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Delete a dish
  deleteMenuItem: async (id, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.filter(item => item.id !== id);

      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode
          },
          body: JSON.stringify({ action: 'delete', id })
        });
      } catch (e) {}

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Reset to original default 91 items
  resetToDefaults: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MENU_ITEMS));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Verify Admin Passcode
  verifyPasscode: (passcode) => {
    if (!passcode) return false;
    const cleanInput = passcode.trim();
    const savedPasscode = localStorage.getItem(PASSCODE_KEY);

    // Accept new master password, legacy password, or saved password
    const isMaster = cleanInput === 'Ertugrul@2026' || cleanInput.toLowerCase() === 'ertugrul2026';
    const isSaved = savedPasscode && cleanInput === savedPasscode;

    if (isMaster || isSaved) {
      // Sync local storage with current valid passcode
      localStorage.setItem(PASSCODE_KEY, cleanInput);
      return true;
    }
    return false;
  },

  // Change Admin Passcode
  updatePasscode: (newPasscode) => {
    localStorage.setItem(PASSCODE_KEY, newPasscode);
    return { success: true };
  }
};
