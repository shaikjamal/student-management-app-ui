import Icon from '../common/Icon'

export default function TeacherProfileDetails({ teacher }) {
  const displayName = teacher.name || [teacher.firstName, teacher.lastName].filter(Boolean).join(' ') || 'Teacher'
  const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return <>
    <div className="breadcrumb"><span>My classroom</span><Icon name="chevron" size={14}/><span>Teacher profile</span></div>
    <div className="page-heading"><div><div className="eyebrow">YOUR ACCOUNT</div><h1>Teacher profile</h1><p className="page-subtitle">Your personal and teaching information.</p></div></div>
    <section className="teacher-profile-banner"><div className="teacher-profile-avatar">{initials}</div><div className="teacher-profile-intro"><span className="eyebrow">TEACHER</span><h2>{displayName}</h2><p>{teacher.subject || 'Subject not provided'}</p></div><span className="teacher-profile-badge"><i/>Active account</span></section>
    <section className="card teacher-details-card"><div className="card-heading"><div><h3>Personal information</h3><p>Details associated with your teacher account</p></div><span className="enrollment-icon"><Icon name="people" size={18}/></span></div><div className="detail-grid"><div className="detail-item"><span className="detail-label">FIRST NAME</span><strong>{teacher.firstName || displayName.split(' ')[0]}</strong></div><div className="detail-item"><span className="detail-label">LAST NAME</span><strong>{teacher.lastName || displayName.split(' ').slice(1).join(' ') || '—'}</strong></div><div className="detail-item"><span className="detail-label">TEACHER EMAIL</span><a href={`mailto:${teacher.email}`}>{teacher.email || '—'}</a></div><div className="detail-item"><span className="detail-label">SUBJECT</span><strong>{teacher.subject || '—'}</strong></div><div className="detail-item"><span className="detail-label">TEACHER ID</span><strong>{teacher.id || teacher._id || '—'}</strong></div></div></section>
  </>
}
