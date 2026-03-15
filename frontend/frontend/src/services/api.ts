const API_BASE = 'http://localhost:8000/api';

const TOKEN_KEY = 'mir-svechi-token';
const REFRESH_KEY = 'mir-svechi-refresh';

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function saveTokens(access: string, refresh: string) {
  localStorage.setItem(TOKEN_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) {
      clearTokens();
      return null;
    }
    const data = await res.json();
    saveTokens(data.access_token, data.refresh_token);
    return data.access_token;
  } catch {
    clearTokens();
    return null;
  }
}

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res = await fetch(`${API_BASE}${url}`, { ...options, headers });

  if (res.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}${url}`, { ...options, headers });
    }
  }

  if (res.status === 204) return undefined as T;

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Request failed');
  }

  return res.json();
}

// ── Auth ────────────────────────────────────────────────────────────

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export async function apiLogin(email: string, password: string): Promise<TokenPair> {
  return apiFetch<TokenPair>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(name: string, email: string, phone: string, password: string): Promise<TokenPair> {
  return apiFetch<TokenPair>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, name, phone, password }),
  });
}

export async function apiGetMe() {
  return apiFetch<any>('/auth/me');
}

// ── Products ────────────────────────────────────────────────────────

export interface ProductListResponse {
  items: any[];
  total: number;
  page: number;
  per_page: number;
}

export async function apiGetProducts(params: Record<string, string> = {}): Promise<ProductListResponse> {
  const qs = new URLSearchParams(params).toString();
  return apiFetch<ProductListResponse>(`/products${qs ? `?${qs}` : ''}`);
}

export async function apiGetProduct(id: string) {
  return apiFetch<any>(`/products/${id}`);
}

export async function apiCreateProduct(data: any) {
  return apiFetch<any>('/products', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiUpdateProduct(id: string, data: any) {
  return apiFetch<any>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteProduct(id: string) {
  return apiFetch<void>(`/products/${id}`, { method: 'DELETE' });
}

// ── Categories ──────────────────────────────────────────────────────

export async function apiGetCategories() {
  return apiFetch<any[]>('/categories');
}

export async function apiCreateCategory(data: any) {
  return apiFetch<any>('/categories', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiUpdateCategory(id: string, data: any) {
  return apiFetch<any>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function apiDeleteCategory(id: string) {
  return apiFetch<void>(`/categories/${id}`, { method: 'DELETE' });
}

// ── Orders ──────────────────────────────────────────────────────────

export async function apiCreateOrder(data: any) {
  return apiFetch<any>('/orders', { method: 'POST', body: JSON.stringify(data) });
}

export async function apiGetMyOrders() {
  return apiFetch<any[]>('/orders/my');
}

export async function apiGetOrders(status?: string) {
  const qs = status ? `?status=${status}` : '';
  return apiFetch<any[]>(`/orders${qs}`);
}

export async function apiUpdateOrderStatus(id: string, status: string, adminMessage?: string) {
  return apiFetch<any>(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, admin_message: adminMessage }),
  });
}

// ── Users (admin) ───────────────────────────────────────────────────

export async function apiGetUsers() {
  return apiFetch<any[]>('/users');
}

export async function apiUpdateUser(id: string, data: any) {
  return apiFetch<any>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

// ── Content ─────────────────────────────────────────────────────────

export async function apiGetSlides() {
  return apiFetch<any[]>('/content/slides');
}

export async function apiGetAdvantages() {
  return apiFetch<any[]>('/content/advantages');
}

export async function apiGetGallery() {
  return apiFetch<any[]>('/content/gallery');
}

export async function apiGetContacts() {
  return apiFetch<any>('/content/contacts');
}

export async function apiUpdateContacts(data: any) {
  return apiFetch<any>('/content/contacts', { method: 'PUT', body: JSON.stringify(data) });
}
