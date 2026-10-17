import { useState, useEffect, useCallback } from "react";
import { purchasesApi } from "../api";

// ─── Hook: pedidos del usuario ─────────────────────────────────────────────────
export function useOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) { setLoading(false); return; }

    setLoading(true);
    setError(null);
    try {
      const data = await purchasesApi.getByUser(userId);
      setOrders(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { orders, loading, error, reload: load };
}
