import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AuthPage } from './pages/AuthPage'
import { CloudIndexPage } from './pages/CloudIndexPage'
import { CloudPage } from './pages/CloudPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { APP_CONFIG } from './lib/config'
import { supabase } from './lib/supabase'

function getUserName(session) {
  if (!session) {
    return APP_CONFIG.builtBy
  }

  if (session.user.user_metadata?.full_name) {
    return session.user.user_metadata.full_name
  }

  if (session.user.email) {
    return session.user.email.split('@')[0]
  }

  return APP_CONFIG.builtBy
}

export default function App() {
  const location = useLocation()
  const [userName, setUserName] = useState(APP_CONFIG.builtBy)
  const [authed, setAuthed] = useState(false)
  const [authResolved, setAuthResolved] = useState(!supabase)

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return

      const session = data.session
      setAuthed(Boolean(session))
      setUserName(getUserName(session))
      setAuthResolved(true)
    }).catch(() => {
      if (!active) return
      setAuthed(false)
      setUserName(APP_CONFIG.builtBy)
      setAuthResolved(true)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return
      setAuthed(Boolean(session))
      setUserName(getUserName(session))
      setAuthResolved(true)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut()
    }

    setAuthed(false)
    setUserName(APP_CONFIG.builtBy)
  }

  function handleAuthed() {
    setAuthed(true)
  }

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <AuthPage
        key={location.pathname}
        initialMode={location.pathname === '/signup' ? 'signup' : 'login'}
        onAuthed={handleAuthed}
      />
    )
  }

  return (
    <AppShell userName={userName} authed={authed} logout={logout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cloud" element={<CloudIndexPage />} />
        <Route path="/cloud/:chapterSlug/*" element={<CloudPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:companySlug" element={<CompanyPage />} />
        <Route
          path="/profile"
          element={
            !authResolved ? (
              <div className="profile-loading mono">LOADING PROFILE</div>
            ) : authed ? (
              <ProfilePage userName={userName} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
