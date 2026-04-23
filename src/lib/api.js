const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
const isProd = import.meta.env.PROD

// En Render (producción) NO existe el proxy de Vite. Si BASE_URL está vacío,
// las llamadas /api/* irán al mismo dominio del frontend y devolverán 404.
if (isProd && !BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    '[api] VITE_API_BASE_URL vacío en producción. Configúralo con la URL del backend (Render).'
  )
}

async function request(path, { method = 'GET', body, token, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const contentType = res.headers.get('content-type') || ''

  if (!res.ok) {
    const errPayload = contentType.includes('application/json') ? await res.json().catch(() => null) : null
    const message =
      errPayload?.error ||
      (res.status === 404 ? 'No se encontró el recurso solicitado' : `HTTP ${res.status}`)
    const e = new Error(message)
    e.status = res.status
    e.payload = errPayload
    throw e
  }

  if (contentType.includes('application/pdf')) return await res.blob()
  if (contentType.includes('application/json')) return await res.json()
  return await res.text()
}

export const api = {
  resultados: (dni, codigo, formato = 'json') =>
    request('/api/resultados', { method: 'POST', body: { dni, codigo, formato } }),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),

  pacientes: {
    list: ({ token, limit = 50, offset = 0 } = {}) =>
      request(`/api/pacientes?limit=${limit}&offset=${offset}`, { token }),
    get: ({ token, id }) => request(`/api/pacientes/${id}`, { token }),
    create: ({ token, payload }) => request('/api/pacientes', { method: 'POST', token, body: payload }),
    update: ({ token, id, payload }) => request(`/api/pacientes/${id}`, { method: 'PATCH', token, body: payload }),
    remove: ({ token, id }) => request(`/api/pacientes/${id}`, { method: 'DELETE', token }),
  },

  muestras: {
    list: ({ token, limit = 50, offset = 0 } = {}) =>
      request(`/api/muestras?limit=${limit}&offset=${offset}`, { token }),
    get: ({ token, id }) => request(`/api/muestras/${id}`, { token }),
    create: ({ token, payload }) => request('/api/muestras', { method: 'POST', token, body: payload }),
    update: ({ token, id, payload }) => request(`/api/muestras/${id}`, { method: 'PATCH', token, body: payload }),
    remove: ({ token, id }) => request(`/api/muestras/${id}`, { method: 'DELETE', token }),
  },

  informes: {
    list: ({ token, limit = 50, offset = 0 } = {}) =>
      request(`/api/informes?limit=${limit}&offset=${offset}`, { token }),
    get: ({ token, id }) => request(`/api/informes/${id}`, { token }),
    create: ({ token, payload }) => request('/api/informes', { method: 'POST', token, body: payload }),
    update: ({ token, id, payload }) => request(`/api/informes/${id}`, { method: 'PATCH', token, body: payload }),
    remove: ({ token, id }) => request(`/api/informes/${id}`, { method: 'DELETE', token }),
  },
}

