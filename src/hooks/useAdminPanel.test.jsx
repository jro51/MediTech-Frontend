import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAdminPanel } from "./useAdminPanel";
import { productsApi, purchasesApi, notificationsApi } from "../api";

const toast = { success: vi.fn(), error: vi.fn(), warning: vi.fn() };

vi.mock("../contexts/ToastContext", () => ({ useToast: () => ({ toast }) }));
vi.mock("../api", () => ({
  productsApi: { getAlerts: vi.fn() },
  purchasesApi: { getAll: vi.fn(), updateStatus: vi.fn() },
  notificationsApi: { getAdminInbox: vi.fn() },
}));

const alerts = { lowStock: [{ id: 1, name: "Ibuprofeno", stock: 2, minStock: 5 }], expiringSoon: [] };

function setupApi() {
  productsApi.getAlerts.mockResolvedValue(alerts);
  purchasesApi.getAll.mockResolvedValue([{ id: 10, status: "RESERVED" }]);
  notificationsApi.getAdminInbox.mockResolvedValue([{ id: 1, message: "Nueva reserva #10" }]);
}

describe("useAdminPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupApi();
  });

  it("carga alertas, pedidos y actividad con los filtros recibidos", async () => {
    const { result } = renderHook(() => useAdminPanel({ days: 60, statusFilter: "READY" }));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(productsApi.getAlerts).toHaveBeenCalledWith(60);
    expect(purchasesApi.getAll).toHaveBeenCalledWith("READY");
    expect(result.current.alerts.lowStock).toHaveLength(1);
    expect(result.current.orders).toHaveLength(1);
    expect(result.current.inbox).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("tolera respuestas vacías", async () => {
    productsApi.getAlerts.mockResolvedValue(null);
    purchasesApi.getAll.mockResolvedValue(null);
    notificationsApi.getAdminInbox.mockResolvedValue(null);

    const { result } = renderHook(() => useAdminPanel({ days: 30, statusFilter: "" }));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.alerts).toEqual({ lowStock: [], expiringSoon: [] });
    expect(result.current.orders).toEqual([]);
  });

  it("expone el error si falla la carga", async () => {
    productsApi.getAlerts.mockRejectedValue(new Error("403"));

    const { result } = renderHook(() => useAdminPanel({ days: 30, statusFilter: "" }));

    await waitFor(() => expect(result.current.error).toBe("403"));
  });

  it("cambia el estado de un pedido, avisa y recarga", async () => {
    purchasesApi.updateStatus.mockResolvedValue({});
    const { result } = renderHook(() => useAdminPanel({ days: 30, statusFilter: "" }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.changeStatus(10, "READY"));

    expect(purchasesApi.updateStatus).toHaveBeenCalledWith(10, "READY");
    expect(toast.success).toHaveBeenCalledWith("Pedido actualizado", "Pedido #10: Listo para recoger");
    expect(productsApi.getAlerts).toHaveBeenCalledTimes(2);
    expect(result.current.busyId).toBeNull();
  });

  it("muestra el error del backend si el cambio de estado falla", async () => {
    purchasesApi.updateStatus.mockRejectedValue(new Error("Transición no permitida"));
    const { result } = renderHook(() => useAdminPanel({ days: 30, statusFilter: "" }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.changeStatus(10, "PICKED_UP"));

    expect(toast.error).toHaveBeenCalledWith("No se pudo actualizar el pedido", "Transición no permitida");
    expect(result.current.busyId).toBeNull();
  });
});
