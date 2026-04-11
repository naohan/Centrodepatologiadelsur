import { SectionBadge } from './SectionBadge'

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
  dark = false,
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  const subCls = dark ? 'text-white/75' : 'text-text-muted'

  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      {badge ? (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          {dark ? (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-accent backdrop-blur-sm">
              {badge}
            </span>
          ) : (
            <SectionBadge>{badge}</SectionBadge>
          )}
        </div>
      ) : null}
      <h2
        className={`mt-4 text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? 'text-white' : 'text-text-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${subCls}`}>{subtitle}</p>
      ) : null}
    </div>
  )
}
