import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Login from './pages/Login';
import AuthLayout from './AuthLayout';
import AppLayout from './AppLayout';
import Register from './pages/Register';
import Inventory from './pages/Inventory';
import Reminder from './pages/Reminder';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-full">

          <Routes>
            {/* Sin navbar */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            {/* Con navbar */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Products />} />
              <Route path="/inventario" element={<Inventory />} />
              <Route path="/recordatorio" element={<Reminder />} />
              <Route path="/nosotros" element={<About />} />
            </Route>
          </Routes>

        </div>
      </BrowserRouter>

    </>
  );
}


export default App
