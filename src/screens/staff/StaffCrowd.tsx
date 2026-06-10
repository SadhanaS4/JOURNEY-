import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { stationIntel } from '../../data/journeyData'

function HeatmapBar({ congestion, level }: { congestion: number; level: string }) {
  const colors: Record<string, string> = { low: '#00B3A4', moderate: '#D4A853', high: '#C97A7A', critical: '#B85C5C' }
  const color = colors[level] ?? '#00B3A4'
  return (
    <div className="flex gap-0.5 h-10">
      {Array.from({ length: 24 }).map((_, i) => {
        const threshold = (i + 1) * (100 / 24)
        const isActive = congestion >= threshold
        return <div key={i} className="flex-1 rounded-sm" style={{ backgroundColor: isActive ? color : 'rgba(250,250,248,0.04)', opacity: isActive ? 0.5 + (congestion / 100) * 0.5 : 1 }} />
      })}
    </div>
  )
}

export function StaffCrowd() {
  const { goBack } = useApp()
  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Staff" title="Crowd Analytics" subtitle={`${stationIntel.station} (${stationIntel.stationCode})`} />

      <GlassCard className="p-6 mb-5" bright delay={0.1}>
        <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">Station-wide</p>
        <p className="text-4xl font-display font-light text-gradient-nexa mb-4">{stationIntel.overallCrowd}%</p>
        <HeatmapBar congestion={stationIntel.overallCrowd} level="moderate" />
      </GlassCard>

      <div className="space-y-3">
        {stationIntel.platforms.map((p, i) => (
          <GlassCard key={p.platform} className="p-4" delay={0.15 + i * 0.08}>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium text-cream">Platform {p.platform}</span>
              <span className="text-xs text-cream/40">{p.congestion}% capacity</span>
            </div>
            <HeatmapBar congestion={p.congestion} level={p.level} />
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
