// Contador discreto: sin cookies, sin IP, sin datos personales. Solo cuenta eventos por día.
const SIN_CONTAR = "lash_no_contar";

const leer = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const guardar = (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* ignorar */ } };

export const noContarActivo = () => { try { return localStorage.getItem(SIN_CONTAR) === "1"; } catch { return false; } };
export const setNoContar = (on) => { try { on ? localStorage.setItem(SIN_CONTAR, "1") : localStorage.removeItem(SIN_CONTAR); } catch { /* ignorar */ } };

const REDES = [
  [/facebook|fb\.com|fb\.me/, "facebook"],
  [/instagram/, "instagram"],
  [/tiktok/, "tiktok"],
  [/whatsapp|wa\.me/, "whatsapp"],
  [/youtube|youtu\.be/, "youtube"],
  [/(^|\.)t\.co$|twitter|(^|\.)x\.com$/, "x"],
  [/linkedin|lnkd\.in/, "linkedin"],
  [/google/, "google"],
];

function detectarFuente() {
  const p = new URLSearchParams(window.location.search);
  const ref = (p.get("ref") || p.get("utm_source") || "").toLowerCase();
  if (ref) {
    const r = REDES.find(([re]) => re.test(ref));
    return r ? r[1] : ref === "compartido" ? "compartido" : "otro";
  }
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host === window.location.hostname) return "directo";
      const r = REDES.find(([re]) => re.test(host));
      return r ? r[1] : "otro";
    }
  } catch { /* ignorar */ }
  return "directo";
}

function fuente() {
  let f = leer("lash_f");
  if (!f) {
    f = detectarFuente();
    guardar("lash_f", f);
    // limpia ?ref= de la barra para que quien copie el enlace no arrastre la fuente
    try {
      const u = new URL(window.location.href);
      if (u.searchParams.has("ref") || u.searchParams.has("utm_source")) {
        u.searchParams.delete("ref"); u.searchParams.delete("utm_source");
        window.history.replaceState(null, "", u.pathname + u.search + u.hash);
      }
    } catch { /* ignorar */ }
  }
  return f;
}

export function track(e, v = "") {
  try {
    if (import.meta.env.DEV || noContarActivo() || window.location.hash.startsWith("#/stats")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ e, f: fuente(), v }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* nunca romper la página */ }
}

export function trackVisita() {
  if (leer("lash_v")) return;
  guardar("lash_v", "1");
  track("visita");
}
