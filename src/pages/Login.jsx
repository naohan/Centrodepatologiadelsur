import { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import logoImg from '../assets/logo-centro-patologia.png'

export function Login() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = useMemo(() => location.state?.from || '/admin', [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) return <Navigate to="/admin" replace />

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-bg-tint via-white to-soft-blue">
      <Container className="flex min-h-[100svh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border-clinic bg-white/85 p-8 shadow-[var(--shadow-card)] backdrop-blur-md sm:p-10">
          <div className="flex justify-center">
            <img
              src={logoImg}
              alt="Logo Centro de Patología del Sur"
              className="h-12 w-auto object-contain sm:h-14"
              width={220}
              height={56}
              decoding="async"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue text-primary">
              <Lock className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-text-dark">Acceso de personal</p>
              <p className="text-xs text-text-muted">Solo usuarios registrados por el administrador</p>
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-dark">
                Correo
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/20">
                <Mail className="h-4 w-4 text-text-muted" aria-hidden />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@correo.com"
                  className="w-full bg-transparent text-sm text-text-dark outline-none placeholder:text-text-muted/70"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text-dark">
                Contraseña
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/20">
                <input
                  id="password"
                  name="password"
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-transparent text-sm text-text-dark outline-none placeholder:text-text-muted/70"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-soft-blue/60 hover:text-primary"
                  aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a href="/" className="text-xs font-semibold text-secondary hover:underline">
                Volver al inicio
              </a>
              <PrimaryButton type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

