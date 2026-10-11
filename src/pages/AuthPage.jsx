import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { supabase } from '../lib/supabase'

export function AuthPage({ onAuthed, initialMode = 'login' }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    if (!supabase) {
      setLoading(false)
      onAuthed()
      navigate('/')
      return
    }

    let result

    if (mode === 'login') {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({ email, password })
    }

    if (result.error) {
      setError(result.error.message)
    } else if (mode === 'signup' && !result.data.session) {
      setError('Account created. Check your email to confirm the address.')
    } else {
      onAuthed()
      setLoading(false)
      navigate('/')
      return
    }

    setLoading(false)
  }

  async function google() {
    setError('')

    if (!supabase) {
      setError('Google sign-in requires Supabase configuration.')
      return
    }

    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (result.error) {
      setError(result.error.message)
    }
  }

  function switchMode() {
    const nextMode = mode === 'login' ? 'signup' : 'login'
    setMode(nextMode)
    setError('')
    navigate(nextMode === 'signup' ? '/signup' : '/login', { replace: true })
  }

  let kicker = 'WELCOME BACK'
  let title = 'Continue learning.'
  let buttonText = 'Login'
  let switchText = 'Need an account? Sign up'

  if (mode === 'signup') {
    kicker = 'CREATE ACCOUNT'
    title = 'Start learning.'
    buttonText = 'Sign up'
    switchText = 'Already have an account? Login'
  }

  return (
    <div className="auth-screen">
      <ThemeToggle className="auth-theme-toggle" />
      <div className="auth-panel">
        <Link to="/" className="auth-brand mono">KISO</Link>
        <span className="mono section-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p className="lead">Access Cloud lessons and interview intelligence with your Kiso account.</p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="button button-accent full" disabled={loading}>
            {loading ? 'Please wait' : buttonText}
          </button>
        </form>

        <div className="auth-divider mono">OR</div>

        <button
          className="button button-outline full google-button"
          onClick={google}
          disabled={loading}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
            <path fill="currentColor" d="M21.35 12.23c0-.7-.06-1.37-.18-2H12v3.79h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.18Z" />
            <path fill="currentColor" d="M12 21.64c2.64 0 4.86-.87 6.48-2.36l-3.14-2.45c-.87.58-1.98.93-3.34.93-2.56 0-4.73-1.73-5.5-4.05H3.25v2.53A9.8 9.8 0 0 0 12 21.64Z" />
            <path fill="currentColor" d="M6.5 13.71A5.9 5.9 0 0 1 6.19 12c0-.59.11-1.17.31-1.71V7.76H3.25A9.8 9.8 0 0 0 2.2 12c0 1.58.38 3.07 1.05 4.24L6.5 13.71Z" />
            <path fill="currentColor" d="M12 6.24c1.44 0 2.73.5 3.75 1.48l2.8-2.8C16.86 3.31 14.64 2.36 12 2.36a9.8 9.8 0 0 0-8.75 5.4L6.5 10.29C7.27 7.97 9.44 6.24 12 6.24Z" />
          </svg>
          Continue with Google
        </button>

        <button className="auth-switch mono" onClick={switchMode}>
          {switchText}
        </button>
      </div>
    </div>
  )
}
