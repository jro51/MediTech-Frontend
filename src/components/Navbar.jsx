import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" className="size-8" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                >
                  Productos
                </NavLink>
                <NavLink
                  to="/inventario"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                >
                  Inventario
                </NavLink>
                <NavLink
                  to="/recordatorio"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                >
                  Crear Recordartorio
                </NavLink>
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                >
                  Acerca de Nosotros
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                  aria-hidden="true" className="size-6">
                  <path
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <el-dropdown className="relative ml-3">

                <button type="button" onClick={() => setOpenMenu(!openMenu)}
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                    aria-hidden="true" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </button>
                {
                  openMenu && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5">
                      <div className="py-1">
                        <NavLink
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          onClick={() => setOpenMenu(false)}
                        >
                          Iniciar sesión
                        </NavLink>

                        <NavLink
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          onClick={() => setOpenMenu(false)}
                        >
                          Registrarse
                        </NavLink>
                      </div>
                    </div>
                  )
                }

                <el-menu anchor="bottom end" popover
                  className="w-48 origin-top-right rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Your
                    profile</a>
                  <a href="#"
                    className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Sign
                    out</a>
                </el-menu>

              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}