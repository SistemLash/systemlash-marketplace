import { useState } from "react";
import { track } from "../utils/track.js";

export default function ShareBar() {
  const [copiado, setCopiado] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/?ref=compartido` : "https://systemlash.com";
  const textoCompartir = "Encontré este sistema para negocios, échale un ojo:";

  const puedeCompartirNativo = typeof navigator !== "undefined" && !!navigator.share;

  const compartirNativo = () => {
    track("compartir", "nativo");
    navigator.share({ title: "System LASH", text: textoCompartir, url }).catch(() => {});
  };

  const copiarEnlace = async () => {
    track("compartir", "copiar");
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* silencioso: navegadores muy viejos sin clipboard API */
    }
  };

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="steel-panel" style={{ padding: 22, textAlign: "center" }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>¿LE SIRVE A ALGUIEN MÁS?</div>
      <p style={{ margin: "0 0 18px", color: "var(--text-2)", fontSize: 14 }}>Compártelo — entre más talleres lo conozcan, más rápido llega tu bahía.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <a href={facebookHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" onClick={() => track("compartir", "facebook")}>
          Compartir en Facebook
        </a>
        {puedeCompartirNativo && (
          <button onClick={compartirNativo} className="btn btn-ghost btn-sm">
            Compartir (Instagram / TikTok / más)
          </button>
        )}
        <button onClick={copiarEnlace} className="btn btn-ghost btn-sm">
          {copiado ? "¡Copiado!" : "Copiar enlace"}
        </button>
      </div>
      {!puedeCompartirNativo && (
        <p style={{ margin: "14px 0 0", fontSize: 11.5, color: "var(--text-3)" }}>
          Para compartir directo a Instagram o TikTok, ábrelo desde tu celular.
        </p>
      )}
    </div>
  );
}
