import { useCart } from "../../CartContext";

export default function CartDropdown({ isOpen, onPurchase, isLoggedIn, navigate }) {
  const { cart, cartCount, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 z-50 w-72 origin-top-right rounded-lg bg-gray-800 p-4 shadow-2xl ring-1 ring-white/10">
      <h2 className="text-white font-bold mb-3 border-b border-gray-700 pb-2 text-sm">
        Tu Carrito ({cartCount})
      </h2>

      <div className="max-h-48 overflow-y-auto space-y-2">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-xs py-4 text-center">El carrito está vacío</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-gray-300 text-xs py-2 border-b border-gray-700/50 group">
              <div className="flex flex-col">
                <span className="font-medium text-gray-100">{item.name}</span>
                <span className="text-indigo-400">${item.price}</span>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1.5 rounded-md text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {isLoggedIn ? (
        <button
          onClick={onPurchase}
          disabled={cart.length === 0}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-bold py-2 rounded-md text-sm transition-colors"
        >
          Finalizar Compra
        </button>
      ) : (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-md text-center">
          <p className="text-red-400 text-[10px] mb-2">Inicia sesión para finalizar</p>
          <button
            onClick={() => navigate("/login")}
            className="text-white text-xs font-bold underline hover:text-indigo-300"
          >
            Ir al Login
          </button>
        </div>
      )}
    </div>
  );
}