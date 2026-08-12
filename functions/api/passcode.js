// Cloudflare Pages Function: /api/passcode
// Global Passcode Verification & Update connected to Cloudflare D1 Database

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (env.DB) {
      // Ensure settings table exists
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      const row = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      if (row && row.value) {
        return new Response(JSON.stringify({ passcode: row.value }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
  } catch (err) {}

  return new Response(JSON.stringify({ passcode: "Ertugrul@2026" }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { passcode } = await request.json();
    if (!passcode) {
      return new Response(JSON.stringify({ error: "Passcode required" }), { status: 400 });
    }

    const cleanPass = passcode.trim();

    if (env.DB) {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      await env.DB.prepare(`
        INSERT INTO admin_settings (key, value) VALUES ('passcode', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(cleanPass).run();
    }

    return new Response(JSON.stringify({ success: true, message: "Passcode updated globally" }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
