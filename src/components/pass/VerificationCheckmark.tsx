import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface VerificationCheckmarkProps {
  size?: 'sm' | 'md' | 'lg'
  showPulse?: boolean
}

const sizeMap = {
  sm: { outer: 'w-6 h-6', inner: 'w-3 h-3' },
  md: { outer: 'w-10 h-10', inner: 'w-5 h-5' },
  lg: { outer: 'w-16 h-16', inner: 'w-8 h-8' },
}

export function VerificationCheckmark({ size = 'md', showPulse = true }: VerificationCheckmarkProps) {
  const s = sizeMap[size]

  return (
    <div className="relative">
      {showPulse && (
        <motion.div
          className={`absolute inset-0 rounded-full bg-nexa/30 ${s.outer}`}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.div
        className={`${s.outer} rounded-full bg-nexa/15 border border-nexa/40 flex items-center justify-center`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Check className={`${s.inner} text-nexa`} strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </div>
  )
}
