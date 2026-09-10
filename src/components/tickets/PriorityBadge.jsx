const STYLES = {
  Low: 'bg-slate-soft text-slate',
  Medium: 'bg-amber-soft text-amber',
  High: 'bg-coral-soft text-coral',
}

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-current/15 px-2 py-1 text-xs font-medium ${STYLES[priority] || 'bg-slate-soft text-slate'}`}
    >
      {priority}
    </span>
  )
}
