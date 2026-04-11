import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, Microscope } from 'lucide-react'
import heroFondo from '../assets/hero/hero-fondo.png'
import heroPrincipal from '../assets/hero/hero.png'
import { Container } from './ui/Container'
import { PrimaryButton } from './ui/PrimaryButton'
import { SecondaryButton } from './ui/SecondaryButton'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function Hero() {
  const { brand, hero } = siteContent

  return (
    <section
      id="inicio"
      className="relative scroll-mt-28 overflow-hidden pt-[88px] pb-20 sm:pt-[96px] sm:pb-28 lg:pt-[104px] lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={heroFondo}
          alt=""
          className="h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-tint/92 via-white/88 to-soft-blue/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent lg:from-white/90 lg:via-white/45" />
      </div>

      <div
        className="lab-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 z-[1] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 z-[1] h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl"
        aria-hidden
      />

      <Container className="relative z-[2]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border-clinic bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl border-l-2 border-secondary/50 pl-5 text-sm leading-relaxed text-text-dark/90 sm:text-[15px]">
                {hero.support}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <PrimaryButton href={hero.ctaPrimary.href} external>
                  {hero.ctaPrimary.label}
                </PrimaryButton>
                <SecondaryButton href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</SecondaryButton>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
                {hero.highlights.map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-2 text-sm font-medium text-text-dark"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent ring-4 ring-accent/20" />
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-soft-blue via-white to-bg-tint opacity-90 shadow-[var(--shadow-card)] ring-1 ring-border-clinic"
                aria-hidden
              />
              <div
                className="absolute -inset-4 -z-20 rounded-[2.5rem] bg-gradient-to-tr from-primary/12 via-transparent to-accent/15 blur-2xl"
                aria-hidden
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-border-clinic bg-white/75 shadow-[var(--shadow-soft)] backdrop-blur-md">
                <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                  <img
                    src={heroPrincipal}
                    alt={hero.mainImageAlt}
                    className="h-full w-full object-cover"
                    width={640}
                    height={512}
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-white/20" />
                </div>
                <div className="border-t border-border-clinic bg-white/90 px-6 py-5 backdrop-blur-sm sm:px-8">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                    {brand.name}
                  </p>
                  <p className="mt-1 text-center text-sm text-text-muted">{brand.tagline}</p>
                </div>
              </div>

              {hero.floatingPanels.map((panel, i) => (
                <motion.div
                  key={panel.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute z-10 hidden rounded-xl border border-border-clinic bg-white/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:block ${
                    i === 0
                      ? '-left-2 top-[8%] max-w-[200px] lg:-left-6'
                      : i === 1
                        ? '-right-2 top-[38%] max-w-[190px] lg:-right-8'
                        : 'bottom-[10%] left-1/2 max-w-[200px] -translate-x-1/2 lg:bottom-[6%]'
                  }`}
                >
                  <p className="text-xs font-semibold text-text-dark">{panel.label}</p>
                  <p className="mt-0.5 text-[11px] text-text-muted">{panel.sub}</p>
                </motion.div>
              ))}

              <motion.div
                className="absolute -bottom-3 left-4 z-10 flex items-center gap-2 rounded-xl border border-border-clinic bg-white px-3 py-2 shadow-md sm:left-8"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden />
                <span className="text-[11px] font-medium text-text-dark">Respaldo profesional</span>
              </motion.div>

              <motion.div
                className="absolute -top-2 right-4 z-10 flex items-center gap-2 rounded-xl border border-border-clinic bg-primary px-3 py-2 text-white shadow-md sm:right-6"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Microscope className="h-4 w-4 text-accent" aria-hidden />
                <span className="text-[11px] font-semibold">Laboratorio especializado</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
