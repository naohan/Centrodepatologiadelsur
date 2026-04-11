export function SectionBadge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border-clinic bg-soft-blue/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-secondary ${className}`}
    >
      {children}
    </span>
  )
}
