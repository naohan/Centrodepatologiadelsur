import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, Download, FileText, LogOut, Pencil, RefreshCw, Search, UserPlus, Users } from 'lucide-react'
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

const emptyPaciente = {
  nombres: '',
  apellidos: '',
  dni: '',
  fecha_nacimiento: '',
  sexo: '',
  telefono: '',
  correo: '',
  direccion: '',
  observaciones: '',
}

const emptyInforme = {
  paciente_id: '',
  numero_informe: '',
  numero_boleta: '',
  fecha_recepcion: '',
  fecha_emision: '',
  modo_informe: 'manual',
  pdf: null,
  datos_clinicos: '',
  diagnostico: '',
  cantidad_biopsias: '',
  descripcion_macroscopica: '',
  incluir_nota: false,
  nota: '',
  estado_entrega: '',
}

const emptyUsuario = {
  nombre: '',
  email: '',
  password: '',
  rol: 'medico',
  estado: true,
}

function buildDescripcionMacroscopica(cantidad) {
  const n = Number(cantidad)
  if (!Number.isFinite(n) || n <= 0) return ''
  const biopsias = Math.trunc(n)
  return biopsias === 1
    ? 'Se recibe fijado en formol biopsia. Se incluye todo: 1/1'
    : `Se recibe fijado en formol ${biopsias} biopsias. Se incluye todo: ${biopsias}/1`
}

