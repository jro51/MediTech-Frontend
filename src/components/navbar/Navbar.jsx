import { Link, useNavigate, NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { useCart }          from "../../contexts/CartContext";
import { useTheme }         from "../../contexts/ThemeContext";
import { useNavbarLogic }   from "../../hooks/useNavbarLogic";
import { useClickOutside }  from "../../hooks/useClickOutside";
import { useProductSearch } from "../../hooks/useProductSearch";
import SearchDropdown from "./SearchDropdown";
import CartDropdown          from "./CartDropdown";
import NotificationDropdown  from "./NotificationDropdown";
import UserMenu              from "./UserMenu";

// ─── Toggle de tema ────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative flex items-center w-[52px] h-7 rounded-full transition-colors duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3a6b]"
      style={{ backgroundColor: dark ? "#1a3a6b" : "#e2e8f0" }}
    >
      <span className="absolute left-1.5 flex items-center justify-center w-4 h-4 transition-opacity duration-200"
        style={{ opacity: dark ? 0.4 : 1 }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
          stroke={dark ? "#94a3b8" : "#f59e0b"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
      <span className="absolute right-1.5 flex items-center justify-center w-4 h-4 transition-opacity duration-200"
        style={{ opacity: dark ? 1 : 0.4 }}>
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill={dark ? "#e2e8f0" : "#94a3b8"} stroke="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <span
        className="absolute top-0.5 bottom-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-300"
        style={{
          transform: dark ? "translateX(26px)" : "translateX(2px)",
          backgroundColor: dark ? "#e2e8f0" : "white",
        }}
      />
    </button>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, cart, clearCart } = useCart();
  const [notifications, setNotifications] = useState([]);

  const cartRef  = useRef(null);
  const userRef  = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  const {
    activeDropdown, toggleDropdown, closeDropdowns,
    isLoggedIn, handleLogout, handlePurchase,
  } = useNavbarLogic(setNotifications, clearCart);

  const { query, results, isOpen, handleChange, handleFocus, close, clear } = useProductSearch();

  // un solo array con los 3 refs — si el click cae fuera de los 3, cerramos todo
  useClickOutside([cartRef, userRef, notifRef, searchRef], () => {
    closeDropdowns();
    close(); // ← cierra también el dropdown de búsqueda
  });

  const handleSelectProduct = (product) => {
    clear();
    navigate(`/productos/${product.id}`); // ← ya no usamos state, vamos directo al detalle
  };

  const handleViewAll = () => {
    navigate("/productos"); // ← catálogo completo, sin query param por ahora
    clear();
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "relative text-sm font-semibold text-[#0040A2] dark:text-blue-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#0040A2] dark:after:bg-blue-400 after:rounded-full"
      : "relative text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors duration-200";

  const iconBtn = "p-2 text-gray-400 hover:text-[#0040A2] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full transition-colors";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0040A2] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#0040A2] dark:text-blue-400 tracking-tight">PharmaCare</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 flex-1">
            <NavLink to="/"           end className={navLinkClass}>Products</NavLink>
            <NavLink to="/inventario"     className={navLinkClass}>Inventory</NavLink>
            <NavLink to="/recordatorio"   className={navLinkClass}>Reminders</NavLink>
            <NavLink to="/nosotros"       className={navLinkClass}>About Us</NavLink>
          </div>

          {/* Search */}
          <div ref={searchRef} className="hidden md:block relative w-52">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 focus-within:border-[#1a3a6b] dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-[#1a3a6b]/10 transition-all">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={handleFocus}
                placeholder="Buscar medicamentos..."
                className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 outline-none w-full"
              />
              {query && (
                <button onClick={clear} className="text-gray-300 hover:text-gray-500 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {isOpen && (
              <SearchDropdown
                query={query}
                results={results}
                onSelect={handleSelectProduct}
                onViewAll={handleViewAll}
              />
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Notificaciones */}
            {isLoggedIn && (
              <div className="relative" ref={notifRef}>
                <button onClick={() => toggleDropdown("notifications")} className={iconBtn}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1a3a6b] dark:bg-blue-400" />
                  )}
                </button>
                {activeDropdown === "notifications" && (
                  <NotificationDropdown isOpen notifications={notifications} />
                )}
              </div>
            )}

            {/* Carrito */}
            <div className="relative" ref={cartRef}>
              <button onClick={() => toggleDropdown("cart")} className={iconBtn}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .953.35 1.059.852l.708 2.835m0 0h14.59c.691 0 1.252.562 1.252 1.252a1.125 1.125 0 01-1.125 1.125H5.064m0 0l1.102 4.41a1.125 1.125 0 001.125.923h9.181a1.125 1.125 0 001.125-.923l1.102-4.41" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1a3a6b] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {activeDropdown === "cart" && (
                <CartDropdown isOpen isLoggedIn={isLoggedIn}
                  onPurchase={() => handlePurchase(cart)} navigate={navigate} />
              )}
            </div>

            {/* Usuario */}
            <div className="relative" ref={userRef}>
              <button onClick={() => toggleDropdown("user")} className={iconBtn}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>
              {activeDropdown === "user" && (
                <UserMenu isOpen isLoggedIn={isLoggedIn}
                  onLogout={() => handleLogout(navigate)} setOpenMenu={closeDropdowns} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}