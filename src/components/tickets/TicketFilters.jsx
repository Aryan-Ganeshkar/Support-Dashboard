import { Search, X } from 'lucide-react'
import { useTicketStore } from '../../store/ticketStore'

export default function TicketFilters() {
  const search = useTicketStore((s) => s.search)
  const statusFilter = useTicketStore((s) => s.statusFilter)
  const priorityFilter = useTicketStore((s) => s.priorityFilter)
  const setSearch = useTicketStore((s) => s.setSearch)
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter)
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter)
  const clearFilters = useTicketStore((s) => s.clearFilters)

  const hasActiveFilters = search !== '' || statusFilter !== 'All' || priorityFilter !== 'All'

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer, email, subject or ID…"
          className="w-full rounded-lg border border-line bg-paper py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20 sm:flex-none"
        >
          <option value="All">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20 sm:flex-none"
        >
          <option value="All">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-line px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-canvas-deep hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
