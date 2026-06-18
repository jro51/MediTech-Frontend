import { useState, useEffect, useCallback } from "react";
import { purchasesApi, notificationsApi } from "../api";
import { useToast } from "../contexts/ToastContext";

// ─── Hook: lógica del Navbar ───────────────────────────────────────────────────
export function useNavbarLogic(setNotifications, clearCart) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { toast } = useToast(); // ← nuevo

  const toggleDropdown = (name) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  const closeDropdowns = () => setActiveDropdown(null);

  const fetchNotifications = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const data = await notificationsApi.getByUser(userId);
      setNotifications(data ?? []);
    } catch {
      // silencioso: las notificaciones no son críticas
    }
  }, [setNotifications]);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10_000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleLogout = (navigate) => {
    ["token", "userId", "userRole"].forEach((k) => localStorage.removeItem(k));
    setIsLoggedIn(false);
    closeDropdowns();
    setNotifications([]);
    navigate("/login");
  };

  const handlePurchase = async (cart) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.warning("Inicia sesión primero", "No hay una sesión activa.");
      return;
    }
    try {
      const data = await purchasesApi.buy(userId, cart.map((p) => p.id));
      toast.success("Compra exitosa", `Total: $${data.total.toFixed(2)} · ${cart.length} producto${cart.length > 1 ? "s" : ""}`);
      clearCart();
      closeDropdowns();
      setTimeout(fetchNotifications, 3_000);
    } catch (err) {
      const isSessionExpired = err.message.includes("403");
      toast.error(
        isSessionExpired ? "Tu sesión ha expirado" : "Error al procesar la compra",
        isSessionExpired ? "Vuelve a iniciar sesión para continuar." : undefined
      );
    }
  };

  return {
    activeDropdown,
    toggleDropdown,
    closeDropdowns,
    isLoggedIn,
    handleLogout,
    handlePurchase,
    fetchNotifications,
  };
}
