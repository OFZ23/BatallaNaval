// Local replacement for the external SDK. This file implements the minimal
// surface the app uses. It provides `createClient` which returns an object with
// an `auth` namespace and `createAxiosClient` which returns a small axios-like
// client using fetch. The implementations are intentionally small and can be
// extended as needed.

// Create a simple HTTP client that returns parsed JSON (like the original
// SDK helper likely did). It exposes get/post/put/delete methods.
export function createAxiosClient({ baseURL = '', headers = {}, token, interceptResponses = false } = {}) {
  const buildUrl = (path) => (path.startsWith('http') ? path : `${baseURL.replace(/\/$/, '')}${path}`);

  const doRequest = async (method, path, body, opts = {}) => {
	const url = buildUrl(path);
	const allHeaders = { 'Content-Type': 'application/json', ...headers, ...(opts.headers || {}) };
	if (token) allHeaders['Authorization'] = `Bearer ${token}`;

	const res = await fetch(url, {
	  method,
	  headers: allHeaders,
	  body: body != null ? JSON.stringify(body) : undefined,
	});

	const text = await res.text();
	let data;
	try {
	  data = text ? JSON.parse(text) : null;
	} catch (e) {
	  data = text;
	}

	if (!res.ok) {
	  const err = new Error(data?.message || `HTTP ${res.status}`);
	  err.status = res.status;
	  err.data = data;
	  throw err;
	}

	// If the app expects the raw body (not {data: ...}) return parsed JSON
	return data;
  };

  return {
	get: (path, opts) => doRequest('GET', path, null, opts),
	post: (path, body, opts) => doRequest('POST', path, body, opts),
	put: (path, body, opts) => doRequest('PUT', path, body, opts),
	delete: (path, opts) => doRequest('DELETE', path, null, opts),
  };
}

// Minimal client factory that exposes an `auth` namespace used by the app.
// This implementation favors simple behavior for local development:
// - If `token` is present it will try to fetch `/api/auth/me` and fall back
//   to a lightweight mock user if that endpoint is not available.
// - `logout(redirect?)` clears tokens from localStorage and optionally redirects.
// - `redirectToLogin(redirect?)` navigates to /login (with redirect query).
export function createClient({ appId, token, functionsVersion, serverUrl = '', requiresAuth = false, appBaseUrl } = {}) {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const NAVAL_TOKEN_KEY = 'naval_access_token';

   const fetchCurrentUser = async () => {
	// Try a conventional endpoint first
	try {
	  // Set a timeout for backend connectivity check
	  const controller = new AbortController();
	  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

	  try {
		const res = await fetch('/api/auth/me', {
		  headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		  },
		  signal: controller.signal
		});
		clearTimeout(timeoutId);

		if (!res.ok) {
		  const text = await res.text();
		  const data = text ? JSON.parse(text) : null;
		  const err = new Error(data?.message || `HTTP ${res.status}`);
		  err.status = res.status;
		  err.data = data;
		  throw err;
		}
		return await res.json();
	  } catch (fetchErr) {
		clearTimeout(timeoutId);
		throw fetchErr;
	  }
	} catch (e) {
	  // If the call fails (no backend), fall back to a local mock when token exists
	  if (token) {
		return { id: 'local-user', role: 'admin', email: 'local@naval.local', name: 'Local Dev' };
	  }
	  // In offline mode, return mock user
	  return { id: 'offline-user', role: 'player', email: 'offline@local', name: 'Offline Player' };
	}
   };

  const auth = {
	me: async () => {
	  return fetchCurrentUser();
	},
	logout: (redirect) => {
	  try {
		if (storage) {
		  storage.removeItem(NAVAL_TOKEN_KEY);
		  storage.removeItem('token');
		}
	  } catch (e) {
		// ignore
	  }
	  if (typeof window !== 'undefined' && redirect) {
		window.location.href = redirect;
	  }
	},
	redirectToLogin: (redirect) => {
	  const target = `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`;
	  if (typeof window !== 'undefined') window.location.href = target;
	},
  };

  return {
	auth,
	// other namespaces can be added later (e.g., functions, agents)
  };
}


