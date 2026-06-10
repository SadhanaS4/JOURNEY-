import { motion } from 'framer-motion'
import { Train, MapPin, Clock, ArrowRight, Circle, Navigation } from 'lucide-react'
import { journeyData } from '../data/journeyData'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { CrowdIndicator } from '../components/ui/CrowdIndicator'
import { WeatherWidget } from '../components/ui/WeatherWidget'
import { ScreenHeader } from '../components/layout/ScreenHeader'
import { useApp } from '../context/AppContext'

export function Dashboard() {
  const data = journeyData
  const { goBack, displayName } = useApp()

  return (
    <div className="px-5 pb-32">
      <ScreenHeader
        onBack={goBack}
        backLabel="Exit"
        eyebrow="Passenger"
        title={displayName ? `${displayName}'s Journey` : 'Your Journey'}
        subtitle={`${data.service} · Live status`}
      />

      <GlassCard className="p-6 mb-5 relative overflow-hidden" bright delay={0.1}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-nexa/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Circle className="w-2 h-2 fill-nexa text-nexa" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-nexa"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-nexa uppercase">Live</span>
            </div>
            <span className="text-xs text-cream/30 font-mono">{data.trainId}</span>
          </div>

          <h2 className="font-display text-xl font-medium text-cream mb-1">{data.trainName}</h2>
          <p className="text-sm text-cream/40 mb-6 font-light">{data.service}</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-cream/[0.04] rounded-2xl p-3.5 border border-cream/[0.06] col-span-2">
              <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">PNR</p>
              <p className="font-mono text-sm text-cream/70">{data.pnr}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Current PF', value: data.platform },
              { label: 'Coach', value: data.coach },
              { label: 'Seat', value: data.seat },
            ].map((item) => (
              <div key={item.label} className="bg-cream/[0.04] rounded-2xl p-3.5 border border-cream/[0.06]">
                <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-display text-lg font-medium text-gradient-nexa">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <GlassCard className="p-4" delay={0.15}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-nexa/10 border border-nexa/15 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-nexa" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">Current</p>
              <p className="text-sm font-medium text-cream leading-tight">{data.currentStation}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" delay={0.2}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-aqua/10 border border-aqua/15 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-aqua" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">ETA</p>
              <p className="text-sm font-medium text-gradient-nexa leading-tight">{data.eta}</p>
              <p className="text-[10px] text-cream/30 mt-0.5">{data.etaDetail}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5 mb-5" delay={0.22}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-nexa/10 border border-nexa/15 flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4 text-nexa" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-1">Coach Position</p>
            <p className="text-xs text-cream/55 leading-relaxed">{data.coachPosition}</p>
            <p className="text-[10px] text-nexa/70 mt-2">Arrival Platform {data.arrivalPlatform} · Bengaluru City</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 mb-5" delay={0.25}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Train className="w-4 h-4 text-cream/30" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] text-cream/30 uppercase tracking-wider">Next Station</p>
              <p className="text-sm font-medium text-cream mt-0.5">{data.nextStation}</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-nexa/50" strokeWidth={1.5} />
        </div>
      </GlassCard>

      <GlassCard className="p-6 mb-5" delay={0.3}>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-medium tracking-wider text-cream/40 uppercase">Journey Progress</span>
          <span className="text-xs font-mono text-nexa">
            <AnimatedCounter value={data.progress} suffix="%" delay={0.2} />
          </span>
        </div>

        <div className="relative h-1.5 rounded-full bg-cream/[0.06] mb-6 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nexa-deep to-nexa"
            initial={{ width: 0 }}
            animate={{ width: `${data.progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-4">
          {data.route.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${
                  station.status === 'completed'
                    ? 'bg-nexa border-nexa'
                    : station.status === 'current'
                      ? 'bg-aqua border-aqua shadow-[0_0_12px_rgba(0,179,164,0.4)]'
                      : 'bg-transparent border-cream/15'
                }`}
              />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className={`text-sm ${station.status === 'current' ? 'font-medium text-cream' : station.status === 'completed' ? 'text-cream/50' : 'text-cream/30'}`}>
                    {station.name}
                  </p>
                  <p className="text-[10px] text-cream/20 font-mono">{station.code}</p>
                </div>
                <span className="text-xs text-cream/30 font-mono">{station.arrival || station.eta}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-4">
        <GlassCard className="p-5" delay={0.35}>
          <CrowdIndicator level={data.crowdLevel} percent={data.crowdPercent} />
        </GlassCard>
        <WeatherWidget temp={data.weather.temp} condition={data.weather.condition} humidity={data.weather.humidity} icon={data.weather.icon} />
      </div>
    </div>
  )
}
