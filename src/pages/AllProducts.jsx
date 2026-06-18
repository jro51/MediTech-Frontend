import { useNavigate } from "react-router-dom";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";

function PageButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`min-w-9 h-9 px-2 rounded-lg text-sm font-semibold transition-colors
        ${active
          ? "bg-[#0040A2] text-white"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
    >
      {children}
    </button>
  );
}

function buildPageList(current, total) {
  // Muestra hasta 5 botones numéricos con elipsis si hace falta
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function AllProducts() {
  const navigate = useNavigate();
  const { products, loading, error, page, totalPages, totalCount, goToPage } = usePaginatedProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold tracking-widest text-[#0040A2] dark:text-blue-400 uppercase mb-1">Catálogo completo</p>
          <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Todos los Medicamentos</h1>
          <p className="text-gray-400 text-sm mt-1">{totalCount} productos disponibles</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 h-64 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-gray-400 py-16">No se pudieron cargar los productos.</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No hay productos disponibles.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigate(`/productos/${product.id}`)}
                  className="text-left bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-[#1a3a6b]/20 transition-all"
                >
                  <div className="aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={product.imageSrc || "https://placehold.co/300x300/e8eef5/1a3a6b?text=Med"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x300/e8eef5/1a3a6b?text=Med";
                      }}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{product.name}</p>
                    <p className="text-base font-black text-gray-900 dark:text-white mt-1">${product.price}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                <PageButton onClick={() => goToPage(page - 1)} disabled={page === 1}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </PageButton>

                {buildPageList(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-2 text-gray-300 text-sm">…</span>
                  ) : (
                    <PageButton key={p} active={p === page} onClick={() => goToPage(p)}>
                      {p}
                    </PageButton>
                  )
                )}

                <PageButton onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </PageButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}