import { useState, useEffect, useCallback } from "react";
import { purchasesApi } from "../api";

// ─── Hook: inventario personal del usuario ─────────────────────────────────────
export function useInventory() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const load = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) { setLoading(false); return; }

    setLoading(true);
    setError(null);
    try {
      const data = await purchasesApi.getByUser(userId);
      setItems(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const deleteItem = async (purchaseId) => {
    await purchasesApi.remove(purchaseId);
    setItems((prev) => prev.filter((item) => item.id !== purchaseId));
  };

  return { items, loading, error, deleteItem };
}
