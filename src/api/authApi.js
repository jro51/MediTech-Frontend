import { http } from "./httpClient";
import { ENDPOINTS } from "../constants/api";

// ─── Servicio de Autenticación ─────────────────────────────────────────────────
export const authApi = {
  /**
   * Inicia sesión y devuelve { token, id, role }
   */
  login: (email, password) =>
    http.post(ENDPOINTS.AUTH.LOGIN, { email, password }),

  /**
   * Registra un nuevo usuario
   */
  register: (formData) =>
    http.post(ENDPOINTS.AUTH.REGISTER, formData),
};
