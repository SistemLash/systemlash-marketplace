import { forwardRef, useState, useEffect } from "react";
import { WHATSAPP_NUMBER, VERTICALES } from "../data/config.js";
import { track } from "../utils/track.js";

const LeadForm = forwardRef(function LeadForm({ interesSeleccionado }, ref) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [interes, setInteres] = useState(interesSeleccionado || VERTICALES[0].id);
  const [mensaje, setMensaje] = useState("");
  const [tocado, setTocado] = useState(false);

  useEffect(() => {
    if (interesSeleccionado) setInteres(interesSeleccionado);
  }, [interesSeleccionado]);

  const valido = nombre.trim().length > 1 && telefono.trim().length >= 10;

  const enviar = (e) => {
    e.preventDefault();
    setTocado(true);
    if (!valido) return;

    const negocio = VERTICALES.find(v => v.id === interes);
    const texto =
      `Hola, soy ${nombre.trim()}.\n` +
      `Me interesa el sistema para: ${negocio?.nombre || "no especificado"}.\n` +
      `Mi teléfono: ${telefono.trim()}.` +
      (mensaje.trim() ? `\n\nMensaje: ${mensaje.trim()}` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    track("form_enviado", interes);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={ref} className="steel-panel" style={{ padding: 0, overflow: "hidden", scrollMarginTop: 90 }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Orden de contacto</div>
          <div className="eyebrow" style={{ fontSize: 10.5, marginTop: 2 }}>SE ENVÍA DIRECTO A WHATSAPP</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
      </div>

      <form onSubmit={enviar} style={{ padding: 22, display: "grid", gap: 16 }}>
        <Campo label="NOMBRE">
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" style={inputStyle} />
        </Campo>
        <Campo label="TELÉFONO / WHATSAPP">
          <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="10 dígitos" style={inputStyle} inputMode="tel" />
        </Campo>
        <Campo label="NEGOCIO DE INTERÉS">
          <select value={interes} onChange={e => setInteres(e.target.value)} style={{ ...inputStyle, appearance: "auto" }}>
            {VERTICALES.map(v => <option key={v.id} value={v.id}>{v.nombre}{v.estado !== "activo" ? " (próximamente)" : ""}</option>)}
          </select>
        </Campo>
        <Campo label="MENSAJE (OPCIONAL)">
          <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Cuéntanos de tu negocio..." rows={3} style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-body)" }} />
        </Campo>

        {tocado && !valido && (
          <div style={{ fontSize: 12.5, color: "var(--amber)" }}>Completa tu nombre y un teléfono válido para continuar.</div>
        )}

        <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>
          Enviar por WhatsApp →
        </button>
      </form>
    </div>
  );
});

function Campo({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 7 }}>{label}</div>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--line-strong)",
  borderRadius: 8,
  padding: "11px 13px",
  color: "var(--text-1)",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
};

export default LeadForm;
