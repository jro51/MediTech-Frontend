import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout  from "./layouts/AuthLayout";
import AppLayout   from "./layouts/AppLayout";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import Products    from "./pages/Products";
import Inventory   from "./pages/Inventory";
import Reminder    from "./pages/Reminder";
import About       from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full">
        <Routes>
          {/* Sin navbar */}
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Con navbar */}
          <Route element={<AppLayout />}>
            <Route path="/"             element={<Products />} />
            <Route path="/inventario"   element={<Inventory />} />
            <Route path="/recordatorio" element={<Reminder />} />
            <Route path="/nosotros"     element={<About />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
