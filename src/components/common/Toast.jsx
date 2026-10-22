import { useEffect } from 'react'
import Icon from './Icon'

export default function Toast({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return undefined
    const timer = window.setTimeout(onDismiss, 5000)
    return () => window.clearTimeout(timer)
  }, [notification, onDismiss])

  if (!notification) return null

  return <div className={`toast-notification ${notification.type === 'delete' ? 'toast-delete' : ''}`} role="status" aria-live="polite"><span className="toast-check">{notification.type === 'delete' ? <Icon name="trash" size={13}/> : '✓'}</span><span className="toast-message">{notification.message}</span><button className="toast-dismiss" type="button" aria-label="Dismiss notification" onClick={onDismiss}><Icon name="close" size={15}/></button><span className="toast-progress"/></div>
}
