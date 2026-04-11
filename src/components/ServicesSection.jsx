import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { ServiceCard } from './ui/ServiceCard'
import { Reveal, RevealStagger } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function ServicesSection() {
  const { services } = siteContent

  return (
    <section
      id="servicios"
      className="scroll-mt-28 border-t border-border-clinic bg-gradient-to-b from-white via-bg-tint/50 to-white py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            badge={services.badge}
            title={services.title}
            subtitle={services.subtitle}
            className="max-w-2xl"
          />
        </Reveal>

        <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => (
            <ServiceCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
