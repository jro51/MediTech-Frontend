// Estilo de cada tipo de notificación (las alertas de la botica se resaltan en ámbar)
const STYLES = {
  LOW_STOCK: "bg-amber-50 dark:bg-amber-900/20 border-amber-500",
  EXPIRING: "bg-red-50 dark:bg-red-900/20 border-red-500",
  NEW_ORDER: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500",
};
const DEFAULT_STYLE = "bg-blue-50 dark:bg-blue-900/20 border-[#1a3a6b] dark:border-blue-500";

export function notificationStyle(type) {
  return STYLES[type] ?? DEFAULT_STYLE;
}

// El servicio de notificaciones guarda la hora en UTC sin sufijo de zona horaria
export function formatNotificationDate(value) {
  if (!value) return "";
  const hasZone = /Z|[+-]\d{2}:?\d{2}$/.test(value);
  return new Date(hasZone ? value : `${value}Z`).toLocaleString("es-PE");
}
