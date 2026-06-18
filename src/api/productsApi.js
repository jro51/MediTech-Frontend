import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Productos ─────────────────────────────────────────────────────
export const productsApi = {
  /**
   * Trae todos los productos del catálogo
   */
  getAll: () =>
    http.get(ENDPOINTS.PRODUCTS.ALL),

  getById: (id) =>
    http.get(ENDPOINTS.PRODUCTS.BY_ID(id)),

  /**
   * Crea un producto nuevo (solo ADMIN)
   */
  create: (productData) =>
    http.post(ENDPOINTS.PRODUCTS.ALL, productData, { "user-role": "ADMIN" }),

  /**
   * Actualiza un producto existente (solo ADMIN)
   */
  update: (id, productData) =>
    http.put(ENDPOINTS.PRODUCTS.BY_ID(id), productData, { "user-role": "ADMIN" }),

  /**
   * Elimina un producto (solo ADMIN)
   */
  remove: (id) =>
    http.delete(ENDPOINTS.PRODUCTS.BY_ID(id), { "User-Role": "ADMIN" }),
};
