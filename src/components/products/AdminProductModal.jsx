import { useState } from "react";

// ─── AdminProductModal ─────────────────────────────────────────────────────────
// Modal de creación/edición de producto. Solo UI + estado local del formulario.
export default function AdminProductModal({ isOpen, onClose, onSave, productToEdit }) {
  const [formData, setFormData] = useState(() => {
    if (productToEdit) {
      return {
        name:        productToEdit.name        || "",
        description: productToEdit.description || "",
        price:       productToEdit.price       || "",
        stock:       productToEdit.stock       || 0,
        image_src:   productToEdit.image_src   || productToEdit.imageSrc || "",
      };
    }
    return { name: "", description: "", price: "", stock: "", image_src: "" };
  });

  if (!isOpen) return null;

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData({ ...formData, [key]: e.target.value }),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-6">
          {productToEdit ? "Editar Medicamento" : "Nuevo Medicamento"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...formData, imageSrc: formData.image_src });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre</label>
            <input type="text" required {...field("name")}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Descripción Médica</label>
            <textarea rows="2" required {...field("description")}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Precio ($)</label>
              <input type="number" step="0.01" required {...field("price")}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Stock Inicial</label>
              <input type="number" required {...field("stock")}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">URL de Imagen</label>
            <input type="url" required {...field("image_src")}
              placeholder="https://link-de-la-imagen.jpg"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none" />
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold transition-colors">
              {productToEdit ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
