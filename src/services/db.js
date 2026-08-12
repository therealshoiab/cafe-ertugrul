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

  // Async Cloudflare D1 fetch across devices
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
            originalPrice: item.originalPrice ? Number(item.originalPrice) : null,
            isVeg: Boolean(item.isVeg),
            description: item.description || '',
            image: item.image || '',
            isAvailable: Boolean(item.isAvailable !== false)
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
        originalPrice: null,
        isVeg: Boolean(newItem.isVeg),
        description: newItem.description ? newItem.description.trim() : 'Delicious specialty prepared fresh at Cafe Ertugrul.',
        image: newItem.image ? newItem.image.trim() : '',
        popular: Boolean(newItem.popular),
        rating: 5.0,
        isAvailable: true,
        createdAt: new Date().toISOString()
      };

      // Always save to LocalStorage first for instant persistence
      const updatedList = [itemToAdd, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      // Try Cloudflare D1 post in background
      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode || DEFAULT_PASSCODE
          },
          body: JSON.stringify({ action: 'add', item: itemToAdd })
        });
      } catch (e) {
        console.log('Saved locally.');
      }

      return { success: true, item: itemToAdd };
    } catch (err) {
      console.error('Error adding menu item:', err);
      return { success: false, error: err.message };
    }
  },

  // Update existing dish (Full Editing: name, category, price, isVeg, description, image)
  updateMenuItem: async (id, updatedFields, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            category: updatedFields.category || item.category,
            isVeg: updatedFields.isVeg !== undefined ? Boolean(updatedFields.isVeg) : item.isVeg,
            description: updatedFields.description !== undefined ? updatedFields.description : item.description,
            image: updatedFields.image !== undefined ? updatedFields.image : item.image,
          };
        }
        return item;
      });

      // Always save to LocalStorage first for instant persistence
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      try {
        const itemToSync = updatedList.find(i => i.id === id);
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode || DEFAULT_PASSCODE
          },
          body: JSON.stringify({ action: 'update', id, updatedFields: itemToSync })
        });
      } catch (e) {}

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

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode || DEFAULT_PASSCODE
          },
          body: JSON.stringify({ action: 'toggle_stock', id })
        });
      } catch (e) {}

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Delete dish from menu
  deleteMenuItem: async (id, passcode = DEFAULT_PASSCODE) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

      try {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-secret': passcode || DEFAULT_PASSCODE
          },
          body: JSON.stringify({ action: 'delete', id })
        });
      } catch (e) {}

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

  // Fetch latest global passcode from Cloudflare D1 across all devices
  fetchGlobalPasscode: async () => {
    try {
      const res = await fetch('/api/passcode');
      if (res.ok) {
        const data = await res.json();
        if (data && data.passcode) {
          localStorage.setItem(PASSCODE_KEY, data.passcode);
          return data.passcode;
        }
      }
    } catch (e) {}
    return localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
  },

  // Verify Admin Passcode (ONLY active passcode works; old passcode strictly fails once changed!)
  verifyPasscode: (passcode) => {
    if (!passcode) return false;
    const cleanInput = passcode.trim();
    const activePasscode = localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;

    // Strict equality check: Only the active passcode works!
    return cleanInput === activePasscode;
  },

  // Change Admin Passcode globally across all devices
  updatePasscode: async (newPasscode) => {
    if (!newPasscode) return { success: false, error: 'Passcode cannot be empty' };
    const cleanNew = newPasscode.trim();
    
    // Save to LocalStorage immediately
    localStorage.setItem(PASSCODE_KEY, cleanNew);

    // Sync to Cloudflare D1 globally
    try {
      await fetch('/api/passcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: cleanNew })
      });
    } catch (e) {}

    return { success: true };
  },

  // Broadcast Message Methods for Home Page Announcement Ticker
  getBroadcastMessage: () => {
    try {
      return localStorage.getItem('cafe_ertugrul_broadcast_announcement') || '';
    } catch (e) {
      return '';
    }
  },

  updateBroadcastMessage: (msg) => {
    try {
      localStorage.setItem('cafe_ertugrul_broadcast_announcement', msg);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
