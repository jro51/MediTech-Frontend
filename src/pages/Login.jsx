import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { authApi } from "../api";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("token",    data.token);
      localStorage.setItem("userId",   data.id);
      localStorage.setItem("userRole", data.role);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">

      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a3a6b] flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">PharmaCare</span>
        </Link>
        <div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Tu salud,<br />gestionada con<br />precisión profesional.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Accede a tu panel personal para gestionar medicamentos, recordatorios y tu inventario de salud.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {[
              { icon: "🔔", text: "Recordatorios inteligentes de dosis" },
              { icon: "📦", text: "Control de inventario personal" },
              { icon: "🤖", text: "Recomendaciones con IA" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="text-lg">{f.icon}</span>
                <span className="text-white/80 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-xs">© 2024 PharmaCare Systems</p>
      </div>

      {/* Formulario */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#1a3a6b] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1a3a6b] dark:text-blue-400">PharmaCare</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">Bienvenido de nuevo</h1>
          <p className="text-sm text-gray-400 mb-8">Ingresa tus credenciales para continuar.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Correo electrónico
              </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all" />
            </div>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                <p className="text-red-600 dark:text-red-400 text-xs font-medium">{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-[#1a3a6b] hover:bg-[#14305a] disabled:bg-[#1a3a6b]/50 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md shadow-[#1a3a6b]/20 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Iniciando sesión...
                </>
              ) : "Iniciar Sesión"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <NavLink to="/register" className="font-semibold text-[#1a3a6b] dark:text-blue-400 hover:underline">
              Crear cuenta
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
