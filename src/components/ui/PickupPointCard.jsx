import { motion } from 'framer-motion'
import { MapPin, ExternalLink, MessageCircle } from 'lucide-react'
import { revealItemVariants } from './revealVariants'

export function PickupPointCard({ title, address, district, mapUrl, whatsappUrl }) {
  return (
    <motion.article
      variants={revealItemVariants}
      className="flex h-full flex-col rounded-2xl border border-border-clinic bg-white p-7 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] duration-300 hover:border-secondary/30 hover:shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft-blue text-primary">
          <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{address}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-secondary/90">
            {district}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-clinic bg-bg-tint px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-secondary/40 hover:bg-soft-blue min-w-[140px]"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Ver en Google Maps
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 min-w-[140px]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Coordinar por WhatsApp
        </a>
      </div>
    </motion.article>
  )
}
