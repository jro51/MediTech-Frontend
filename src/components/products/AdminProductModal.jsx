import { useState, useEffect } from "react";

export default function AdminProductModal({ isOpen, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_src: ""
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        description: productToEdit.description || "",
        stock: productToEdit.stock || 0,
        image_src: productToEdit.image_src || productToEdit.imageSrc || ""
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_src: ""
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-6">
          {productToEdit ? "Editar Medicamento" : "Nuevo Medicamento"}
        </h2>

        <form onSubmit={(e) => {
          e.preventDefault();
          const dataToSave = {
            ...formData,
            imageSrc: formData.image_src
          };
          onSave(dataToSave);
        }}
          className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre</label>
            <input type="text" required className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Descripción Médica</label>
            <textarea rows="2" required className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none resize-none"
              value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Precio */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Precio ($)</label>
              <input type="number" step="0.01" required className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            {/* Stock */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Stock Inicial</label>
              <input type="number" required className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
                value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            </div>
          </div>

          {/* URL Imagen */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL de la Imagen (image_src)</label>
            <input type="url" required className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
              placeholder="https://link-de-la-imagen.jpg"
              value={formData.image_src} onChange={(e) => setFormData({ ...formData, image_src: e.target.value })} />
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold transition-colors">
              {productToEdit ? "Actualizar" : "Guardar en Inventario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}