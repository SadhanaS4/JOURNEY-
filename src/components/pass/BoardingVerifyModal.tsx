import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { VerificationCheckmark } from './VerificationCheckmark'
import { useApp } from '../../context/AppContext'
import { journeyData } from '../../data/journeyData'
import { passCredentials } from '../../data/passData'

interface BoardingVerifyModalProps {
  open: boolean
  onClose: () => void
}

export function BoardingVerifyModal({ open, onClose }: BoardingVerifyModalProps) {
  const { verifiedPassenger, profilePhoto } = useApp()
  const { passenger, coach, seat } = journeyData
  const fullName = verifiedPassenger?.fullName ?? passenger.fullName

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 bottom-24 z-[90] mx-auto max-w-lg"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="glass-bright p-6 rounded-3xl relative overflow-hidden">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-cream/50" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="" className="w-16 h-16 rounded-2xl object-cover border border-nexa/30 mb-3" />
                ) : (
                  <VerificationCheckmark size="lg" />
                )}
                <h3 className="font-display text-lg font-semibold text-cream mt-2">Boarding Verified</h3>
                <p className="text-xs text-cream/40 mt-1">Demo QR Preview</p>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Passenger', value: fullName },
                  { label: 'Journey ID', value: passCredentials.journeyId },
                  { label: 'Coach & Seat', value: `${coach} · ${seat}` },
                  { label: 'Status', value: '✅ Verified' },
                  { label: 'Boarding Time', value: passCredentials.boardingTime },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex justify-between py-2 border-b border-white/[0.05] last:border-0"
                  >
                    <span className="text-xs text-cream/40">{row.label}</span>
                    <span className="text-sm font-medium text-cream">{row.value}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-sm font-medium text-nexa mt-6"
              >
                Passenger Verified — Proceed to Platform
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
