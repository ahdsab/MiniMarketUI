const TOKEN_KEY = "mm_token";
const USER_KEY = "mm_username";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setStoredAuth(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}

export function clearStoredAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUsername() {
  return localStorage.getItem(USER_KEY) || "";
}

async function request(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(path, { ...options, headers });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.detail || data?.message || `HTTP ${res.status}`);
  }
  return data;
}

export const api = {
  // public
  getProducts: () => request("/api/products"),
  getOffers: () => request("/api/offers"),
  sendContact: (payload) =>
    request("/api/contact", { method: "POST", body: JSON.stringify(payload) }),

  // auth
  register: (payload) =>
    request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/api/auth/me"),
  logout: () => request("/api/auth/logout", { method: "POST" }),

  // cart (auth required)
  getCart: () => request("/api/cart"),
  addCartItem: (product_id, quantity) =>
    request("/api/cart/items", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    }),
  updateCartItem: (product_id, quantity) =>
    request(`/api/cart/items/${product_id}?quantity=${quantity}`, { method: "PATCH" }),
  removeCartItem: (product_id) =>
    request(`/api/cart/items/${product_id}`, { method: "DELETE" }),
};
