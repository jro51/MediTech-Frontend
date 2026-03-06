import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../services/productService";
import AdminProductModal from "./AdminProductModal";

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Para obtener el rol
    const userRole = localStorage.getItem("userRole");
    const isAdmin = userRole === "ADMIN";

    const loadProducts = () => {
        getAllProducts()
            .then(data => { if (data) setProducts(data); })
            .catch(err => console.error("Error de conexión:", err));
    };

    useEffect(() => { loadProducts(); }, []);

    const handleSave = async (formData) => {
        const method = formData.id ? "PUT" : "POST";
        const url = formData.id
            ? `http://localhost:8081/v1/product/${formData.id}`
            : "http://localhost:8081/v1/product";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "user-role": "ADMIN"
                },
                body: JSON.stringify({
                    id: formData.id,
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    imageSrc: formData.imageSrc || formData.image_src
                })
            });

            if (response.ok) {
                setIsModalOpen(false);
                loadProducts();
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleEdit = (product) => {
        // Para que el modal reciba los nombres de campo correctos
        setSelectedProduct({
            ...product,
            image_src: product.imageSrc
        });
        setIsModalOpen(true);
    };

    return (
        <main className="relative min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-gray-800/40 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-700">
                    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold text-white mb-8">Catálogo de Medicamentos</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isAdmin={isAdmin}
                                    onEdit={() => handleEdit(product)}
                                    onRefresh={loadProducts}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón flotante para crear (Solo visible para ADMIN) */}
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
            />
        </main>
    );
}