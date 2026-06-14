import { useInventory } from "../hooks/useInventory";
import { useNavigate } from "react-router-dom";

function statusBadge(date) {
  if (!date) return { label: "En Stock", dot: "bg-emerald-500", chip: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" };
  const days = (Date.now() - new Date(date)) / 86_400_000;
  if (days > 30) return { label: "Agotándose", dot: "bg-red-500", chip: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" };
  return { label: "En Stock", dot: "bg-emerald-500", chip: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" };
}

function fmt(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

function EmptyState({ navigate }) {
  return (
    <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-[#1a3a6b] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-gray-800 dark:text-white font-semibold text-base mb-1">Tu inventario está vacío</h3>
      <p className="text-gray-400 text-sm mb-6">Realiza tu primera compra para verla aquí.</p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 bg-[#0040A2] hover:bg-[#14305a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Ir al catálogo
      </button>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 gap-4 animate-pulse">
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
      <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-12" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-10 ml-auto" />
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function Inventory() {
  const { items, loading, deleteItem } = useInventory();
  const navigate = useNavigate();

  const allMedicines = items.flatMap((purchase) =>
    purchase.products.map((product) => ({
      ...product,
      purchaseId: purchase.id,
      purchaseDate: purchase.localDateTime,
    }))
  );

  const inStock = allMedicines.filter(
    (m) => statusBadge(m.purchaseDate).label === "En Stock"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#0040A2] dark:text-blue-400 uppercase mb-1">
                Panel Personal
              </p>
              <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Mi Inventario</h1>
              <p className="text-gray-400 text-sm mt-1">Monitorea el stock de tus medicamentos recurrentes.</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-[#0040A2] hover:bg-[#14305a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-[#1a3a6b]/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar medicamento
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total medicamentos" value={allMedicines.length}
            color="bg-blue-50 dark:bg-blue-900/20"
            icon={<svg className="w-6 h-6 text-[#1a3a6b] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <StatCard
            label="Compras realizadas" value={items.length}
            color="bg-emerald-50 dark:bg-emerald-900/20"
            icon={<svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
          <StatCard
            label="En stock" value={inStock}
            color="bg-amber-50 dark:bg-amber-900/20"
            icon={<svg className="w-6 h-6 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75"><path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" /></svg>}
          />
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Historial de medicamentos</h2>
            <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
              {allMedicines.length} {allMedicines.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          {loading ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : allMedicines.length === 0 ? (
            <div className="p-6"><EmptyState navigate={navigate} /></div>
          ) : (
            <>
              <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <span>Medicamento</span>
                <span>Última Compra</span>
                <span>Estado</span>
                <span>Precio</span>
                <span className="text-right">Acción</span>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {allMedicines.map((med, i) => {
                  const badge = statusBadge(med.purchaseDate);
                  return (
                    <div key={`${med.purchaseId}-${med.id}-${i}`}
                      className="grid grid-cols-5 items-center px-6 py-4 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group">
                      <div className="flex items-center gap-3 pr-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#1a3a6b] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{med.name}</p>
                          <p className="text-xs text-gray-400 truncate">{med.description || `Compra #${med.purchaseId}`}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{fmt(med.purchaseDate)}</span>
                      <span>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.chip}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">${med.price}</span>
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => navigate("/")} className="text-xs font-semibold text-[#1a3a6b] dark:text-blue-400 hover:underline">
                          Repedir
                        </button>
                        <button
                          onClick={() => deleteItem(med.purchaseId)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
    </div>
  );
}
