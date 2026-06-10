import { motion } from 'framer-motion'
import { LayoutDashboard, Route, CreditCard, Radar } from 'lucide-react'
import type { PassengerScreen } from '../../types'

interface NavigationProps {
  active: PassengerScreen
  onChange: (screen: PassengerScreen) => void
}

const items: { id: PassengerScreen; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'route', label: 'Live Route', icon: Route },
  { id: 'pass', label: 'Nexa Pass', icon: CreditCard },
  { id: 'intelligence', label: 'Guidance', icon: Radar },
]

export function Navigation({ active, onChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-7 pt-2">
      <div className="mx-auto max-w-lg">
        <div className="glass rounded-2xl p-1.5 flex items-center justify-between">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-nexa/10 border border-nexa/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`relative w-[18px] h-[18px] ${isActive ? 'text-nexa' : 'text-cream/35'}`} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`relative text-[10px] font-medium ${isActive ? 'text-cream/90' : 'text-cream/30'}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
