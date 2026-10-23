import { WHATSAPP_NUMBER } from "../data/config.js";
import { track } from "../utils/track.js";

export default function Header() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, vi System LASH y quiero más información.")}`;

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(14,17,22,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(160deg, var(--steel-2), var(--steel-1))", border: "1px solid var(--line-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 8px var(--red)" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, letterSpacing: "0.04em" }}>SYSTEM LASH</span>
        </div>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" onClick={() => track("click_whatsapp", "header")}>
          WhatsApp
        </a>
      </div>
    </header>
  );
}
