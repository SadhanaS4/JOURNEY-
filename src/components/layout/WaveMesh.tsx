import { motion } from 'framer-motion'

export function WaveMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 800">
        <defs>
          <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00B3A4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00B3A4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waveLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00B3A4" stopOpacity="0" />
            <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00B3A4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {Array.from({ length: 90 }).map((_, i) => {
          const x = ((i * 47) % 400) + 10
          const baseY = 380 + Math.sin(i * 0.35) * 120 + (i % 7) * 12
          const size = 0.8 + (i % 4) * 0.4
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={baseY}
              r={size}
              fill="url(#waveGlow)"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.55, 0.15] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
            />
          )
        })}

        {[0, 1, 2].map((layer) => (
          <motion.path
            key={layer}
            d={`M -20 ${420 + layer * 40} Q 100 ${360 + layer * 30}, 200 ${400 + layer * 20} T 420 ${380 + layer * 35}`}
            fill="none"
            stroke="url(#waveLine)"
            strokeWidth={1.2 - layer * 0.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 - layer * 0.1 }}
            transition={{ duration: 2.5 + layer * 0.5, ease: 'easeOut' }}
          />
        ))}
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 75%, rgba(0, 179, 164, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 50% 30% at 20% 40%, rgba(78, 205, 196, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  )
}
