import { Ticket, CircleDot, Clock3, CircleCheck } from 'lucide-react'
import StatCard from './StatCard'

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard index={0} label="Total Tickets" value={stats.total} hint="All time" icon={Ticket} tone="brand" />
      <StatCard index={1} label="Open" value={stats.open} hint="Awaiting response" icon={CircleDot} tone="blue" />
      <StatCard index={2} label="In Progress" value={stats.inProgress} hint="Being worked on" icon={Clock3} tone="amber" />
      <StatCard index={3} label="Resolved" value={stats.resolved} hint="Closed out" icon={CircleCheck} tone="success" />
    </div>
  )
}
