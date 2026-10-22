import { useState } from 'react'
import { formatDate } from '../../data/student'
import Icon from '../common/Icon'

export default function StudentRecordCard({ student }) {
  const [copied, setCopied] = useState(false)

  async function copyId() {
    try {
      await navigator.clipboard.writeText(student.id)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="card record-card">
      <div className="card-heading"><div><h3>Student record</h3><p>System record information</p></div><span className="record-icon">ID</span></div>
      <div className="record-id"><span className="detail-label">STUDENT ID</span><div><code>{student.id}</code><button className={`copy-button ${copied ? 'copied' : ''}`} type="button" onClick={copyId} aria-label={copied ? 'Student ID copied' : 'Copy student ID'} title={copied ? 'Copied' : 'Copy ID'}><Icon name="copy" size={16}/></button></div>{copied && <span className="copy-feedback" role="status">ID copied to clipboard</span>}</div>
      <div className="record-timestamps"><div><span>Created</span><strong>{formatDate(student.createdAt)}</strong></div><div><span>Last updated</span><strong>{formatDate(student.updatedAt)}</strong></div></div>
    </section>
  )
}

