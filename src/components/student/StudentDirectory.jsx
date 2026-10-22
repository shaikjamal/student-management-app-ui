import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../common/Icon'

export default function StudentDirectory({ students, onSelect, onAdd }) {
  const [query, setQuery] = useState('')
  const [grade, setGrade] = useState('All grades')
  const [gradeMenuOpen, setGradeMenuOpen] = useState(false)
  const gradeFilterRef = useRef(null)
  const grades = useMemo(() => [...new Set(students.map((student) => student.grade).filter(Boolean))], [students])
  const visible = students.filter((student) => {
    const searchable = `${student.firstName} ${student.lastName} ${student.email} ${student.grade}`.toLowerCase()
    return searchable.includes(query.toLowerCase()) && (grade === 'All grades' || student.grade === grade)
  })

  useEffect(() => {
    if (!gradeMenuOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!gradeFilterRef.current?.contains(event.target)) setGradeMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [gradeMenuOpen])

  return <>
    <div className="section-heading"><div><div className="eyebrow">THE PEOPLE IN YOUR CLASS</div><h2>All students <span>{students.length}</span></h2></div><div className="directory-heading-actions"><div className="class-term"><span className="class-dot"/>Active class <strong>2026</strong></div><button className="button button-primary add-student-button" type="button" onClick={onAdd}><Icon name="plus" size={15}/>Add student</button></div></div>
    <div className="directory-toolbar"><label className="search-box"><Icon name="search" size={17}/><input aria-label="Search students" placeholder="Find a student by name, email or grade..." value={query} onChange={(event) => setQuery(event.target.value)}/>{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</label><div className="filter-select"><span>Grade</span><div className="grade-filter" ref={gradeFilterRef}><button className="grade-filter-trigger" type="button" aria-haspopup="listbox" aria-expanded={gradeMenuOpen} aria-controls="grade-options" onClick={() => setGradeMenuOpen((open) => !open)} onKeyDown={(event) => { if (event.key === 'Escape') setGradeMenuOpen(false) }}><span>{grade}</span><Icon name="chevron" size={14}/></button>{gradeMenuOpen && <div className="grade-menu" id="grade-options" role="listbox" aria-label="Filter by grade">{['All grades', ...grades].map((item) => <button className={`grade-option ${grade === item ? 'selected' : ''}`} key={item} type="button" role="option" aria-selected={grade === item} onClick={() => { setGrade(item); setGradeMenuOpen(false) }}>{item}{grade === item && <span className="grade-check">✓</span>}</button>)}</div>}</div></div></div>
    <div className="student-list">{visible.map((student, index) => <button className="student-row student-row-button" key={student.id || `${student.firstName}-${index}`} type="button" onClick={() => onSelect(student)}><span className={`list-avatar color-${index % 5}`}>{student.firstName?.[0] || '?'}{student.lastName?.[0] || ''}</span><span className="student-list-name"><strong>{student.firstName} {student.lastName}</strong><span>{student.email || 'No email on file'}</span></span><span className="student-grade"><span>GRADE</span><strong>{student.grade}</strong></span><span className="student-status"><i/>{student.status || 'Enrolled'}</span><span className="row-action" aria-hidden="true"><Icon name="chevron" size={16}/></span></button>)}{visible.length === 0 && <div className="empty-state"><span className="empty-icon"><Icon name="search" size={20}/></span><strong>No students found</strong><p>Try another name or choose a different grade.</p><button className="text-button" onClick={() => { setQuery(''); setGrade('All grades') }}>Clear filters</button></div>}</div>
    <footer className="page-footer"><span>Your classroom, thoughtfully organized.</span><span>Showing {visible.length} of {students.length} students</span></footer>
  </>
}
