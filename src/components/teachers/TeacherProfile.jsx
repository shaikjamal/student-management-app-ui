import { useCallback, useEffect, useState } from 'react'
import { createStudent, deleteStudent, getStudents, updateStudent } from '../../api/students'
import Icon from '../common/Icon'
import Toast from '../common/Toast'
import StudentDirectory from '../student/StudentDirectory'
import StudentProfile from '../student/StudentProfile'
import StudentFormModal from '../student/StudentFormModal'
import TeacherProfileDetails from './TeacherProfileDetails'

export default function TeacherProfile({ teacher, onLogout }) {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showTeacherProfile, setShowTeacherProfile] = useState(false)
  const [studentModalOpen, setStudentModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const initials = (teacher.name || teacher.email || 'T').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const dismissNotification = useCallback(() => setNotification(null), [])

  useEffect(() => {
    let active = true
    getStudents()
      .then((items) => { if (active) setStudents(items) })
      .catch((loadError) => { if (active) setError(loadError.message || 'Could not load students.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const openAddStudent = () => {
    setEditingStudent(null)
    setStudentModalOpen(true)
  }

  const saveStudent = async (input) => {
    if (editingStudent) {
      const updated = await updateStudent(editingStudent.id, input)
      setStudents((current) => current.map((student) => student.id === updated.id ? updated : student))
      setSelectedStudent(updated)
      setNotification({ id: Date.now(), message: 'Student updated successfully.' })
    } else {
      const created = await createStudent(input)
      setStudents((current) => [...current, created])
      setNotification({ id: Date.now(), message: 'Student added successfully.' })
    }
    setStudentModalOpen(false)
    setEditingStudent(null)
  }

  const removeStudent = async () => {
    await deleteStudent(selectedStudent.id)
    setStudents((current) => current.filter((student) => student.id !== selectedStudent.id))
    setSelectedStudent(null)
    setNotification({ id: Date.now(), message: 'Student deleted successfully.', type: 'delete' })
  }

  const changeStudentSubjects = async (subjects) => {
    const updated = await updateStudent(selectedStudent.id, {
      firstName: selectedStudent.firstName,
      lastName: selectedStudent.lastName,
      email: selectedStudent.email,
      grade: selectedStudent.grade === '—' ? '' : selectedStudent.grade,
      subjects,
    })
    setStudents((current) => current.map((student) => student.id === updated.id ? updated : student))
    setSelectedStudent(updated)
    setNotification({ id: Date.now(), message: 'Student subjects updated successfully.' })
  }

  return <div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#home"><span className="brand-mark">s</span><span>scholar<span className="brand-dot">.</span></span></a><div className="workspace-label">YOUR CLASSROOM</div><nav className="main-nav"><a className={!selectedStudent && !showTeacherProfile ? 'active' : ''} href="#students" onClick={(event) => { event.preventDefault(); setSelectedStudent(null); setShowTeacherProfile(false) }}><Icon name="people"/>My students<span className="nav-count">{students.length}</span></a><a className={showTeacherProfile ? 'active' : ''} href="#profile" onClick={(event) => { event.preventDefault(); setSelectedStudent(null); setShowTeacherProfile(true) }}><Icon name="grid"/>Teacher profile</a></nav><div className="sidebar-class"><span className="class-dot"/><div><strong>Class directory</strong><small>2026 · School year</small></div><Icon name="chevron" size={14}/></div><div className="sidebar-bottom"><div className="sidebar-divider"/><button className="logout-link" type="button" onClick={onLogout}><Icon name="settings"/>Sign out</button><div className="sidebar-divider"/><div className="user-chip"><span className="user-avatar">{initials}</span><span className="user-meta"><strong>{teacher.name}</strong><small>Teacher account</small></span><span className="online-dot"/></div></div></aside>
    <main className="main-content"><header className="topbar"><div className="mobile-brand"><span className="brand-mark">s</span> scholar<span className="brand-dot">.</span></div><div className="topbar-right"><span className="today-label">Your classroom · 2026</span><button className="top-avatar" onClick={() => { setSelectedStudent(null); setShowTeacherProfile(true) }} aria-label="Open teacher profile" title="Open teacher profile">{initials}</button></div></header><div className="page-wrap">
      {showTeacherProfile ? <TeacherProfileDetails teacher={teacher}/> : !selectedStudent ? <>
        <div className="breadcrumb"><span>My classroom</span><Icon name="chevron" size={14}/><span>Students</span></div>
        <section className="welcome-banner"><div className="welcome-copy"><div className="eyebrow">YOUR TEACHER PROFILE</div><h1>Good to see you, {(teacher.name || 'Teacher').split(' ')[0]}.</h1><p>Here’s your classroom at a glance. Every student has a story worth knowing.</p><div className="teacher-email"><span className="email-dot"/>{teacher.email}</div></div><div className="welcome-mark"><div className="mark-ring ring-back"/><div className="mark-ring ring-front"/><span>{initials}</span><i>✳</i><b>✦</b></div></section>
        {loading ? <div className="directory-message" role="status">Loading students…</div> : error ? <div className="directory-message directory-error" role="alert"><strong>Couldn’t load students</strong><p>{error}</p><button className="button button-outline" type="button" onClick={() => { setLoading(true); setError(''); getStudents().then(setStudents).catch((loadError) => setError(loadError.message)).finally(() => setLoading(false)) }}>Try again</button></div> : <StudentDirectory students={students} onSelect={setSelectedStudent} onAdd={openAddStudent}/>}
      </> : <StudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} onEdit={() => { setEditingStudent(selectedStudent); setStudentModalOpen(true) }} onDelete={removeStudent} onSubjectsChange={changeStudentSubjects}/>}
    </div></main>
    {studentModalOpen && <StudentFormModal student={editingStudent} onClose={() => { setStudentModalOpen(false); setEditingStudent(null) }} onSave={saveStudent}/>}
    <Toast notification={notification} onDismiss={dismissNotification}/>
  </div>
}
