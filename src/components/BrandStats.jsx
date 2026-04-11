import { motion } from 'framer-motion'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { siteContent } from '../data/siteContent'

export function BrandStats() {
  const { trustItems } = siteContent

  return (
    <section className="border-y border-border-clinic bg-gradient-to-r from-white via-soft-blue/40 to-white py-10 sm:py-12">
      <Container>
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-2xl border border-border-clinic/80 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-secondary to-accent ring-4 ring-secondary/15" />
                <span className="text-sm font-semibold tracking-tight text-text-dark">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
