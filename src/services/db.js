import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';

const STORAGE_KEY = 'cafe_ertugrul_menu_v1';
const PASSCODE_KEY = 'cafe_ertugrul_admin_passcode';
const DEFAULT_PASSCODE = 'ertugrul2026';

// Helper to initialize storage
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
  // Get all items
  getMenuItems: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : MENU_ITEMS;
    } catch (err) {
      console.error('Error fetching menu items:', err);
      return MENU_ITEMS;
    }
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

  // Add a new dish
  addMenuItem: (newItem) => {
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

      const updatedList = [itemToAdd, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true, item: itemToAdd };
    } catch (err) {
      console.error('Error adding menu item:', err);
      return { success: false, error: err.message };
    }
  },

  // Update existing dish
  updateMenuItem: (id, updatedFields) => {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      console.error('Error updating menu item:', err);
      return { success: false, error: err.message };
    }
  },

  // Toggle stock availability
  toggleStock: (id) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.map(item => {
        if (item.id === id) {
          return { ...item, isAvailable: item.isAvailable === false ? true : false };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      console.error('Error toggling stock:', err);
      return { success: false, error: err.message };
    }
  },

  // Delete a dish
  deleteMenuItem: (id) => {
    try {
      const current = dbService.getMenuItems();
      const updatedList = current.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return { success: true };
    } catch (err) {
      console.error('Error deleting menu item:', err);
      return { success: false, error: err.message };
    }
  },

  // Reset to original default 91 items
  resetToDefaults: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MENU_ITEMS));
      return { success: true };
    } catch (err) {
      console.error('Error resetting menu:', err);
      return { success: false, error: err.message };
    }
  },

  // Verify Admin Passcode
  verifyPasscode: (passcode) => {
    const savedPasscode = localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
    return passcode === savedPasscode;
  },

  // Change Admin Passcode
  updatePasscode: (newPasscode) => {
    localStorage.setItem(PASSCODE_KEY, newPasscode);
    return { success: true };
  }
};
