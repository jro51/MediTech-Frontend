import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useOrders } from "./useOrders";
import { purchasesApi } from "../api";

vi.mock("../api", () => ({ purchasesApi: { getByUser: vi.fn() } }));

describe("useOrders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("no consulta nada si no hay sesión", async () => {
    const { result } = renderHook(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(purchasesApi.getByUser).not.toHaveBeenCalled();
    expect(result.current.orders).toEqual([]);
  });

  it("carga los pedidos del usuario", async () => {
    localStorage.setItem("userId", "7");
    purchasesApi.getByUser.mockResolvedValue([{ id: 1, status: "READY" }]);

    const { result } = renderHook(() => useOrders());

    await waitFor(() => expect(result.current.orders).toHaveLength(1));
    expect(purchasesApi.getByUser).toHaveBeenCalledWith("7");
    expect(result.current.error).toBeNull();
  });

  it("expone el error si falla la carga", async () => {
    localStorage.setItem("userId", "7");
    purchasesApi.getByUser.mockRejectedValue(new Error("sin conexión"));

    const { result } = renderHook(() => useOrders());

    await waitFor(() => expect(result.current.error).toBe("sin conexión"));
    expect(result.current.loading).toBe(false);
  });
});
