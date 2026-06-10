import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PassSpinRevealProps {
  children: ReactNode
  onComplete?: () => void
}

export function PassSpinReveal({ children, onComplete }: PassSpinRevealProps) {
  return (
    <div className="relative flex justify-center" style={{ perspective: 1200 }}>
      <motion.div
        className="relative w-full max-w-[300px]"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{
          rotateY: -108,
          rotateX: 12,
          scale: 0.35,
          opacity: 0,
          y: 60,
        }}
        animate={{
          rotateY: [ -108, 8, 0 ],
          rotateX: [ 12, -4, 0 ],
          scale: [ 0.35, 1.04, 1 ],
          opacity: [ 0, 1, 1 ],
          y: [ 60, -8, 0 ],
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.72, 1],
        }}
        onAnimationComplete={onComplete}
      >
        {/* Glow behind card during spin */}
        <motion.div
          className="absolute -inset-8 rounded-[40px] blur-2xl bg-nexa/25"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0.35], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <div className="relative">{children}</div>
      </motion.div>
    </div>
  )
}
