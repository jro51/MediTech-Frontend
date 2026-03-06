import { NavLink } from "react-router-dom";
export default function UserMenu({ isOpen, isLoggedIn, onLogout, setOpenMenu }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 py-1">
      {!isLoggedIn ? (
        <>
          <NavLink to="/login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5" onClick={() => setOpenMenu(false)}>
            Iniciar sesión
          </NavLink>
          <NavLink to="/register" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5" onClick={() => setOpenMenu(false)}>
            Registrarse
          </NavLink>
        </>
      ) : (
        <>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Mi Perfil</button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Configuración</button>
          <hr className="border-gray-700 my-1" />
          <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 font-semibold">
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}