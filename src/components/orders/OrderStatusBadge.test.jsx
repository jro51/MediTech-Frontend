import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderStatusBadge from "./OrderStatusBadge";

describe("OrderStatusBadge", () => {
  it("muestra la etiqueta del estado", () => {
    render(<OrderStatusBadge status="READY" />);
    expect(screen.getByText("Listo para recoger")).toBeInTheDocument();
  });

  it("muestra un estado desconocido tal cual", () => {
    render(<OrderStatusBadge status="EXTRAÑO" />);
    expect(screen.getByText("EXTRAÑO")).toBeInTheDocument();
  });
});
