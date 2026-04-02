const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}

// ── Public ──────────────────────────────────────────────
export async function submitRegistration(data) {
  const res = await fetch(`${BASE}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Erreur serveur');
  return res.json();
}

// ── Admin auth ───────────────────────────────────────────
export async function adminLogin(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Invalid credentials');
  return res.json(); // { token, email }
}

export async function verifyToken() {
  const res = await fetch(`${BASE}/api/auth/me`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

// ── Public: homeowner projects ───────────────────────────
export async function submitProject(data) {
  const res = await fetch(`${BASE}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Erreur serveur');
  return res.json();
}

// ── Admin registrations ──────────────────────────────────
export async function fetchRegistrations(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/registrations?${query}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${BASE}/api/registrations/stats`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function updateStatus(id, status) {
  const res = await fetch(`${BASE}/api/registrations/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function renewRegistration(id) {
  const res = await fetch(`${BASE}/api/registrations/${id}/renew`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to renew');
  return res.json();
}

export async function deleteRegistration(id) {
  const res = await fetch(`${BASE}/api/registrations/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete');
}

// ── Admin: artisan accounts ──────────────────────────────
export async function fetchArtisanAccounts() {
  const res = await fetch(`${BASE}/api/artisan/accounts`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function createArtisanAccount(data) {
  const res = await fetch(`${BASE}/api/artisan/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to create account');
  return res.json();
}

export async function updateArtisanCredentials(id, data) {
  const res = await fetch(`${BASE}/api/artisan/${id}/credentials`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to update');
  return res.json();
}

export async function assignProject(projectId, artisanUserId) {
  const res = await fetch(`${BASE}/api/artisan/projects/${projectId}/assign`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ artisanUserId }),
  });
  if (!res.ok) throw new Error('Failed to assign');
  return res.json();
}

// ── Artisan portal ────────────────────────────────────────
function artisanHeaders() {
  const token = localStorage.getItem('artisan_token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function artisanLogin(email, password) {
  const res = await fetch(`${BASE}/api/artisan/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json();
    const err = new Error(body.message || 'Invalid credentials');
    err.expired = body.expired || false;
    throw err;
  }
  return res.json();
}

export async function verifyArtisanToken() {
  const res = await fetch(`${BASE}/api/artisan/me`, { headers: artisanHeaders() });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function fetchArtisanDashboard() {
  const res = await fetch(`${BASE}/api/artisan/dashboard`, { headers: artisanHeaders() });
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}

// ── Admin projects ───────────────────────────────────────
export async function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/projects?${query}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function fetchProjectStats() {
  const res = await fetch(`${BASE}/api/projects/stats`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function updateProjectStatus(id, status) {
  const res = await fetch(`${BASE}/api/projects/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update');
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${BASE}/api/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete');
}
