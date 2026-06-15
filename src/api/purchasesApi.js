import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Compras ───────────────────────────────────────────────────────
export const purchasesApi = {
  /**
   * Realiza una compra con los productos del carrito
   * @param {string} userId
   * @param {string[]} productIds
   */
  buy: (userId, productIds) =>
    http.post(ENDPOINTS.PURCHASES.BUY, { userId, productIds }),

  /**
   * Trae el historial de compras de un usuario (= inventario personal)
   * @param {string} userId
   */
  getByUser: (userId) =>
    http.get(ENDPOINTS.PURCHASES.BY_USER(userId)),

  /**
   * Elimina una compra del inventario personal
   * @param {string} purchaseId
   */
  remove: (purchaseId) =>
    http.delete(ENDPOINTS.PURCHASES.BY_ID(purchaseId)),
};
