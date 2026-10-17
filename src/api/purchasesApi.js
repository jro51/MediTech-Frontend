import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Pedidos ───────────────────────────────────────────────────────
export const purchasesApi = {
  /**
   * Reserva los productos del carrito (el userId real se toma del JWT en el gateway)
   * @param {string} userId
   * @param {string[]} productIds
   */
  buy: (userId, productIds) =>
    http.post(ENDPOINTS.PURCHASES.BUY, { userId, productIds }),

  /** Pedidos del usuario */
  getByUser: (userId) => http.get(ENDPOINTS.PURCHASES.BY_USER(userId)),

  /** Todos los pedidos, con filtro opcional por estado (solo ADMIN) */
  getAll: (status) => http.get(ENDPOINTS.PURCHASES.ALL(status)),

  /**
   * Cambia el estado de un pedido (solo ADMIN)
   * @param {number} id
   * @param {"READY"|"PICKED_UP"|"CANCELLED"} value
   */
  updateStatus: (id, value) => http.put(ENDPOINTS.PURCHASES.STATUS(id, value), null),

  /** Elimina un pedido (solo ADMIN) */
  remove: (id) => http.delete(ENDPOINTS.PURCHASES.BY_ID(id)),
};
