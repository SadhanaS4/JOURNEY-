import { useState } from 'react'
import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'

const controls = [
  { id: 'announcements', label: 'PA Announcements', enabled: true },
  { id: 'gates', label: 'Auto Gate Routing', enabled: true },
  { id: 'crowd', label: 'Crowd Throttling', enabled: false },
  { id: 'ai', label: 'AI Predictions', enabled: true },
]

export function AdminSystem() {
  const { goBack } = useApp()
  const [toggles, setToggles] = useState(Object.fromEntries(controls.map((c) => [c.id, c.enabled])))

  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Authority" title="System Controls" subtitle="Network-wide configuration" />
      <div className="space-y-3 mb-6">
        {controls.map((ctrl, i) => (
          <GlassCard key={ctrl.id} className="p-4" delay={0.1 + i * 0.05}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-cream">{ctrl.label}</span>
              <button onClick={() => setToggles((t) => ({ ...t, [ctrl.id]: !t[ctrl.id] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${toggles[ctrl.id] ? 'bg-nexa' : 'bg-cream/[0.08]'}`}>
                <motion.div className="absolute top-1 w-4 h-4 rounded-full bg-cream shadow"
                  animate={{ left: toggles[ctrl.id] ? '24px' : '4px' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-5" delay={0.4}>
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase mb-3">User Statistics</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-xl font-display font-light text-cream">12.4K</p><p className="text-[10px] text-cream/30 mt-1">Registered</p></div>
          <div><p className="text-xl font-display font-light text-cream">3.8K</p><p className="text-[10px] text-cream/30 mt-1">Active Today</p></div>
          <div><p className="text-xl font-display font-light text-cream">97%</p><p className="text-[10px] text-cream/30 mt-1">Satisfaction</p></div>
        </div>
      </GlassCard>
    </div>
  )
}
