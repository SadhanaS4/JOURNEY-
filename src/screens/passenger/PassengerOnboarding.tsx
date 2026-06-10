import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ScanFace, Ticket } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { BackButton } from '../../components/layout/BackButton'
import { JourneyBrand } from '../../components/brand/JourneyBrand'
import { ProfilePhotoCapture } from '../../components/passenger/ProfilePhotoCapture'
import { journeyData } from '../../data/journeyData'

type Step = 'photo' | 'face' | 'ticket' | 'ready'

export function PassengerOnboarding() {
  const { completeOnboarding, goBack, verifiedPassenger, profilePhoto, setProfilePhoto } = useApp()
  const [step, setStep] = useState<Step>('photo')
  const [localPhoto, setLocalPhoto] = useState<string | null>(profilePhoto)
  const [faceDone, setFaceDone] = useState(false)
  const [ticketDone, setTicketDone] = useState(false)

  const passenger = verifiedPassenger

  const handlePhotoChange = (dataUrl: string) => {
    setLocalPhoto(dataUrl)
    setProfilePhoto(dataUrl)
  }

  const runFaceScan = () => {
    setTimeout(() => {
      setFaceDone(true)
      setTimeout(() => setStep('ticket'), 600)
    }, 2200)
  }

  const runTicketVerify = () => {
    setTimeout(() => {
      setTicketDone(true)
      setTimeout(() => setStep('ready'), 600)
    }, 1800)
  }

  if (!passenger) return null

  return (
    <div className="min-h-screen px-6 pb-12">
      <div className="pt-8 mb-4">
        <BackButton onClick={goBack} />
      </div>

      <div className="flex justify-center mb-6">
        <JourneyBrand size="sm" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'photo' && (
          <motion.div key="photo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center">
            <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2">Step 1 of 3</p>
            <h2 className="font-display text-2xl font-semibold text-cream mb-1">Profile Photo</h2>
            <p className="text-sm text-cream/40 text-center mb-8 max-w-xs">
              Add a photo for your Nexa Pass badge
            </p>

            <ProfilePhotoCapture photo={localPhoto} onPhotoChange={handlePhotoChange} />

            <button
              onClick={() => localPhoto && setStep('face')}
              disabled={!localPhoto}
              className="w-full max-w-xs py-4 rounded-2xl bg-nexa text-cream font-medium text-sm hover:bg-nexa-deep transition-colors disabled:opacity-40 mt-8"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 'face' && (
          <motion.div key="face" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center">
            <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2">Step 2 of 3</p>
            <h2 className="font-display text-2xl font-semibold text-cream mb-1">Face Verification</h2>
            <p className="text-sm text-cream/40 text-center mb-8 max-w-xs">
              Match your photo against railway identity records
            </p>

            <div className="relative w-56 h-56 mb-10">
              <div className="absolute inset-0 rounded-full border border-nexa/20" />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-nexa/40 overflow-hidden"
                animate={{ scale: [1, 1.03, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {localPhoto ? (
                  <img src={localPhoto} alt="" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface">
                    <ScanFace className="w-12 h-12 text-nexa/40" strokeWidth={1} />
                  </div>
                )}
              </motion.div>
              {!faceDone && (
                <motion.div
                  className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-nexa to-transparent rounded-full z-10"
                  animate={{ top: ['15%', '85%', '15%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              {faceDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-nexa/10 rounded-full"
                >
                  <div className="w-14 h-14 rounded-full bg-nexa flex items-center justify-center">
                    <Check className="w-7 h-7 text-cream" strokeWidth={2} />
                  </div>
                </motion.div>
              )}
            </div>

            {!faceDone ? (
              <button
                onClick={runFaceScan}
                className="w-full max-w-xs py-4 rounded-2xl bg-nexa text-cream font-medium text-sm hover:bg-nexa-deep transition-colors"
              >
                Scan & Verify
              </button>
            ) : (
              <p className="text-sm text-nexa font-medium">Biometric match confirmed</p>
            )}
          </motion.div>
        )}

        {step === 'ticket' && (
          <motion.div key="ticket" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="flex flex-col items-center">
            <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2">Step 3 of 3</p>
            <h2 className="font-display text-2xl font-semibold text-cream mb-2">Ticket Verification</h2>
            <p className="text-sm text-cream/40 text-center mb-10 max-w-xs">
              Validating PNR {passenger.pnr}
            </p>

            <div className="glass w-full max-w-xs p-6 mb-10">
              <div className="flex items-center gap-4 mb-5">
                {localPhoto && (
                  <img src={localPhoto} alt="" className="w-12 h-12 rounded-2xl object-cover border border-nexa/20" />
                )}
                <div>
                  <p className="text-sm font-medium text-cream">{passenger.fullName}</p>
                  <p className="text-xs text-cream/40 font-mono mt-0.5">PNR {passenger.pnr}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5 pt-4 border-t border-white/[0.06]">
                <div className="w-12 h-12 rounded-2xl bg-nexa/10 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-nexa" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-cream">{journeyData.trainName}</p>
                  <p className="text-xs text-cream/40 font-mono mt-0.5">
                    Train {journeyData.trainId} · {journeyData.boardingStationCode} → {journeyData.route[journeyData.route.length - 1].code}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  `PNR ${passenger.pnr} validated`,
                  `Seat ${journeyData.coach} · ${journeyData.seat} confirmed`,
                  `Platform ${journeyData.arrivalPlatform} assigned`,
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: ticketDone || i === 0 ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${ticketDone || i === 0 ? 'bg-nexa/20' : 'bg-white/[0.04]'}`}>
                      {(ticketDone || i === 0) && <Check className="w-3 h-3 text-nexa" strokeWidth={2.5} />}
                    </div>
                    <span className="text-sm text-cream/60">{item}</span>
                  </motion.div>
                ))}
              </div>

              {!ticketDone && (
                <motion.div className="mt-5 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full bg-nexa rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    onAnimationComplete={runTicketVerify}
                  />
                </motion.div>
              )}
            </div>

            {ticketDone && <p className="text-sm text-nexa font-medium">Boarding confirmed</p>}
          </motion.div>
        )}

        {step === 'ready' && (
          <motion.div key="ready" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center pt-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-full bg-nexa/15 border border-nexa/30 flex items-center justify-center mb-8 overflow-hidden"
            >
              {localPhoto ? (
                <img src={localPhoto} alt="" className="w-full h-full object-cover" />
              ) : (
                <Check className="w-9 h-9 text-nexa" strokeWidth={1.5} />
              )}
            </motion.div>

            <h2 className="font-display text-2xl font-semibold text-cream mb-2">Nexa Pass Ready</h2>
            <p className="text-sm text-cream/40 max-w-xs leading-relaxed mb-10">
              {passenger.fullName} · {journeyData.trainName}
            </p>

            <div className="glass-warm w-full max-w-xs p-5 mb-10 text-left">
              <p className="text-[10px] text-cream/35 uppercase tracking-wider mb-3">Journey summary</p>
              <p className="text-sm text-cream font-medium">{journeyData.boardingStation}</p>
              <p className="text-xs text-cream/40 mt-1">→ {journeyData.destination}</p>
              <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                <div>
                  <p className="text-[10px] text-cream/30 uppercase">Coach · Seat</p>
                  <p className="text-sm font-medium mt-0.5">{journeyData.coach} · {journeyData.seat}</p>
                </div>
                <div>
                  <p className="text-[10px] text-cream/30 uppercase">Date</p>
                  <p className="text-sm font-medium text-nexa mt-0.5">{journeyData.journeyDate}</p>
                </div>
              </div>
            </div>

            <button
              onClick={completeOnboarding}
              className="w-full max-w-xs py-4 rounded-2xl bg-nexa text-cream font-medium text-sm hover:bg-nexa-deep transition-colors"
            >
              Open Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
