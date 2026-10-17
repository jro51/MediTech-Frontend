import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useProducts } from "./useProducts";
import { productsApi } from "../api";

vi.mock("../api", () => ({
  productsApi: { getAll: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn() },
}));

async function loaded() {
  const hook = renderHook(() => useProducts());
  await waitFor(() => expect(hook.result.current.loading).toBe(false));
  return hook;
}

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    productsApi.getAll.mockResolvedValue([{ id: 1, name: "Ibuprofeno" }]);
  });

  it("carga el catálogo", async () => {
    const { result } = await loaded();
    expect(result.current.products).toHaveLength(1);
  });

  it("expone el error si falla la carga", async () => {
    productsApi.getAll.mockRejectedValue(new Error("sin conexión"));
    const { result } = await loaded();
    expect(result.current.error).toBe("sin conexión");
  });

  it("crea un producto con los campos de botica y recarga", async () => {
    const { result } = await loaded();

    await act(() => result.current.saveProduct({
      name: "Amoxicilina", description: "Antibiótico", price: "18.5", stock: "40",
      image_src: "http://img", expirationDate: "2027-03-31", minStock: "10", requiresPrescription: true,
    }));

    expect(productsApi.create).toHaveBeenCalledWith({
      name: "Amoxicilina", description: "Antibiótico", price: 18.5, stock: 40, imageSrc: "http://img",
      expirationDate: "2027-03-31", minStock: 10, requiresPrescription: true,
    });
    expect(productsApi.getAll).toHaveBeenCalledTimes(2);
  });

  it("omite el stock mínimo vacío y manda null si no hay vencimiento", async () => {
    const { result } = await loaded();

    await act(() => result.current.saveProduct({
      name: "Gasas", description: "x", price: "3", stock: "10", imageSrc: "http://img",
      expirationDate: "", minStock: "", requiresPrescription: false,
    }));

    const payload = productsApi.create.mock.calls[0][0];
    expect(payload).not.toHaveProperty("minStock");
    expect(payload.expirationDate).toBeNull();
    expect(payload.requiresPrescription).toBe(false);
  });

  it("actualiza un producto existente", async () => {
    const { result } = await loaded();

    await act(() => result.current.saveProduct({
      id: 1, name: "Ibuprofeno", description: "x", price: "10", stock: "5", imageSrc: "http://img",
    }));

    expect(productsApi.update).toHaveBeenCalledWith(1, expect.objectContaining({ id: 1, price: 10, stock: 5 }));
    expect(productsApi.create).not.toHaveBeenCalled();
  });

  it("elimina un producto y recarga", async () => {
    const { result } = await loaded();

    await act(() => result.current.deleteProduct(1));

    expect(productsApi.remove).toHaveBeenCalledWith(1);
    expect(productsApi.getAll).toHaveBeenCalledTimes(2);
  });
});
