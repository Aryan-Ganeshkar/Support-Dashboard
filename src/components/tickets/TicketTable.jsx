import { motion } from 'framer-motion'
import PriorityBadge from './PriorityBadge'
import StatusSelect from './StatusSelect'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function TicketTable({ tickets, onOpen }) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-line bg-paper shadow-panel md:block">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-line bg-canvas/60 text-xs font-medium text-ink-soft">
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-5 py-3 font-medium">Subject</th>
            <th className="px-5 py-3 font-medium">Priority</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <motion.tr
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i, 10) * 0.03 }}
              onClick={() => onOpen(t.id)}
              whileHover={{ backgroundColor: 'rgba(238,240,253,0.5)' }}
              className="cursor-pointer border-b border-line-soft text-sm last:border-0"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand-dark">
                    {initials(t.customerName)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-ink">{t.customerName}</div>
                    <div className="truncate text-xs text-ink-faint">{t.ticketNumber}</div>
                  </div>
                </div>
              </td>
              <td className="max-w-xs px-5 py-3.5">
                <div className="truncate text-ink-soft">{t.subject}</div>
              </td>
              <td className="px-5 py-3.5">
                <PriorityBadge priority={t.priority} />
              </td>
              <td className="px-5 py-3.5">
                <StatusSelect ticket={t} />
              </td>
              <td className="px-5 py-3.5 text-xs text-ink-faint">{formatDate(t.createdAt)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
