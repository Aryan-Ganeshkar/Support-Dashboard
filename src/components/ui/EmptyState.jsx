import { Inbox } from 'lucide-react'

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas-deep">
        <Inbox className="h-6 w-6 text-ink-faint" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink">No tickets found</h3>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">
        No tickets match your current search and filters. Try adjusting them or clear everything to start over.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-5 rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
