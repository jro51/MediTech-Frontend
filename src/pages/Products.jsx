import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { productsApi } from "../api/productsApi";
import { useOrders } from "../hooks/useOrders";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { isOutOfStock, formatDate } from "../utils/inventory";

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs font-bold tracking-widest text-[#0040A2] uppercase mb-4">
              MediTech · Reservas para boticas
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0040A2] leading-tight mb-6">
              Reserva tus medicamentos y{" "}
              <span className="relative">
                recógelos sin hacer filas
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#0040A2]/20 rounded-full" />
              </span>
              .
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              Elige tus medicamentos en el catálogo, resérvalos en línea y pasa a
              recogerlos a la botica cuando estén listos. Te avisamos cuando tu
              pedido esté preparado.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/pedidos"
                className="inline-flex items-center gap-2 bg-[#0040A2] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#14305a] transition-colors shadow-md shadow-[#1a3a6b]/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Mis pedidos
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
                    <p className="text-white text-2xl font-black">Reserva</p>
                    <p className="text-white/70 text-xs">y recojo en tienda</p>
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
                  <p className="text-xs font-bold text-gray-800">Aviso cuando esté listo</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Te notificamos cuando tu<br />pedido esté listo para recoger.</p>
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
        <RecetaBadge needsReceta={product.requiresPrescription} />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-black text-gray-900 dark:text-white">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock(product)}
            className="disabled:opacity-40 disabled:cursor-not-allowed w-9 h-9 flex items-center justify-center rounded-lg bg-[#1a3a6b] hover:bg-[#14305a] text-white transition-colors shadow-md shadow-[#1a3a6b]/20 active:scale-95"
            title={isOutOfStock(product) ? "Sin stock" : "Añadir al carrito"}
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

// ─── Pedidos recientes (preview) ─────────────────────────────────────────────
function OrdersPreview() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const { orders, loading } = useOrders();
  const recent = orders.slice(0, 3);

  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Tus pedidos recientes</h2>
              <p className="text-xs text-gray-400 mt-0.5">Sigue el estado de tus reservas.</p>
            </div>
            <button
              onClick={() => navigate(isLoggedIn ? "/pedidos" : "/login")}
              className="bg-[#0040A2] hover:bg-[#14305a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Ver todos
            </button>
          </div>

          {!isLoggedIn ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm mb-3">Inicia sesión para ver tus pedidos.</p>
              <button onClick={() => navigate("/login")} className="text-xs font-semibold text-[#1a3a6b] dark:text-blue-400 underline">
                Iniciar sesión
              </button>
            </div>
          ) : loading ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                  <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-20 ml-auto" />
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Todavía no tienes pedidos. Reserva tu primer medicamento del catálogo.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {recent.map((order) => (
                <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      Pedido #{order.id} · {order.products.map((p) => p.productName).join(", ")}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(order.purchaseDate)}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Cómo funciona ───────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "1", title: "Reserva", desc: "Elige tus medicamentos en el catálogo y resérvalos: el stock se descuenta al instante." },
    { n: "2", title: "La botica lo prepara", desc: "El personal prepara tu pedido y te avisamos en cuanto esté listo para recoger." },
    { n: "3", title: "Recoge en tienda", desc: "Pasa por la botica a recogerlo. Si cancelas, los productos vuelven al inventario." },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Cómo funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.n} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <span className="w-8 h-8 rounded-full bg-[#0040A2] text-white text-sm font-bold flex items-center justify-center mb-4">
                {step.n}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About strip ─────────────────────────────────────────────────────────────
function AboutStrip() {
  const features = [
    { title: "Reserva y recojo", desc: "Reservas en línea y recojo en la botica, sin envíos ni costos de delivery." },
    { title: "Control de inventario", desc: "La botica recibe alertas de stock bajo y de productos vencidos o por vencer." },
    { title: "Medicamentos con receta", desc: "Cada producto indica si requiere receta médica." },
  ];

  return (
    <section className="bg-white dark:bg-gray-950 py-20 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1a3a6b] dark:text-blue-400 uppercase">Sobre MediTech</span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white">Pensado para boticas pequeñas.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <h3 className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{f.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 max-w-2xl mx-auto text-center text-gray-400 text-sm italic leading-relaxed">
          Proyecto de portafolio: está pensado a partir de un problema real, pero todavía no se ha
          validado con una botica real.
        </p>
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
            <p className="font-bold text-lg">MediTech</p>
            <p className="text-white/50 text-xs mt-1">
              Proyecto de portafolio · Reservas e inventario para boticas
            </p>
                      </div>

          <nav className="flex flex-wrap gap-6 text-xs text-white/60">
            <a href="https://github.com/jro51/MediTech-backend" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Backend en GitHub</a>
            <a href="https://github.com/jro51/MediTech-Frontend" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Frontend en GitHub</a>
          </nav>

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
      <OrdersPreview />
      <HowItWorks />
      <AboutStrip />
      <Footer />
    </div>
  );
}
