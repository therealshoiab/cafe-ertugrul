// Cloudflare Pages Function: /api/broadcast
// Global Broadcast Announcement connected to Cloudflare D1 Database

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (env.DB) {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      const row = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'broadcast_message'").first();
      if (row && row.value !== undefined) {
        return new Response(JSON.stringify({ broadcast: row.value }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
  } catch (err) {}

  return new Response(JSON.stringify({ broadcast: "" }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { broadcast } = await request.json();
    const cleanMsg = (broadcast || "").trim();

    if (env.DB) {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      await env.DB.prepare(`
        INSERT INTO admin_settings (key, value) VALUES ('broadcast_message', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(cleanMsg).run();
    }

    return new Response(JSON.stringify({ success: true, broadcast: cleanMsg }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
