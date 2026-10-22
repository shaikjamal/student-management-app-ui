import { useState } from 'react'
import SubjectCheckboxes from './SubjectCheckboxes'

export default function StudentSubjectsCard({ student, onSubjectsChange }) {
  const selected = Array.isArray(student.subjects) ? student.subjects : []
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const changeSubjects = async (nextSubjects) => {
    setSaving(true)
    setError('')
    try {
      await onSubjectsChange(nextSubjects)
    } catch (saveError) {
      setError(saveError.message || 'Could not update this student’s subjects.')
    } finally {
      setSaving(false)
    }
  }

  return <section className="card subjects-card"><div className="card-heading"><div><h3>Subjects</h3><p>Select the subjects this student is taking</p></div><span className="subject-count">{selected.length} selected</span></div><SubjectCheckboxes selected={selected} onChange={changeSubjects} disabled={saving}/>{error && <div className="auth-error subject-error" role="alert">{error}</div>}{saving && <span className="subject-save-status" role="status">Saving subjects…</span>}</section>
}
