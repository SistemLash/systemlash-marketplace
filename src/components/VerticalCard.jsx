import { forwardRef } from "react";
import { track } from "../utils/track.js";

const fmt = (n) => n == null ? "" : `$${n.toLocaleString("es-MX")}`;

const VerticalCard = forwardRef(function VerticalCard({ v, onQuiero }, ref) {
  const activo = v.estado === "activo";

  return (
    <div ref={ref} className="steel-panel" style={{ padding: 0, overflow: "hidden", scrollMarginTop: 90 }}>
      {/* Encabezado tipo "orden de servicio" */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 22px", borderBottom: "1px solid var(--line)",
        background: activo ? "linear-gradient(90deg, rgba(226,20,31,0.08), transparent)" : "transparent",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: activo ? "var(--red)" : "var(--text-3)" }}>{v.bahia}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>{v.nombre}</div>
            <div className="eyebrow" style={{ fontSize: 10.5 }}>{v.rubro}</div>
          </div>
        </div>
        <span className="eyebrow" style={{
          fontSize: 10.5, padding: "5px 10px", borderRadius: 20,
          color: activo ? "var(--green)" : "var(--amber)",
          border: `1px solid ${activo ? "rgba(34,197,94,0.4)" : "rgba(255,176,32,0.4)"}`,
        }}>
          {activo ? "● OPERANDO" : "○ PRÓXIMAMENTE"}
        </span>
      </div>

      <div style={{ padding: 22 }}>
        <p style={{ margin: "0 0 18px", color: "var(--text-2)", fontSize: 14.5 }}>{v.resumen}</p>

        {activo ? (
          <>
            <div className="eyebrow" style={{ marginBottom: 10 }}>INCLUYE</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "grid", gap: 9 }}>
              {v.caracteristicas.map((c, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5 }}>
                  <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", flexShrink: 0, marginTop: 1 }}>›</span>
                  {c}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
              <div>
                {v.precioCompra != null ? (
                  <>
                    <div className="eyebrow" style={{ fontSize: 10 }}>INSTALACIÓN + MENSUALIDAD</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, marginTop: 4 }}>
                      {fmt(v.precioCompra)} <span style={{ color: "var(--text-3)", fontSize: 14 }}>+ {fmt(v.precioMensual)}/mes</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="eyebrow" style={{ fontSize: 10 }}>PRECIO</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, marginTop: 4 }}>Cotiza por WhatsApp</div>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={v.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" onClick={() => track("click_demo", v.id)}>Ver demo</a>
                <button onClick={() => onQuiero(v)} className="btn btn-primary btn-sm">Quiero este sistema</button>
              </div>
            </div>

            {v.demoUsuario && (
              <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
                Acceso demo — usuario: <span style={{ color: "var(--text-2)" }}>{v.demoUsuario}</span> · contraseña: <span style={{ color: "var(--text-2)" }}>{v.demoPassword}</span>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => onQuiero(v)} className="btn btn-ghost btn-sm">Avísenme cuando esté listo</button>
        )}
      </div>
    </div>
  );
});

export default VerticalCard;
