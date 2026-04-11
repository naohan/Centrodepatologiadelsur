import { MessageCircle } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { PrimaryButton } from './ui/PrimaryButton'
import { SecondaryButton } from './ui/SecondaryButton'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function ContactSection() {
  const { contact } = siteContent

  return (
    <section
      id="contacto"
      className="scroll-mt-28 border-t border-border-clinic bg-gradient-to-b from-white via-soft-blue/30 to-bg-tint py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              badge={contact.badge}
              title={contact.title}
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {contact.text}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryButton href={contact.ctaPrimary.href} external className="min-w-[240px]">
                <MessageCircle className="h-4 w-4" aria-hidden />
                {contact.ctaPrimary.label}
              </PrimaryButton>
              <SecondaryButton href={contact.ctaSecondary.href} className="min-w-[240px]">
                {contact.ctaSecondary.label}
              </SecondaryButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
