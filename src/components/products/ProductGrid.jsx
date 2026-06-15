import { useState } from "react";
import { useProducts }      from "../../hooks/useProducts";
import ProductCard          from "./ProductCard";
import AdminProductModal    from "./AdminProductModal";

// ─── ProductGrid ───────────────────────────────────────────────────────────────
// Orquesta el grid: obtiene datos del hook, delega UI a ProductCard y modal.
export default function ProductGrid() {
  const { products, loading, saveProduct, deleteProduct } = useProducts();
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isAdmin = localStorage.getItem("userRole") === "ADMIN";

  const handleSave = async (formData) => {
    await saveProduct(formData);
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct({ ...product, image_src: product.imageSrc });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este medicamento?")) return;
    await deleteProduct(id);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-900/60 rounded-2xl border border-gray-800 h-72 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-800/40 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-700">
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Catálogo de Medicamentos</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onEdit={() => handleEdit(product)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB solo para admin */}
      {isAdmin && (
        <button
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="fixed bottom-10 right-10 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-500 hover:scale-110 transition-all flex items-center gap-2 z-50"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-bold pr-2">Nuevo Producto</span>
        </button>
      )}

      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        productToEdit={selectedProduct}
        key={selectedProduct?.id ?? "new-product"}
      />
    </main>
  );
}
