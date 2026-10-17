// ─── Estados de un pedido (reserva y recojo en tienda) ────────────────────────
// RESERVED → READY → PICKED_UP, y se puede CANCELLED antes de ser recogido.
export const ORDER_STATUS = {
  RESERVED: {
    label: "Reservado",
    hint: "La botica está preparando tu pedido.",
    dot: "bg-amber-500",
    chip: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
  },
  READY: {
    label: "Listo para recoger",
    hint: "Ya puedes pasar a recogerlo a la botica.",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400",
  },
  PICKED_UP: {
    label: "Recogido",
    hint: "Pedido entregado.",
    dot: "bg-blue-500",
    chip: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
  },
  CANCELLED: {
    label: "Cancelado",
    hint: "Los productos volvieron al inventario.",
    dot: "bg-red-500",
    chip: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  },
};

const UNKNOWN = {
  label: "Sin estado",
  hint: "",
  dot: "bg-gray-400",
  chip: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

export function getStatusInfo(status) {
  return ORDER_STATUS[status] ?? { ...UNKNOWN, label: status ?? UNKNOWN.label };
}

// Siguiente paso "natural" que puede aplicar la botica
const NEXT_ACTION = {
  RESERVED: { to: "READY", label: "Marcar como listo" },
  READY: { to: "PICKED_UP", label: "Marcar como recogido" },
};

export function nextAction(status) {
  return NEXT_ACTION[status] ?? null;
}

export function canCancel(status) {
  return status === "RESERVED" || status === "READY";
}
