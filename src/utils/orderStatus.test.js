import { describe, it, expect } from "vitest";
import { getStatusInfo, nextAction, canCancel, ORDER_STATUS } from "./orderStatus";

describe("orderStatus", () => {
  it("describe cada estado con una etiqueta legible", () => {
    expect(getStatusInfo("RESERVED").label).toBe("Reservado");
    expect(getStatusInfo("READY").label).toBe("Listo para recoger");
    expect(getStatusInfo("PICKED_UP").label).toBe("Recogido");
    expect(getStatusInfo("CANCELLED").label).toBe("Cancelado");
  });

  it("no se rompe con un estado desconocido o ausente", () => {
    expect(getStatusInfo("LOQUESEA").label).toBe("LOQUESEA");
    expect(getStatusInfo(undefined).label).toBe("Sin estado");
  });

  it("propone el siguiente paso solo mientras el pedido está en curso", () => {
    expect(nextAction("RESERVED")).toEqual({ to: "READY", label: "Marcar como listo" });
    expect(nextAction("READY")).toEqual({ to: "PICKED_UP", label: "Marcar como recogido" });
    expect(nextAction("PICKED_UP")).toBeNull();
    expect(nextAction("CANCELLED")).toBeNull();
  });

  it("solo se puede cancelar antes de que el pedido sea recogido", () => {
    expect(canCancel("RESERVED")).toBe(true);
    expect(canCancel("READY")).toBe(true);
    expect(canCancel("PICKED_UP")).toBe(false);
    expect(canCancel("CANCELLED")).toBe(false);
  });

  it("coincide con los estados del backend", () => {
    expect(Object.keys(ORDER_STATUS)).toEqual(["RESERVED", "READY", "PICKED_UP", "CANCELLED"]);
  });
});
