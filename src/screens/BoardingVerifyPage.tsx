import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { JourneyBrand } from '../components/brand/JourneyBrand'
import { VerificationCheckmark } from '../components/pass/VerificationCheckmark'
import { MeshBackground } from '../components/layout/MeshBackground'
import { useApp } from '../context/AppContext'
import { journeyData } from '../data/journeyData'
import { passCredentials } from '../data/passData'

export function BoardingVerifyPage() {
  const { verifiedPassenger, profilePhoto } = useApp()
  const [verified, setVerified] = useState(false)
  const { passenger, coach, seat, trainName } = journeyData
  const fullName = verifiedPassenger?.fullName ?? passenger.fullName

  useEffect(() => {
    const timer = setTimeout(() => setVerified(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <div className="relative mx-auto max-w-lg min-h-screen px-6 py-12 flex flex-col items-center justify-center">
        <JourneyBrand size="md" className="mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full glass-bright p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {profilePhoto && (
                <img src={profilePhoto} alt="" className="w-14 h-14 rounded-2xl object-cover border border-nexa/30" />
              )}
              <div>
                <p className="text-[10px] text-cream/40 uppercase tracking-wider">NEXA Digital Pass</p>
                <h1 className="font-display text-xl font-semibold text-cream mt-1">Boarding Verified</h1>
              </div>
            </div>
            {verified && !profilePhoto && <VerificationCheckmark size="md" />}
          </div>

          <div className="space-y-4">
            {[
              { label: 'Passenger Name', value: fullName },
              { label: 'Journey ID', value: passCredentials.journeyId },
              { label: 'Coach & Seat', value: `${coach} · ${seat}` },
              { label: 'Verification Status', value: '✅ Verified', highlight: true },
              { label: 'Boarding Time', value: passCredentials.boardingTime },
              { label: 'Train', value: trainName },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0"
              >
                <span className="text-xs text-cream/40">{row.label}</span>
                <span className={`text-sm font-medium ${row.highlight ? 'text-nexa' : 'text-cream'}`}>{row.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {verified && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-sm font-medium text-nexa mt-8 tracking-wide"
          >
            Passenger Verified — Proceed to Platform
          </motion.p>
        )}

        <p className="text-[10px] text-cream/25 mt-10 tracking-wider uppercase">Demo Verification · JOURNEY by NEXA</p>
      </div>
    </div>
  )
}
