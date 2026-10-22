import { formatDate } from '../../data/student'
import Icon from '../common/Icon'

export default function EnrollmentCard({ student }) {
  return (
    <section className="card enrollment-card">
      <div className="card-heading"><div><h3>Enrollment</h3><p>Current academic placement</p></div><span className="enrollment-icon"><Icon name="book" size={18}/></span></div>
      <div className="enrollment-grade"><span>Current grade</span><strong>{student.grade}</strong></div>
      <div className="enrollment-footer"><span>Enrollment date</span><strong><Icon name="calendar" size={15}/>{formatDate(student.createdAt)}</strong></div>
    </section>
  )
}

