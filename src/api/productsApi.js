import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Productos ─────────────────────────────────────────────────────
// El rol (ADMIN) lo valida el API Gateway a partir del JWT: el frontend ya no
// envía headers de rol, porque no son confiables.
export const productsApi = {
  /** Trae todos los productos del catálogo */
  getAll: () => http.get(ENDPOINTS.PRODUCTS.ALL),

  getById: (id) => http.get(ENDPOINTS.PRODUCTS.BY_ID(id)),

  /** Stock bajo y productos vencidos o por vencer en los próximos `days` días (solo ADMIN) */
  getAlerts: (days = 30) => http.get(ENDPOINTS.PRODUCTS.ALERTS(days)),

  /** Crea un producto nuevo (solo ADMIN) */
  create: (productData) => http.post(ENDPOINTS.PRODUCTS.ALL, productData),

  /** Actualiza un producto existente (solo ADMIN) */
  update: (id, productData) => http.put(ENDPOINTS.PRODUCTS.BY_ID(id), productData),

  /** Elimina un producto (solo ADMIN) */
  remove: (id) => http.delete(ENDPOINTS.PRODUCTS.BY_ID(id)),
};
