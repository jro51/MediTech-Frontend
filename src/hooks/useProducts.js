import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../api";

// ─── Hook: gestión de productos ────────────────────────────────────────────────
// Encapsula fetch, loading y las operaciones CRUD de productos.
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.getAll();
      setProducts(data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveProduct = async (formData) => {
    const payload = {
      ...(formData.id ? { id: formData.id } : {}),
      name:        formData.name,
      description: formData.description,
      price:       parseFloat(formData.price),
      stock:       parseInt(formData.stock),
      imageSrc:    formData.imageSrc || formData.image_src,
    };

    if (formData.id) {
      await productsApi.update(formData.id, payload);
    } else {
      await productsApi.create(payload);
    }
    await load();
  };

  const deleteProduct = async (id) => {
    await productsApi.remove(id);
    await load();
  };

  return { products, loading, error, reload: load, saveProduct, deleteProduct };
}
