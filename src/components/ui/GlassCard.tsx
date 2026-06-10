import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  warm?: boolean
  bright?: boolean
  delay?: number
  onClick?: () => void
}

export function GlassCard({ children, className = '', warm, bright, delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={onClick ? { scale: 1.005 } : undefined}
      onClick={onClick}
      className={`${bright ? 'glass-bright' : warm ? 'glass-warm' : 'glass'} premium-shimmer ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
