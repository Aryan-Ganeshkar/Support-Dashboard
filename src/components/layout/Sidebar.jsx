import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, TicketCheck, X, Headset } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: LayoutGrid },
  { to: '/tickets', label: 'Tickets', icon: TicketCheck },
]

function NavItems({ onNavigate }) {
  const location = useLocation()

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-lg bg-brand-soft"
              />
            )}
            <Icon
              className={`relative z-10 h-[18px] w-[18px] ${isActive ? 'text-brand-dark' : 'text-ink-soft'}`}
              strokeWidth={1.8}
            />
            <span className={`relative z-10 ${isActive ? 'text-brand-dark' : 'text-ink-soft'}`}>{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-paper lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-line px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-paper">
            <Headset className="h-4 w-4" strokeWidth={2} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-ink">Helpdesk</span>
        </div>
        <div className="flex flex-1 flex-col py-4">
          <NavItems />
        </div>
        <div className="border-t border-line p-4">
          <div className="rounded-lg bg-canvas px-3 py-2.5 text-xs text-ink-soft">
            Support Dashboard <br /> v1.0
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-ink/40"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute left-0 top-0 flex h-full w-64 flex-col bg-paper shadow-float"
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-paper">
                    <Headset className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="text-[15px] font-semibold tracking-tight text-ink">Helpdesk</span>
                </div>
                <button onClick={onClose} className="rounded-md p-1.5 text-ink-soft hover:bg-canvas-deep">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col py-4">
                <NavItems onNavigate={onClose} />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
