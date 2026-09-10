import { useEffect } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import StatsRow from '../components/dashboard/StatsRow'
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts'
import { StatCardSkeleton, ChartSkeleton } from '../components/ui/LoadingSkeleton'
import ErrorState from '../components/ui/ErrorState'
import { useTicketStore } from '../store/ticketStore'

export default function Overview() {
  const tickets = useTicketStore((s) => s.tickets)
  const loading = useTicketStore((s) => s.loading)
  const error = useTicketStore((s) => s.error)
  const fetchAllTickets = useTicketStore((s) => s.fetchAllTickets)
  const getStats = useTicketStore((s) => s.getStats)

  useEffect(() => {
    if (tickets.length === 0) fetchAllTickets()
  }, [])

  return (
    <DashboardLayout title="Overview" description="Support team activity at a glance">
      <div className="mx-auto max-w-6xl space-y-6">
        {loading ? (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ChartSkeleton key={i} />
              ))}
            </div>
          </>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAllTickets} />
        ) : (
          <>
            <StatsRow stats={getStats()} />
            <AnalyticsCharts tickets={tickets} />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
