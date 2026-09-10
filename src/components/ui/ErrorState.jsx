import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-paper px-6 py-16 text-center shadow-panel">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-soft">
        <AlertTriangle className="h-6 w-6 text-coral" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-ink">Unable to load tickets</h3>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">{message || 'Please try again.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-brand-dark"
        >
          Retry
        </button>
      )}
    </div>
  )
}
