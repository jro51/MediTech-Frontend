import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../CartContext";
import CartDropdown from "./navbar/CartDropdown";
import NotificationDropdown from "./navbar/NotificationDropdown";
import UserMenu from "./navbar/UserMenu";
import { useNavbarLogic } from "../hooks/useNavbarLogic";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Navbar() {

  const navigate = useNavigate();
  const { cartCount, cart, clearCart } = useCart();
  const [notifications, setNotifications] = useState([]);

  // Referencias para el click outside
  const cartRef = useRef(null);
  const userRef = useRef(null);
  const notifRef = useRef(null);

  const { 
    openMenu, setOpenMenu, 
    showCartModal, setShowCartModal, 
    showNotifMenu, setShowNotifMenu,
    isLoggedIn, handleLogout, handlePurchase 
  } = useNavbarLogic(setNotifications, clearCart);

  // Hook de cierre automático
  useClickOutside([cartRef, userRef, notifRef], () => {
    setOpenMenu(false);
    setShowCartModal(false);
    setShowNotifMenu(false);
  });

  return (
    <nav className="bg-gray-900/50 sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" className="size-8" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={({ isActive }) => isActive ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"}>
                  Productos
                </NavLink>
                <NavLink to="/inventario" className={({ isActive }) => isActive ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"}>
                  Inventario
                </NavLink>
                <NavLink to="/recordatorio" className={({ isActive }) => isActive ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"}>
                  Crear Recordatorio
                </NavLink>
                <NavLink to="/nosotros" className={({ isActive }) => isActive ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"}>
                  Acerca de Nosotros
                </NavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* --- SECCIÓN DE NOTIFICACIONES IA --- */}
            {isLoggedIn && (
              <div className="relative" ref={notifRef}>
                <button onClick={() => setShowNotifMenu(!showNotifMenu)} className="relative p-1 text-gray-400 hover:text-white transition-colors">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifMenu && (
                  <NotificationDropdown isOpen={showNotifMenu} notifications={notifications}>

                  </NotificationDropdown>
                )}
              </div>
            )}

            {/* CONTENEDOR CARRITO */}
            <div className="relative" ref={cartRef}>
              <button type="button" onClick={() => setShowCartModal(!showCartModal)}
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .953.35 1.059.852l.708 2.835m0 0h14.59c.691 0 1.252.562 1.252 1.252a1.125 1.125 0 01-1.125 1.125H5.064m0 0l1.102 4.41a1.125 1.125 0 001.125.923h9.181a1.125 1.125 0 001.125-.923l1.102-4.41M7.5 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12.625 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MODAL CARRITO DESPLEGABLE */}
              {showCartModal && (
                <CartDropdown 
                  isOpen={showCartModal}
                  isLoggedIn={isLoggedIn}
                  onPurchase={() => handlePurchase(cart)}
                  navigate={navigate}>

                </CartDropdown>
              )}
            </div>

            {/* CONTENEDOR USUARIO */}
            <div className="relative" ref={userRef}>
              <button type="button" onClick={() => setOpenMenu(!openMenu)}
                className="relative flex items-center gap-2 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                {isLoggedIn && <span className="text-sm font-medium text-gray-300 hidden sm:block">Mi Perfil</span>}
              </button>

              {openMenu && (
                <UserMenu isOpen={openMenu} isLoggedIn={isLoggedIn} onLogout={() => handleLogout(navigate)} setOpenMenu={setOpenMenu}>

                </UserMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}