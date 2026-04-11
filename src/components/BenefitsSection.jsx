import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { BenefitCard } from './ui/BenefitCard'
import { Reveal, RevealStagger } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function BenefitsSection() {
  const { benefits } = siteContent

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading badge={benefits.badge} title={benefits.title} />
        </Reveal>

        <RevealStagger
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5"
          stagger={0.07}
        >
          {benefits.items.map((text) => (
            <BenefitCard key={text}>{text}</BenefitCard>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
