import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../api";

export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const data = await productsApi.getById(id);
      if (signal.aborted) return;
      setProduct(data);
    } catch (err) {
      if (signal.aborted) return;
      setError(err.message);
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);
    return () => controller.abort();
  }, [fetchProduct]);

  return { product, loading, error };
}