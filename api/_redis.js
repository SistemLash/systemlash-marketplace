// Cliente mínimo de Upstash Redis por REST (sin dependencias).
// Acepta los nombres de variables que inyecta Vercel (KV_*) o Upstash (UPSTASH_*).
const URL_REST = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisConfigurado = () => Boolean(URL_REST && TOKEN);

export async function pipeline(comandos) {
  const r = await fetch(`${URL_REST}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(comandos),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return r.json();
}

// Día en hora de México (YYYY-MM-DD)
export const diaMX = (fecha = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(fecha);
