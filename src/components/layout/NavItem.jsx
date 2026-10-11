import { Link, useLocation } from 'react-router-dom'

export function NavItem({ to, label, onClick }) {
  const location = useLocation()
  let active = false

  if (to === '/') {
    active = location.pathname === '/'
  } else {
    active = location.pathname.startsWith(to)
  }

  let className = 'nav-link'
  if (active) {
    className += ' active'
  }

  return <Link className={className} to={to} onClick={onClick}>{label}</Link>
}
