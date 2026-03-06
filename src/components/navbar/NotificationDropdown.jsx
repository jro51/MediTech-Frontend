export default function NotificationDropdown({ isOpen, notifications }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 z-50 w-80 origin-top-right rounded-lg bg-gray-800 p-4 shadow-2xl ring-1 ring-white/10">
      <h3 className="text-white font-bold mb-3 border-b border-gray-700 pb-2 text-sm">
        RECOMENDACIONES DE LA IA
      </h3>
      <div className="max-h-64 overflow-y-auto space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-xs text-center py-4">No hay horarios generados aún.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="bg-gray-700/30 p-3 rounded-md border-l-4 border-indigo-500">
              <p className="text-gray-200 text-sm leading-relaxed">"{n.message}"</p>
              <span className="text-[11px] text-gray-500 block mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}