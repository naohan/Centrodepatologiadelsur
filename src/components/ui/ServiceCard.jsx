import { motion } from 'framer-motion'
import {
  Microscope,
  FlaskConical,
  Layers,
  TestTube2,
  FileSearch,
  Truck,
} from 'lucide-react'
import { revealItemVariants } from './revealVariants'

const iconMap = {
  microscope: Microscope,
  flask: FlaskConical,
  layers: Layers,
  testTube: TestTube2,
  fileSearch: FileSearch,
  truck: Truck,
}

export function ServiceCard({ icon, title, description }) {
  const Icon = iconMap[icon] ?? Microscope

  return (
    <motion.article
      variants={revealItemVariants}
      className="group relative flex h-full flex-col rounded-2xl border border-border-clinic bg-white p-8 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-soft-blue to-bg-tint text-primary ring-1 ring-border-clinic transition-transform duration-300 group-hover:scale-[1.03]">
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-text-dark">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
    </motion.article>
  )
}
