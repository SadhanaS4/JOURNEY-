import { motion } from 'framer-motion'
import { LayoutDashboard, Map, Settings, Sparkles } from 'lucide-react'
import type { AdminScreen } from '../../types'

interface Props {
  active: AdminScreen
  onChange: (s: AdminScreen) => void
}

const items: { id: AdminScreen; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Network', icon: LayoutDashboard },
  { id: 'heatmaps', label: 'Heatmaps', icon: Map },
  { id: 'system', label: 'System', icon: Settings },
  { id: 'predictions', label: 'AI Intel', icon: Sparkles },
]

export function AdminNavigation({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-7 pt-2">
      <div className="mx-auto max-w-lg">
        <div className="glass rounded-2xl p-1.5 flex items-center justify-between">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button key={item.id} onClick={() => onChange(item.id)} className="relative flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl">
                {isActive && (
                  <motion.div layoutId="admin-nav-pill" className="absolute inset-0 rounded-xl bg-nexa/10 border border-nexa/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
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
