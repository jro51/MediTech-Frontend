import { useState, useEffect, useCallback } from "react";
import { productsApi, purchasesApi, notificationsApi } from "../api";
import { useToast } from "../contexts/ToastContext";
import { getStatusInfo } from "../utils/orderStatus";

// ─── Hook: panel de la botica (alertas, pedidos y actividad) ───────────────────
export function useAdminPanel({ days, statusFilter }) {
  const { toast } = useToast();
  const [alerts, setAlerts]   = useState({ lowStock: [], expiringSoon: [] });
  const [orders, setOrders]   = useState([]);
  const [inbox, setInbox]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [busyId, setBusyId]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [alertsData, ordersData, inboxData] = await Promise.all([
        productsApi.getAlerts(days),
        purchasesApi.getAll(statusFilter),
        notificationsApi.getAdminInbox(),
      ]);
      setAlerts({
        lowStock: alertsData?.lowStock ?? [],
        expiringSoon: alertsData?.expiringSoon ?? [],
      });
      setOrders(ordersData ?? []);
      setInbox(inboxData ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [days, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (orderId, nextStatus) => {
    setBusyId(orderId);
    try {
      await purchasesApi.updateStatus(orderId, nextStatus);
      toast.success("Pedido actualizado", `Pedido #${orderId}: ${getStatusInfo(nextStatus).label}`);
      await load();
    } catch (err) {
      toast.error("No se pudo actualizar el pedido", err.message);
    } finally {
      setBusyId(null);
    }
  };

  return { alerts, orders, inbox, loading, error, busyId, reload: load, changeStatus };
}
