import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotificationDropdown from "./NotificationDropdown";

describe("NotificationDropdown", () => {
  it("no renderiza nada si está cerrado", () => {
    const { container } = render(<NotificationDropdown isOpen={false} notifications={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("muestra un mensaje cuando no hay notificaciones", () => {
    render(<NotificationDropdown isOpen notifications={[]} />);
    expect(screen.getByText("No tienes notificaciones aún.")).toBeInTheDocument();
  });

  it("lista los avisos recibidos", () => {
    const notifications = [
      { id: 1, type: "ORDER_STATUS", message: "Tu pedido #10 ya está listo", createdAt: "2026-10-16T12:00:00" },
      { id: 2, type: "LOW_STOCK", message: "Stock bajo: Ibuprofeno (quedan 2)", createdAt: "2026-10-16T12:05:00" },
    ];
    render(<NotificationDropdown isOpen notifications={notifications} />);

    expect(screen.getByText("Tu pedido #10 ya está listo")).toBeInTheDocument();
    expect(screen.getByText("Stock bajo: Ibuprofeno (quedan 2)")).toBeInTheDocument();
  });
});
