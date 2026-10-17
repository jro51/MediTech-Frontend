import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { getStatusInfo } from "../utils/orderStatus";
import { formatDate } from "../utils/inventory";

function EmptyState({ navigate }) {
  return (
    <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
      <h3 className="text-gray-800 dark:text-white font-semibold text-base mb-1">Aún no tienes pedidos</h3>
      <p className="text-gray-400 text-sm mb-6">Reserva tus medicamentos desde el catálogo y recógelos en la botica.</p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 bg-[#0040A2] hover:bg-[#14305a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Ir al catálogo
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 animate-pulse space-y-3">
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
    </div>
  );
}

function StatCard({ label, value, dot }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
      <p className="flex items-center gap-2 text-xs text-gray-400 font-medium">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        {label}
      </p>
      <p className="text-3xl font-black text-gray-900 dark:text-white leading-none mt-2">{value}</p>
    </div>
  );
}

export default function Orders() {
  const { orders, loading, error } = useOrders();
  const navigate = useNavigate();

  const count = (status) => orders.filter((o) => o.status === status).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold tracking-widest text-[#0040A2] dark:text-blue-400 uppercase mb-1">
            Reserva y recojo
          </p>
          <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Mis pedidos</h1>
          <p className="text-gray-400 text-sm mt-1">
            Sigue el estado de tus reservas y pasa a recogerlas cuando estén listas.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Reservados" value={count("RESERVED")} dot={getStatusInfo("RESERVED").dot} />
          <StatCard label="Listos para recoger" value={count("READY")} dot={getStatusInfo("READY").dot} />
          <StatCard label="Recogidos" value={count("PICKED_UP")} dot={getStatusInfo("PICKED_UP").dot} />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3">
            No se pudieron cargar tus pedidos: {error}
          </p>
        )}

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : orders.length === 0 ? (
          <EmptyState navigate={navigate} />
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Pedido #{order.id}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(order.purchaseDate, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  {order.products.map((p) => p.productName).join(", ")}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-gray-400">{getStatusInfo(order.status).hint}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Total: ${order.total.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
