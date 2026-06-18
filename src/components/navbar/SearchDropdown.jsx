function highlightMatch(name, query) {
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return name;
  return (
    <>
      {name.slice(0, idx)}
      <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
        {name.slice(idx, idx + query.length)}
      </span>
      {name.slice(idx + query.length)}
    </>
  );
}

export default function SearchDropdown({ query, results, onSelect, onViewAll }) {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg p-4 text-center">
        <p className="text-xs text-gray-400">No se encontraron medicamentos para "{query}"</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden">
      {results.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelect(product)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border-b border-gray-50 dark:border-gray-800 last:border-b-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 overflow-hidden">
            {product.imageSrc ? (
              <img
                src={product.imageSrc}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <svg className="w-4 h-4 text-[#1a3a6b] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
              {highlightMatch(product.name, query)}
            </p>
            <p className="text-xs text-gray-400 truncate">{product.description}</p>
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 shrink-0">
            ${product.price}
          </span>
        </button>
      ))}

      <button
        onClick={onViewAll}
        className="w-full text-center text-xs font-semibold text-[#1a3a6b] dark:text-blue-400 py-2.5 border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Ver todos los resultados
      </button>
    </div>
  );
}