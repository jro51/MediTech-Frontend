import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { productsApi } from "../api/productsApi";
import { useInventory } from "../hooks/useInventory";

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs font-bold tracking-widest text-[#0040A2] uppercase mb-4">
              PharmaCare · Plataforma de Salud
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0040A2] leading-tight mb-6">
              Tu salud, gestionada con{" "}
              <span className="relative">
                precisión profesional
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#0040A2]/20 rounded-full" />
              </span>
              .
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              Más que una farmacia, somos tu aliado digital para el bienestar.
              Compra tus medicamentos, gestiona tu inventario personal y nunca
              olvides una dosis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/recordatorio"
                className="inline-flex items-center gap-2 bg-[#0040A2] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#14305a] transition-colors shadow-md shadow-[#1a3a6b]/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Crear Recordatorio
              </Link>
              <a
                href="#productos-destacados"
                className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 dark:text-gray-300 text-sm font-semibold px-5 py-3 rounded-lg hover:border-[#1a3a6b] hover:text-[#1a3a6b] transition-colors"
              >
                Explorar Catálogo
              </a>
            </div>
          </div>

          {/* Visual card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Círculo principal con gradiente */}
              <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2d5fa6] flex items-center justify-center shadow-2xl shadow-[#1a3a6b]/30 overflow-hidden">
                {/* Ícono central */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-2xl font-black">99%</p>
                    <p className="text-white/70 text-xs">Precisión</p>
                  </div>
                </div>
                {/* Anillos decorativos */}
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/10" />
              </div>

              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">99% Precisión</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Dosis monitoreadas en<br />tiempo real para tu tranquilidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Badge de receta ─────────────────────────────────────────────────────────
function RecetaBadge({ needsReceta }) {
  if (needsReceta) {
    return (
      <span className="absolute top-2 left-2 bg-[#1a3a6b] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
        Receta Médica
      </span>
    );
  }
  return (
    <span className="absolute top-2 left-2 bg-gray-800/70 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
      Sin Receta
    </span>
  );
}

// ─── Tarjeta de Producto ─────────────────────────────────────────────────────
function FeaturedProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#1a3a6b]/20 transition-all duration-300">
      {/* Imagen */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img
          src={product.imageSrc || "https://placehold.co/300x300/e8eef5/1a3a6b?text=Med"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x300/e8eef5/1a3a6b?text=Med";
          }}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <RecetaBadge needsReceta={product.needsReceta} />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-black text-gray-900 dark:text-white">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1a3a6b] hover:bg-[#14305a] text-white transition-colors shadow-md shadow-[#1a3a6b]/20 active:scale-95"
            title="Añadir al carrito"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .953.35 1.059.852l.708 2.835m0 0h14.59c.691 0 1.252.562 1.252 1.252a1.125 1.125 0 01-1.125 1.125H5.064m0 0l1.102 4.41a1.125 1.125 0 001.125.923h9.181a1.125 1.125 0 001.125-.923l1.102-4.41" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Productos Destacados ────────────────────────────────────────────────────
function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getAll()
      .then((data) => {
        if (data) setProducts(data.slice(0, 4));
      })
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="productos-destacados" className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header de sección */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Productos Destacados</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Calidad garantizada en cada entrega.</p>
          </div>
          <Link
            to="/productos"
            className="text-sm font-semibold text-[#1a3a6b] hover:underline flex items-center gap-1"
          >
            Ver todos los productos
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                  <div className="h-5 bg-gray-100 rounded w-1/3 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="mx-auto w-10 h-10 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-sm">No hay productos disponibles ahora mismo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Inventario Personal (preview) ──────────────────────────────────────────
function InventoryPreview() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const { items, loading } = useInventory(); // ← mismo hook que usa la página Inventory.jsx

  const allMedicines = items.flatMap((purchase) =>
    purchase.products.map((product) => ({
      ...product,
      name: product.productName,
      purchaseId: purchase.id,
      purchaseDate: purchase.purchaseDate, // ojo: el campo real es purchaseDate, no localDateTime
    }))
  ).slice(0, 3);

  const statusBadge = (date) => {
    if (!date) return { label: "En Stock", color: "bg-emerald-100 text-emerald-700" };
    const days = (Date.now - new Date(date)) / 86400000; // ← corregido: Date.now()
    if (days > 30) return { label: "Agotándose", color: "bg-red-100 text-red-600" };
    return { label: "En Stock", color: "bg-emerald-100 text-emerald-700" };
  };

  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Tu Inventario Personal</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Monitorea el stock de tus medicamentos recurrentes.
              </p>
            </div>
            <button
              onClick={() => navigate(isLoggedIn ? "/inventario" : "/login")}
              className="bg-[#0040A2] hover:bg-[#14305a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Gestionar Inventario
            </button>
          </div>

          {/* Tabla */}
          {!isLoggedIn ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="mx-auto w-8 h-8 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <p className="text-sm mb-3">Inicia sesión para ver tu inventario.</p>
              <button
                onClick={() => navigate("/login")}
                className="text-xs font-semibold text-[#1a3a6b] underline"
              >
                Iniciar sesión
              </button>
            </div>
          ) : loading ? (
            <div className="divide-y divide-gray-100">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/4 ml-auto" />
                  <div className="h-5 bg-gray-100 rounded w-16" />
                  <div className="h-3 bg-gray-100 rounded w-12" />
                </div>
              ))}
            </div>
          ) : allMedicines.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Tu inventario está vacío. Realiza tu primera compra.</p>
            </div>
          ) : (
            <>
              {/* Cabecera tabla */}
              <div className="grid grid-cols-4 px-6 py-3 bg-white border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <span>Medicamento</span>
                <span>Última Compra</span>
                <span>Estado</span>
                <span className="text-right">Acción</span>
              </div>
              <div className="divide-y divide-gray-50">
                {allMedicines.map((item, i) => {
                  const badge = statusBadge(item.purchaseDate);
                  return (
                    <div
                      key={`${item.purchaseId}-${i}`}
                      className="grid grid-cols-4 items-center px-6 py-4 hover:bg-gray-50/80 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800 truncate pr-4">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {item.purchaseDate
                          ? new Date(item.purchaseDate).toLocaleDateString("es-PE", {
                              day: "2-digit", month: "short", year: "numeric",
                            })
                          : "—"}
                      </span>
                      <span>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {badge.label}
                        </span>
                      </span>
                      <div className="flex justify-end">
                        <button
                          onClick={() => navigate("/inventario")}
                          className="text-xs font-semibold text-[#1a3a6b] hover:underline"
                        >
                          Repedir
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Dose Reminder CTA ───────────────────────────────────────────────────────
function DoseCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* CTA Recordatorio */}
          <div className="bg-[#0040A2] rounded-2xl p-8 flex flex-col justify-between min-h-44">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">¿Olvidaste tu dosis hoy?</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Configura alertas inteligentes que se sincronizan con tu dispositivo.
                Gestión de salud sin estrés.
              </p>
            </div>
            <button
              onClick={() => navigate("/recordatorio")}
              className="self-start mt-6 inline-flex items-center gap-2 bg-white text-[#1a3a6b] text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              Crear Recordatorio
            </button>
          </div>

          {/* Panel próxima dosis */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Siguiente Toma
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">20:00</p>
                <p className="text-xs text-gray-400">Vitamina C · 1 cápsula</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#0040A2" strokeWidth="3"
                    strokeDasharray="85 100" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#1a3a6b]">
                  85%
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Progreso Semanal
                </p>
                <p className="text-sm font-semibold text-gray-800">Vas al 85% al día con tus dosis.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── About strip ─────────────────────────────────────────────────────────────
function AboutStrip() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: "Certificación",
      desc: "Todos nuestros productos cumplen con las normativas sanitarias vigentes.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: "Velocidad",
      desc: "Entrega express en menos de 2 horas para medicamentos urgentes.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
      title: "Asesoría",
      desc: "Farmacéuticos colegiados disponibles para tus consultas 24/7.",
    },
  ];

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1a3a6b] uppercase">
            Sobre PharmaCare
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">
            Comprometidos con tu salud integral.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1a3a6b] flex items-center justify-center mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{f.desc}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-gray-400 text-sm italic leading-relaxed">
            "En PharmaCare Systems, creemos que la tecnología debe estar al servicio de la vida.
            Nuestra misión es simplificar la gestión farmacéutica para que tú solo te preocupes
            de sentirte bien."
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1a3a6b] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-lg">PharmaCare</p>
            <p className="text-white/50 text-xs mt-1">
              © 2024 PharmaCare Systems. All rights reserved.
            </p>
            <p className="text-white/40 text-[11px]">Precise medication management.</p>
          </div>

          <nav className="flex flex-wrap gap-6 text-xs text-white/60">
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </nav>

          <div className="flex gap-3">
            {/* Twitter/X */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Página principal ────────────────────────────────────────────────────────
export default function Products() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <HeroSection />
      <FeaturedProducts />
      <InventoryPreview />
      <DoseCTA />
      <AboutStrip />
      <Footer />
    </div>
  );
}
