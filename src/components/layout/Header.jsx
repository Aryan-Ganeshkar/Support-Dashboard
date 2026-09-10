import { Menu } from 'lucide-react'

export default function Header({ title, description, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-paper/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-ink-soft hover:bg-canvas-deep lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold text-ink">{title}</h1>
          {description && <p className="hidden truncate text-xs text-ink-soft sm:block">{description}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-3">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=priya-agent&backgroundColor=e4f3ef"
            alt="Agent avatar"
            className="h-7 w-7 rounded-full bg-canvas-deep"
          />
          <span className="hidden text-sm font-medium text-ink sm:block">Aryan Ganeshkar</span>
        </div>
      </div>
    </header>
  )
}
