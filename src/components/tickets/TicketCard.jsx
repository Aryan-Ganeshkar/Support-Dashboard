import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import StatusSelect from './StatusSelect'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TicketCard({ ticket, onOpen, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 10) * 0.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(ticket.id)}
      className="rounded-xl border border-line bg-paper p-4 shadow-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-medium text-ink">{ticket.customerName}</div>
          <div className="text-xs text-ink-faint">{ticket.ticketNumber}</div>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{ticket.subject}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
        <span className="text-xs text-ink-faint">{formatDate(ticket.createdAt)}</span>
      </div>

      <div className="mt-3 border-t border-line-soft pt-3" onClick={(e) => e.stopPropagation()}>
        <StatusSelect ticket={ticket} className="w-full" />
      </div>
    </motion.div>
  )
}
