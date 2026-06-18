import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

function Skeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/4" />
          <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full" />
          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
          <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mt-6" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (loading) return <Skeleton />;

  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No se pudo encontrar este medicamento.</p>
        <button onClick={() => navigate("/productos")} className="text-sm font-semibold text-[#1a3a6b] dark:text-blue-400 underline">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    const added = addToCart(product);
    if (added) toast.success("Añadido al carrito", product.name);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Link to="/productos" className="hover:text-[#1a3a6b] dark:hover:text-blue-400 transition-colors">Productos</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-600 dark:text-gray-300 truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src={product.imageSrc || "https://placehold.co/500x500/e8eef5/1a3a6b?text=Med"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/500x500/e8eef5/1a3a6b?text=Med";
              }}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded mb-3">
              {product.stock > 0 ? "Disponible" : "Sin stock"}
            </span>

            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-gray-900 dark:text-white">${product.price}</span>
              {product.stock > 0 ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  En stock ({product.stock} unidades)
                </span>
              ) : (
                <span className="text-xs text-red-500 font-medium">Agotado</span>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="inline-flex items-center gap-2 bg-[#0040A2] hover:bg-[#14305a] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md shadow-[#1a3a6b]/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .953.35 1.059.852l.708 2.835m0 0h14.59c.691 0 1.252.562 1.252 1.252a1.125 1.125 0 01-1.125 1.125H5.064m0 0l1.102 4.41a1.125 1.125 0 001.125.923h9.181a1.125 1.125 0 001.125-.923l1.102-4.41" />
              </svg>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}