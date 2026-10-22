import { formatDate } from '../../data/student'
import Icon from '../common/Icon'

export default function StudentProfileHeader({ student }) {
  const initials = `${student.firstName?.[0] || ''}${student.lastName?.[0] || ''}`
  return (
    <section className="profile-banner" aria-label="Student summary">
      <div className="profile-main"><div className="student-avatar">{initials || '?'}<span className="online-dot"/></div><div className="student-intro"><div className="name-row"><h2>{student.firstName} {student.lastName}</h2><span className="status-pill"><span/>{student.status || 'Enrolled'}</span></div><div className="student-subline">Grade {student.grade}<span className="subline-dot">·</span>Student since {formatDate(student.createdAt)}</div></div></div>
      <a className="button button-primary email-button" href={`mailto:${student.email}`}><Icon name="mail" size={17}/>Send email</a>
    </section>
  )
}

