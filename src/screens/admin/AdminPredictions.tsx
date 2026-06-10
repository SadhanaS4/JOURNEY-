import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { Sparkles, AlertOctagon } from 'lucide-react'

const predictions = [
  { title: 'Bengaluru City peak forecast', detail: 'Platform 5-6 expected at 68% capacity between 12:30–13:00. Brindavan Express (12639) on Platform 6.', confidence: 92 },
  { title: 'Chennai Central boarding', detail: 'Lalbagh Express (12608) delay may shift 340 passengers to Gate 3. Reroute recommended.', confidence: 87 },
  { title: 'Weather impact', detail: 'Afternoon showers near Jolarpettai may add 6 min to Bengaluru arrivals.', confidence: 78 },
]

export function AdminPredictions() {
  const { goBack } = useApp()
  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Authority" title="AI Intelligence" subtitle="Powered by NEXA Neural Engine" />
      <div className="flex items-center gap-2 px-1 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-aqua/60" strokeWidth={1.5} />
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase">Predictions</p>
      </div>
      <div className="space-y-3 mb-8">
        {predictions.map((p, i) => (
          <GlassCard key={p.title} className="p-4" delay={0.1 + i * 0.06}>
            <div className="flex gap-3">
              <div className="w-1 rounded-full bg-nexa/60 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-medium text-cream">{p.title}</p>
                  <span className="text-[10px] font-mono text-nexa/70">{p.confidence}%</span>
                </div>
                <p className="text-xs text-cream/40 mt-1 leading-relaxed">{p.detail}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="flex items-center gap-2 px-1 mb-3">
        <AlertOctagon className="w-3.5 h-3.5 text-cream/30" strokeWidth={1.5} />
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase">Emergency Status</p>
      </div>
      <GlassCard className="p-4" delay={0.3}>
        <p className="text-sm font-medium text-cream">No active emergencies</p>
        <p className="text-xs text-cream/40 mt-1">All systems nominal across the network.</p>
      </GlassCard>
    </div>
  )
}
