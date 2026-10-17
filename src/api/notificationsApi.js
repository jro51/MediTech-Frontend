import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Notificaciones ────────────────────────────────────────────────
export const notificationsApi = {
  /** Avisos sobre el estado de los pedidos de un cliente */
  getByUser: (userId) => http.get(ENDPOINTS.NOTIFICATIONS.BY_USER(userId)),

  /** Bandeja de la botica: reservas nuevas y alertas de inventario (solo ADMIN) */
  getAdminInbox: () => http.get(ENDPOINTS.NOTIFICATIONS.ADMIN_INBOX),
};
