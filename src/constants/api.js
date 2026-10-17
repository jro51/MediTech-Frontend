// ─── Configuración central de la API ──────────────────────────────────────────
// Se define con la variable VITE_API_URL (ver .env.example). Por defecto apunta al gateway local.
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

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
    ALERTS: (days = 30) => `${API_BASE_URL}/api/products/alerts?days=${days}`,
  },

  // Pedidos (reservas con recojo en tienda)
  PURCHASES: {
    BUY:           `${API_BASE_URL}/api/purchases/buy`,
    ALL: (status) => `${API_BASE_URL}/api/purchases${status ? `?status=${status}` : ""}`,
    BY_USER: (uid) => `${API_BASE_URL}/api/purchases/user/${uid}`,
    BY_ID:   (id)  => `${API_BASE_URL}/api/purchases/${id}`,
    STATUS:  (id, value) => `${API_BASE_URL}/api/purchases/${id}/status?value=${value}`,
  },

  // Notificaciones
  NOTIFICATIONS: {
    BY_USER: (uid) => `${API_BASE_URL}/api/notifications/${uid}`,
    ADMIN_INBOX:      `${API_BASE_URL}/api/notifications/admin/inbox`,
  },
};
