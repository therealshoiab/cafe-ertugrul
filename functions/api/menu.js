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
    return new Response(JSON.stringify(results), {
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

  // Security Check: Verify Admin Secret Key
  const adminSecretHeader = request.headers.get("x-admin-secret");
  const expectedSecret = env.ADMIN_SECRET_KEY || "ertugrul2026";

  if (adminSecretHeader !== expectedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid Admin Secret Key" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const body = await request.json();
    const { action, item, id, updatedFields } = body;

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
        item.image || "./images/biryani.png"
      ).run();

      return new Response(JSON.stringify({ success: true, message: "Dish added successfully" }), { status: 200 });
    }

    if (action === "update") {
      const stmt = env.DB.prepare(`
        UPDATE menu_items 
        SET name = ?, price = ?, description = ?, is_available = ?
        WHERE id = ?
      `);
      await stmt.bind(
        updatedFields.name,
        updatedFields.price,
        updatedFields.description,
        updatedFields.isAvailable !== undefined ? (updatedFields.isAvailable ? 1 : 0) : 1,
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
