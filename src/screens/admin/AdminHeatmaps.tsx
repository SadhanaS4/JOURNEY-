import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'

const heatmapData = [
  { zone: 'Chennai Central Concourse', intensity: 74 },
  { zone: 'Bengaluru City PF 5-6', intensity: 61 },
  { zone: 'Secunderabad Main Hall', intensity: 58 },
  { zone: 'Yesvantpur Terminal', intensity: 49 },
  { zone: 'Hyderabad Deccan Entry', intensity: 55 },
  { zone: 'Mysuru Junction PF 1-2', intensity: 42 },
  { zone: 'Katpadi Transit', intensity: 38 },
  { zone: 'Jolarpettai Corridor', intensity: 33 },
]

function intensityColor(v: number) {
  if (v < 40) return 'rgba(0, 179, 164, 0.55)'
  if (v < 70) return 'rgba(212, 168, 83, 0.55)'
  return 'rgba(201, 122, 122, 0.55)'
}

export function AdminHeatmaps() {
  const { goBack } = useApp()
  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Authority" title="Network Heatmaps" subtitle="Southern Railway zone density" />
      <GlassCard className="p-6 mb-5" bright delay={0.1}>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {heatmapData.map((cell) => (
            <div key={cell.zone} className="aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: intensityColor(cell.intensity) }}>
              <span className="text-[10px] font-mono text-cream/80">{cell.intensity}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="space-y-2">
        {heatmapData.map((z, i) => (
          <GlassCard key={z.zone} className="px-4 py-3" delay={0.15 + i * 0.04}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cream">{z.zone}</span>
              <span className="text-xs font-mono text-cream/40">{z.intensity}%</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
