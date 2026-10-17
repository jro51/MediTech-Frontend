import { describe, it, expect } from "vitest";
import { daysUntil, expirationInfo, isLowStock, isOutOfStock, formatDate } from "./inventory";

const TODAY = new Date(2026, 9, 16, 15, 30); // 16 oct 2026, 15:30

describe("daysUntil", () => {
  it("cuenta los días sin importar la hora actual", () => {
    expect(daysUntil("2026-10-16", TODAY)).toBe(0);
    expect(daysUntil("2026-10-17", TODAY)).toBe(1);
    expect(daysUntil("2026-11-15", TODAY)).toBe(30);
    expect(daysUntil("2026-10-10", TODAY)).toBe(-6);
  });

  it("devuelve null cuando no hay fecha", () => {
    expect(daysUntil(null, TODAY)).toBeNull();
    expect(daysUntil("", TODAY)).toBeNull();
  });
});

describe("expirationInfo", () => {
  it("describe vencidos, por vencer y sin fecha", () => {
    expect(expirationInfo("2026-10-10", TODAY)).toEqual({ text: "Venció hace 6 días", tone: "expired" });
    expect(expirationInfo("2026-10-15", TODAY).text).toBe("Venció hace 1 día");
    expect(expirationInfo("2026-10-16", TODAY)).toEqual({ text: "Vence hoy", tone: "soon" });
    expect(expirationInfo("2026-10-17", TODAY).text).toBe("Vence en 1 día");
    expect(expirationInfo("2026-11-01", TODAY).text).toBe("Vence en 16 días");
    expect(expirationInfo(null, TODAY).tone).toBe("none");
  });
});

describe("stock", () => {
  it("detecta stock bajo solo si todavía hay unidades", () => {
    expect(isLowStock({ stock: 3, minStock: 5 })).toBe(true);
    expect(isLowStock({ stock: 5, minStock: 5 })).toBe(true);
    expect(isLowStock({ stock: 6, minStock: 5 })).toBe(false);
    expect(isLowStock({ stock: 0, minStock: 5 })).toBe(false);
    expect(isLowStock({ stock: 3 })).toBe(false);
  });

  it("detecta productos agotados", () => {
    expect(isOutOfStock({ stock: 0 })).toBe(true);
    expect(isOutOfStock({ stock: 1 })).toBe(false);
  });
});

describe("formatDate", () => {
  it("muestra un guion si no hay fecha", () => {
    expect(formatDate(null)).toBe("—");
  });

  it("formatea fechas en español", () => {
    expect(formatDate("2026-10-16T10:00:00")).toMatch(/16/);
  });
});
