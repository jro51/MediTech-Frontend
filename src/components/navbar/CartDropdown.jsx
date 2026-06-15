import { useCart } from "../../contexts/CartContext";

export default function CartDropdown({ isOpen, onPurchase, isLoggedIn, navigate }) {
  const { cart, cartCount, removeFromCart } = useCart();
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 z-50 w-72 origin-top-right rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 p-4 transition-colors">
      <h2 className="text-[#1a3a6b] dark:text-blue-400 font-bold mb-3 border-b border-gray-100 dark:border-gray-800 pb-2 text-sm">
        Tu Carrito ({cartCount})
      </h2>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-xs py-4 text-center">El carrito está vacío</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-xs py-2 border-b border-gray-50 dark:border-gray-800 group">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</span>
                <span className="text-[#1a3a6b] dark:text-blue-400 font-medium">${item.price}</span>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1.5 rounded-md text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      {isLoggedIn ? (
        <button onClick={onPurchase} disabled={cart.length === 0}
          className="mt-4 w-full bg-[#1a3a6b] hover:bg-[#14305a] disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 text-white font-bold py-2 rounded-lg text-sm transition-colors">
          Finalizar Compra
        </button>
      ) : (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-center">
          <p className="text-amber-700 dark:text-amber-400 text-[11px] mb-2">Inicia sesión para finalizar tu compra</p>
          <button onClick={() => navigate("/login")} className="text-[#1a3a6b] dark:text-blue-400 text-xs font-bold underline">
            Ir al Login
          </button>
        </div>
      )}
    </div>
  );
}
