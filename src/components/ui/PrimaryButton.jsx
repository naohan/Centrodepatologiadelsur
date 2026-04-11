import { motion } from 'framer-motion'

const motionProps = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
}

export function PrimaryButton({
  href,
  children,
  className = '',
  type = 'button',
  external,
  onClick,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`

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
