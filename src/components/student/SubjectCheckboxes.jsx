import Icon from '../common/Icon'
import { subjects } from '../../data/subjects'

export default function SubjectCheckboxes({ selected, onChange, disabled = false }) {
  return <div className="subjects-grid">{subjects.map((subject) => <label className={`subject-option ${selected.includes(subject) ? 'checked' : ''}`} key={subject}><input type="checkbox" checked={selected.includes(subject)} disabled={disabled} onChange={() => onChange(selected.includes(subject) ? selected.filter((item) => item !== subject) : [...selected, subject])}/><span className="subject-checkbox">{selected.includes(subject) && <Icon name="check" size={13}/>}</span><span>{subject}</span></label>)}</div>
}
