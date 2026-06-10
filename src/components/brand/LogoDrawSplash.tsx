import { motion } from 'framer-motion'
import { JourneyBrand } from './JourneyBrand'

export function LogoDrawSplash() {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="absolute w-32 h-32 rounded-full border border-nexa/20"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-nexa/10"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 0 }}
        transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <JourneyBrand size="xl" />
      </motion.div>

      <motion.svg
        className="absolute w-36 h-36 pointer-events-none"
        viewBox="0 0 144 144"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.circle
          cx="72"
          cy="72"
          r="68"
          fill="none"
          stroke="url(#drawGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
          style={{ transformOrigin: '72px 72px' }}
        />
        <defs>
          <linearGradient id="drawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B3A4" stopOpacity="0" />
            <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00B3A4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="text-sm text-cream/35 font-light mt-10 max-w-[240px] text-center leading-relaxed"
      >
        Premium Railway Mobility
      </motion.p>
    </div>
  )
}
