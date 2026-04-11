import { Microscope, Shield, MessageCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

const iconMap = {
  microscope: Microscope,
  shield: Shield,
  message: MessageCircle,
}

export function AboutSection() {
  const { about } = siteContent

  return (
    <section
      id="nosotros"
      className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading badge={about.badge} title={about.title} />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 text-base leading-relaxed text-text-muted sm:text-lg">
                {about.primary}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-sm leading-relaxed text-text-dark/90 sm:text-[15px]">
                {about.secondary}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-1">
            {about.panels.map((panel, i) => {
              const Icon = iconMap[panel.icon] ?? Microscope
              return (
                <Reveal key={panel.title} delay={0.06 * i}>
                  <div className="group flex gap-5 rounded-2xl border border-border-clinic bg-bg-tint/60 p-6 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card)]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-border-clinic transition-transform duration-300 group-hover:scale-[1.03]">
                      <Icon className="h-6 w-6" strokeWidth={1.65} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark">{panel.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{panel.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
