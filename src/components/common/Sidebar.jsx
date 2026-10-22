import Icon from './Icon'

const navigation = [
  { label: 'Overview', icon: 'grid', href: '#overview' },
  { label: 'Students', icon: 'people', href: '#students', active: true },
  { label: 'Classes', icon: 'book', href: '#classes' },
  { label: 'Reports', icon: 'chart', href: '#reports' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" aria-label="Scholar home"><span className="brand-mark">s</span><span>scholar<span className="brand-dot">.</span></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map((item) => <a key={item.label} className={item.active ? 'active' : ''} href={item.href} aria-current={item.active ? 'page' : undefined}><Icon name={item.icon}/>{item.label}{item.active && <span className="nav-count">128</span>}</a>)}
      </nav>
      <div className="sidebar-bottom">
        <a href="#settings"><Icon name="settings"/>Settings</a>
        <div className="sidebar-divider"/>
        <div className="user-chip"><span className="user-avatar">JD</span><span className="user-meta"><strong>Jordan Davis</strong><small>Administrator</small></span><Icon name="more" size={17}/></div>
      </div>
    </aside>
  )
}

