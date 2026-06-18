import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App               from "./App.jsx";
import { CartProvider }  from "./contexts/CartContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider> {/* ← nuevo, envuelve todo igual que los demás contexts */}
        <CartProvider>
          <App />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
