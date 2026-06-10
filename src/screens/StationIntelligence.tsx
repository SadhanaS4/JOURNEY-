import { motion } from 'framer-motion'
import { Sparkles, DoorOpen, TrendingUp } from 'lucide-react'
import { ScreenHeader } from '../components/layout/ScreenHeader'
import { useApp } from '../context/AppContext'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { stationIntel } from '../data/journeyData'

const congestionColors = { low: '#00B3A4', moderate: '#D4A853', high: '#C97A7A', critical: '#B85C5C' }

function HeatmapBar({ congestion, level }: { congestion: number; level: string }) {
  const color = congestionColors[level as keyof typeof congestionColors] ?? '#00B3A4'
  return (
    <div className="flex gap-0.5 h-8">
      {Array.from({ length: 20 }).map((_, i) => {
        const threshold = (i + 1) * 5
        const isActive = congestion >= threshold
        return (
          <motion.div key={i} className="flex-1 rounded-sm"
            style={{ backgroundColor: isActive ? color : 'rgba(250,250,248,0.04)', opacity: isActive ? 0.4 + (congestion / 100) * 0.6 : 1 }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.02, duration: 0.3 }} />
        )
      })}
    </div>
  )
}

export function StationIntelligence() {
  const { goBack } = useApp()
  const intel = stationIntel

  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Station Intel" title="Bengaluru City Guidance" subtitle="Platform 6 · Coach B2 · Gate recommendations" />

      <GlassCard className="p-6 mb-5 relative overflow-hidden" bright delay={0.1}>
        <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">Station</p>
        <h2 className="font-display text-xl font-medium text-cream mb-5">{intel.station}</h2>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">Overall Crowd</p>
            <p className="text-3xl font-display font-light text-gradient-nexa">
              <AnimatedCounter value={intel.overallCrowd} suffix="%" delay={0.15} />
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cream/40">
            <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Peak in 12 min</span>
          </div>
        </div>
        <div className="mt-4"><HeatmapBar congestion={intel.overallCrowd} level="moderate" /></div>
      </GlassCard>

      <p className="text-xs font-medium tracking-wider text-cream/40 uppercase px-1 mb-3">Platform Congestion</p>
      <div className="space-y-3 mb-6">
        {intel.platforms.map((platform, i) => (
          <GlassCard key={platform.platform} className="p-4" delay={0.15 + i * 0.08}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-cream">Platform {platform.platform}</span>
                {platform.platform === '6' && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-nexa/10 text-nexa border border-nexa/20 font-medium">YOUR PLATFORM</span>
                )}
              </div>
              <span className="text-xs font-medium capitalize" style={{ color: congestionColors[platform.level] }}>{platform.level}</span>
            </div>
            <HeatmapBar congestion={platform.congestion} level={platform.level} />
          </GlassCard>
        ))}
      </div>

      <p className="text-xs font-medium tracking-wider text-cream/40 uppercase px-1 mb-3">Gate Recommendations</p>
      <div className="space-y-2 mb-6">
        {intel.platforms[0].gates.map((gate, i) => (
          <GlassCard key={gate.id} className="p-4" delay={0.3 + i * 0.06}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${gate.recommended ? 'bg-nexa/10 border border-nexa/20' : 'bg-cream/[0.03] border border-cream/[0.06]'}`}>
                  <DoorOpen className={`w-4 h-4 ${gate.recommended ? 'text-nexa' : 'text-cream/30'}`} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-cream">{gate.id}</p>
                  <p className="text-[10px] text-cream/30">Platform 6 · Coach B2 access</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-mono ${gate.recommended ? 'text-nexa' : 'text-cream/40'}`}>{gate.wait}</p>
                {gate.recommended && <p className="text-[9px] text-nexa/70 font-medium mt-0.5">RECOMMENDED</p>}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex items-center gap-2 px-1 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-aqua/60" strokeWidth={1.5} />
        <p className="text-xs font-medium tracking-wider text-cream/40 uppercase">AI Suggestions</p>
      </div>
      <div className="space-y-3">
        {intel.suggestions.map((suggestion, i) => (
          <GlassCard key={suggestion.title} className="p-4" delay={0.4 + i * 0.08}>
            <div className="flex gap-3">
              <div className={`w-1 rounded-full shrink-0 ${suggestion.priority === 'high' ? 'bg-nexa' : suggestion.priority === 'medium' ? 'bg-aqua/60' : 'bg-cream/15'}`} />
              <div>
                <p className="text-sm font-medium text-cream mb-1">{suggestion.title}</p>
                <p className="text-xs text-cream/40 leading-relaxed">{suggestion.detail}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
