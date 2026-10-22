import { useState } from 'react'

const SESSION_KEY = 'scholar-session'
const TOKEN_KEY = 'scholar-token'

export default function useAuth() {
  const [teacher, setTeacher] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    } catch {
      return null
    }
  })

  const login = ({ teacher: account, token }) => {
    const session = {
      ...account,
      name: account.name || [account.firstName, account.lastName].filter(Boolean).join(' '),
      email: account.email,
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    localStorage.setItem(TOKEN_KEY, token)
    setTeacher(session)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setTeacher(null)
  }

  return { teacher, login, logout }
}
