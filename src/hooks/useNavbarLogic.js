import { useState, useEffect, useCallback } from "react";
import { purchasesApi, notificationsApi } from "../api";

// ─── Hook: lógica del Navbar ───────────────────────────────────────────────────
export function useNavbarLogic(setNotifications, clearCart) {
  const [openMenu,       setOpenMenu]       = useState(false);
  const [showCartModal,  setShowCartModal]  = useState(false);
  const [showNotifMenu,  setShowNotifMenu]  = useState(false);
  const [isLoggedIn,     setIsLoggedIn]     = useState(!!localStorage.getItem("token"));

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
    setOpenMenu(false);
    setNotifications([]);
    navigate("/login");
  };

  const handlePurchase = async (cart) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No hay una sesión activa. Por favor, inicia sesión.");
      return;
    }
    try {
      const data = await purchasesApi.buy(userId, cart.map((p) => p.id));
      alert(`¡Compra exitosa! Total: $${data.total}`);
      clearCart();
      setShowCartModal(false);
      setTimeout(fetchNotifications, 3_000);
    } catch (err) {
      alert(err.message.includes("403") ? "Tu sesión ha expirado." : "Error al procesar la compra.");
    }
  };

  return {
    openMenu, setOpenMenu,
    showCartModal, setShowCartModal,
    showNotifMenu, setShowNotifMenu,
    isLoggedIn,
    handleLogout,
    handlePurchase,
    fetchNotifications,
  };
}
