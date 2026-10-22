import Icon from '../common/Icon'

export default function PersonalInformationCard({ student, onEdit }) {
  return (
    <section className="card details-card">
      <div className="card-heading"><div><h3>Personal information</h3><p>Student details and contact information</p></div><button className="text-button" type="button" onClick={onEdit}>Edit profile <Icon name="arrow" size={15}/></button></div>
      <div className="detail-grid">
        <div className="detail-item"><span className="detail-label">FIRST NAME</span><strong>{student.firstName}</strong></div>
        <div className="detail-item"><span className="detail-label">LAST NAME</span><strong>{student.lastName}</strong></div>
        <div className="detail-item"><span className="detail-label">EMAIL ADDRESS</span><a href={`mailto:${student.email}`}>{student.email}</a></div>
        <div className="detail-item"><span className="detail-label">GRADE / CLASS</span><strong>{student.grade}</strong></div>
      </div>
    </section>
  )
}

