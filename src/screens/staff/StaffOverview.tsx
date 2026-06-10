import { Users, Train, AlertTriangle, TrendingUp } from 'lucide-react'
import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { stationIntel } from '../../data/journeyData'

export function StaffOverview() {
  const { displayName, goBack } = useApp()
  const stats = [
    { label: 'Active Passengers', value: '1,247', change: '+12%', icon: Users },
    { label: 'Trains In Transit', value: '8', change: 'On schedule', icon: Train },
    { label: 'Active Alerts', value: '3', change: '2 resolved', icon: AlertTriangle },
    { label: 'Flow Rate', value: '94%', change: '+3%', icon: TrendingUp },
  ]

  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Staff Portal" title={displayName} subtitle={stationIntel.station} />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, i) => (
          <GlassCard key={stat.label} className="p-4" delay={0.1 + i * 0.05}>
            <stat.icon className="w-4 h-4 text-nexa/60 mb-3" strokeWidth={1.5} />
            <p className="text-2xl font-display font-light text-cream">{stat.value}</p>
            <p className="text-[10px] text-cream/35 mt-1">{stat.label}</p>
            <p className="text-[10px] text-nexa/70 mt-0.5">{stat.change}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-5" delay={0.3}>
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase mb-4">Platform Status</p>
        <div className="space-y-3">
          {stationIntel.platforms.map((p) => (
            <div key={p.platform} className="flex items-center justify-between py-2 border-b border-cream/[0.04] last:border-0">
              <span className="text-sm text-cream">Platform {p.platform}</span>
              <span className={`text-xs font-medium capitalize ${p.level === 'low' ? 'text-nexa' : p.level === 'moderate' ? 'text-amber-400/80' : 'text-red-400/80'}`}>
                {p.congestion}% · {p.level}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
