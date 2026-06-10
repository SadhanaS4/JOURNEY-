import { motion } from 'framer-motion'
import { ScreenHeader } from '../components/layout/ScreenHeader'
import { useApp } from '../context/AppContext'
import { GlassCard } from '../components/ui/GlassCard'
import { journeyData } from '../data/journeyData'

export function LiveRoute() {
  const { goBack } = useApp()
  const route = journeyData.route
  const currentIndex = route.findIndex((s) => s.status === 'current')
  const trainPosition = currentIndex >= 0 ? (currentIndex / (route.length - 1)) * 100 : 0

  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Live Tracking" title="Live Route" subtitle="Brindavan Express · Chennai Central to Bengaluru City" />

      <GlassCard className="p-6 mb-5 relative overflow-hidden" bright delay={0.1}>
        <div className="absolute inset-0 bg-gradient-to-b from-nexa/5 via-transparent to-aqua/5 pointer-events-none" />

        <div className="relative h-72 mb-6">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008F84" stopOpacity="0.3" />
                <stop offset={`${trainPosition}%`} stopColor="#00B3A4" stopOpacity="0.7" />
                <stop offset={`${trainPosition}%`} stopColor="#FAFAF8" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FAFAF8" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 40 200 Q 120 120, 200 160 T 360 140 T 520 180"
              fill="none" stroke="url(#routeGradient)" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <path d="M 40 200 Q 120 120, 200 160 T 360 140 T 520 180" fill="none" stroke="rgba(250,250,248,0.05)" strokeWidth="1.5" strokeDasharray="4 8" strokeLinecap="round" />
          </svg>

          {route.map((station, i) => {
            const xPositions = [40, 120, 200, 280, 360, 440]
            const yPositions = [200, 140, 160, 150, 140, 180]
            const x = xPositions[i] ?? 40 + i * 80
            const y = yPositions[i] ?? 160
            return (
              <motion.div key={station.id} className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.12 }}>
                <div className={`w-3 h-3 rounded-full border-2 ${
                  station.status === 'completed' ? 'bg-nexa border-nexa' : station.status === 'current' ? 'bg-aqua border-aqua' : 'bg-elevated border-cream/15'
                }`} style={station.status === 'current' ? { boxShadow: '0 0 16px rgba(0,179,164,0.4)' } : undefined} />
                <p className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium ${station.status === 'current' ? 'text-nexa' : 'text-cream/30'}`}>{station.code}</p>
              </motion.div>
            )
          })}

          <motion.div className="absolute z-10" initial={{ left: '8%', top: '62%' }}
            animate={{ left: `${8 + trainPosition * 0.84}%`, top: `${55 + Math.sin(trainPosition * 0.05) * 5}%` }}
            transition={{ duration: 3, ease: 'easeInOut' }} style={{ transform: 'translate(-50%, -50%)' }}>
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="w-10 h-5 rounded-lg bg-gradient-to-r from-nexa-deep to-nexa border border-nexa/30 flex items-center justify-center shadow-soft">
                <div className="w-6 h-1 rounded-full bg-cream/20" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-cream/[0.06]">
          <div>
            <p className="text-[10px] text-cream/30 uppercase tracking-wider">Current Speed</p>
            <p className="text-lg font-display font-light text-cream mt-0.5">142 <span className="text-sm text-cream/40">km/h</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-cream/30 uppercase tracking-wider">On Schedule</p>
            <p className="text-lg font-display font-light text-nexa mt-0.5">+2 min</p>
          </div>
        </div>
      </GlassCard>

      <p className="text-xs font-medium tracking-wider text-cream/40 uppercase px-1 mb-3">Arrival Predictions</p>
      <div className="space-y-3">
        {route.filter((s) => s.status !== 'completed').map((station, i) => (
          <GlassCard key={station.id} className="p-4" delay={0.2 + i * 0.08}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${station.status === 'current' ? 'bg-nexa' : 'bg-cream/10'}`} />
                <div>
                  <p className="text-sm font-medium text-cream">{station.name}</p>
                  <p className="text-[10px] text-cream/30 font-mono mt-0.5">{station.code}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-gradient-nexa">{station.eta}</p>
                <p className="text-[10px] text-cream/25 mt-0.5">{station.status === 'current' ? 'Departing' : 'Estimated'}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
