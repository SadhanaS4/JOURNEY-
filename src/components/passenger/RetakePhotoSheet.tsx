import { motion, AnimatePresence } from 'framer-motion'
import { ProfilePhotoCapture } from './ProfilePhotoCapture'

interface RetakePhotoSheetProps {
  open: boolean
  photo: string | null
  onPhotoChange: (dataUrl: string) => void
  onClose: () => void
}

export function RetakePhotoSheet({ open, photo, onPhotoChange, onClose }: RetakePhotoSheetProps) {
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
            className="fixed inset-x-0 bottom-0 z-[85] mx-auto max-w-lg"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="glass-bright rounded-t-3xl p-6 pb-10 border-t border-white/[0.08]">
              <div className="w-10 h-1 rounded-full bg-cream/15 mx-auto mb-6" />
              <h3 className="font-display text-lg font-semibold text-cream text-center mb-1">Update Photo</h3>
              <p className="text-xs text-cream/40 text-center mb-6">Your pass badge will refresh instantly</p>
              <ProfilePhotoCapture photo={photo} onPhotoChange={onPhotoChange} showRetake={false} />
              <button
                onClick={onClose}
                className="w-full mt-6 py-4 rounded-2xl bg-nexa text-cream text-sm font-medium hover:bg-nexa-deep transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
