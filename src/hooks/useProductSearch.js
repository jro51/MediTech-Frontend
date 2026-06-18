import { useState, useMemo, useRef } from "react";
import { productsApi } from "../api";

// ─── Hook: búsqueda de productos con sugerencias en tiempo real ──────────────
export function useProductSearch() {
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const loadedRef = useRef(false);

  // Carga el catálogo una sola vez (lazy: solo cuando el usuario interactúa)
  const ensureLoaded = async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const data = await productsApi.getAll();
      setAllProducts(data ?? []);
    } catch {
      loadedRef.current = false; // permite reintentar si falló
    }
  };

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length === 0) return [];
    return allProducts
      .filter((p) => p.name?.toLowerCase().includes(trimmed))
      .slice(0, 5); // tope de sugerencias visibles
  }, [query, allProducts]);

  const handleChange = (value) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
    if (value.trim().length > 0) ensureLoaded();
  };

  const handleFocus = () => {
    if (query.trim().length > 0) setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const clear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return { query, results, isOpen, handleChange, handleFocus, close, clear };
}