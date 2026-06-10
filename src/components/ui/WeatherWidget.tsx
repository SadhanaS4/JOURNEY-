import { Cloud, CloudRain, Sun } from 'lucide-react'
import { GlassCard } from './GlassCard'

interface WeatherWidgetProps {
  temp: number
  condition: string
  humidity: number
  icon: 'clear' | 'cloudy' | 'rain'
}

const icons = { clear: Sun, cloudy: Cloud, rain: CloudRain }

export function WeatherWidget({ temp, condition, humidity, icon }: WeatherWidgetProps) {
  const Icon = icons[icon]

  return (
    <GlassCard className="p-5" delay={0.3}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium tracking-wider text-cream/35 uppercase mb-1">Weather</p>
          <p className="text-2xl font-display font-light text-cream">{temp}°C</p>
          <p className="text-xs text-cream/40 mt-0.5 font-light">{condition}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="w-11 h-11 rounded-2xl bg-cream/[0.05] border border-cream/[0.08] flex items-center justify-center">
            <Icon className="w-5 h-5 text-aqua/70" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] text-cream/30">{humidity}% humidity</span>
        </div>
      </div>
    </GlassCard>
  )
}
