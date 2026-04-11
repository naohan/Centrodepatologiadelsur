import { motion } from 'framer-motion'

const motionProps = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
}

export function SecondaryButton({
  href,
  children,
  className = '',
  type = 'button',
  external,
  onClick,
  dark = false,
}) {
  const base = dark
    ? 'inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center justify-center gap-2 rounded-xl border border-border-clinic bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:border-secondary/40 hover:bg-soft-blue/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

  const classes = `${base} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} className={classes} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
