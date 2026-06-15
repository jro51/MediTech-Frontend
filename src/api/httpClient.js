// ─── Cliente HTTP base ─────────────────────────────────────────────────────────
// Toda petición pasa por aquí: manejo de token, errores y headers centralizados.

function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  // 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

export const http = {
  get: (url, extraHeaders = {}) =>
    fetch(url, { headers: getAuthHeaders(extraHeaders) }).then(handleResponse),

  post: (url, body, extraHeaders = {}) =>
    fetch(url, {
      method: "POST",
      headers: getAuthHeaders(extraHeaders),
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (url, body, extraHeaders = {}) =>
    fetch(url, {
      method: "PUT",
      headers: getAuthHeaders(extraHeaders),
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (url, extraHeaders = {}) =>
    fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders(extraHeaders),
    }).then(handleResponse),
};
