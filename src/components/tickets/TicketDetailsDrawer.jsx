import { motion } from 'framer-motion'
import { X, Mail, Phone, Calendar } from 'lucide-react'
import { useTicketStore } from '../../store/ticketStore'
import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'
import StatusSelect from './StatusSelect'
import Conversation from './Conversation'

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function TicketDetailsDrawer() {
  const tickets = useTicketStore((s) => s.tickets)
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId)
  const closeTicket = useTicketStore((s) => s.closeTicket)

  const ticket = tickets.find((t) => t.id === selectedTicketId)
  if (!ticket) return null

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-ink/40"
        onClick={closeTicket}
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-float"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="text-xs font-medium text-ink-faint">{ticket.ticketNumber}</p>
            <h2 className="mt-0.5 text-base font-semibold text-ink">Ticket details</h2>
          </div>
          <button onClick={closeTicket} className="rounded-md p-1.5 text-ink-soft transition-colors hover:bg-canvas-deep" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Status + priority */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} />
            </div>
            <StatusSelect ticket={ticket} />
          </div>

          {/* Subject */}
          <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">{ticket.subject}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{ticket.description}</p>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
            <Calendar className="h-3.5 w-3.5" />
            Created {formatDateTime(ticket.createdAt)}
          </div>

          {/* Customer info */}
          <div className="mt-6 rounded-lg border border-line bg-canvas/60 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Customer</p>
            <p className="mt-1.5 text-sm font-medium text-ink">{ticket.customerName}</p>
            <div className="mt-2 space-y-1.5 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-ink-faint" />
                <span className="truncate">{ticket.customerEmail}</span>
              </div>
              {ticket.customerPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-ink-faint" />
                  <span>{ticket.customerPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Conversation */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-faint">Conversation</p>
            <Conversation messages={ticket.messages} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
