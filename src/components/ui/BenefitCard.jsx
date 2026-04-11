import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { revealItemVariants } from './revealVariants'

export function BenefitCard({ children }) {
  return (
    <motion.div
      variants={revealItemVariants}
      className="group flex gap-4 rounded-2xl border border-border-clinic bg-white/90 px-5 py-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-[var(--shadow-soft)]"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-blue text-secondary ring-1 ring-border-clinic">
        <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="text-[15px] font-medium leading-relaxed text-text-dark">{children}</p>
    </motion.div>
  )
}
