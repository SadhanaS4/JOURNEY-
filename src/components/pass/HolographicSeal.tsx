import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export function HolographicSeal() {
  return (
    <div className="relative w-14 h-14 shrink-0">
      <motion.div
        className="absolute inset-0 rounded-full holo-seal"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[2px] rounded-full bg-charcoal/90 backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShieldCheck className="w-6 h-6 text-nexa" strokeWidth={1.5} />
        </motion.div>
      </div>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(78,205,196,0.3), transparent, rgba(0,179,164,0.2), transparent)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
