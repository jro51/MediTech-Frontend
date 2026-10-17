import { useState } from "react";
import { useAdminPanel } from "../hooks/useAdminPanel";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { ORDER_STATUS, nextAction, canCancel } from "../utils/orderStatus";
import { expirationInfo, formatDate } from "../utils/inventory";
import { notificationStyle, formatNotificationDate } from "../utils/notifications";

const TONE = {
  expired: "text-red-600 dark:text-red-400",
  soon: "text-amber-600 dark:text-amber-400",
  none: "text-gray-400",
};

function Card({ title, count, children }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h2>
        {count != null && (
          <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">{count}</span>
        )}
      </div>
      {children}
    </section>
  );
}

function EmptyRow({ children }) {
  return <p className="px-5 py-6 text-sm text-gray-400 text-center">{children}</p>;
}

function AlertsTab({ alerts, inbox, days }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Stock bajo" count={alerts.lowStock.length}>
          {alerts.lowStock.length === 0 ? (
            <EmptyRow>Ningún producto está por debajo de su stock mínimo.</EmptyRow>
          ) : (
            <ul className="divide-y divide-gray-50 dark:divide-gray-800">
              {alerts.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{p.name}</span>
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {p.stock} {p.stock === 1 ? "unidad" : "unidades"} (mín. {p.minStock})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={`Vencidos o por vencer (${days} días)`} count={alerts.expiringSoon.length}>
          {alerts.expiringSoon.length === 0 ? (
            <EmptyRow>No hay productos vencidos ni por vencer.</EmptyRow>
          ) : (
            <ul className="divide-y divide-gray-50 dark:divide-gray-800">
              {alerts.expiringSoon.map((p) => {
                const info = expirationInfo(p.expirationDate);
                return (
                  <li key={p.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{p.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(p.expirationDate + "T00:00:00")}</p>
                    </div>
                    <span className={`text-xs font-semibold ${TONE[info.tone]}`}>{info.text}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <Card title="Actividad reciente" count={inbox.length}>
        {inbox.length === 0 ? (
          <EmptyRow>Todavía no hay actividad.</EmptyRow>
        ) : (
          <ul className="p-4 space-y-2 max-h-80 overflow-y-auto">
            {inbox.slice(0, 15).map((n) => (
              <li key={n.id} className={`p-3 rounded-lg border-l-4 ${notificationStyle(n.type)}`}>
                <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                <span className="text-[11px] text-gray-400">{formatNotificationDate(n.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function OrdersTab({ orders, busyId, onChangeStatus, statusFilter, onFilterChange }) {
  return (
    <Card title="Pedidos" count={orders.length}>
      <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <label className="text-xs text-gray-400 mr-2" htmlFor="status-filter">Estado</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-200"
        >
          <option value="">Todos</option>
          {Object.entries(ORDER_STATUS).map(([value, info]) => (
            <option key={value} value={value}>{info.label}</option>
          ))}
        </select>
      </div>

      {orders.length === 0 ? (
        <EmptyRow>No hay pedidos con este filtro.</EmptyRow>
      ) : (
        <ul className="divide-y divide-gray-50 dark:divide-gray-800">
          {orders.map((order) => {
            const next = nextAction(order.status);
            const busy = busyId === order.id;
            return (
              <li key={order.id} className="px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Pedido #{order.id} <span className="font-normal text-gray-400">· cliente {order.userId}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {order.products.map((p) => p.productName).join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(order.purchaseDate)} · ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <OrderStatusBadge status={order.status} />
                  {next && (
                    <button
                      disabled={busy}
                      onClick={() => onChangeStatus(order.id, next.to)}
                      className="text-xs font-semibold bg-[#0040A2] hover:bg-[#14305a] disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {next.label}
                    </button>
                  )}
                  {canCancel(order.status) && (
                    <button
                      disabled={busy}
                      onClick={() => onChangeStatus(order.id, "CANCELLED")}
                      className="text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function AdminDashboard() {
  const [tab, setTab] = useState("alerts");
  const [days, setDays] = useState(30);
  const [statusFilter, setStatusFilter] = useState("");
  const { alerts, orders, inbox, loading, error, busyId, changeStatus } =
    useAdminPanel({ days, statusFilter });

  const tabClass = (name) =>
    `px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
      tab === name
        ? "bg-[#0040A2] text-white"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold tracking-widest text-[#0040A2] dark:text-blue-400 uppercase mb-1">Botica</p>
          <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Panel de la botica</h1>
          <p className="text-gray-400 text-sm mt-1">Alertas de inventario y gestión de pedidos reservados.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button className={tabClass("alerts")} onClick={() => setTab("alerts")}>Alertas de inventario</button>
            <button className={tabClass("orders")} onClick={() => setTab("orders")}>Pedidos</button>
          </div>
          {tab === "alerts" && (
            <div>
              <label className="text-xs text-gray-400 mr-2" htmlFor="days">Por vencer en</label>
              <select
                id="days"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-200"
              >
                {[15, 30, 60, 90].map((d) => <option key={d} value={d}>{d} días</option>)}
              </select>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3">
            No se pudo cargar el panel: {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Cargando…</p>
        ) : tab === "alerts" ? (
          <AlertsTab alerts={alerts} inbox={inbox} days={days} />
        ) : (
          <OrdersTab
            orders={orders}
            busyId={busyId}
            onChangeStatus={changeStatus}
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        )}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const isAdmin = localStorage.getItem("userRole") === "ADMIN";

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Esta sección es solo para el personal de la botica. Inicia sesión con una cuenta de administrador.
        </p>
      </div>
    );
  }
  return <AdminDashboard />;
}
