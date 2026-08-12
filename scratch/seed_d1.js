const fs = require('fs');
const path = require('path');

// Read menuData
const menuDataContent = fs.readFileSync(path.join(__dirname, '../src/data/menuData.js'), 'utf8');

// Extract MENU_ITEMS array
const itemsMatch = menuDataContent.match(/export const MENU_ITEMS = (\[[\s\S]*?\]);/);

if (!itemsMatch) {
  console.error('Could not find MENU_ITEMS in menuData.js');
  process.exit(1);
}

// Evaluate JavaScript array safely
const items = eval(itemsMatch[1]);

let sql = `CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  original_price REAL,
  is_veg INTEGER DEFAULT 0,
  description TEXT,
  image TEXT,
  is_available INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);\n\n`;

items.forEach(item => {
  const name = item.name.replace(/'/g, "''");
  const category = item.category.replace(/'/g, "''");
  const price = item.price;
  const origPrice = item.originalPrice ? item.originalPrice : 'NULL';
  const isVeg = item.isVeg ? 1 : 0;
  const desc = item.description ? item.description.replace(/'/g, "''") : '';
  const img = item.image ? item.image.replace(/'/g, "''") : '';

  sql += `INSERT INTO menu_items (id, name, category, price, original_price, is_veg, description, image, is_available) VALUES (${item.id}, '${name}', '${category}', ${price}, ${origPrice}, ${isVeg}, '${desc}', '${img}', 1);\n`;
});

fs.writeFileSync(path.join(__dirname, '../schema_seed.sql'), sql);
console.log(`Generated SQL seed file with ${items.length} dishes.`);
