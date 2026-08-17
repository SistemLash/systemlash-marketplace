import { VERTICALES } from "../data/config.js";

export default function BayBoard({ onSelect }) {
  return (
    <div className="steel-panel" style={{ padding: "18px 18px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, padding: "0 4px" }}>
        <span className="eyebrow">TABLERO DE BAHÍAS</span>
        <span className="eyebrow" style={{ color: "var(--text-3)" }}>{VERTICALES.filter(v => v.estado === "activo").length}/{VERTICALES.length} EN OPERACIÓN</span>
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
        {VERTICALES.map(v => {
          const activo = v.estado === "activo";
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              style={{
                flex: "0 0 auto",
                minWidth: 148,
                textAlign: "left",
                cursor: "pointer",
                background: activo ? "linear-gradient(160deg, rgba(34,197,94,0.08), rgba(255,255,255,0.02))" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activo ? "rgba(34,197,94,0.35)" : "var(--line)"}`,
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: activo ? "#fff" : "var(--text-3)" }}>{v.bahia}</span>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: activo ? "var(--green)" : "var(--amber)",
                  boxShadow: activo ? "0 0 8px var(--green)" : "none",
                  animation: activo ? "pulse 2s ease-in-out infinite" : "none",
                }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: activo ? "var(--text-1)" : "var(--text-2)" }}>{v.nombre}</div>
                <div className="eyebrow" style={{ fontSize: 10, marginTop: 2, color: activo ? "var(--green)" : "var(--text-3)" }}>
                  {activo ? "ABIERTA" : "PRÓXIMA"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
