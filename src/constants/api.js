// ─── Configuración central de la API ──────────────────────────────────────────
// Cambia SOLO esta variable para apuntar a otro servidor (dev, staging, prod)
export const API_BASE_URL = "http://localhost:8080";

// Endpoints agrupados por dominio
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN:    `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },

  // Productos
  PRODUCTS: {
    ALL:        `${API_BASE_URL}/api/products`,
    BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  },

  // Compras
  PURCHASES: {
    BUY:           `${API_BASE_URL}/api/purchases/buy`,
    BY_USER: (uid) => `${API_BASE_URL}/api/purchases/user/${uid}`,
    BY_ID:   (id)  => `${API_BASE_URL}/api/purchases/${id}`,
  },

  // Notificaciones
  NOTIFICATIONS: {
    BY_USER: (uid) => `${API_BASE_URL}/api/notifications/${uid}`,
  },
};
