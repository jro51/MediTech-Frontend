export default function NotificationDropdown({ isOpen, notifications }) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 mt-2 z-50 w-80 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 p-4 transition-colors">
      <h3 className="text-[#1a3a6b] dark:text-blue-400 font-bold mb-3 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm tracking-wide uppercase">
        Recomendaciones IA
      </h3>
      <div className="max-h-64 overflow-y-auto space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-4">No hay recomendaciones aún.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-[#1a3a6b] dark:border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">"{n.message}"</p>
              <span className="text-[11px] text-gray-400 block mt-2">{new Date(n.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