export function Admin() {
  const { user, token, logout, canWrite, isAdmin } = useAuth()
  const [active, setActive] = useState('pacientes')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [pacientes, setPacientes] = useState([])
  const [informes, setInformes] = useState([])
  const [usuarios, setUsuarios] = useState([])

  const [pForm, setPForm] = useState(emptyPaciente)
  const [iForm, setIForm] = useState(emptyInforme)
  const [uForm, setUForm] = useState(emptyUsuario)
  const [editingInforme, setEditingInforme] = useState(null)
  const [filters, setFilters] = useState({ dni: '', fecha: '' })

  const header = useMemo(() => {
    const role = user?.rol ? String(user.rol) : '-'
    return { name: user?.nombre || user?.email || 'Usuario', role }
  }, [user])

  const tabs = useMemo(
    () => [
      ...(isAdmin ? [{ id: 'usuarios', label: 'Usuarios', Icon: Users }] : []),
      { id: 'pacientes', label: 'Pacientes', Icon: UserPlus },
      { id: 'informes', label: 'Informes', Icon: FileText },
      { id: 'lista', label: 'Informes generados', Icon: ClipboardList },
    ],
    [isAdmin]
  )

  async function refreshAll(customFilters = filters) {
    setError('')
    setLoading(true)
    try {
      const [p, i, u] = await Promise.all([
        api.pacientes.list({ token, limit: 100, offset: 0 }),
        api.informes.list({
          token,
          limit: 100,
          offset: 0,
          dni: customFilters.dni.trim(),
          fecha: customFilters.fecha,
        }),
        isAdmin ? api.usuarios.list({ token, limit: 100, offset: 0 }) : Promise.resolve([]),
      ])
      setPacientes(Array.isArray(p) ? p : [])
      setInformes(Array.isArray(i) ? i : [])
      setUsuarios(Array.isArray(u) ? u : [])
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin])

  async function handleCreateUsuario(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.usuarios.create({ token, payload: uForm })
      setUForm(emptyUsuario)
      await refreshAll()
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePaciente(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.pacientes.create({
        token,
        payload: {
          ...pForm,
          fecha_nacimiento: pForm.fecha_nacimiento || null,
          sexo: pForm.sexo || null,
          correo: pForm.correo || null,
          telefono: pForm.telefono || null,
          direccion: pForm.direccion || null,
          observaciones: pForm.observaciones || null,
        },
      })
      setPForm(emptyPaciente)
      await refreshAll()
      setActive('informes')
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  function formatDateInput(value) {
    if (!value) return ''
    return String(value).slice(0, 10)
  }

  function startEditInforme(row) {
    setError('')
    setEditingInforme(row)
    setIForm({
      paciente_id: row.paciente_id ? String(row.paciente_id) : '',
      numero_informe: row.numero_informe || '',
      numero_boleta: row.numero_boleta || '',
      fecha_recepcion: formatDateInput(row.fecha_recepcion),
      fecha_emision: formatDateInput(row.fecha_emision),
      modo_informe: row.modo_informe || 'manual',
      pdf: null,
      datos_clinicos: row.datos_clinicos || '',
      diagnostico: row.diagnostico || '',
      cantidad_biopsias: '',
      descripcion_macroscopica: row.descripcion_macroscopica || '',
      incluir_nota: !!row.nota,
      nota: row.nota || '',
      estado_entrega: row.estado_entrega || '',
    })
    setActive('informes')
  }

  function cancelEditInforme() {
    setEditingInforme(null)
    setIForm(emptyInforme)
  }

  async function handleCreateInforme(e) {
    e.preventDefault()
    setError('')
    if (iForm.modo_informe === 'pdf_subido' && !iForm.pdf && editingInforme?.modo_informe !== 'pdf_subido') {
      setError('Selecciona un archivo PDF para el informe')
      return
    }

    setLoading(true)
    try {
      const basePayload = {
        paciente_id: Number(iForm.paciente_id),
        numero_informe: iForm.numero_informe,
        numero_boleta: iForm.numero_boleta || null,
        fecha_recepcion: iForm.fecha_recepcion || null,
        fecha_emision: iForm.fecha_emision || null,
        estado_entrega: iForm.estado_entrega || null,
      }
      const payload = iForm.modo_informe === 'manual' ? {
        ...basePayload,
        datos_clinicos: iForm.modo_informe === 'manual' && iForm.datos_clinicos ? iForm.datos_clinicos : null,
        diagnostico: iForm.modo_informe === 'manual' && iForm.diagnostico ? iForm.diagnostico : null,
        cantidad_biopsias: iForm.modo_informe === 'manual' && iForm.cantidad_biopsias ? Number(iForm.cantidad_biopsias) : null,
        descripcion_macroscopica:
          iForm.modo_informe === 'manual' && iForm.descripcion_macroscopica ? iForm.descripcion_macroscopica : null,
        nota: iForm.modo_informe === 'manual' && iForm.incluir_nota && iForm.nota ? iForm.nota : null,
      } : basePayload

      let saved
      if (editingInforme) {
        saved = await api.informes.update({
          token,
          id: editingInforme.id,
          payload: iForm.modo_informe === 'manual' ? { ...payload, modo_informe: 'manual' } : payload,
        })
      } else {
        saved = await api.informes.create({
          token,
          payload: { ...payload, modo_informe: 'manual' },
        })
      }

      if (iForm.modo_informe === 'pdf_subido') {
        if (iForm.pdf) await api.informes.uploadPdf({ token, id: saved.id, file: iForm.pdf })
      }

      setEditingInforme(null)
      setIForm(emptyInforme)
      await refreshAll()
      setActive('lista')
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearchInformes(e) {
    e.preventDefault()
    await refreshAll(filters)
  }

  async function handleDownloadInforme(row) {
    setError('')
    try {
      const blob = await api.resultados(row.dni, row.numero_informe, 'pdf')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `informe-${row.numero_informe || row.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err?.payload?.error || err.message || 'No se pudo descargar el PDF')
    }
  }

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
              onClick={() => refreshAll()}
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
              {error ? <p className="mt-2 text-xs font-semibold text-red-700">{error}</p> : null}
              {!canWrite ? <p className="mt-2 text-xs text-text-muted">Tu rol es de solo lectura.</p> : null}
            </div>
          </aside>

          <section className="rounded-3xl border border-border-clinic bg-white/75 p-6 shadow-[var(--shadow-card)] sm:p-8">
            {active === 'usuarios' && isAdmin ? (
              <div>
                <SectionTitle title="Usuarios" subtitle="Crea doctores o usuarios internos del sistema." count={usuarios.length} />
                <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleCreateUsuario}>
                  <Field label="Nombre">
                    <Input value={uForm.nombre} onChange={(e) => setUForm((s) => ({ ...s, nombre: e.target.value }))} required />
                  </Field>
                  <Field label="Email">
                    <Input type="email" value={uForm.email} onChange={(e) => setUForm((s) => ({ ...s, email: e.target.value }))} required />
                  </Field>
                  <Field label="Contraseña">
                    <Input
                      type="password"
                      value={uForm.password}
                      onChange={(e) => setUForm((s) => ({ ...s, password: e.target.value }))}
                      required
                    />
                  </Field>
                  <Field label="Rol">
                    <select
                      value={uForm.rol}
                      onChange={(e) => setUForm((s) => ({ ...s, rol: e.target.value }))}
                      className="w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="medico">Doctor / médico</option>
                      <option value="laboratorio">Laboratorio</option>
                      <option value="admin">Admin</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-2 flex justify-end">
                    <PrimaryButton type="submit" disabled={loading}>
                      Crear usuario
                    </PrimaryButton>
                  </div>
                </form>
                <SimpleList
                  rows={usuarios}
                  empty="No hay usuarios registrados."
                  render={(u) => `${u.nombre || '-'} · ${u.email} · ${u.rol}`}
                />
              </div>
            ) : null}

            {active === 'pacientes' ? (
              <div>
                <SectionTitle title="Pacientes" subtitle="Registra al paciente antes de crear informes." count={pacientes.length} />
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
                  <Field label="Fecha nacimiento (opcional)">
                    <Input type="date" value={pForm.fecha_nacimiento} onChange={(e) => setPForm((s) => ({ ...s, fecha_nacimiento: e.target.value }))} />
                  </Field>
                  <Field label="Sexo (opcional)">
                    <Input value={pForm.sexo} onChange={(e) => setPForm((s) => ({ ...s, sexo: e.target.value }))} />
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
                  <div className="sm:col-span-2 flex justify-end">
                    <PrimaryButton type="submit" disabled={loading || !canWrite}>
                      Registrar paciente
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            ) : null}

            {active === 'informes' ? (
              <div>
                <SectionTitle
                  title={editingInforme ? 'Editar informe' : 'Informes'}
                  subtitle={
                    editingInforme
                      ? `Corrigiendo informe ${editingInforme.numero_informe}. Puedes actualizar datos o reemplazar el PDF.`
                      : 'Crea el informe escrito o sube un PDF existente.'
                  }
                  count={informes.length}
                />
                <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleCreateInforme}>
                  <Field label="Paciente">
                    <select
                      value={iForm.paciente_id}
                      onChange={(e) => setIForm((s) => ({ ...s, paciente_id: e.target.value }))}
                      required
                      className="w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                    >
                      <option value="">Selecciona paciente</option>
                      {pacientes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.dni} - {p.nombres} {p.apellidos}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Código de informe">
                    <Input value={iForm.numero_informe} onChange={(e) => setIForm((s) => ({ ...s, numero_informe: e.target.value }))} required />
                  </Field>
                  <Field label="Fecha de recepción">
                    <Input type="date" value={iForm.fecha_recepcion} onChange={(e) => setIForm((s) => ({ ...s, fecha_recepcion: e.target.value }))} />
                  </Field>
                  <Field label="Fecha del informe">
                    <Input type="date" value={iForm.fecha_emision} onChange={(e) => setIForm((s) => ({ ...s, fecha_emision: e.target.value }))} />
                  </Field>
                  <Field label="N° Boleta (opcional)">
                    <Input value={iForm.numero_boleta} onChange={(e) => setIForm((s) => ({ ...s, numero_boleta: e.target.value }))} />
                  </Field>
                  <Field label="Estado de entrega (opcional)">
                    <Input value={iForm.estado_entrega} onChange={(e) => setIForm((s) => ({ ...s, estado_entrega: e.target.value }))} />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Tipo de informe">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <RadioCard
                          checked={iForm.modo_informe === 'manual'}
                          label="Escribir información"
                          onChange={() => setIForm((s) => ({ ...s, modo_informe: 'manual', pdf: null }))}
                        />
                        <RadioCard
                          checked={iForm.modo_informe === 'pdf_subido'}
                          label="Subir PDF existente"
                          onChange={() => setIForm((s) => ({ ...s, modo_informe: 'pdf_subido' }))}
                        />
                      </div>
                    </Field>
                  </div>

                  {iForm.modo_informe === 'pdf_subido' ? (
                    <div className="sm:col-span-2">
                      <Field label="Archivo PDF">
                        <Input
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={(e) => setIForm((s) => ({ ...s, pdf: e.target.files?.[0] || null }))}
                          required={!editingInforme || editingInforme.modo_informe !== 'pdf_subido'}
                        />
                        {editingInforme?.modo_informe === 'pdf_subido' ? (
                          <p className="mt-2 text-xs text-text-muted">
                            Ya existe un PDF para este informe. Selecciona uno nuevo solo si deseas reemplazarlo.
                          </p>
                        ) : null}
                      </Field>
                    </div>
                  ) : (
                    <>
                      <div className="sm:col-span-2">
                        <Field label="Datos clínicos">
                          <Textarea value={iForm.datos_clinicos} onChange={(e) => setIForm((s) => ({ ...s, datos_clinicos: e.target.value }))} />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field label="Diagnóstico">
                          <Textarea value={iForm.diagnostico} onChange={(e) => setIForm((s) => ({ ...s, diagnostico: e.target.value }))} />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-3 rounded-2xl border border-border-clinic bg-white px-4 py-3 text-sm font-semibold text-text-dark">
                          <input
                            type="checkbox"
                            checked={iForm.incluir_nota}
                            onChange={(e) =>
                              setIForm((s) => ({
                                ...s,
                                incluir_nota: e.target.checked,
                                nota: e.target.checked ? s.nota : '',
                              }))
                            }
                            className="h-4 w-4"
                          />
                          Agregar nota al informe
                        </label>
                      </div>
                      {iForm.incluir_nota ? (
                        <div className="sm:col-span-2">
                          <Field label="Nota">
                            <Textarea value={iForm.nota} onChange={(e) => setIForm((s) => ({ ...s, nota: e.target.value }))} />
                          </Field>
                        </div>
                      ) : null}
                      <div className="sm:col-span-2">
                        <Field label="Cantidad de biopsias">
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            value={iForm.cantidad_biopsias}
                            onChange={(e) => {
                              const cantidad = e.target.value
                              setIForm((s) => ({
                                ...s,
                                cantidad_biopsias: cantidad,
                                descripcion_macroscopica: buildDescripcionMacroscopica(cantidad),
                              }))
                            }}
                            placeholder="Ej. 1"
                          />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field label="Descripción macroscópica">
                          <Textarea
                            value={iForm.descripcion_macroscopica}
                            onChange={(e) => setIForm((s) => ({ ...s, descripcion_macroscopica: e.target.value }))}
                          />
                        </Field>
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    {editingInforme ? (
                      <button
                        type="button"
                        onClick={cancelEditInforme}
                        className="inline-flex items-center justify-center rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-text-dark shadow-sm transition hover:bg-soft-blue/60"
                      >
                        Cancelar edición
                      </button>
                    ) : null}
                    <PrimaryButton type="submit" disabled={loading || !canWrite}>
                      {editingInforme
                        ? 'Guardar cambios'
                        : iForm.modo_informe === 'pdf_subido'
                          ? 'Registrar informe con PDF'
                          : 'Registrar informe'}
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            ) : null}

            {active === 'lista' ? (
              <div>
                <SectionTitle title="Informes generados" subtitle="Busca por DNI o fecha y descarga los PDFs." count={informes.length} />
                <form className="mt-7 grid gap-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={handleSearchInformes}>
                  <Field label="DNI">
                    <Input value={filters.dni} onChange={(e) => setFilters((s) => ({ ...s, dni: e.target.value }))} placeholder="42166474" />
                  </Field>
                  <Field label="Fecha">
                    <Input type="date" value={filters.fecha} onChange={(e) => setFilters((s) => ({ ...s, fecha: e.target.value }))} />
                  </Field>
                  <div className="flex items-end">
                    <PrimaryButton type="submit" disabled={loading}>
                      <Search className="mr-2 h-4 w-4" aria-hidden />
                      Buscar
                    </PrimaryButton>
                  </div>
                </form>

                <div className="mt-7 space-y-3">
                  {informes.length === 0 ? (
                    <p className="rounded-2xl border border-border-clinic bg-white px-4 py-4 text-sm text-text-muted">No hay informes para mostrar.</p>
                  ) : (
                    informes.map((row) => (
                      <div key={row.id} className="rounded-2xl border border-border-clinic bg-white px-4 py-4 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-semibold text-text-dark">
                              {row.numero_informe} · {row.nombres} {row.apellidos}
                            </p>
                            <p className="mt-1 text-xs text-text-muted">
                              DNI {row.dni || '-'} · {row.modo_informe === 'pdf_subido' ? 'PDF subido' : 'PDF generado'} ·{' '}
                              {row.fecha_emision || row.fecha_recepcion || 'Sin fecha'}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => startEditInforme(row)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-text-dark shadow-sm transition hover:bg-soft-blue/60"
                            >
                              <Pencil className="h-4 w-4" aria-hidden />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadInforme(row)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-soft-blue/60"
                            >
                              <Download className="h-4 w-4" aria-hidden />
                              Descargar PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </Container>
    </div>
  )
}

function SectionTitle({ title, subtitle, count }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-text-dark">{title}</p>
        <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
      </div>
      <span className="rounded-full border border-border-clinic bg-white px-3 py-1 text-xs font-semibold text-text-muted">
        {count} items
      </span>
    </div>
  )
}

function RadioCard({ checked, label, onChange }) {
  return (
    <label
      className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm transition ${
        checked ? 'border-secondary/50 bg-soft-blue text-primary' : 'border-border-clinic bg-white text-text-dark hover:bg-soft-blue/40'
      }`}
    >
      <input type="radio" checked={checked} onChange={onChange} className="mr-2" />
      {label}
    </label>
  )
}

function SimpleList({ rows, empty, render }) {
  return (
    <div className="mt-7 space-y-2">
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-border-clinic bg-white px-4 py-4 text-sm text-text-muted">{empty}</p>
      ) : (
        rows.map((row) => (
          <p key={row.id} className="rounded-2xl border border-border-clinic bg-white px-4 py-3 text-sm text-text-dark">
            {render(row)}
          </p>
        ))
      )}
    </div>
  )
}
