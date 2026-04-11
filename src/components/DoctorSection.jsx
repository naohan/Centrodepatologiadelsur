import { motion } from 'framer-motion'
import { Award, BadgeCheck } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function DoctorSection() {
  const { doctor } = siteContent

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-tint to-white py-20 sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              badge={doctor.badge}
              title={doctor.title}
              align="center"
              className="mx-auto max-w-xl"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25 }}
              className="relative mt-12 overflow-hidden rounded-3xl border border-border-clinic bg-white p-8 shadow-[var(--shadow-card)] sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-soft-blue/80 blur-2xl"
                aria-hidden
              />
              <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-navy text-white shadow-lg ring-4 ring-primary/10">
                  <Award className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="mt-6 sm:ml-8 sm:mt-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border-clinic bg-soft-blue/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                    Médico habilitado
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-text-dark sm:text-2xl">
                    {doctor.name}
                  </h3>
                  <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-xl border border-border-clinic bg-bg-tint/80 px-4 py-3 text-left">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        CMP
                      </dt>
                      <dd className="mt-1 font-mono text-base font-semibold text-primary">
                        {doctor.cmp}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-border-clinic bg-bg-tint/80 px-4 py-3 text-left">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        RNE
                      </dt>
                      <dd className="mt-1 font-mono text-base font-semibold text-primary">
                        {doctor.rne}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm font-medium text-text-dark">
                    Condición profesional:{' '}
                    <span className="text-secondary">{doctor.status}</span>
                  </p>
                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-text-muted sm:text-[15px]">
                    {doctor.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
