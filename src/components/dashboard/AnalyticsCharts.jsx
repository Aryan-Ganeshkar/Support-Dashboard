import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts'

const STATUS_COLORS = { Open: '#2563eb', 'In Progress': '#d97706', Resolved: '#0e9f6e' }
const PRIORITY_COLORS = { Low: '#64748b', Medium: '#d97706', High: '#dc2626' }

function buildStatusData(tickets) {
  return ['Open', 'In Progress', 'Resolved'].map((status) => ({
    name: status,
    value: tickets.filter((t) => t.status === status).length,
  }))
}

function buildPriorityData(tickets) {
  return ['Low', 'Medium', 'High'].map((priority) => ({
    name: priority,
    value: tickets.filter((t) => t.priority === priority).length,
  }))
}

function buildOverviewData(tickets) {
  const byDay = new Map()
  tickets.forEach((t) => {
    const day = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    byDay.set(day, (byDay.get(day) || 0) + 1)
  })
  return Array.from(byDay.entries())
    .map(([day, count]) => ({ day, count, dateVal: new Date(day + ' 2025').getTime() }))
    .sort((a, b) => a.dateVal - b.dateVal)
    .map(({ day, count }) => ({ day, count }))
}

function ChartCard({ title, subtitle, children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="rounded-xl border border-line bg-paper p-5 shadow-panel transition-shadow duration-200 hover:shadow-float"
    >
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-ink-soft">{subtitle}</p>}
      <div className="mt-4 h-56">{children}</div>
    </motion.div>
  )
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  border: '1px solid #e6e6f0',
  boxShadow: '0 8px 24px -8px rgba(18,21,28,0.15)',
}

export default function AnalyticsCharts({ tickets }) {
  const statusData = buildStatusData(tickets)
  const priorityData = buildPriorityData(tickets)
  const overviewData = buildOverviewData(tickets)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ChartCard title="Status distribution" subtitle="Share of tickets by status" index={0}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              strokeWidth={0}
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {statusData.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5 text-xs text-ink-soft">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[s.name] }} />
              {s.name} ({s.value})
            </span>
          ))}
        </div>
      </ChartCard>

      <ChartCard title="Priority distribution" subtitle="Ticket volume by priority level" index={1}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={priorityData} barSize={36}>
            <CartesianGrid vertical={false} stroke="#eeeef5" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#5c5f78' }} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#5c5f78' }} width={24} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f7f7fb' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {priorityData.map((entry) => (
                <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Tickets overview" subtitle="New tickets created per day" index={2}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={overviewData}>
            <defs>
              <linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eeeef5" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#5c5f78' }} interval="preserveStartEnd" />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#5c5f78' }} width={24} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2.25} fill="url(#overviewFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
