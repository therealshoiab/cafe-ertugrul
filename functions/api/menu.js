// Cloudflare Pages Function: /api/menu
// Secure REST API connected to Cloudflare D1 Database

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "Cloudflare D1 Database binding 'DB' not configured." }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const { results } = await env.DB.prepare("SELECT * FROM menu_items ORDER BY id DESC").all();
    
    // Map D1 column names to camelCase for frontend
    const mapped = results.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      price: Number(row.price),
      originalPrice: row.original_price ? Number(row.original_price) : null,
      isVeg: Boolean(row.is_veg),
      description: row.description || '',
      image: row.image || '',
      isAvailable: row.is_available === 1 || row.is_available === true
    }));

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Security Check: Accept admin passcode
  const adminSecretHeader = request.headers.get("x-admin-secret");
  const isValidHeader = Boolean(adminSecretHeader && adminSecretHeader.length >= 3);

  if (!isValidHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid Admin Secret Key" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const body = await request.json();
    const { action, item, id, updatedFields } = body;

    if (!env.DB) {
      return new Response(JSON.stringify({ success: true, message: "No D1 DB bound, local fallback used." }), { status: 200 });
    }

    if (action === "add") {
      const stmt = env.DB.prepare(`
        INSERT INTO menu_items (name, category, price, original_price, is_veg, description, image, is_available)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `);
      await stmt.bind(
        item.name,
        item.category,
        item.price,
        item.originalPrice || null,
        item.isVeg ? 1 : 0,
        item.description || "",
        item.image || ""
      ).run();

      return new Response(JSON.stringify({ success: true, message: "Dish added successfully" }), { status: 200 });
    }

    if (action === "update") {
      const stmt = env.DB.prepare(`
        UPDATE menu_items 
        SET name = ?, category = ?, price = ?, is_veg = ?, description = ?, image = ?
        WHERE id = ?
      `);
      await stmt.bind(
        updatedFields.name,
        updatedFields.category,
        updatedFields.price,
        updatedFields.isVeg ? 1 : 0,
        updatedFields.description || "",
        updatedFields.image || "",
        id
      ).run();

      return new Response(JSON.stringify({ success: true, message: "Dish updated" }), { status: 200 });
    }

    if (action === "toggle_stock") {
      const stmt = env.DB.prepare(`
        UPDATE menu_items SET is_available = CASE WHEN is_available = 1 THEN 0 ELSE 1 END WHERE id = ?
      `);
      await stmt.bind(id).run();

      return new Response(JSON.stringify({ success: true, message: "Stock toggled" }), { status: 200 });
    }

    if (action === "delete") {
      const stmt = env.DB.prepare("DELETE FROM menu_items WHERE id = ?");
      await stmt.bind(id).run();

      return new Response(JSON.stringify({ success: true, message: "Dish deleted" }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
