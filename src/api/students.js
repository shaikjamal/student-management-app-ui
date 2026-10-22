const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export async function getStudents() {
  const data = await callApi('/students')
  const list = Array.isArray(data) ? data : data?.students
  if (!Array.isArray(list)) throw new Error('The students API response did not contain a student list.')
  return list.map(normalizeStudent)
}

export async function createStudent(input) {
  return normalizeStudent(await callApi('/students', input, 'POST'))
}

export async function updateStudent(id, input) {
  return normalizeStudent(await callApi(`/students/${encodeURIComponent(id)}`, input, 'PUT'))
}

export async function deleteStudent(id) {
  await callApi(`/students/${encodeURIComponent(id)}`, undefined, 'DELETE')
}

async function callApi(endpoint, body, method = 'GET') {
  let response
  try {
    const token = localStorage.getItem('scholar-token')
    response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch {
    throw new Error('Could not reach the server. Make sure the student API is running and try again.')
  }

  if (response.status === 204) return null
  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The server returned an invalid response while working with students.')
  }

  if (response.status === 404) throw new Error(result.error?.message || `Student not found or API route unavailable (${method} ${API_URL}${endpoint}).`)
  if (!response.ok) throw new Error(result.error?.message || `Student request failed (${response.status})`)
  return result.data
}

function normalizeStudent(student) {
  const fullName = student.name || student.fullName || ''
  const nameParts = fullName.trim().split(/\s+/)
  return {
    ...student,
    id: student.id || student._id || student.studentId,
    firstName: student.firstName || nameParts[0] || 'Student',
    lastName: student.lastName || nameParts.slice(1).join(' '),
    email: student.email || '',
    grade: student.grade || student.class || '—',
    subjects: Array.isArray(student.subjects) ? student.subjects : [],
    createdAt: student.createdAt || student.enrollmentDate || null,
    updatedAt: student.updatedAt || student.createdAt || null,
  }
}
