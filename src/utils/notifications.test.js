import { describe, it, expect } from "vitest";
import { notificationStyle, formatNotificationDate } from "./notifications";

describe("notificationStyle", () => {
  it("resalta las alertas de la botica", () => {
    expect(notificationStyle("LOW_STOCK")).toContain("amber");
    expect(notificationStyle("EXPIRING")).toContain("red");
    expect(notificationStyle("NEW_ORDER")).toContain("emerald");
  });

  it("usa un estilo por defecto para el resto", () => {
    expect(notificationStyle("ORDER_STATUS")).toContain("blue");
    expect(notificationStyle(undefined)).toContain("blue");
  });
});

describe("formatNotificationDate", () => {
  it("devuelve vacío si no hay fecha", () => {
    expect(formatNotificationDate(null)).toBe("");
  });

  it("interpreta como UTC las fechas sin zona horaria", () => {
    const withoutZone = formatNotificationDate("2026-10-16T12:00:00");
    const withZone = formatNotificationDate("2026-10-16T12:00:00Z");
    expect(withoutZone).toBe(withZone);
  });
});
