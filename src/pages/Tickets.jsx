import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/layout/DashboardLayout'
import TicketFilters from '../components/tickets/TicketFilters'
import TicketTable from '../components/tickets/TicketTable'
import TicketCard from '../components/tickets/TicketCard'
import TicketDetailsDrawer from '../components/tickets/TicketDetailsDrawer'
import { TicketRowSkeleton } from '../components/ui/LoadingSkeleton'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import { useTicketStore } from '../store/ticketStore'

export default function Tickets() {
  const tickets = useTicketStore((s) => s.tickets)
  const loading = useTicketStore((s) => s.loading)
  const error = useTicketStore((s) => s.error)
  const fetchAllTickets = useTicketStore((s) => s.fetchAllTickets)
  const getFilteredTickets = useTicketStore((s) => s.getFilteredTickets)
  const clearFilters = useTicketStore((s) => s.clearFilters)
  const openTicket = useTicketStore((s) => s.openTicket)
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId)

  useEffect(() => {
    if (tickets.length === 0) fetchAllTickets()
  }, [])

  const filtered = getFilteredTickets()

  return (
    <DashboardLayout title="Tickets" description="Search, filter and manage customer support tickets">
      <div className="mx-auto max-w-6xl space-y-4">
        <TicketFilters />

        {loading ? (
          <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-panel">
            {Array.from({ length: 6 }).map((_, i) => (
              <TicketRowSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAllTickets} />
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-line bg-paper shadow-panel">
            <EmptyState onClearFilters={clearFilters} />
          </div>
        ) : (
          <>
            <p className="text-xs text-ink-faint">
              Showing {filtered.length} of {tickets.length} tickets
            </p>
            <TicketTable tickets={filtered} onOpen={openTicket} />
            <div className="grid gap-3 md:hidden">
              {filtered.map((t, i) => (
                <TicketCard key={t.id} ticket={t} onOpen={openTicket} index={i} />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>{selectedTicketId && <TicketDetailsDrawer key="drawer" />}</AnimatePresence>
    </DashboardLayout>
  )
}
