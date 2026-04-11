import { MessageCircle } from 'lucide-react'
import logoImg from '../assets/logo-centro-patologia.png'
import { Container } from './ui/Container'
import { siteContent } from '../data/siteContent'

export function Footer() {
  const { footer, navigation } = siteContent
  const year = new Date().getFullYear()
  const rights = footer.rights.replace('{year}', String(year))

  return (
    <footer className="border-t border-border-clinic bg-gradient-to-b from-deep-navy to-[#0a2249] text-white">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/15">
                <img
                  src={logoImg}
                  alt=""
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">{footer.brandLine}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                  {footer.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              {footer.doctorName}
              <br />
              <span className="font-mono text-xs text-accent/90">
                CMP {footer.cmp} · RNE {footer.rne}
              </span>
            </p>
            <a
              href={footer.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Navegación
            </p>
            <nav className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-10" aria-label="Pie de página">
              {navigation.items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/45 sm:text-left">
          <p>{rights}</p>
        </div>
      </Container>
    </footer>
  )
}
