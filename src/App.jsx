import './App.css'
import AuthPage from './components/teachers/TeacherLogin'
import Dashboard from './components/teachers/TeacherProfile'
import useAuth from './hooks/useAuth'

function App() {
  const { teacher, login, logout } = useAuth()

  return teacher
    ? <Dashboard teacher={teacher} onLogout={logout} />
    : <AuthPage onLogin={login} />
}

export default App
