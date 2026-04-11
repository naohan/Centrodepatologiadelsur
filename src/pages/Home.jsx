import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { BrandStats } from '../components/BrandStats'
import { AboutSection } from '../components/AboutSection'
import { DoctorSection } from '../components/DoctorSection'
import { ServicesSection } from '../components/ServicesSection'
import { BenefitsSection } from '../components/BenefitsSection'
import { PickupPointsSection } from '../components/PickupPointsSection'
import { ResultsSection } from '../components/ResultsSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStats />
        <AboutSection />
        <DoctorSection />
        <ServicesSection />
        <BenefitsSection />
        <PickupPointsSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
