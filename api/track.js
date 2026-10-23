import { pipeline, redisConfigurado, diaMX } from "./_redis.js";

const EVENTOS = new Set(["visita", "click_demo", "click_whatsapp", "click_quiero", "form_enviado", "compartir"]);
const FUENTES = new Set(["facebook", "instagram", "tiktok", "whatsapp", "youtube", "x", "linkedin", "google", "directo", "compartido", "otro"]);
const BOTS = /bot|crawl|spider|preview|facebookexternalhit|slurp|headless|lighthouse/i;

const slug = (s, max) => String(s ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max);

export default async function handler(req, res) {
  // Nunca debe romper la página: siempre 204
  try {
    if (req.method !== "POST" || !redisConfigurado()) return res.status(204).end();
    if (BOTS.test(req.headers["user-agent"] || "")) return res.status(204).end();

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const e = slug(body.e, 20);
    if (!EVENTOS.has(e)) return res.status(204).end();
    const f = FUENTES.has(slug(body.f, 20)) ? slug(body.f, 20) : "otro";
    const v = slug(body.v, 30) || "-";

    const dia = diaMX();
    await pipeline([
      ["HINCRBY", `lash:${dia}`, `${e}|${f}|${v}`, 1],
      ["SADD", "lash:dias", dia],
    ]);
  } catch {
    /* silencioso */
  }
  return res.status(204).end();
}
