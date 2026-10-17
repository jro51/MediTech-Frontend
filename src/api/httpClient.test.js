import { describe, it, expect, vi, beforeEach } from "vitest";
import { http } from "./httpClient";

function mockFetch(response) {
  const fn = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fn);
  return fn;
}

const ok = (body, status = 200) => ({ ok: true, status, json: () => Promise.resolve(body) });

describe("http client", () => {
  beforeEach(() => vi.unstubAllGlobals());

  it("envía el token JWT cuando existe", async () => {
    localStorage.setItem("token", "abc123");
    const fetchMock = mockFetch(ok({ ok: true }));

    await http.get("http://api/x");

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer abc123");
  });

  it("no envía Authorization si no hay sesión", async () => {
    const fetchMock = mockFetch(ok([]));

    await http.get("http://api/x");

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined();
  });

  it("serializa el cuerpo en POST y PUT", async () => {
    const fetchMock = mockFetch(ok({}));

    await http.post("http://api/x", { a: 1 });
    await http.put("http://api/x", { b: 2 });

    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "POST", body: '{"a":1}' });
    expect(fetchMock.mock.calls[1][1]).toMatchObject({ method: "PUT", body: '{"b":2}' });
  });

  it("usa DELETE", async () => {
    const fetchMock = mockFetch(ok(null, 204));

    await http.delete("http://api/x");

    expect(fetchMock.mock.calls[0][1].method).toBe("DELETE");
  });

  it("devuelve null en 204 No Content", async () => {
    mockFetch(ok(null, 204));

    expect(await http.delete("http://api/x")).toBeNull();
  });

  it("lanza el mensaje de error que envía el backend", async () => {
    mockFetch({ ok: false, status: 400, json: () => Promise.resolve({ message: "Stock insuficiente" }) });

    await expect(http.get("http://api/x")).rejects.toThrow("Stock insuficiente");
  });

  it("lanza un error genérico si la respuesta no es JSON", async () => {
    mockFetch({ ok: false, status: 502, json: () => Promise.reject(new Error("no json")) });

    await expect(http.get("http://api/x")).rejects.toThrow("Error desconocido");
  });
});
