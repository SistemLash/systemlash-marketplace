import { WHATSAPP_NUMBER } from "../data/config.js";
import { track } from "../utils/track.js";

export default function Footer() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "28px 0", marginTop: 12 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 12.5, fontWeight: 700, color: "var(--text-3)" }}>SYSTEM LASH</span>
        <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("click_whatsapp", "footer")} style={{ fontSize: 12.5, color: "var(--text-3)", textDecoration: "none" }}>
          Escríbenos por WhatsApp
        </a>
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
