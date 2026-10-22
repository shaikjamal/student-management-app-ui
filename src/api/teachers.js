const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export async function registerTeacher({ firstName, lastName, email, password }) {
  return callApi('/teachers/register', { firstName, lastName, email, password })
}

export async function loginTeacher({ email, password }) {
  return callApi('/teachers/login', { email, password })
}

async function callApi(endpoint, body) {
  let response
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach the server. Make sure the teacher API is running and try again.')
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The server returned an invalid response. Please try again.')
  }

  if (response.status === 404) {
    throw new Error(`API route not found: POST ${API_URL}${endpoint}. Check the backend route and VITE_API_URL.`)
  }
  if (!response.ok) throw new Error(result.error?.message || `Request failed (${response.status})`)
  return result.data
}
