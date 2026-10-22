import { useState } from 'react'
import Icon from '../common/Icon'
import { loginTeacher, registerTeacher } from '../../api/teachers'

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const register = mode === 'register'
  const update = (event) => setFields({ ...fields, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const result = register
        ? await registerTeacher({ firstName: fields.firstName.trim(), lastName: fields.lastName.trim(), email: fields.email.trim(), password: fields.password })
        : await loginTeacher({ email: fields.email.trim(), password: fields.password })
      if (!result?.teacher || !result?.token) throw new Error('The server response did not include a teacher and token.')
      onLogin(result)
    } catch (submitError) {
      setError(submitError.message || 'Unable to complete your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <main className="auth-page"><section className="auth-story"><a className="brand auth-brand" href="#home"><span className="brand-mark">s</span><span>scholar<span className="brand-dot">.</span></span></a><div className="story-copy"><span className="story-kicker">A calmer school day starts here</span><h1>Make room for<br/><em>every student.</em></h1><p>Your people, your classroom, and every little win—together in one thoughtful place.</p><div className="story-note"><span className="note-icon"><Icon name="people" size={18}/></span><div><strong>One place for your class</strong><small>See the whole picture, at a glance.</small></div></div></div><div className="story-footer"><span>Made for the people who make a difference.</span><span className="story-orbit orbit-one"/><span className="story-orbit orbit-two"/></div></section><section className="auth-panel"><div className="auth-card"><div className="auth-eyebrow">TEACHER PORTAL</div><h2>{register ? 'Join your school' : 'Welcome back'}</h2><p className="auth-subtitle">{register ? 'Create an account to meet your new classroom.' : 'Sign in to see what’s happening in your classroom.'}</p><div className="auth-tabs" role="tablist" aria-label="Account access"><button type="button" className={!register ? 'selected' : ''} onClick={() => { setMode('login'); setError('') }}>Sign in</button><button type="button" className={register ? 'selected' : ''} onClick={() => { setMode('register'); setError('') }}>Create account</button></div><form onSubmit={submit}>{register && <><label>First name<input name="firstName" autoComplete="given-name" placeholder="e.g. Maya" value={fields.firstName} onChange={update} required/></label><label>Last name<input name="lastName" autoComplete="family-name" placeholder="e.g. Fernando" value={fields.lastName} onChange={update} required/></label></>}<label>Teacher email<input name="email" type="email" autoComplete="email" placeholder="you@school.edu" value={fields.email} onChange={update} required/></label><label>Password<input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={6} placeholder="At least 6 characters" value={fields.password} onChange={update} required/></label>{error && <div className="auth-error" role="alert">{error}</div>}<button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Please wait…' : register ? 'Create teacher account' : 'Sign in to your account'}<Icon name="chevron" size={15}/></button></form><div className="auth-privacy"><span>⌑</span> Your classroom, kept private.</div></div><div className="auth-help">Need a hand? <a href="mailto:support@scholar.school">Talk to our team</a></div></section></main>
}

export default AuthPage
