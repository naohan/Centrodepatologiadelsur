import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, UserCog } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo-centro-patologia.png'
import { Container } from './ui/Container'
import { siteContent } from '../data/siteContent'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { brand, navigation } = siteContent

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const headerBg = scrolled
    ? 'border-border-clinic/80 bg-white/85 shadow-sm backdrop-blur-xl'
    : 'border-transparent bg-bg-tint/40 backdrop-blur-md'

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${headerBg}`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 lg:h-[80px]">
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-3 rounded-lg outline-none ring-primary/0 transition ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoImg}
            alt={brand.logoAlt}
            className="h-11 w-auto object-contain sm:h-12"
            width={180}
            height={48}
          />
          <span className="hidden min-w-0 flex-col text-left leading-tight sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
              {brand.name}
            </span>
            <span className="text-xs text-text-muted">{brand.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navigation.items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-soft-blue/60 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-soft-blue/60"
          >
            <UserCog className="h-4 w-4" aria-hidden />
            Acceso admin
          </Link>
          <a
            href={navigation.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border-clinic bg-white text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Menú</span>
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border-clinic bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {navigation.items.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="rounded-xl px-4 py-3 text-base font-medium text-text-dark hover:bg-soft-blue"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={navigation.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-base font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Contactar por WhatsApp
              </a>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-border-clinic bg-white px-4 py-3.5 text-base font-semibold text-primary"
                onClick={() => setOpen(false)}
              >
                <UserCog className="h-5 w-5" aria-hidden />
                Acceso admin
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
