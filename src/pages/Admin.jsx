import { useEffect, useMemo, useState } from 'react'
import { LogOut, RefreshCw, ClipboardList, UserPlus, TestTube2, FileText } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition placeholder:text-text-muted/70 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 ${
        props.className || ''
      }`}
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full min-h-[96px] resize-y rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition placeholder:text-text-muted/70 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 ${
        props.className || ''
      }`}
    />
  )
}

export function Admin() {
  const { user, token, logout, canWrite } = useAuth()

  const [active, setActive] = useState('informes') // pacientes | muestras | informes
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [pacientes, setPacientes] = useState([])
  const [muestras, setMuestras] = useState([])
  const [informes, setInformes] = useState([])

  const [pForm, setPForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    telefono: '',
    correo: '',
    direccion: '',
    observaciones: '',
  })

  const [mForm, setMForm] = useState({
    codigo_muestra: '',
    paciente_id: '',
    tipo_estudio: '',
    origen_muestra: '',
    estado: '',
    observaciones: '',
  })

  const [iForm, setIForm] = useState({
    muestra_id: '',
    numero_informe: '',
    numero_boleta: '',
    muestra: '',
    datos_clinicos: '',
    diagnostico: '',
    descripcion_macroscopica: '',
    nota: '',
    estado_entrega: '',
  })

  const header = useMemo(() => {
    const role = user?.rol ? String(user.rol) : '-'
    return { name: user?.nombre || user?.email || 'Usuario', role }
  }, [user])

  async function refreshAll() {
    setError('')
    setLoading(true)
    try {
      const [p, m, i] = await Promise.all([
        api.pacientes.list({ token, limit: 50, offset: 0 }),
        api.muestras.list({ token, limit: 50, offset: 0 }),
        api.informes.list({ token, limit: 50, offset: 0 }),
      ])
      setPacientes(Array.isArray(p) ? p : [])
      setMuestras(Array.isArray(m) ? m : [])
      setInformes(Array.isArray(i) ? i : [])
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCreatePaciente(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.pacientes.create({
        token,
        payload: {
          ...pForm,
          correo: pForm.correo ? pForm.correo : null,
          telefono: pForm.telefono ? pForm.telefono : null,
          direccion: pForm.direccion ? pForm.direccion : null,
          observaciones: pForm.observaciones ? pForm.observaciones : null,
        },
      })
      setPForm({ nombres: '', apellidos: '', dni: '', telefono: '', correo: '', direccion: '', observaciones: '' })
      await refreshAll()
      setActive('muestras')
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateMuestra(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.muestras.create({
        token,
        payload: {
          ...mForm,
          paciente_id: Number(mForm.paciente_id),
          tipo_estudio: mForm.tipo_estudio ? mForm.tipo_estudio : null,
          origen_muestra: mForm.origen_muestra ? mForm.origen_muestra : null,
          estado: mForm.estado ? mForm.estado : null,
          observaciones: mForm.observaciones ? mForm.observaciones : null,
        },
      })
      setMForm({ codigo_muestra: '', paciente_id: '', tipo_estudio: '', origen_muestra: '', estado: '', observaciones: '' })
      await refreshAll()
      setActive('informes')
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateInforme(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.informes.create({
        token,
        payload: {
          ...iForm,
          muestra_id: Number(iForm.muestra_id),
          numero_boleta: iForm.numero_boleta ? iForm.numero_boleta : null,
          muestra: iForm.muestra ? iForm.muestra : null,
          datos_clinicos: iForm.datos_clinicos ? iForm.datos_clinicos : null,
          diagnostico: iForm.diagnostico ? iForm.diagnostico : null,
          descripcion_macroscopica: iForm.descripcion_macroscopica ? iForm.descripcion_macroscopica : null,
          nota: iForm.nota ? iForm.nota : null,
          estado_entrega: iForm.estado_entrega ? iForm.estado_entrega : null,
        },
      })
      setIForm({
        muestra_id: '',
        numero_informe: '',
        numero_boleta: '',
        muestra: '',
        datos_clinicos: '',
        diagnostico: '',
        descripcion_macroscopica: '',
        nota: '',
        estado_entrega: '',
      })
      await refreshAll()
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'informes', label: 'Informes', Icon: FileText },
    { id: 'muestras', label: 'Muestras', Icon: TestTube2 },
    { id: 'pacientes', label: 'Pacientes', Icon: UserPlus },
  ]

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-bg-tint via-white to-soft-blue">
      <div className="border-b border-border-clinic bg-white/80 backdrop-blur-xl">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Panel</p>
            <p className="mt-1 truncate text-lg font-semibold text-text-dark">Administración</p>
            <p className="mt-1 text-xs text-text-muted">
              {header.name} · <span className="font-semibold">{header.role}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refreshAll}
              className="inline-flex items-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-soft-blue/60 disabled:opacity-60"
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Actualizar
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-text-dark shadow-sm hover:bg-soft-blue/60"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Salir
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-border-clinic bg-white/70 p-5 shadow-[var(--shadow-soft)]">
            <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Módulos</p>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const selected = tab.id === active
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActive(tab.id)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      selected ? 'bg-soft-blue text-primary' : 'text-text-dark hover:bg-soft-blue/60'
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${selected ? 'bg-white' : 'bg-bg-tint/70'}`}>
                      <tab.Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 truncate">{tab.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-border-clinic bg-bg-tint/60 p-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-secondary" aria-hidden />
                <p className="text-xs font-semibold text-text-dark">Estado</p>
              </div>
              <p className="mt-2 text-xs text-text-muted">
                {loading ? 'Procesando...' : error ? 'Hay errores por revisar' : 'Listo para registrar'}
              </p>
              {error ? (
                <p className="mt-2 text-xs font-semibold text-red-700">
                  {error}
                </p>
              ) : null}
              {!canWrite ? (
                <p className="mt-2 text-xs text-text-muted">
                  Tu rol es de solo lectura: no podrás crear/editar.
                </p>
              ) : null}
            </div>
          </aside>

          <section className="rounded-3xl border border-border-clinic bg-white/75 p-6 shadow-[var(--shadow-card)] sm:p-8">
            {active === 'pacientes' ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text-dark">Pacientes</p>
                    <p className="mt-1 text-xs text-text-muted">Crea un paciente para luego registrar muestras e informes.</p>
                  </div>
                  <span className="rounded-full border border-border-clinic bg-white px-3 py-1 text-xs font-semibold text-text-muted">
                    {pacientes.length} items
                  </span>
                </div>

                <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleCreatePaciente}>
                  <Field label="Nombres">
                    <Input value={pForm.nombres} onChange={(e) => setPForm((s) => ({ ...s, nombres: e.target.value }))} required />
                  </Field>
                  <Field label="Apellidos">
                    <Input value={pForm.apellidos} onChange={(e) => setPForm((s) => ({ ...s, apellidos: e.target.value }))} required />
                  </Field>
                  <Field label="DNI (8 dígitos)">
                    <Input value={pForm.dni} onChange={(e) => setPForm((s) => ({ ...s, dni: e.target.value }))} required />
                  </Field>
                  <Field label="Teléfono (opcional)">
                    <Input value={pForm.telefono} onChange={(e) => setPForm((s) => ({ ...s, telefono: e.target.value }))} />
                  </Field>
                  <Field label="Correo (opcional)">
                    <Input type="email" value={pForm.correo} onChange={(e) => setPForm((s) => ({ ...s, correo: e.target.value }))} />
                  </Field>
                  <Field label="Dirección (opcional)">
                    <Input value={pForm.direccion} onChange={(e) => setPForm((s) => ({ ...s, direccion: e.target.value }))} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Observaciones (opcional)">
                      <Textarea value={pForm.observaciones} onChange={(e) => setPForm((s) => ({ ...s, observaciones: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-text-muted">Después podrás seleccionar el paciente para crear la muestra.</p>
                    <PrimaryButton type="submit" className="w-full sm:w-auto" disabled={loading || !canWrite}>
                      Registrar paciente
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            ) : null}

            {active === 'muestras' ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text-dark">Muestras</p>
                    <p className="mt-1 text-xs text-text-muted">Vincula la muestra a un paciente y luego genera el informe.</p>
                  </div>
                  <span className="rounded-full border border-border-clinic bg-white px-3 py-1 text-xs font-semibold text-text-muted">
                    {muestras.length} items
                  </span>
                </div>

                <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleCreateMuestra}>
                  <Field label="Código de muestra">
                    <Input value={mForm.codigo_muestra} onChange={(e) => setMForm((s) => ({ ...s, codigo_muestra: e.target.value }))} required />
                  </Field>
                  <Field label="Paciente">
                    <select
                      value={mForm.paciente_id}
                      onChange={(e) => setMForm((s) => ({ ...s, paciente_id: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="">Selecciona paciente</option>
                      {pacientes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.dni} — {p.nombres} {p.apellidos}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tipo de estudio (opcional)">
                    <Input value={mForm.tipo_estudio} onChange={(e) => setMForm((s) => ({ ...s, tipo_estudio: e.target.value }))} />
                  </Field>
                  <Field label="Origen (opcional)">
                    <Input value={mForm.origen_muestra} onChange={(e) => setMForm((s) => ({ ...s, origen_muestra: e.target.value }))} />
                  </Field>
                  <Field label="Estado (opcional)">
                    <Input value={mForm.estado} onChange={(e) => setMForm((s) => ({ ...s, estado: e.target.value }))} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Observaciones (opcional)">
                      <Textarea value={mForm.observaciones} onChange={(e) => setMForm((s) => ({ ...s, observaciones: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-text-muted">Necesitas un paciente creado previamente.</p>
                    <PrimaryButton type="submit" className="w-full sm:w-auto" disabled={loading || !canWrite}>
                      Registrar muestra
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            ) : null}

            {active === 'informes' ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text-dark">Informes</p>
                    <p className="mt-1 text-xs text-text-muted">Crea el informe y quedará disponible para consulta de resultados.</p>
                  </div>
                  <span className="rounded-full border border-border-clinic bg-white px-3 py-1 text-xs font-semibold text-text-muted">
                    {informes.length} items
                  </span>
                </div>

                <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleCreateInforme}>
                  <Field label="Muestra">
                    <select
                      value={iForm.muestra_id}
                      onChange={(e) => setIForm((s) => ({ ...s, muestra_id: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="">Selecciona muestra</option>
                      {muestras.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.codigo_muestra} — Paciente #{m.paciente_id}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="N° Informe">
                    <Input value={iForm.numero_informe} onChange={(e) => setIForm((s) => ({ ...s, numero_informe: e.target.value }))} required />
                  </Field>
                  <Field label="N° Boleta (opcional)">
                    <Input value={iForm.numero_boleta} onChange={(e) => setIForm((s) => ({ ...s, numero_boleta: e.target.value }))} />
                  </Field>
                  <Field label="Estado de entrega (opcional)">
                    <Input value={iForm.estado_entrega} onChange={(e) => setIForm((s) => ({ ...s, estado_entrega: e.target.value }))} />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Muestra / Biopsia (opcional)">
                      <Textarea value={iForm.muestra} onChange={(e) => setIForm((s) => ({ ...s, muestra: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Datos clínicos (opcional)">
                      <Textarea value={iForm.datos_clinicos} onChange={(e) => setIForm((s) => ({ ...s, datos_clinicos: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Diagnóstico (opcional)">
                      <Textarea value={iForm.diagnostico} onChange={(e) => setIForm((s) => ({ ...s, diagnostico: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Descripción macroscópica (opcional)">
                      <Textarea
                        value={iForm.descripcion_macroscopica}
                        onChange={(e) => setIForm((s) => ({ ...s, descripcion_macroscopica: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Nota (opcional)">
                      <Textarea value={iForm.nota} onChange={(e) => setIForm((s) => ({ ...s, nota: e.target.value }))} />
                    </Field>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-text-muted">Requiere una muestra creada previamente.</p>
                    <PrimaryButton type="submit" className="w-full sm:w-auto" disabled={loading || !canWrite}>
                      Registrar informe
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            ) : null}
          </section>
        </div>
      </Container>
    </div>
  )
}

