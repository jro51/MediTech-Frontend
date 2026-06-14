import { useCart } from "../../CartContext";

export default function ProductCard({ product, isAdmin, onEdit, onRefresh }) {
    const { addToCart } = useCart();

    const handleDelete = async (e) => {
        e.stopPropagation();

        if (!window.confirm(`¿Estás seguro de eliminar "${product.name}"?`)) return;

        try {
            const response = await fetch(`http://3.215.115.127:8081/v1/product/${product.id}`, {
                method: "DELETE",
                headers: { "User-Role": "ADMIN" }
            });
            if (response.ok) {
                onRefresh();
            } else {
                alert("No se pudo eliminar el producto.");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (!product) return null;

    return (
        <div className="group relative flex flex-col bg-gray-900/60 p-4 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl">
            {/* Contenedor de imagen */}
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-800 relative">
                <img
                    src={product.imageSrc || "https://via.placeholder.com/300?text=Sin+Imagen"}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                />

                {/* Botones de Administración (Flotantes sobre la imagen) */}
                {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            className="p-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-500 backdrop-blur-md shadow-lg"
                            title="Editar"
                        >
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 bg-red-600/90 text-white rounded-lg hover:bg-red-500 backdrop-blur-md shadow-lg"
                            title="Eliminar"
                        >
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Información del Producto */}
            <div className="mt-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-sm text-white font-semibold truncate pr-2">{product.name}</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                        Stock: {product.stock}
                    </span>
                </div>
                <p className="mt-1 text-xs text-gray-400 line-clamp-2 h-8">{product.description}</p>
                <p className="mt-2 text-xl font-black text-indigo-400">${product.price}</p>

                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
}