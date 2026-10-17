// ─── Utilidades de inventario ──────────────────────────────────────────────────

// "2026-10-20" se interpreta como fecha local (evita el desfase de zona horaria de new Date("2026-10-20"))
function parseLocalDate(value) {
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

const MS_PER_DAY = 86_400_000;

/** Días que faltan para una fecha (negativo si ya pasó). null si no hay fecha. */
export function daysUntil(dateString, today = new Date()) {
  if (!dateString) return null;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((parseLocalDate(dateString) - start) / MS_PER_DAY);
}

/** Texto y tono para mostrar el vencimiento de un producto. */
export function expirationInfo(dateString, today = new Date()) {
  const days = daysUntil(dateString, today);
  if (days === null) return { text: "Sin fecha de vencimiento", tone: "none" };
  if (days < 0) return { text: `Venció hace ${days === -1 ? "1 día" : `${-days} días`}`, tone: "expired" };
  if (days === 0) return { text: "Vence hoy", tone: "soon" };
  return { text: `Vence en ${days === 1 ? "1 día" : `${days} días`}`, tone: "soon" };
}

/** Stock bajo: quedan pocas unidades pero todavía hay. */
export function isLowStock(product) {
  return product.stock > 0 && product.minStock != null && product.stock <= product.minStock;
}

export function isOutOfStock(product) {
  return product.stock <= 0;
}

export function formatDate(value, options = { day: "2-digit", month: "short", year: "numeric" }) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("es-PE", options);
}
