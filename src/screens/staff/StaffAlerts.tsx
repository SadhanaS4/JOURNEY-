import { GlassCard } from '../../components/ui/GlassCard'
import { ScreenHeader } from '../../components/layout/ScreenHeader'
import { useApp } from '../../context/AppContext'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'

const alerts = [
  { id: 1, type: 'warning', title: 'Platform 4B congestion rising', detail: 'Congestion at 82%. Consider redirecting to Gate 14.', time: '2 min ago', active: true },
  { id: 2, type: 'info', title: 'Train NX-2847 on schedule', detail: 'Arriving with +2 min buffer.', time: '8 min ago', active: true },
  { id: 3, type: 'resolved', title: 'Escalator maintenance complete', detail: 'Level 2 east escalator back in service.', time: '32 min ago', active: false },
]

const icons = { warning: AlertTriangle, info: Info, resolved: CheckCircle }
const colors = { warning: 'text-amber-400/80', info: 'text-aqua', resolved: 'text-nexa/50' }

export function StaffAlerts() {
  const { goBack } = useApp()
  return (
    <div className="px-5 pb-32">
      <ScreenHeader onBack={goBack} backLabel="Exit" eyebrow="Staff" title="Live Alerts" subtitle="2 active today" />
      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const Icon = icons[alert.type as keyof typeof icons]
          return (
            <GlassCard key={alert.id} className={`p-4 ${!alert.active ? 'opacity-60' : ''}`} delay={0.1 + i * 0.05}>
              <div className="flex gap-3">
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${colors[alert.type as keyof typeof colors]}`} strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-cream">{alert.title}</p>
                  <p className="text-xs text-cream/40 mt-1 leading-relaxed">{alert.detail}</p>
                  <p className="text-[10px] text-cream/20 mt-2">{alert.time}</p>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
