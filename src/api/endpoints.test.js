import { describe, it, expect, vi, beforeEach } from "vitest";
import { ENDPOINTS } from "../constants/api";
import { productsApi, purchasesApi, notificationsApi } from "./index";
import { http } from "./httpClient";

vi.mock("./httpClient", () => ({
  http: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

describe("endpoints", () => {
  it("construye las URLs del flujo de pedidos", () => {
    expect(ENDPOINTS.PRODUCTS.ALERTS(15)).toMatch(/\/api\/products\/alerts\?days=15$/);
    expect(ENDPOINTS.PURCHASES.ALL()).toMatch(/\/api\/purchases$/);
    expect(ENDPOINTS.PURCHASES.ALL("READY")).toMatch(/\/api\/purchases\?status=READY$/);
    expect(ENDPOINTS.PURCHASES.STATUS(7, "READY")).toMatch(/\/api\/purchases\/7\/status\?value=READY$/);
    expect(ENDPOINTS.NOTIFICATIONS.ADMIN_INBOX).toMatch(/\/api\/notifications\/admin\/inbox$/);
  });
});

describe("capa de API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("los productos ya no envían headers de rol falsificables", () => {
    productsApi.create({ name: "x" });
    productsApi.update(1, { name: "x" });
    productsApi.remove(1);

    expect(http.post.mock.calls[0]).toHaveLength(2);
    expect(http.put.mock.calls[0]).toHaveLength(2);
    expect(http.delete.mock.calls[0]).toHaveLength(1);
  });

  it("pide las alertas con la ventana de días", () => {
    productsApi.getAlerts(60);
    expect(http.get).toHaveBeenCalledWith(expect.stringContaining("days=60"));
  });

  it("cambia el estado de un pedido con PUT", () => {
    purchasesApi.updateStatus(3, "PICKED_UP");
    expect(http.put).toHaveBeenCalledWith(expect.stringContaining("/purchases/3/status?value=PICKED_UP"), null);
  });

  it("consulta los pedidos del usuario y los de la botica", () => {
    purchasesApi.getByUser(5);
    purchasesApi.getAll("READY");
    expect(http.get).toHaveBeenNthCalledWith(1, expect.stringContaining("/purchases/user/5"));
    expect(http.get).toHaveBeenNthCalledWith(2, expect.stringContaining("status=READY"));
  });

  it("reserva con POST", () => {
    purchasesApi.buy(1, [2, 3]);
    expect(http.post).toHaveBeenCalledWith(expect.stringContaining("/purchases/buy"), { userId: 1, productIds: [2, 3] });
  });

  it("consulta notificaciones del cliente y bandeja de la botica", () => {
    notificationsApi.getByUser(9);
    notificationsApi.getAdminInbox();
    expect(http.get).toHaveBeenNthCalledWith(1, expect.stringContaining("/notifications/9"));
    expect(http.get).toHaveBeenNthCalledWith(2, expect.stringContaining("/notifications/admin/inbox"));
  });
});

describe("auth", () => {
  it("hace login y registro con POST", async () => {
    const { authApi } = await import("./authApi");
    authApi.login("ana@botica.com", "secreto");
    authApi.register({ name: "Ana" });

    expect(http.post).toHaveBeenNthCalledWith(1, expect.stringContaining("/auth/login"), { email: "ana@botica.com", password: "secreto" });
    expect(http.post).toHaveBeenNthCalledWith(2, expect.stringContaining("/auth/register"), { name: "Ana" });
  });
});

describe("productos", () => {
  it("consulta el catálogo y un producto", () => {
    productsApi.getAll();
    productsApi.getById(4);
    expect(http.get).toHaveBeenNthCalledWith(1, expect.stringMatching(/\/api\/products$/));
    expect(http.get).toHaveBeenNthCalledWith(2, expect.stringContaining("/products/4"));
  });
});

describe("pedidos (borrado)", () => {
  it("elimina un pedido", () => {
    purchasesApi.remove(8);
    expect(http.delete).toHaveBeenCalledWith(expect.stringContaining("/purchases/8"));
  });
});
