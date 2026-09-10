import { motion } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'

export default function StatCard({ label, value, hint, icon: Icon, tone = 'ink', index = 0 }) {
  const toneStyles = {
    ink: 'bg-canvas-deep text-ink',
    brand: 'bg-brand-soft text-brand-dark',
    success: 'bg-success-soft text-success-dark',
    amber: 'bg-amber-soft text-amber',
    blue: 'bg-blue-soft text-blue',
  }

  const numericValue = typeof value === 'number' ? value : parseInt(value, 10) || 0
  const animated = useCountUp(numericValue)
  const displayValue = typeof value === 'number' ? animated : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group rounded-xl border border-line bg-paper p-5 shadow-panel transition-shadow duration-200 hover:shadow-float"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-soft">{label}</span>
        <motion.div
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneStyles[tone]}`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.9} />
        </motion.div>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-ink tabular-nums">{displayValue}</div>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </motion.div>
  )
}
