import { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "No se pudo crear la cuenta.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">

      {/* ── Panel izquierdo ── */}
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
            Crea tu cuenta<br />y empieza a cuidar<br />tu salud hoy.
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Únete a miles de usuarios que ya gestionan sus medicamentos
            de forma inteligente con PharmaCare.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { num: "99%", label: "Precisión en dosis" },
              { num: "24/7", label: "Asesoría disponible" },
              { num: "<2h", label: "Entrega express" },
              { num: "100%", label: "Certificado" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl px-4 py-4">
                <p className="text-white text-2xl font-black">{s.num}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs">© 2024 PharmaCare Systems</p>
      </div>

      {/* ── Formulario ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Logo móvil */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#1a3a6b] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1a3a6b] dark:text-blue-400">PharmaCare</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Completa los datos para registrarte.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Nombre completo *
              </label>
              <input type="text" name="name" required value={formData.name}
                onChange={handleChange} placeholder="Juan Pérez" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Celular <span className="normal-case font-normal text-gray-300">(opcional)</span>
              </label>
              <input type="tel" name="phone" value={formData.phone}
                onChange={handleChange} placeholder="987 654 321" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Correo electrónico *
              </label>
              <input type="email" name="email" required value={formData.email}
                onChange={handleChange} placeholder="tu@correo.com" className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Contraseña *
              </label>
              <input type="password" name="password" required value={formData.password}
                onChange={handleChange} placeholder="Mínimo 8 caracteres" className={inputClass} />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                <p className="text-red-600 dark:text-red-400 text-xs font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a6b] hover:bg-[#14305a] disabled:bg-[#1a3a6b]/50 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md shadow-[#1a3a6b]/20 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creando cuenta...
                </>
              ) : "Crear Cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <NavLink to="/login" className="font-semibold text-[#1a3a6b] dark:text-blue-400 hover:underline">
              Iniciar sesión
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
