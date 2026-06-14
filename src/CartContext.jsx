import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return false;
        }

        setCart((prev) => [...prev, product]);
        return true;
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);
    const cartCount = cart.length;

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);