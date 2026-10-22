import { useState } from 'react'
import Icon from '../common/Icon'
import EnrollmentCard from './EnrollmentCard'
import PersonalInformationCard from './PersonalInformationCard'
import StudentProfileHeader from './StudentProfileHeader'
import StudentRecordCard from './StudentRecordCard'
import StudentSubjectsCard from './StudentSubjectsCard'

export default function StudentProfile({ student, onBack, onEdit, onDelete, onSubjectsChange }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const deleteStudent = async () => {
    setDeleting(true)
    setError('')
    try {
      await onDelete()
    } catch (deleteError) {
      setError(deleteError.message || 'Could not delete this student.')
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  return <>
    <div className="breadcrumb"><button className="breadcrumb-back" onClick={onBack} type="button">Students</button><Icon name="chevron" size={14}/><span>{student.firstName} {student.lastName}</span></div>
    <div className="page-heading"><div><div className="eyebrow">STUDENT DIRECTORY</div><h1>Student profile</h1><p className="page-subtitle">View and manage student information.</p></div><div className="profile-actions"><button className="button button-outline button-back-students" type="button" onClick={onBack}><Icon name="chevron" size={16}/><span>Back to students</span></button><button className="button button-primary button-update-student" type="button" onClick={onEdit}><Icon name="arrow" size={15}/><span>Update student</span></button><button className="button button-danger-outline button-delete-student" type="button" onClick={() => setConfirmDelete(true)}><Icon name="trash" size={15}/><span>Delete</span></button></div></div>
    {error && <div className="auth-error profile-action-error" role="alert">{error}</div>}
    <StudentProfileHeader student={student}/>
    <div className="content-grid"><PersonalInformationCard student={student} onEdit={onEdit}/><EnrollmentCard student={student}/><StudentRecordCard student={student}/><StudentSubjectsCard student={student} onSubjectsChange={onSubjectsChange}/></div>
    {confirmDelete && <div className="modal-backdrop" role="presentation"><section className="student-modal delete-confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-student-title"><div className="delete-icon"><Icon name="trash" size={18}/></div><h2 id="delete-student-title">Delete this student?</h2><p className="modal-subtitle">This will permanently remove {student.firstName} {student.lastName} from your student directory.</p>{error && <div className="auth-error" role="alert">{error}</div>}<div className="modal-actions"><button className="button button-outline" type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}>Cancel</button><button className="button button-danger" type="button" onClick={deleteStudent} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete student'}</button></div></section></div>}
  </>
}
