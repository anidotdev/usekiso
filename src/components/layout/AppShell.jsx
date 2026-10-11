import { useState } from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { BuiltBy } from './BuiltBy'
import { NavItem } from './NavItem'
import { LogoutDialog } from './LogoutDialog'
import { ThemeToggle } from './ThemeToggle'

export function AppShell({ children, userName, authed, logout }) {
  const navigate = useNavigate()
  const [mobileNav, setMobileNav] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  function openLogout() {
    setLogoutOpen(true)
  }

  function closeLogout() {
    setLogoutOpen(false)
  }

  function toggleMobileNav() {
    setMobileNav(!mobileNav)
  }

  async function confirmLogout() {
    setLogoutOpen(false)
    await logout()
    navigate('/')
  }

  function closeMobileNav() {
    setMobileNav(false)
  }

  let navClass = 'nav-links'
  if (mobileNav) {
    navClass += ' nav-open'
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link to="/" className="brand">KISO</Link>

        <nav className={navClass} aria-label="Main navigation">
          <NavItem to="/" label="Home" onClick={closeMobileNav} />
          <NavItem to="/cloud" label="Cloud" onClick={closeMobileNav} />
          <NavItem to="/companies" label="Companies" onClick={closeMobileNav} />
          {!authed && (
            <Link className="nav-link nav-mobile-login" to="/login" onClick={closeMobileNav}>
              Log in
            </Link>
          )}
        </nav>

        <div className="nav-right">
          <ThemeToggle />
          {authed ? (
            <>
              <Link
                to="/profile"
                className="profile-chip"
                aria-label={`Open ${userName}'s profile`}
              >
                {userName.slice(0, 1).toUpperCase()}
              </Link>
              <button className="logout-btn" onClick={openLogout}>
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link className="nav-auth-login" to="/login">Log in</Link>
              <Link className="nav-auth-signup" to="/signup">Sign up</Link>
            </>
          )}
          <button
            className="mobile-menu"
            onClick={toggleMobileNav}
            aria-label="Toggle navigation"
            aria-expanded={mobileNav}
          >
            {mobileNav ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <main>{children}</main>
      <footer className="footer-wrap"><BuiltBy /></footer>

      {logoutOpen && (
        <LogoutDialog onCancel={closeLogout} onConfirm={confirmLogout} />
      )}
    </div>
  )
}
