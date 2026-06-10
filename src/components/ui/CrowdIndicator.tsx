import { motion } from 'framer-motion'

interface CrowdIndicatorProps {
  level: 'low' | 'moderate' | 'high'
  percent: number
  compact?: boolean
}

const levelConfig = {
  low: { label: 'Low', color: '#00B3A4', bars: 2 },
  moderate: { label: 'Moderate', color: '#D4A853', bars: 3 },
  high: { label: 'High', color: '#C97A7A', bars: 4 },
}

export function CrowdIndicator({ level, percent, compact }: CrowdIndicatorProps) {
  const config = levelConfig[level]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-end gap-0.5 h-3">
          {[1, 2, 3, 4].map((bar) => (
            <div key={bar} className="w-1 rounded-full" style={{ height: `${bar * 25}%`, backgroundColor: bar <= config.bars ? config.color : 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>
        <span className="text-xs text-cream/50">{config.label}</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium tracking-wider text-cream/40 uppercase">Crowd Intensity</span>
        <span className="text-xs font-medium" style={{ color: config.color }}>{config.label}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-cream/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, #00B3A4, ${config.color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-cream/25">Sparse</span>
        <span className="text-[10px] text-cream/40">{percent}% capacity</span>
        <span className="text-[10px] text-cream/25">Dense</span>
      </div>
    </div>
  )
}
