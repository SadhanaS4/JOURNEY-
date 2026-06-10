import { motion } from 'framer-motion'
import { Briefcase, Building2, Luggage } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { JourneyBrand } from '../../components/brand/JourneyBrand'
import { AnimatedCounter } from '../../components/ui/AnimatedCounter'
import { networkMetrics } from '../../data/journeyData'
import type { UserRole } from '../../types'

const roles: {
  id: UserRole
  label: string
  action: string
  subtitle: string
  icon: typeof Luggage
  cardClass: string
}[] = [
  {
    id: 'passenger',
    label: 'Passenger',
    action: 'Begin Journey',
    subtitle: 'Live tracking & digital pass',
    icon: Luggage,
    cardClass: 'role-card-teal',
  },
  {
    id: 'staff',
    label: 'Staff',
    action: 'Station Portal',
    subtitle: 'Monitor crowds and operations',
    icon: Briefcase,
    cardClass: 'role-card-slate',
  },
  {
    id: 'admin',
    label: 'Admin',
    action: 'Authority Access',
    subtitle: 'Network oversight and intelligence',
    icon: Building2,
    cardClass: 'role-card-charcoal',
  },
]

function parseMetricValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([\d,.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value, prefix: '' }
  return { num: parseFloat(match[1].replace(/,/g, '')), suffix: match[2], prefix: '' }
}

export function RoleSelection() {
  const { selectRole } = useApp()
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="relative min-h-screen flex flex-col px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="pt-12 pb-4"
      >
        <p className="text-3xl font-display font-light text-cream tracking-tight">{timeStr}</p>
        <p className="text-sm text-cream/35 mt-1">{dateStr}</p>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-10 flex flex-col items-center"
        >
          <JourneyBrand size="lg" />
        </motion.div>

        <div className="space-y-4">
          {roles.map((role, i) => {
            const Icon = role.icon
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectRole(role.id)}
                className="w-full text-left"
              >
                <div className={`premium-card premium-shimmer ${role.cardClass} border border-white/[0.08] p-6 transition-transform duration-300 hover:scale-[1.01]`}>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-cream/10 border border-cream/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-cream/85" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-cream/50 uppercase tracking-wider mb-1">{role.subtitle}</p>
                      <p className="font-display text-xl font-semibold text-cream tracking-tight">{role.label}</p>
                      <p className="text-sm font-medium text-cream/70 mt-1">{role.action}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-10"
      >
        <p className="text-[10px] text-cream/25 uppercase tracking-wider mb-3">Southern Railway · Live Network</p>
        <div className="grid grid-cols-2 gap-3">
          {networkMetrics.map((metric, i) => {
            const parsed = parseMetricValue(metric.value)
            return (
              <div key={metric.label} className="glass premium-shimmer px-4 py-3 rounded-2xl">
                <p className="font-display text-lg font-light text-cream/70">
                  <AnimatedCounter
                    value={parsed.num}
                    suffix={parsed.suffix}
                    decimals={parsed.suffix === '%' ? 1 : 0}
                    delay={0.9 + i * 0.1}
                  />
                </p>
                <p className="text-[10px] text-cream/30 mt-0.5 leading-snug">{metric.label}</p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
