import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, User, RotateCcw } from 'lucide-react'

interface ProfilePhotoCaptureProps {
  photo: string | null
  onPhotoChange: (dataUrl: string) => void
  onRetake?: () => void
  showRetake?: boolean
}

export function ProfilePhotoCapture({ photo, onPhotoChange, onRetake, showRetake = true }: ProfilePhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onPhotoChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const triggerRetake = () => {
    if (onRetake) {
      onRetake()
    } else {
      cameraInputRef.current?.click()
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-[28px] nexa-holo-border opacity-60" />
        <div className="relative w-36 h-44 rounded-[26px] overflow-hidden bg-charcoal border border-white/[0.08] shadow-pass">
          <AnimatePresence mode="wait">
            {photo ? (
              <motion.img
                key={photo.slice(-32)}
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-surface to-charcoal"
              >
                <div className="w-16 h-16 rounded-2xl bg-cream/[0.04] border border-cream/[0.08] flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-cream/20" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] text-cream/30 uppercase tracking-wider">No photo yet</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-charcoal/80 to-transparent pointer-events-none" />
          <p className="absolute bottom-2 inset-x-0 text-center text-[8px] font-semibold tracking-[0.2em] text-cream/50 uppercase pointer-events-none">
            ID Photo
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {photo && showRetake ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={triggerRetake}
          className="w-full glass py-3.5 flex items-center justify-center gap-2 rounded-2xl hover:bg-white/[0.06] transition-colors mb-3 border border-nexa/20"
        >
          <RotateCcw className="w-4 h-4 text-nexa" strokeWidth={1.5} />
          <span className="text-xs font-medium text-cream/70">Retake Picture</span>
        </motion.button>
      ) : null}

      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="glass py-3.5 flex flex-col items-center gap-2 rounded-2xl hover:bg-white/[0.06] transition-colors"
        >
          <Camera className="w-5 h-5 text-nexa" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-cream/60">{photo ? 'New Photo' : 'Take Photo'}</span>
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="glass py-3.5 flex flex-col items-center gap-2 rounded-2xl hover:bg-white/[0.06] transition-colors"
        >
          <Upload className="w-5 h-5 text-aqua" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-cream/60">Upload</span>
        </button>
      </div>
    </div>
  )
}
