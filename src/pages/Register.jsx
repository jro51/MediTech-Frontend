import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
                navigate("/login"); // Redirigimos al Login
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.message || "No se pudo crear la cuenta"));
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-25 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Registrarse en MediTec</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label for="name" className="block text-sm/6 font-medium text-gray-100">Nombre*</label>
                        <div className="mt-2">
                            <input 
                                value={formData.name}
                                onChange={handleChange}
                                id="name" 
                                type="text" 
                                name="name" 
                                required autocomplete="name" 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="phone" className="block text-sm/6 font-medium text-gray-100">Celular (Opcional)</label>
                        <div className="mt-2">
                            <input 
                                value={formData.phone}
                                onChange={handleChange}
                                id="phone" 
                                type="number" 
                                name="phone" 
                                required autocomplete="phone" 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="email" className="block text-sm/6 font-medium text-gray-100">Correo Electrónico*</label>
                        <div className="mt-2">
                            <input 
                                value={formData.email}
                                onChange={handleChange}
                                id="email" 
                                type="email" 
                                name="email" 
                                required autocomplete="email" 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm/6 font-medium text-gray-100">Contraseña*</label>
                            <div className="text-sm">
                                {/* <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">¿Olvidaste tu contraseña?</a> */}
                            </div>
                        </div>
                        <div className="mt-2">
                            <input 
                                value={formData.password}
                                onChange={handleChange}
                                id="password" 
                                type="password" 
                                name="password" 
                                required autocomplete="current-password" 
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Crear Cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    );
}