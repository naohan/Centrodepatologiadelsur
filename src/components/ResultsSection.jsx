import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Fingerprint, Zap, Shield, Download } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { PrimaryButton } from './ui/PrimaryButton'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'
import { api } from '../lib/api'

const sidebarIcons = [Lock, Fingerprint, Zap]

export function ResultsSection() {
  const { results } = siteContent
  const [dni, setDni] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setData(null)
    setLoading(true)
    try {
      const res = await api.resultados(dni.trim(), code.trim(), 'json')
      setData(res)
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDownloadPdf() {
    setError('')
    setDownloading(true)
    try {
      const blob = await api.resultados(dni.trim(), code.trim(), 'pdf')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `informe-${(data?.numero_informe || '').toString().trim() || 'resultado'}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err?.payload?.error || err.message || 'Error')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section
      id="resultados"
      className="scroll-mt-28 relative overflow-hidden bg-gradient-to-br from-deep-navy via-primary to-deep-navy py-20 sm:py-24 lg:py-28"
    >
      <div className="lab-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            badge={results.badge}
            title={results.title}
            subtitle={results.subtitle}
            align="center"
            dark
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch lg:gap-10">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-primary/20 sm:p-10"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3 border-b border-border-clinic pb-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue text-primary">
                  <Shield className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-dark">Acceso a resultados</p>
                  <p className="text-xs text-text-muted">Módulo de consulta (demostración visual)</p>
                </div>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="dni"
                    className="block text-sm font-semibold text-text-dark"
                  >
                    {results.fields.dni.label}
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    autoComplete="off"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder={results.fields.dni.placeholder}
                    className="mt-2 w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none ring-primary/0 transition placeholder:text-text-muted/70 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="analysis-code"
                    className="block text-sm font-semibold text-text-dark"
                  >
                    {results.fields.code.label}
                  </label>
                  <input
                    id="analysis-code"
                    name="code"
                    type="text"
                    autoComplete="off"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={results.fields.code.placeholder}
                    className="mt-2 w-full rounded-xl border border-border-clinic bg-bg-tint/50 px-4 py-3 text-sm text-text-dark outline-none ring-primary/0 transition placeholder:text-text-muted/70 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div>
                  <p className="text-xs leading-relaxed text-text-muted">
                    La verificación de seguridad (reCAPTCHA/Turnstile) se habilitará cuando se configure la clave del
                    sitio y validación en el backend.
                  </p>
                </div>

                <PrimaryButton type="submit" className="w-full sm:w-auto">
                  {loading ? 'Consultando...' : results.submitLabel}
                </PrimaryButton>

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {data ? (
                  <div className="space-y-4 rounded-2xl border border-border-clinic bg-white/80 p-5 text-sm text-text-dark shadow-sm">
                    <div className="rounded-2xl border border-border-clinic bg-white px-4 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                            Paciente
                          </p>
                          <p className="mt-1 truncate text-base font-semibold text-text-dark">
                            {data.nombres} {data.apellidos}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <div className="rounded-xl border border-border-clinic bg-bg-tint/60 px-4 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">DNI</p>
                            <p className="mt-0.5 font-semibold text-text-dark">{data.dni}</p>
                          </div>
                          <div className="rounded-xl border border-border-clinic bg-bg-tint/60 px-4 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                              N° Informe
                            </p>
                            <p className="mt-0.5 font-semibold text-text-dark">{data.numero_informe}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border-clinic bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Diagnóstico</p>
                      <p className="mt-2 whitespace-pre-wrap leading-relaxed text-text-dark">
                        {data.diagnostico || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border-clinic bg-white px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Descripción macroscópica
                      </p>
                      <p className="mt-2 whitespace-pre-wrap leading-relaxed text-text-dark">
                        {data.descripcion_macroscopica || '-'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-text-muted">
                        Si necesitas el informe para imprimir, puedes descargarlo en PDF.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={downloading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-soft-blue/60 disabled:opacity-60"
                      >
                        <Download className="h-4 w-4" aria-hidden />
                        {downloading ? 'Generando PDF...' : 'Descargar PDF'}
                      </button>
                    </div>
                  </div>
                ) : null}

                <p className="flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
                  {results.securityNote}
                </p>
              </form>
            </motion.div>

            <aside className="flex flex-col justify-center gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md lg:p-7">
              {results.sidebar.map((item, i) => {
                const Icon = sidebarIcons[i] ?? Lock
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-accent">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-white/65">{item.text}</p>
                  </div>
                )
              })}
            </aside>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
