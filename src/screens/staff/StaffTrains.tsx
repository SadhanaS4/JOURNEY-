import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { journeyData, activeTrains } from '../../data/journeyData'

export function StaffTrains() {
  const { goBack } = useApp()
  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Staff" title="Train Operations" subtitle="Southern Railway · live fleet" />
      <div className="space-y-3">
        {activeTrains.map((train, i) => (
          <GlassCard key={train.id} className="p-4" delay={0.1 + i * 0.06}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-cream">{train.name}</p>
                <p className="text-[10px] font-mono text-cream/30 mt-0.5">Train {train.id}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${train.status === 'In Transit' ? 'bg-nexa/10 text-nexa border-nexa/20' : 'bg-cream/[0.04] text-cream/40 border-cream/[0.08]'}`}>{train.status}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-cream/40">
              <span>{train.station}</span><span>Platform {train.platform}</span><span className="text-nexa/70">{train.delay}</span>
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-4 mt-4" delay={0.4}>
        <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-2">Demo journey · Sana on board</p>
        <p className="text-sm font-medium text-cream">{journeyData.trainName} · {journeyData.trainId}</p>
        <p className="text-xs text-cream/40 mt-1">Currently at {journeyData.currentStation} · Coach {journeyData.coach}</p>
      </GlassCard>
    </div>
  )
}
