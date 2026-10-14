// Netlify: /.netlify/functions/order  (netlify.toml orqali /api/order ga yo'naltirilgan)
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "" };
  // ====== FAQAT SHU IKKI QATORNI TO'LDIRING (qo'shtirnoq ichiga) ======
const BOT_TOKEN = process.env.BOT_TOKEN || "BU_YERGA_YANGI_BOT_TOKEN";
const CHAT_ID = process.env.CHAT_ID || "BU_YERGA_CHAT_ID";
// ====================================================================
  let text = "";
  try { text = String(JSON.parse(event.body || "{}").text || "").slice(0, 3500); } catch (e) {}
  if (BOT_TOKEN.startsWith("BU_YERGA") || CHAT_ID.startsWith("BU_YERGA") || !text) return { statusCode: 400, body: "{}" };
  const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });
  return { statusCode: r.ok ? 200 : 502, body: JSON.stringify({ ok: r.ok }) };
};
