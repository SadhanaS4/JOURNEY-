import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

const STEPS = [
  'Matching passenger records...',
  'Verifying ticket ownership...',
  'Identity confirmed',
] as const

interface IdentityVerificationFlowProps {
  onComplete: () => void
}

export function IdentityVerificationFlow({ onComplete }: IdentityVerificationFlowProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (activeStep >= STEPS.length) {
      setDone(true)
      const timer = setTimeout(onComplete, 900)
      return () => clearTimeout(timer)
    }

    const delay = activeStep === STEPS.length - 1 ? 1000 : 1400
    const timer = setTimeout(() => setActiveStep((s) => s + 1), delay)
    return () => clearTimeout(timer)
  }, [activeStep, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-bright p-6 rounded-3xl w-full"
    >
      <p className="text-[10px] text-cream/40 uppercase tracking-wider mb-1">Demo verification</p>
      <h3 className="font-display text-lg font-semibold text-cream mb-6">Verifying identity</h3>

      <div className="space-y-4">
        {STEPS.map((step, i) => {
          const isActive = i === activeStep && !done
          const isComplete = i < activeStep || (i === STEPS.length - 1 && done)
          const isPending = i > activeStep

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isComplete ? 'bg-nexa/20' : isActive ? 'bg-nexa/10' : 'bg-white/[0.04]'
                }`}
              >
                {isComplete ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-3.5 h-3.5 text-nexa" strokeWidth={2.5} />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-nexa animate-spin" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-cream/20" />
                )}
              </div>
              <span
                className={`text-sm ${
                  isComplete ? 'text-nexa font-medium' : isActive ? 'text-cream' : 'text-cream/40'
                }`}
              >
                {step}
              </span>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-cream/35 mt-6"
          >
            Proceeding to profile setup...
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
