import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Handshake,
  Heart,
  Microscope,
  Shield,
  Stethoscope,
  Telescope,
  UserRound,
  Waypoints,
  Eye,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { siteContent } from '../data/siteContent'
import profilePhoto from '../assets/foto/perfil.png'

function Pill({ icon: _Icon, title, tone = 'blue' }) {
  const toneCls =
    tone === 'rose'
      ? 'bg-rose-tint/80 text-primary'
      : tone === 'navy'
        ? 'bg-primary/5 text-primary'
        : 'bg-bg-tint/80 text-primary'

  return (
    <div className={`flex items-start gap-3 rounded-2xl px-4 py-3 shadow-sm ${toneCls}`}>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/85">
        <_Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-text-dark">{title}</p>
      </div>
    </div>
  )
}

export function AboutMe() {
  const { aboutMe } = siteContent

  const enfoque = [
    { icon: Microscope, text: 'Evaluación de biopsias y piezas quirúrgicas' },
    { icon: Shield, text: 'Diagnóstico en patología oncológica' },
    { icon: Eye, text: 'Estudios de citología (como tiroides)' },
    { icon: Waypoints, text: 'Correlación clínico-patológica para mayor exactitud diagnóstica' },
    { icon: Handshake, text: 'Apoyo en la toma de decisiones médicas junto a especialistas' },
  ]

  const compromiso = [
    { icon: Brain, text: 'Rigurosidad científica' },
    { icon: Heart, text: 'Ética profesional' },
    { icon: Telescope, text: 'Comunicación clara con el equipo médico' },
    { icon: CheckCircle2, text: 'Compromiso con diagnósticos precisos y confiables' },
  ]

  const entrenamientos = [
    { icon: Microscope, text: 'Interpretación de biopsias en patología quirúrgica' },
    { icon: Stethoscope, text: 'Dermatopatología' },
    { icon: Waypoints, text: 'Citología con enfoque molecular' },
    { icon: ClipboardCheck, text: 'Patología digestiva y ginecológica' },
  ]

  const diferenciales = [
    { icon: Shield, text: 'Experiencia en hospital de alta complejidad' },
    { icon: Microscope, text: 'Enfoque especializado en oncología' },
    { icon: Globe2, text: 'Actualización internacional constante' },
    { icon: Handshake, text: 'Diagnóstico integral y orientado a decisiones clínicas' },
  ]

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-bg-tint via-white to-soft-blue">
      <div className="border-b border-border-clinic bg-white/80 backdrop-blur-xl">
        <Container className="flex items-center justify-between gap-4 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-soft-blue/60"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver
          </Link>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <Reveal>
          <SectionHeading badge={aboutMe.badge} title={aboutMe.title} subtitle={aboutMe.subtitle} />
        </Reveal>

        <div className="mx-auto mt-12 max-w-5xl">
          <Reveal delay={0.06}>
            <section className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-rose-tint via-white to-soft-blue/60 px-7 py-10 shadow-[var(--shadow-card)] sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden>
                <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-soft-rose blur-3xl" />
                <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl" />
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    <UserRound className="h-4 w-4" aria-hidden />
                    Sobre mí
                  </p>
                  <h2 className="mt-5 text-2xl font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-3xl">
                    {aboutMe.name}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-[17px] sm:leading-[1.85]">
                    {aboutMe.intro}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-[17px] sm:leading-[1.85]">
                    {aboutMe.experience}
                  </p>
                </div>

                <div className="mx-auto w-full max-w-[320px] lg:mx-0">
                  <div className="relative mx-auto aspect-square w-full max-w-[320px]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-white to-accent/20 blur-2xl" aria-hidden />
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-white shadow-[var(--shadow-soft)] ring-1 ring-border-clinic/70">
                      <img
                        src={profilePhoto}
                        alt={`Foto de ${aboutMe.name}`}
                        className="h-full w-full object-cover"
                        width={640}
                        height={640}
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <div className="mt-12 space-y-12">
            <Reveal delay={0.12}>
              <section className="rounded-[2rem] bg-white/70 px-7 py-10 shadow-[var(--shadow-soft)] sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-primary">
                    <Microscope className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark sm:text-xl">{aboutMe.approachTitle}</h3>
                    <p className="mt-1 text-sm text-text-muted">{aboutMe.approachIntro}</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {enfoque.map((i) => (
                    <Pill key={i.text} icon={i.icon} title={i.text} tone="blue" />
                  ))}
                </div>

                <p className="mt-7 text-sm leading-relaxed text-text-muted sm:text-[15px]">{aboutMe.approachClosing}</p>
              </section>
            </Reveal>

            <Reveal delay={0.18}>
              <section className="rounded-[2rem] bg-rose-tint/70 px-7 py-10 shadow-[var(--shadow-soft)] sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-primary">
                    <Heart className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark sm:text-xl">{aboutMe.commitmentTitle}</h3>
                    <p className="mt-1 text-sm text-text-muted">{aboutMe.commitmentIntro}</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {compromiso.map((i) => (
                    <Pill key={i.text} icon={i.icon} title={i.text} tone="rose" />
                  ))}
                </div>

                <p className="mt-7 text-sm leading-relaxed text-text-muted sm:text-[15px]">{aboutMe.commitmentClosing}</p>
              </section>
            </Reveal>

            <Reveal delay={0.24}>
              <section className="rounded-[2rem] bg-white/70 px-7 py-10 shadow-[var(--shadow-soft)] sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-primary">
                    <Globe2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark sm:text-xl">{aboutMe.continuousTitle}</h3>
                    <p className="mt-1 text-sm text-text-muted">{aboutMe.continuousIntro}</p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-text-muted sm:text-[15px]">{aboutMe.continuousClosing}</p>
              </section>
            </Reveal>

            <Reveal delay={0.28}>
              <section className="rounded-[2rem] bg-rose-tint/70 px-7 py-10 shadow-[var(--shadow-soft)] sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-primary">
                    <Stethoscope className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark sm:text-xl">{aboutMe.trainingsTitle}</h3>
                    <p className="mt-1 text-sm text-text-muted">Entrenamientos específicos</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {entrenamientos.map((i) => (
                    <Pill key={i.text} icon={i.icon} title={i.text} tone="rose" />
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.32}>
              <section className="rounded-[2rem] bg-white/70 px-7 py-10 shadow-[var(--shadow-soft)] sm:px-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-primary">
                    <Shield className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-dark sm:text-xl">{aboutMe.valueTitle}</h3>
                    <p className="mt-1 text-sm text-text-muted">Claves para una atención clínica de alta confianza.</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {diferenciales.map((i) => (
                    <Pill key={i.text} icon={i.icon} title={i.text} tone="navy" />
                  ))}
                </div>

                <div className="mt-8 rounded-3xl bg-gradient-to-br from-primary/8 via-white to-soft-blue/40 px-6 py-6">
                  <div className="flex items-center gap-2">
                    <Telescope className="h-4 w-4 text-secondary" aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Enfoque final</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                    Diagnósticos claros, sustentados y oportunos, alineados con estándares internacionales.
                  </p>
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  )
}

