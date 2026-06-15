import { NavLink } from "react-router-dom";

export default function UserMenu({ isOpen, isLoggedIn, onLogout, setOpenMenu }) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 py-1 overflow-hidden transition-colors">
      {!isLoggedIn ? (
        <>
          <NavLink to="/login"    onClick={() => setOpenMenu(false)}
            className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors">
            Iniciar sesión
          </NavLink>
          <NavLink to="/register" onClick={() => setOpenMenu(false)}
            className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors">
            Registrarse
          </NavLink>
        </>
      ) : (
        <>
          <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors">
            Mi Perfil
          </button>
          <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors">
            Configuración
          </button>
          <hr className="border-gray-100 dark:border-gray-800 my-1" />
          <button onClick={onLogout}
            className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-colors">
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}
