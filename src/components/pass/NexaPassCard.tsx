import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { User } from 'lucide-react'
import { journeyData } from '../../data/journeyData'
import { getDestinationTheme } from '../../data/destinationThemes'
import { getPassVerifyUrl, passCredentials } from '../../data/passData'
import { useApp } from '../../context/AppContext'
import { useLiveTimestamp } from '../../hooks/useLiveTimestamp'
import { BoardingVerifyModal } from './BoardingVerifyModal'
import { PassThemeArt } from './PassThemeArt'

interface NexaPassCardProps {
  animate?: boolean
  onRetakePhoto?: () => void
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

const stagger = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function NexaPassCard({ animate = true, onRetakePhoto }: NexaPassCardProps) {
  const { verifiedPassenger, profilePhoto } = useApp()
  const timestamp = useLiveTimestamp()
  const {
    passenger,
    trainName,
    coach,
    seat,
    class: travelClass,
    arrivalPlatform,
    route,
    pnr,
    boardingStationCode,
    journeyDate,
  } = journeyData

  const destination = route[route.length - 1]
  const theme = getDestinationTheme(destination.code)
  const [showVerify, setShowVerify] = useState(false)
  const [photoFlash, setPhotoFlash] = useState(false)

  useEffect(() => {
    if (profilePhoto) {
      setPhotoFlash(true)
      const t = setTimeout(() => setPhotoFlash(false), 500)
      return () => clearTimeout(t)
    }
  }, [profilePhoto])

  const fullName = verifiedPassenger?.fullName ?? passenger.fullName
  const { first, last } = splitName(fullName)
  const displayPnr = verifiedPassenger?.pnr ?? pnr
  const verifyUrl = getPassVerifyUrl(passenger.id)

  const handlePhotoAreaClick = () => {
    if (onRetakePhoto) onRetakePhoto()
  }

  const CardWrapper = animate ? motion.div : 'div'
  const cardProps = animate
    ? {
        animate: { y: [0, -5, 0] },
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
      }
    : {}

  return (
    <>
      <div className="relative mx-auto max-w-[300px]" style={{ perspective: '1200px' }}>
        <CardWrapper className="relative" {...cardProps}>
          <motion.div
            className="absolute -inset-[1px] rounded-[22px] nexa-holo-border opacity-90"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative rounded-[21px] overflow-hidden nexa-pass-card bg-cream shadow-pass">
            {/* ── Top identity band (Petronas visitor style) ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#F8F6F2] via-[#F0EDE8] to-[#E8E4DE]">
              <motion.div
                className="absolute inset-0 pointer-events-none pass-shimmer"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              />
              <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{ background: theme.pattern }}
              />

              <div className="relative px-5 pt-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <motion.div custom={0} variants={stagger} initial="hidden" animate="show" className="flex-1 min-w-0">
                    <h2 className="font-display text-[34px] font-bold leading-[0.95] tracking-tight text-charcoal">
                      {first}
                    </h2>
                    {last && (
                      <p className="font-display text-xl font-semibold text-charcoal/75 tracking-tight mt-0.5">{last}</p>
                    )}
                  </motion.div>

                  {/* Badge photo — top right */}
                  <motion.button
                    type="button"
                    custom={1}
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    onClick={handlePhotoAreaClick}
                    className="relative shrink-0 group"
                    aria-label="Retake picture"
                  >
                    <div
                      className="absolute -inset-0.5 rounded-xl opacity-60 group-hover:opacity-90 transition-opacity"
                      style={{ background: theme.accent }}
                    />
                    <div className="relative w-[72px] h-[88px] rounded-[10px] overflow-hidden border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                      <AnimatePresence mode="wait">
                        {profilePhoto ? (
                          <motion.img
                            key={profilePhoto.slice(-24)}
                            src={profilePhoto}
                            alt={fullName}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-charcoal/10">
                            <User className="w-8 h-8 text-charcoal/20" strokeWidth={1.5} />
                          </div>
                        )}
                      </AnimatePresence>
                      {photoFlash && (
                        <motion.div
                          className="absolute inset-0 bg-white"
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  </motion.button>
                </div>

                <motion.div custom={2} variants={stagger} initial="hidden" animate="show" className="mt-3 space-y-0.5">
                  <p className="text-[11px] font-medium text-charcoal/55">{trainName}</p>
                  <p className="text-[10px] text-charcoal/45 font-mono">PNR {displayPnr}</p>
                  <p className="text-[10px] text-charcoal/45">
                    {boardingStationCode} → {destination.code} · Coach {coach} · Seat {seat}
                  </p>
                  <p className="text-[10px] text-charcoal/40">{travelClass} · Platform {arrivalPlatform}</p>
                </motion.div>
              </div>
            </div>

            {/* ── AI theme art band — unique destination artwork, no photo duplicate ── */}
            <div className="relative h-[200px] overflow-hidden" style={{ background: theme.gradient }}>
              <PassThemeArt destinationCode={destination.code} theme={theme} />

              <p className="absolute top-3 left-4 z-10 text-[8px] font-semibold tracking-[0.2em] uppercase text-charcoal/50">
                {theme.label}
              </p>

              {/* QR — bottom right */}
              <motion.button
                custom={3}
                variants={stagger}
                initial="hidden"
                animate="show"
                onClick={() => setShowVerify(true)}
                className="absolute bottom-3 right-3 z-10 group"
                aria-label="Simulate QR scan"
              >
                <motion.div
                  animate={{ boxShadow: ['0 0 0 0 rgba(0,179,164,0)', '0 0 0 6px rgba(0,179,164,0.15)', '0 0 0 0 rgba(0,179,164,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative p-1.5 rounded-xl bg-white border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105 group-active:scale-95"
                >
                  <QRCodeSVG
                    value={verifyUrl}
                    size={64}
                    level="H"
                    bgColor="#FFFFFF"
                    fgColor="#0F1115"
                    marginSize={1}
                  />
                </motion.div>
                <p className="text-[7px] text-charcoal/50 text-center mt-1 uppercase tracking-wider">Demo QR</p>
              </motion.button>

              <motion.div
                custom={4}
                variants={stagger}
                initial="hidden"
                animate="show"
                className="absolute bottom-3 left-4 z-10"
              >
                <p className="text-[8px] text-charcoal/40 uppercase tracking-wider">Journey</p>
                <p className="text-[10px] font-medium text-charcoal/60">{journeyDate}</p>
                <p className="text-[9px] font-mono text-charcoal/45 mt-0.5">{passCredentials.journeyId}</p>
              </motion.div>
            </div>

            {/* ── Black footer with logo + live timestamp ── */}
            <motion.div
              custom={5}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="relative px-4 py-3 bg-[#0a0a0a] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <img src="/journey-logo.png" alt="" className="w-6 h-6 object-contain" />
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.18em] text-cream/90">JOURNEY</p>
                  <p className="text-[7px] tracking-[0.25em] text-nexa/80 uppercase">by NEXA</p>
                </div>
              </div>

              <motion.div
                key={timestamp.combined}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                <p className="text-[10px] font-mono text-cream/80 leading-tight">{timestamp.date}</p>
                <p className="text-[10px] font-mono text-cream/60 leading-tight">{timestamp.time}</p>
              </motion.div>
            </motion.div>
          </div>
        </CardWrapper>

        <motion.div
          className="mx-10 mt-2 h-6 rounded-b-[21px] opacity-20 bg-gradient-to-b from-nexa/15 to-transparent blur-sm"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <BoardingVerifyModal open={showVerify} onClose={() => setShowVerify(false)} />
    </>
  )
}
