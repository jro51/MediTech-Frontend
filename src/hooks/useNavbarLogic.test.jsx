import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useNavbarLogic } from "./useNavbarLogic";
import { purchasesApi, notificationsApi } from "../api";

const toast = { success: vi.fn(), error: vi.fn(), warning: vi.fn() };

vi.mock("../contexts/ToastContext", () => ({ useToast: () => ({ toast }) }));
vi.mock("../api", () => ({
  purchasesApi: { buy: vi.fn() },
  notificationsApi: { getByUser: vi.fn(), getAdminInbox: vi.fn() },
}));

function login(role = "USER") {
  localStorage.setItem("token", "t");
  localStorage.setItem("userId", "7");
  localStorage.setItem("userRole", role);
}

describe("useNavbarLogic · notificaciones", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    notificationsApi.getByUser.mockResolvedValue([{ id: 1 }]);
    notificationsApi.getAdminInbox.mockResolvedValue([{ id: 2 }]);
  });

  it("no consulta nada sin sesión", () => {
    const setNotifications = vi.fn();
    renderHook(() => useNavbarLogic(setNotifications, vi.fn()));

    expect(notificationsApi.getByUser).not.toHaveBeenCalled();
    expect(notificationsApi.getAdminInbox).not.toHaveBeenCalled();
  });

  it("el cliente ve el estado de sus pedidos", async () => {
    login("USER");
    const setNotifications = vi.fn();
    renderHook(() => useNavbarLogic(setNotifications, vi.fn()));

    await waitFor(() => expect(setNotifications).toHaveBeenCalledWith([{ id: 1 }]));
    expect(notificationsApi.getByUser).toHaveBeenCalledWith("7");
    expect(notificationsApi.getAdminInbox).not.toHaveBeenCalled();
  });

  it("la botica ve su bandeja de alertas y reservas", async () => {
    login("ADMIN");
    const setNotifications = vi.fn();
    renderHook(() => useNavbarLogic(setNotifications, vi.fn()));

    await waitFor(() => expect(setNotifications).toHaveBeenCalledWith([{ id: 2 }]));
    expect(notificationsApi.getByUser).not.toHaveBeenCalled();
  });

  it("ignora en silencio los errores de notificaciones", async () => {
    login();
    notificationsApi.getByUser.mockRejectedValue(new Error("caído"));
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), vi.fn()));

    await expect(result.current.fetchNotifications()).resolves.toBeUndefined();
  });
});

describe("useNavbarLogic · reserva y sesión", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    notificationsApi.getByUser.mockResolvedValue([]);
  });

  it("pide iniciar sesión si no hay usuario", async () => {
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), vi.fn()));

    await act(() => result.current.handlePurchase([{ id: 1 }]));

    expect(toast.warning).toHaveBeenCalled();
    expect(purchasesApi.buy).not.toHaveBeenCalled();
  });

  it("reserva los productos del carrito y vacía el carrito", async () => {
    login();
    purchasesApi.buy.mockResolvedValue({ total: 18 });
    const clearCart = vi.fn();
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), clearCart));

    await act(() => result.current.handlePurchase([{ id: 1 }, { id: 2 }]));

    expect(purchasesApi.buy).toHaveBeenCalledWith("7", [1, 2]);
    expect(toast.success).toHaveBeenCalledWith("Reserva realizada", expect.stringContaining("18.00"));
    expect(clearCart).toHaveBeenCalled();
  });

  it("muestra el motivo si la reserva falla", async () => {
    login();
    purchasesApi.buy.mockRejectedValue(new Error("Stock insuficiente para: Ibuprofeno"));
    const clearCart = vi.fn();
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), clearCart));

    await act(() => result.current.handlePurchase([{ id: 1 }]));

    expect(toast.error).toHaveBeenCalledWith("No se pudo reservar el pedido", "Stock insuficiente para: Ibuprofeno");
    expect(clearCart).not.toHaveBeenCalled();
  });

  it("avisa que la sesión expiró cuando el backend responde 403", async () => {
    login();
    purchasesApi.buy.mockRejectedValue(new Error("HTTP 403"));
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), vi.fn()));

    await act(() => result.current.handlePurchase([{ id: 1 }]));

    expect(toast.error).toHaveBeenCalledWith("Tu sesión ha expirado", expect.any(String));
  });

  it("cierra la sesión: borra los datos y navega al login", () => {
    login();
    const setNotifications = vi.fn();
    const navigate = vi.fn();
    const { result } = renderHook(() => useNavbarLogic(setNotifications, vi.fn()));

    act(() => result.current.handleLogout(navigate));

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userRole")).toBeNull();
    expect(setNotifications).toHaveBeenCalledWith([]);
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("abre y cierra un dropdown a la vez", () => {
    const { result } = renderHook(() => useNavbarLogic(vi.fn(), vi.fn()));

    act(() => result.current.toggleDropdown("cart"));
    expect(result.current.activeDropdown).toBe("cart");
    act(() => result.current.toggleDropdown("user"));
    expect(result.current.activeDropdown).toBe("user");
    act(() => result.current.toggleDropdown("user"));
    expect(result.current.activeDropdown).toBeNull();
  });
});
