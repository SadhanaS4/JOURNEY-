import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { staffNetworkStations } from '../../data/journeyData'
import { Activity, Users, Train, Zap } from 'lucide-react'

export function AdminOverview() {
  const { displayName, goBack } = useApp()
  const networkStats = [
    { label: 'Network Uptime', value: '99.6%', icon: Activity },
    { label: 'Passengers Guided', value: '12.8K', icon: Users },
    { label: 'Active Trains', value: '186', icon: Train },
    { label: 'On-Time Rate', value: '94.2%', icon: Zap },
  ]

  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Authority" title={displayName} subtitle="Southern & South Central Railway network" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        {networkStats.map((s, i) => (
          <GlassCard key={s.label} className="p-4" delay={0.1 + i * 0.05}>
            <s.icon className="w-4 h-4 text-nexa/50 mb-3" strokeWidth={1.5} />
            <p className="text-2xl font-display font-light text-cream">{s.value}</p>
            <p className="text-[10px] text-cream/35 mt-1">{s.label}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-5" delay={0.3}>
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase mb-4">Station Operations</p>
        <div className="space-y-3">
          {staffNetworkStations.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <span className="text-sm text-cream">{s.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 rounded-full bg-cream/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-nexa-deep to-nexa" style={{ width: `${s.crowd}%` }} />
                </div>
                <span className="text-xs text-cream/40 w-8 text-right">{s.crowd}%</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
