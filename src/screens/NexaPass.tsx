import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, RotateCcw } from 'lucide-react'
import { NexaPassCard } from '../components/pass/NexaPassCard'
import { PassRevealFireworks } from '../components/pass/PassRevealFireworks'
import { PassSpinReveal } from '../components/pass/PassSpinReveal'
import { ScreenHeader } from '../components/layout/ScreenHeader'
import { JourneyBrand } from '../components/brand/JourneyBrand'
import { RetakePhotoSheet } from '../components/passenger/RetakePhotoSheet'
import { useApp } from '../context/AppContext'
import { getDestinationTheme } from '../data/destinationThemes'
import { journeyData } from '../data/journeyData'

type PassPhase = 'generating' | 'fireworks' | 'revealed'

export function NexaPass() {
  const { goBack, passRevealed, revealPass, profilePhoto, setProfilePhoto } = useApp()
  const skipCeremony = useRef(passRevealed)
  const [phase, setPhase] = useState<PassPhase>(passRevealed ? 'revealed' : 'generating')
  const [fireworksFade, setFireworksFade] = useState(false)
  const [cardSettled, setCardSettled] = useState(passRevealed)
  const [retakeOpen, setRetakeOpen] = useState(false)
  const destination = journeyData.route[journeyData.route.length - 1]
  const theme = getDestinationTheme(destination.code)

  useEffect(() => {
    if (passRevealed) return

    const fireworksTimer = setTimeout(() => {
      setPhase('fireworks')
      revealPass()
    }, 2800)

    const spinTimer = setTimeout(() => {
      setPhase('revealed')
      setFireworksFade(true)
    }, 2800 + 1900)

    const cleanupTimer = setTimeout(() => {
      setFireworksFade(false)
    }, 2800 + 1900 + 2200)

    return () => {
      clearTimeout(fireworksTimer)
      clearTimeout(spinTimer)
      clearTimeout(cleanupTimer)
    }
  }, [passRevealed, revealPass])

  const handlePhotoChange = (dataUrl: string) => {
    setProfilePhoto(dataUrl)
  }

  const showFireworks = phase === 'fireworks' || fireworksFade

  return (
    <div className="px-5 pb-32 relative">
      <PassRevealFireworks active={showFireworks} intensity={fireworksFade ? 'fade' : 'full'} />

      {/* Celebration message — visible during fireworks, before card */}
      <AnimatePresence>
        {phase === 'fireworks' && (
          <motion.div
            className="fixed inset-x-0 top-28 z-[46] flex flex-col items-center px-6 pointer-events-none"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/journey-logo.png"
              alt=""
              className="w-12 h-12 object-contain mb-4 drop-shadow-[0_0_20px_rgba(0,179,164,0.5)]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="font-display text-xl font-semibold text-cream text-center leading-snug">
              Your Nexa Pass is ready
            </p>
            <p className="text-sm text-cream/50 mt-2 text-center">JOURNEY by NEXA</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: phase === 'fireworks' ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <ScreenHeader
          onBack={goBack}
          backLabel="Exit"
          eyebrow="Digital Wallet"
          title="Nexa Pass"
          subtitle="MAS → SBC · Digital boarding credential"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center py-12"
          >
            <motion.div
              className="relative mb-8"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <JourneyBrand size="lg" />
            </motion.div>

            <p className="font-display text-lg font-medium text-cream mb-2">Generating your pass</p>
            <p className="text-sm text-cream/40 text-center max-w-xs">Creating unique AI visual theme</p>

            <motion.div className="w-52 h-1 rounded-full bg-white/[0.06] mt-8 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${theme.accent}, #4ECDC4)` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />
            </motion.div>

            <div className="mt-8 space-y-2 w-48">
              {['Encoding photo', 'Painting destination art', 'Pass issued'].map((step, i) => (
                <motion.p
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.5 }}
                  className="text-[10px] text-cream/30 tracking-wider"
                >
                  ✓ {step}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {(phase === 'fireworks' || phase === 'revealed') && (
          <motion.div
            key="pass-area"
            className="relative z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {phase === 'revealed' && (
              <>
                {skipCeremony.current ? (
                  <NexaPassCard animate onRetakePhoto={() => setRetakeOpen(true)} />
                ) : (
                  <PassSpinReveal onComplete={() => setCardSettled(true)}>
                    <NexaPassCard animate={cardSettled} onRetakePhoto={() => setRetakeOpen(true)} />
                  </PassSpinReveal>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <motion.button
                    onClick={() => setRetakeOpen(true)}
                    className="w-full max-w-[300px] mx-auto mt-6 glass premium-shimmer py-3.5 flex items-center justify-center gap-2 rounded-2xl hover:bg-white/[0.06] transition-colors border border-nexa/15"
                  >
                    <RotateCcw className="w-4 h-4 text-nexa" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-cream/70">Retake Picture</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3 mt-4 max-w-[300px] mx-auto">
                    <button className="glass premium-shimmer py-3.5 flex items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors rounded-2xl">
                      <Download className="w-4 h-4 text-nexa/80" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-cream/60">Add to Wallet</span>
                    </button>
                    <button className="glass premium-shimmer py-3.5 flex items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors rounded-2xl">
                      <Share2 className="w-4 h-4 text-aqua/80" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-cream/60">Share</span>
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-cream/20 mt-8 tracking-wide max-w-[280px] mx-auto leading-relaxed">
                    Secured by NEXA Identity · {theme.label}
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-center text-[10px] text-cream/25 mt-4 font-mono"
                >
                  PASS #{journeyData.passenger.id.slice(-8).toUpperCase()}
                </motion.p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <RetakePhotoSheet
        open={retakeOpen}
        photo={profilePhoto}
        onPhotoChange={handlePhotoChange}
        onClose={() => setRetakeOpen(false)}
      />
    </div>
  )
}
