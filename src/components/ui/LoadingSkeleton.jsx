export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 shadow-panel">
      <div className="skeleton h-3 w-20 rounded" />
      <div className="skeleton mt-4 h-8 w-16 rounded" />
      <div className="skeleton mt-3 h-3 w-28 rounded" />
    </div>
  )
}

export function TicketRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-line-soft px-5 py-4">
      <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
      <div className="skeleton h-6 w-16 rounded-md" />
      <div className="skeleton hidden h-6 w-20 rounded-md sm:block" />
      <div className="skeleton hidden h-3 w-16 rounded md:block" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 shadow-panel">
      <div className="skeleton h-3 w-32 rounded" />
      <div className="skeleton mt-5 h-48 w-full rounded-lg" />
    </div>
  )
}
