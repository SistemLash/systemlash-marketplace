// ─────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN CENTRAL — todo lo que cambia seguido vive aquí, no en el
// diseño. Para agregar un nuevo vertical (barbería, gimnasio, etc.) solo se
// agrega una entrada al array VERTICALES. No se toca ningún componente.
// ─────────────────────────────────────────────────────────────────────────

// Número de WhatsApp de Luis, formato: código de país + número, sin signos.
// Ejemplo México: "52" + 10 dígitos = "528111234567"
export const WHATSAPP_NUMBER = "523312763853"; // ← reemplazar con el número real

// URL de la página de Facebook del negocio (para el botón de compartir/seguir)
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61579854864916"; // ← reemplazar con la real

export const VERTICALES = [
  {
    id: "llantera",
    bahia: "01",
    nombre: "Llantera",
    rubro: "Llanteras y talleres",
    estado: "activo", // "activo" | "proximamente"
    resumen: "Punto de venta, inventario de llantas por medida, cortes de caja y cotizador para tu vendedor.",
    caracteristicas: [
      "Ventas y ticket en segundos",
      "Inventario por medida y marca",
      "Compras con catálogo de proveedores",
      "Cortes de caja por turno",
      "Cotizador para compartir por WhatsApp",
    ],
    demoUrl: "https://llanterazonax.vercel.app/",
    demoUsuario: "admin@demo.com",
    demoPassword: "admin123",
    precioCompra: 5000,
    precioMensual: 500,
  },
 {
    id: "gps-camaras",
    bahia: "02",
    nombre: "GPS y Cámaras",
    rubro: "Rastreo GPS y videovigilancia vehicular",
    estado: "activo",
    resumen: "Venta e instalación de GPS, DVRs móviles, dashcams y cámaras, con control de licencias Protrack y chips para no perder ninguna renovación.",
    caracteristicas: [
      "Venta de equipo, chip y licencia Protrack en un solo ticket",
      "Vencimientos agrupados por cliente con aviso por WhatsApp en un clic",
      "Renovaciones con historial por equipo e IMEI",
      "Cotizador con kits armados al momento y PDF para el cliente",
      "Catálogo de productos, pendientes por completar y bajas de clientes",
      "Carga masiva de tu historial desde Excel",
    ],
    demoUrl: "https://systemlash-gps-demo.vercel.app/",
    demoUsuario: "demo",
    demoPassword: "Demo2026!",
    // Pendiente: Luis define el precio. Mientras sea null la tarjeta dice "Cotiza por WhatsApp".
    precioCompra: null,
    precioMensual: null,
  },
  {
    id: "contabilidad",
    bahia: "03",
    nombre: "Contabilidad",
    rubro: "Conciliación de facturas y bancos",
    estado: "proximamente",
    resumen: "Sube tus facturas (XML) y tus movimientos del banco, concilia en una sola pantalla y descarga los reportes del mes en Excel.",
    caracteristicas: [],
    demoUrl: null,
    precioCompra: null,
    precioMensual: null,
  },
  {
    id: "barberia",
    bahia: "04",
    nombre: "Barbería",
    rubro: "Barberías y estéticas",
    estado: "proximamente",
    resumen: "Agenda de citas, control de comisiones por barbero y venta de productos.",
    caracteristicas: [],
    demoUrl: null,
    precioCompra: null,
    precioMensual: null,
  },
  {
    id: "refared",
    bahia: "05",
    nombre: "Refared",
    rubro: "Refacciones para camión y tráiler",
    estado: "proximamente",
    resumen: "Red privada para que proveedores de refacciones de camión y tráiler publiquen su catálogo y reciban pedidos de talleres y flotillas.",
    caracteristicas: [],
    demoUrl: null,
    precioCompra: null,
    precioMensual: null,
  },
  {
    id: "gimnasio",
    bahia: "06",
    nombre: "Gimnasio",
    rubro: "Gimnasios y estudios",
    estado: "proximamente",
    resumen: "Control de membresías, accesos y pagos recurrentes.",
    caracteristicas: [],
    demoUrl: null,
    precioCompra: null,
    precioMensual: null,
  },
];
