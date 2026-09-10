const STYLES = {
  Open: 'bg-blue-soft text-blue',
  'In Progress': 'bg-amber-soft text-amber',
  Resolved: 'bg-success-soft text-success-dark',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${STYLES[status] || 'bg-slate-soft text-slate'}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
