import { WHATSAPP_NUMBER, VERTICALES } from "../data/config.js";
import BayBoard from "./BayBoard.jsx";

export default function Hero({ onSelectVertical }) {
  const primeraActiva = VERTICALES.find(v => v.estado === "activo");
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, vi System LASH y quiero más información.")}`;

  return (
    <section style={{ padding: "56px 0 40px" }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: 36 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>SYSTEM LASH — SOFTWARE PARA NEGOCIOS</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px, 5.5vw, 52px)",
            lineHeight: 1.08, margin: "0 0 18px", letterSpacing: "-0.01em",
          }}>
            Un sistema para<br />cada oficio.
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-2)", margin: "0 0 28px", maxWidth: 480 }}>
            Nada de plantillas genéricas. Cada negocio recibe un punto de venta hecho a su medida. Empezamos por las llanteras — tu bahía sigue.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {primeraActiva && (
              <a href={primeraActiva.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Ver demo en vivo →
              </a>
            )}
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <BayBoard onSelect={onSelectVertical} />
      </div>
    </section>
  );
}
