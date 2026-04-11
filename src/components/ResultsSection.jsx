import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Fingerprint, Zap, Shield } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { PrimaryButton } from './ui/PrimaryButton'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

const sidebarIcons = [Lock, Fingerprint, Zap]

export function ResultsSection() {
  const { results } = siteContent
  const [dni, setDni] = useState('')
  const [code, setCode] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
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
                  <p className="text-sm font-semibold text-text-dark">{results.captchaLabel}</p>
                  <div
                    className="mt-2 flex min-h-[76px] items-center justify-center rounded-xl border border-dashed border-border-clinic bg-gradient-to-br from-bg-tint to-soft-blue/40 px-4 py-6 text-center"
                    role="img"
                    aria-label={results.captchaPlaceholder}
                  >
                    <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      {results.captchaPlaceholder}
                    </span>
                  </div>
                </div>

                <PrimaryButton type="submit" className="w-full sm:w-auto">
                  {results.submitLabel}
                </PrimaryButton>

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
