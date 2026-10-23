import { pipeline, redisConfigurado, diaMX } from "./_redis.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const clave = process.env.STATS_KEY;
  if (!clave) return res.status(503).json({ error: "Falta configurar STATS_KEY en Vercel" });
  if (req.headers["x-stats-key"] !== clave) return res.status(401).json({ error: "Clave incorrecta" });
  if (!redisConfigurado()) return res.status(503).json({ error: "Falta conectar la base Redis (Upstash) en Vercel" });

  try {
    const DIAS = 30;
    const lista = [];
    const base = Date.now();
    for (let i = 0; i < DIAS; i++) lista.push(diaMX(new Date(base - i * 86400000)));

    const r = await pipeline(lista.map(d => ["HGETALL", `lash:${d}`]));
    const dias = lista.map((dia, i) => {
      const arr = r[i]?.result || [];
      const campos = {};
      for (let j = 0; j < arr.length; j += 2) campos[arr[j]] = Number(arr[j + 1]);
      return { dia, campos };
    });
    return res.status(200).json({ dias });
  } catch {
    return res.status(500).json({ error: "No se pudo leer el registro" });
  }
}
