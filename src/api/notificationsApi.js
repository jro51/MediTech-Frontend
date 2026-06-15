import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Notificaciones ────────────────────────────────────────────────
export const notificationsApi = {
  /**
   * Obtiene las recomendaciones IA del usuario
   * @param {string} userId
   */
  getByUser: (userId) =>
    http.get(ENDPOINTS.NOTIFICATIONS.BY_USER(userId)),
};
