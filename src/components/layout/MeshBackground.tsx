import { motion } from 'framer-motion'
import { WaveMesh } from './WaveMesh'

export function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0F1115 0%, #12151A 50%, #0F1115 100%)',
        }}
      />

      <WaveMesh />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 179, 164, 0.07) 0%, transparent 70%)',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15, 17, 21, 0.5) 100%)',
        }}
      />
    </div>
  )
}
