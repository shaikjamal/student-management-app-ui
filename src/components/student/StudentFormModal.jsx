import { useState } from 'react'
import Icon from '../common/Icon'
import SubjectCheckboxes from './SubjectCheckboxes'

export default function StudentFormModal({ student, onClose, onSave }) {
  const editing = Boolean(student)
  const [fields, setFields] = useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    email: student?.email || '',
    grade: student?.grade === '—' ? '' : student?.grade || '',
    subjects: Array.isArray(student?.subjects) ? student.subjects : [],
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      await onSave({ ...fields, firstName: fields.firstName.trim(), lastName: fields.lastName.trim(), email: fields.email.trim() })
    } catch (saveError) {
      setError(saveError.message || 'Could not save this student.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><button className="modal-close" type="button" aria-label="Close" onClick={onClose}><Icon name="close" size={18}/></button><div className="eyebrow">STUDENT DIRECTORY</div><h2 id="student-modal-title">{editing ? 'Update student' : 'Add a student'}</h2><p className="modal-subtitle">{editing ? 'Edit this student’s information.' : 'Add a student to your class directory.'}</p><form onSubmit={submit}><label>First name<input name="firstName" value={fields.firstName} onChange={(event) => setFields({ ...fields, firstName: event.target.value })} autoComplete="given-name" required maxLength={100}/></label><label>Last name<input name="lastName" value={fields.lastName} onChange={(event) => setFields({ ...fields, lastName: event.target.value })} autoComplete="family-name" required maxLength={100}/></label><label>Email address<input name="email" type="email" value={fields.email} onChange={(event) => setFields({ ...fields, email: event.target.value })} autoComplete="email" required/></label><label>Grade / class<input name="grade" value={fields.grade} onChange={(event) => setFields({ ...fields, grade: event.target.value })} placeholder="e.g. 10-A" required maxLength={30}/></label><fieldset className="student-subject-fieldset"><legend>Subjects</legend><p>Select the subjects this student is taking.</p><SubjectCheckboxes selected={fields.subjects} onChange={(subjects) => setFields({ ...fields, subjects })}/></fieldset>{error && <div className="auth-error" role="alert">{error}</div>}<div className="modal-actions"><button className="button button-outline" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Add student'}</button></div></form></section></div>
}
