// Vercel: /api/order
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  // ====== FAQAT SHU IKKI QATORNI TO'LDIRING (qo'shtirnoq ichiga) ======
const BOT_TOKEN = process.env.BOT_TOKEN || "BU_YERGA_YANGI_BOT_TOKEN";
const CHAT_ID = process.env.CHAT_ID || "BU_YERGA_CHAT_ID";
// ====================================================================
  const text = String((req.body && req.body.text) || "").slice(0, 3500);
  if (BOT_TOKEN.startsWith("BU_YERGA") || CHAT_ID.startsWith("BU_YERGA") || !text) return res.status(400).json({ ok: false });
  const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
};
