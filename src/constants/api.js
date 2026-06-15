// ─── Configuración central de la API ──────────────────────────────────────────
// Cambia SOLO esta variable para apuntar a otro servidor (dev, staging, prod)
export const API_BASE_URL = "http://3.215.115.127:8081/v1";

// Endpoints agrupados por dominio
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN:    `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },

  // Productos
  PRODUCTS: {
    ALL:        `${API_BASE_URL}/product`,
    BY_ID: (id) => `${API_BASE_URL}/product/${id}`,
  },

  // Compras
  PURCHASES: {
    BUY:           `${API_BASE_URL}/purchase/buy`,
    BY_USER: (uid) => `${API_BASE_URL}/purchase/user/${uid}`,
    BY_ID:   (id)  => `${API_BASE_URL}/purchase/${id}`,
  },

  // Notificaciones
  NOTIFICATIONS: {
    BY_USER: (uid) => `${API_BASE_URL}/notifications/${uid}`,
  },
};
