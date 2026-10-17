# MediTech Frontend — Reservas para boticas

![CI](https://github.com/jro51/MediTech-Frontend/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

Cliente web de **MediTech**: los clientes **reservan** medicamentos desde el catálogo y **pasan a recogerlos**,
y la botica gestiona los pedidos y revisa las **alertas de inventario** (stock bajo y productos vencidos o por vencer).

> El backend de microservicios está en [MediTech-backend](https://github.com/jro51/MediTech-backend).
> Proyecto de portafolio: parte de un problema real (control manual del stock en boticas pequeñas), pero aún no se ha validado con una botica real.

## Pantallas

| Ruta | Quién | Qué hace |
|---|---|---|
| `/` y `/productos` | Todos | Catálogo con marcas de **requiere receta**, **pocas unidades** y **agotado**; el carrito se convierte en una **reserva** |
| `/pedidos` | Cliente | Seguimiento de sus pedidos: *Reservado → Listo para recoger → Recogido* (o *Cancelado*) |
| `/admin` | Solo ADMIN | **Alertas de inventario** (stock bajo, vencidos o por vencer), actividad reciente y gestión de pedidos (marcar listo, recogido o cancelar) |
| Catálogo (ADMIN) | Solo ADMIN | Crear y editar productos con fecha de vencimiento, stock mínimo y receta |
| 🔔 Notificaciones | Todos | El cliente ve el estado de sus pedidos; la botica ve nuevas reservas y alertas |

## Cómo ejecutarlo

Necesitas el backend corriendo (ver su README: `docker compose up --build`).

```bash
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:8080
npm run dev              # http://localhost:5173
```

Para ejecutarlo todo junto desde el repositorio del backend: `docker compose --profile frontend up --build`.

Con Docker solo el frontend (nginx):

```bash
docker build --build-arg VITE_API_URL=http://localhost:8080 -t meditech-frontend .
docker run -p 5173:80 meditech-frontend
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm test` | Pruebas (Vitest + Testing Library) |
| `npm run test:coverage` | Pruebas con reporte de cobertura (umbral mínimo de 65%) |

## Pruebas

Hay pruebas para la capa de API (`src/api`), las utilidades (`src/utils`), los hooks y los componentes de
pedidos y notificaciones. La cobertura se mide sobre esas carpetas. **Todavía no hay pruebas de las páginas completas**
ni de los hooks `useClickOutside`, `usePaginatedProducts`, `useProductDetail` y `useProductSearch`.

## CI

`.github/workflows/ci.yml` ejecuta en cada push y pull request: lint, pruebas con cobertura, build de producción y construcción de la imagen Docker.

## Estructura

```
src/
├── api/          # cliente HTTP y servicios (productos, pedidos, notificaciones, auth)
├── constants/    # URLs de la API (VITE_API_URL)
├── contexts/     # carrito, tema, toasts
├── hooks/        # lógica de datos: useOrders, useAdminPanel, useProducts, useNavbarLogic...
├── utils/        # reglas puras: estados de pedido, vencimientos, notificaciones
├── components/   # navbar, productos, pedidos
├── layouts/ pages/
└── test/         # configuración de pruebas
```

## Decisiones

- **El rol y la identidad los valida el backend:** el frontend ya no envía headers de rol; el API Gateway los obtiene del JWT.
- **Lógica fuera de los componentes:** reglas como "qué paso sigue en un pedido" o "cuántos días faltan para vencer" viven en `utils/` como funciones puras y con pruebas.
- **Textos verídicos:** se eliminaron cifras y promesas que el proyecto no puede cumplir (usuarios, entregas express, asesoría 24/7, IA).

## Limitaciones conocidas

- La seguridad de las rutas `/admin` en el cliente es solo de experiencia de usuario; la autorización real está en el backend.
- El token JWT se guarda en `localStorage` (simple, pero expuesto a XSS).
- Un cliente todavía no puede cancelar su propia reserva (solo la botica).
