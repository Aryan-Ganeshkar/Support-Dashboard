function formatTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Conversation({ messages }) {
  if (!messages || messages.length === 0) {
    return <p className="text-sm text-ink-faint">No messages yet on this ticket.</p>
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => {
        const isSupport = m.author === 'support'
        return (
          <div key={m.id} className={`flex ${isSupport ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${isSupport ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isSupport ? 'rounded-tr-sm bg-brand text-paper' : 'rounded-tl-sm bg-canvas-deep text-ink'
                }`}
              >
                {m.text}
              </div>
              <span className="mt-1 px-1 text-[11px] text-ink-faint">
                {m.name} · {formatTime(m.time)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
