import { useEffect, useMemo, useState } from "react";
import { VERTICALES } from "../data/config.js";
import { noContarActivo, setNoContar } from "../utils/track.js";

const REDES = ["facebook", "instagram", "tiktok", "whatsapp", "youtube", "x", "linkedin"];
const NOMBRE_RED = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", whatsapp: "WhatsApp", youtube: "YouTube", x: "X", linkedin: "LinkedIn", google: "Google", directo: "Directo", compartido: "Compartido por visitantes", otro: "Otro" };

export default function Stats() {
  const [clave, setClave] = useState(() => { try { return sessionStorage.getItem("lash_k") || ""; } catch { return ""; } });
  const [entrada, setEntrada] = useState("");
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [rango, setRango] = useState(7);
  const [copiado, setCopiado] = useState("");
  const [sinContar, setSinContar] = useState(noContarActivo());

  useEffect(() => {
    if (!clave) return;
    setError("");
    fetch("/api/stats", { headers: { "x-stats-key": clave } })
      .then(async r => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "Error");
        setDatos(j.dias);
        try { sessionStorage.setItem("lash_k", clave); } catch { /* ignorar */ }
      })
      .catch(e => { setError(e.message); setDatos(null); if (e.message === "Clave incorrecta") setClave(""); });
  }, [clave]);

  const resumen = useMemo(() => {
    if (!datos) return null;
    const dias = datos.slice(0, rango);
    const tot = { visita: 0, click_demo: 0, click_whatsapp: 0, click_quiero: 0, form_enviado: 0, compartir: 0 };
    const porFuente = {}, porBahia = {};
    for (const d of dias) {
      for (const [k, n] of Object.entries(d.campos)) {
        const [e, f, v] = k.split("|");
        if (e in tot) tot[e] += n;
        porFuente[f] ??= { visita: 0, click_demo: 0, click_whatsapp: 0 };
        if (e in porFuente[f]) porFuente[f][e] += n;
        if (v && v !== "-" && (e === "click_demo" || e === "click_quiero")) {
          porBahia[v] ??= { click_demo: 0, click_quiero: 0 };
          porBahia[v][e] += n;
        }
      }
    }
    const serie = [...dias].reverse().map(d => ({
      dia: d.dia,
      n: Object.entries(d.campos).filter(([k]) => k.startsWith("visita|")).reduce((s, [, n]) => s + n, 0),
    }));
    return { tot, porFuente, porBahia, serie };
  }, [datos, rango]);

  const copiar = async (red) => {
    const url = `${window.location.origin}/?ref=${red}`;
    try { await navigator.clipboard.writeText(url); setCopiado(red); setTimeout(() => setCopiado(""), 1800); } catch { /* ignorar */ }
  };

  const nombreBahia = (id) => VERTICALES.find(v => v.id === id)?.nombre || id;
  const maxSerie = resumen ? Math.max(1, ...resumen.serie.map(s => s.n)) : 1;
  const th = { textAlign: "left", fontSize: 11, color: "var(--text-3)", fontWeight: 600, padding: "6px 8px", letterSpacing: "0.06em" };
  const td = { padding: "8px", borderTop: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 13 };

  return (
    <div className="container" style={{ padding: "28px 20px 60px", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="eyebrow">PANEL PRIVADO</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, margin: "4px 0 0" }}>Alcance del Marketplace</h1>
        </div>
        <a href="/" className="btn btn-ghost btn-sm">← Volver al sitio</a>
      </div>

      {!clave && (
        <form className="steel-panel" style={{ padding: 20, display: "flex", gap: 10, flexWrap: "wrap" }}
          onSubmit={e => { e.preventDefault(); setClave(entrada.trim()); }}>
          <input type="password" value={entrada} onChange={e => setEntrada(e.target.value)} placeholder="Clave de estadísticas"
            style={{ flex: 1, minWidth: 200, padding: "10px 12px", background: "var(--bg-asphalt)", border: "1px solid var(--line-strong)", borderRadius: 8, color: "var(--text-1)" }} />
          <button className="btn btn-primary btn-sm" type="submit">Entrar</button>
        </form>
      )}
      {error && <div className="steel-panel" style={{ padding: 14, color: "var(--amber)", fontSize: 14 }}>{error}</div>}

      {resumen && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 7, 30].map(n => (
              <button key={n} onClick={() => setRango(n)} className={`btn btn-sm ${rango === n ? "btn-primary" : "btn-ghost"}`}>
                {n === 1 ? "Hoy" : `${n} días`}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {[["Visitas", "visita"], ["Clics en demo", "click_demo"], ["Clics en WhatsApp", "click_whatsapp"], ["“Quiero este sistema”", "click_quiero"], ["Formularios enviados", "form_enviado"], ["Veces compartido", "compartir"]].map(([t, k]) => (
              <div key={k} className="steel-panel" style={{ padding: 14 }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>{t.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, marginTop: 6 }}>{resumen.tot[k]}</div>
              </div>
            ))}
          </div>

          <div className="steel-panel" style={{ padding: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>VISITAS POR DÍA</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 90 }}>
              {resumen.serie.map(s => (
                <div key={s.dia} title={`${s.dia}: ${s.n}`} style={{ flex: 1, minWidth: 3, height: `${Math.max(3, (s.n / maxSerie) * 100)}%`, background: s.n ? "var(--red)" : "var(--steel-1)", borderRadius: 2 }} />
              ))}
            </div>
          </div>

          <div className="steel-panel" style={{ padding: 16, overflowX: "auto" }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>POR RED SOCIAL / ORIGEN</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>ORIGEN</th><th style={th}>VISITAS</th><th style={th}>DEMO</th><th style={th}>WHATSAPP</th></tr></thead>
              <tbody>
                {Object.entries(resumen.porFuente).sort((a, b) => b[1].visita - a[1].visita).map(([f, d]) => (
                  <tr key={f}><td style={{ ...td, fontFamily: "var(--font-body)" }}>{NOMBRE_RED[f] || f}</td><td style={td}>{d.visita}</td><td style={td}>{d.click_demo}</td><td style={td}>{d.click_whatsapp}</td></tr>
                ))}
                {!Object.keys(resumen.porFuente).length && <tr><td style={td} colSpan={4}>Sin datos todavía en este periodo.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="steel-panel" style={{ padding: 16, overflowX: "auto" }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>INTERÉS POR BAHÍA</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>BAHÍA</th><th style={th}>VER DEMO</th><th style={th}>“QUIERO ESTE SISTEMA”</th></tr></thead>
              <tbody>
                {Object.entries(resumen.porBahia).sort((a, b) => (b[1].click_demo + b[1].click_quiero) - (a[1].click_demo + a[1].click_quiero)).map(([id, d]) => (
                  <tr key={id}><td style={{ ...td, fontFamily: "var(--font-body)" }}>{nombreBahia(id)}</td><td style={td}>{d.click_demo}</td><td style={td}>{d.click_quiero}</td></tr>
                ))}
                {!Object.keys(resumen.porBahia).length && <tr><td style={td} colSpan={3}>Sin datos todavía en este periodo.</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="steel-panel" style={{ padding: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>ENLACES PARA COMPARTIR (uno por red, para medir cuál funciona)</div>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-2)" }}>Usa cada enlace solo en su red. Así sabes de dónde llegó cada visita.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {REDES.map(r => (
            <button key={r} onClick={() => copiar(r)} className="btn btn-ghost btn-sm">{copiado === r ? "¡Copiado!" : `Copiar ${NOMBRE_RED[r]}`}</button>
          ))}
        </div>
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--text-2)" }}>
        <input type="checkbox" checked={sinContar} onChange={e => { setNoContar(e.target.checked); setSinContar(e.target.checked); }} />
        No contar mis propias visitas en este dispositivo
      </label>
    </div>
  );
}
