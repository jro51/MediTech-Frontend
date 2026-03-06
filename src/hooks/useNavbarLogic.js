import { useState, useEffect, useCallback } from "react";

export function useNavbarLogic(setNotifications, clearCart) {
  const [openMenu, setOpenMenu] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Definimos la función interna con useCallback
  const fetchNotifications = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      const response = await fetch(`http://localhost:8081/v1/notifications/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
    }
  }, [setNotifications]);

  // Manejo del Login inicial
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [fetchNotifications]);

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setOpenMenu(false);
    setNotifications([]);
    navigate("/login");
  };

  const handlePurchase = async (cart) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay una sesión activa. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/v1/purchase/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          productIds: cart.map(p => p.id)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`¡Compra exitosa! Total: $${data.total}`);
        clearCart();
        setShowCartModal(false);
        setTimeout(fetchNotifications, 3000);
      } else if (response.status === 403) {
        alert("Tu sesión ha expirado.");
      }
    } catch (error) {
      console.error("Error al procesar compra:", error);
    }
  };

  return {
    openMenu, setOpenMenu,
    showCartModal, setShowCartModal,
    showNotifMenu, setShowNotifMenu,
    isLoggedIn,
    handleLogout,
    handlePurchase,
    fetchNotifications
  };
}