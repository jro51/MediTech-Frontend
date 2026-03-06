import Header from "../components/Header";
import { useInventory } from "../hooks/useInventory";
export default function Inventory() {
    const { items, loading, deleteItem } = useInventory();

    const allMedicines = items.flatMap((purchase) =>
        purchase.products.map((product) => ({
            ...product,
            purchaseId: purchase.id, 
            purchaseDate: purchase.localDateTime, 
        }))
    );

    return (
        <>  
            <Header name={"Mi Inventario"} />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Estadísticas rápidas */}
                <div className="mb-8 flex gap-4">
                    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex-1">
                        <p className="text-gray-400 text-sm">Total Medicamentos</p>
                        <p className="text-3xl font-bold text-indigo-500">{allMedicines.length}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex-1">
                        <p className="text-gray-400 text-sm">Compras Realizadas</p>
                        <p className="text-3xl font-bold text-emerald-500">{items.length}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
                    </div>
                ) : allMedicines.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800">
                        <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="mt-4 text-gray-400 text-lg">Tu inventario está vacío.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {allMedicines.map((medicine, index) => (
                            <div
                                key={`${medicine.purchaseId}-${medicine.id}-${index}`}
                                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>

                                    <button
                                        onClick={() => deleteItem(medicine.purchaseId)}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                                        title="Eliminar del inventario"
                                    >
                                        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                                        {medicine.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-800 text-gray-400 rounded uppercase tracking-wider">
                                            Compra #{medicine.purchaseId}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-400 gap-2">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {medicine.purchaseDate ? new Date(medicine.purchaseDate).toLocaleDateString() : "Fecha desconocida"}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-400 gap-2">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {medicine.description || "Sin descripción adicional"}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-800">
                                    <span className="text-lg font-bold text-white">
                                        ${medicine.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}