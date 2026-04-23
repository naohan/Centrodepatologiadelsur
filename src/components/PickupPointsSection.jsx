import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { PickupPointCard } from './ui/PickupPointCard'
import { Reveal, RevealStagger } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function PickupPointsSection() {
  const { pickupPoints } = siteContent

  return (
    <section
      id="puntos-de-recojo"
      className="scroll-mt-28 bg-gradient-to-b from-bg-tint via-white to-soft-blue/25 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            badge={pickupPoints.badge}
            title={pickupPoints.title}
            subtitle={pickupPoints.subtitle}
          />
        </Reveal>

        <RevealStagger className="mt-14 grid gap-8 lg:grid-cols-2" stagger={0.08}>
          {pickupPoints.points.map((point) => (
            <PickupPointCard
              key={point.title}
              title={point.title}
              address={point.address}
              district={point.district}
              whatsappUrl={pickupPoints.whatsappUrl}
            />
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
