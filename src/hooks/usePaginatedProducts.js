import { useState, useEffect, useMemo } from "react";
import { productsApi } from "../api";

const PAGE_SIZE = 10;

export function usePaginatedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    productsApi.getAll()
      .then((data) => setAllProducts(data ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allProducts.slice(start, start + PAGE_SIZE);
  }, [allProducts, page]);

  const goToPage = (n) => {
    const clamped = Math.min(Math.max(1, n), totalPages);
    setPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    products: pageItems,
    loading,
    error,
    page,
    totalPages,
    totalCount: allProducts.length,
    goToPage,
  };
}