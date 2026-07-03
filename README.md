![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13-CA4245?logo=reactrouter&logoColor=white)

# MediTech — Frontend

> Interfaz web de **MediTech**, una plataforma de e-commerce de medicamentos. Consume la API expuesta por el [API Gateway](https://github.com/jro51/MediTech-pry) del backend de microservicios, e incluye catálogo de productos, autenticación JWT, carrito de compras, panel de inventario, recordatorios de dosis y recomendaciones médicas generadas por IA.

---

## Descripción

Este repositorio contiene el cliente **React + Vite** de MediTech. Se comunica con el backend (Spring Cloud + FastAPI) exclusivamente a través del **API Gateway** en `http://localhost:8080`, por lo que no conoce ni depende de los microservicios individuales.

> Este proyecto es el frontend de MediTech. El backend (microservicios Java + servicio de IA en Python) vive en un repositorio separado: **[MediTech-pry](https://github.com/jro51/MediTech-pry)**. Ambos deben ejecutarse en conjunto para que la aplicación funcione por completo.

---

## Funcionalidades

- **Autenticación** — login y registro contra `auth-service` (JWT persistido en `localStorage`)
- **Catálogo de productos** — listado paginado, búsqueda y detalle de cada medicamento
- **Carrito de compras** — añadir/quitar productos, con validación de sesión iniciada
- **Panel de Inventario** — historial de compras del usuario, con estado de stock por antigüedad
- **Recordatorios** — gestión de horarios de dosis por medicamento
- **Notificaciones con IA** — visualización de las recomendaciones médicas generadas por Claude tras cada compra
- **Panel de administración de productos** — crear/editar productos (rol `ADMIN`)
- **Modo oscuro** — persistente en `localStorage`, con detección de preferencia del sistema
- **Diseño responsive** — construido con Tailwind CSS 4

---

## Stack Técnico

| Categoría | Tecnología |
|---|---|
| **Librería UI** | React 19 |
| **Bundler / Dev server** | Vite 7 |
| **Enrutamiento** | React Router 7 |
| **Estilos** | Tailwind CSS 4 |
| **Iconos** | Lucide React, Heroicons |
| **Componentes accesibles** | Headless UI |
| **Linting** | ESLint 9 |

---

## Estructura del Proyecto

```
MediTech-Frontend/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
│
├── public/
│   └── vite.svg
│
└── src/
    ├── main.jsx                     ← punto de entrada, envuelve la app en los providers
    ├── App.jsx                      ← definición de rutas
    │
    ├── api/                         ← capa de comunicación con el API Gateway
    │   ├── httpClient.js            ← fetch centralizado + inyección de JWT
    │   ├── authApi.js
    │   ├── productsApi.js
    │   ├── purchasesApi.js
    │   ├── notificationsApi.js
    │   └── index.js
    │
    ├── constants/
    │   └── api.js                   ← API_BASE_URL y mapa de endpoints
    │
    ├── contexts/                    ← estado global vía Context API
    │   ├── CartContext.jsx          ← carrito de compras
    │   ├── ThemeContext.jsx         ← modo claro/oscuro
    │   └── ToastContext.jsx         ← notificaciones tipo toast
    │
    ├── hooks/                       ← lógica reutilizable
    │   ├── useProducts.js
    │   ├── usePaginatedProducts.js
    │   ├── useProductSearch.js
    │   ├── useProductDetail.js
    │   ├── useInventory.js
    │   ├── useNavbarLogic.js
    │   └── useClickOutside.js
    │
    ├── layouts/
    │   ├── AuthLayout.jsx           ← layout sin navbar (login / registro)
    │   └── AppLayout.jsx            ← layout con navbar (resto de la app)
    │
    ├── components/
    │   ├── navbar/
    │   │   ├── Navbar.jsx
    │   │   ├── CartDropdown.jsx
    │   │   ├── NotificationDropdown.jsx
    │   │   ├── SearchDropdown.jsx
    │   │   └── UserMenu.jsx
    │   └── products/
    │       ├── ProductCard.jsx
    │       ├── ProductGrid.jsx
    │       └── AdminProductModal.jsx
    │
    └── pages/
        ├── Login.jsx
        ├── Register.jsx
        ├── Products.jsx             ← home / catálogo destacado
        ├── AllProducts.jsx          ← catálogo completo
        ├── ProductDetail.jsx
        ├── Inventory.jsx            ← historial de compras del usuario
        ├── Reminder.jsx             ← recordatorios de dosis
        └── About.jsx
```

---

## Rutas de la Aplicación

| Ruta | Página | Layout | Descripción |
|---|---|---|---|
| `/login` | Login | Auth (sin navbar) | Inicio de sesión |
| `/register` | Register | Auth (sin navbar) | Registro de usuario |
| `/` | Products | App (con navbar) | Catálogo destacado |
| `/productos` | AllProducts | App | Catálogo completo con búsqueda |
| `/productos/:id` | ProductDetail | App | Detalle de un medicamento |
| `/inventario` | Inventory | App | Historial de compras del usuario |
| `/recordatorio` | Reminder | App | Recordatorios de dosis |
| `/nosotros` | About | App | Información del proyecto |

---

## Requisitos Previos

- **Node.js 18+**
- **npm 9+**
- El backend de MediTech corriendo localmente (ver [MediTech-pry](https://github.com/jro51/MediTech-pry)), con el **API Gateway** disponible en `http://localhost:8080`

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/jro51/MediTech-Frontend.git
cd MediTech-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar el backend

Este frontend no funciona de forma aislada: necesita que el API Gateway y los microservicios de MediTech estén corriendo en `http://localhost:8080`. Sigue las instrucciones del repositorio [MediTech-pry](https://github.com/jro51/MediTech-pry) para levantarlos antes de continuar.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

### Otros comandos disponibles

```bash
npm run build     # Compila la app para producción
npm run preview   # Sirve el build de producción localmente
npm run lint      # Ejecuta ESLint sobre el proyecto
```

---

## Configuración de la API

El frontend apunta al backend a través de una única constante, lo que facilita cambiar de entorno (desarrollo, staging, producción):

```js
// src/constants/api.js
export const API_BASE_URL = "http://localhost:8080";
```

Todas las peticiones autenticadas incluyen automáticamente el token JWT guardado en `localStorage` (ver `src/api/httpClient.js`), por lo que no es necesario adjuntarlo manualmente en cada llamada.

---

## Flujo de Uso

1. El usuario se registra o inicia sesión (`/register`, `/login`) → recibe un JWT del `auth-service` a través del Gateway
2. Explora el catálogo (`/`, `/productos`) y agrega productos al carrito
3. Realiza una compra → el frontend llama a `POST /api/purchases/buy`
4. El backend genera una recomendación médica con IA de forma asíncrona (Kafka + Claude)
5. El usuario consulta sus recomendaciones desde el dropdown de notificaciones o su panel de inventario (`/inventario`)

---

## Notas de Compatibilidad

- Actualmente el `API_BASE_URL` está fijado a `localhost:8080`; para desplegar en otro entorno, actualiza esa constante o migra a variables de entorno de Vite (`import.meta.env`).
- El proyecto usa Tailwind CSS 4 vía plugin de Vite; no requiere archivo `tailwind.config.js` tradicional.

---

## Próximas Mejoras

- [ ] Migrar `API_BASE_URL` a variables de entorno (`.env` + `import.meta.env`)
- [ ] Conectar la página de Recordatorios a un endpoint real del backend (actualmente usa datos de ejemplo)
- [ ] Tests de componentes con Vitest + React Testing Library
- [ ] Manejo de expiración/refresh de JWT

---

> Frontend desarrollado como parte de MediTech, plataforma full-stack de e-commerce de medicamentos con arquitectura de microservicios e IA aplicada. Backend: [MediTech-pry](https://github.com/jro51/MediTech-pry).
