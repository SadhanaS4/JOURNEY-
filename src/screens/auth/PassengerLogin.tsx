import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Hash, Chrome } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { BackButton } from '../../components/layout/BackButton'
import { JourneyBrand } from '../../components/brand/JourneyBrand'
import { IdentityVerificationFlow } from '../../components/passenger/IdentityVerificationFlow'
import { lookupPassengerRecord } from '../../data/passengerLookup'

type LoginMethod = 'phone' | 'pnr'
type LoginPhase = 'form' | 'verifying' | 'matched'

export function PassengerLogin() {
  const { completePassengerVerification, goBack } = useApp()
  const [method, setMethod] = useState<LoginMethod>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [pnr, setPnr] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [phase, setPhase] = useState<LoginPhase>('form')
  const [credential, setCredential] = useState('')

  const startVerification = (input: string) => {
    setCredential(input)
    setPhase('verifying')
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpSent || !phone.trim()) return
    startVerification(phone.trim())
  }

  const handlePnrSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pnr.trim()) return
    startVerification(pnr.trim())
  }

  const handleGoogle = () => {
    startVerification('google-oauth')
  }

  const handleVerificationComplete = useCallback(() => {
    const record = lookupPassengerRecord(credential)
    setPhase('matched')
    setTimeout(() => {
      completePassengerVerification(record)
    }, 1200)
  }, [credential, completePassengerVerification])

  const matchedRecord = phase === 'matched' ? lookupPassengerRecord(credential) : null

  return (
    <div className="min-h-screen px-6 pt-8 pb-12">
      <div className="mb-6">
        <BackButton onClick={goBack} />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-center mb-8">
          <JourneyBrand size="md" animate />
        </div>

        <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2 text-center">Passenger</p>
        <h2 className="font-display text-2xl font-semibold text-cream mb-1 text-center">Sign In</h2>
        <p className="text-sm text-cream/40 mb-8 font-light text-center">Verify your identity to access your journey</p>

        <AnimatePresence mode="wait">
          {phase === 'form' && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>
              <div className="glass p-1 flex mb-8 rounded-2xl">
                {([
                  { id: 'phone' as const, label: 'Phone', icon: Phone },
                  { id: 'pnr' as const, label: 'PNR', icon: Hash },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMethod(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all ${
                      method === tab.id ? 'bg-cream/10 text-cream' : 'text-cream/35'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={method === 'phone' ? handlePhoneSubmit : handlePnrSubmit}>
                <AnimatePresence mode="wait">
                  {method === 'phone' ? (
                    <motion.div key="phone" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="space-y-4">
                      <div>
                        <label className="text-[10px] text-cream/35 uppercase tracking-wider mb-2 block">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+60 12 345 6789"
                          className="w-full bg-cream/[0.04] border border-cream/[0.08] rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-nexa/40 transition-colors"
                        />
                      </div>
                      {otpSent && (
                        <div>
                          <label className="text-[10px] text-cream/35 uppercase tracking-wider mb-2 block">OTP Code</label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="6-digit code"
                            maxLength={6}
                            className="w-full bg-cream/[0.04] border border-cream/[0.08] rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-nexa/40 transition-colors tracking-[0.3em]"
                          />
                        </div>
                      )}
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={() => phone.trim() && setOtpSent(true)}
                          disabled={!phone.trim()}
                          className="w-full py-4 rounded-2xl glass text-sm font-medium text-cream/70 hover:bg-cream/[0.06] transition-colors disabled:opacity-40"
                        >
                          Send OTP
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!otp.trim()}
                          className="w-full py-4 rounded-2xl bg-nexa text-cream text-sm font-medium hover:bg-nexa-deep transition-colors disabled:opacity-50"
                        >
                          Verify Phone
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="pnr" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="space-y-4">
                      <div>
                        <label className="text-[10px] text-cream/35 uppercase tracking-wider mb-2 block">PNR Number</label>
                        <input
                          type="text"
                          value={pnr}
                          onChange={(e) => setPnr(e.target.value)}
                          placeholder="4826719305"
                          className="w-full bg-cream/[0.04] border border-cream/[0.08] rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-nexa/40 transition-colors font-mono uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!pnr.trim()}
                        className="w-full py-4 rounded-2xl bg-nexa text-cream text-sm font-medium hover:bg-nexa-deep transition-colors disabled:opacity-50"
                      >
                        Look Up Journey
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-cream/[0.06]" />
                <span className="text-[10px] text-cream/25 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-cream/[0.06]" />
              </div>

              <button
                onClick={handleGoogle}
                className="w-full py-4 rounded-2xl glass flex items-center justify-center gap-3 text-sm font-medium text-cream/70 hover:bg-cream/[0.06] transition-colors"
              >
                <Chrome className="w-4 h-4" strokeWidth={1.5} />
                Continue with Google
              </button>

              <p className="text-center text-[10px] text-cream/20 mt-8 tracking-wide">
                Demo mode — enter any phone, OTP, or PNR to verify
              </p>
            </motion.div>
          )}

          {phase === 'verifying' && (
            <motion.div key="verifying" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <IdentityVerificationFlow onComplete={handleVerificationComplete} />
            </motion.div>
          )}

          {phase === 'matched' && matchedRecord && (
            <motion.div
              key="matched"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-bright p-6 rounded-3xl text-center"
            >
              <p className="text-[10px] text-nexa uppercase tracking-wider mb-3">Record matched</p>
              <h3 className="font-display text-xl font-semibold text-cream">{matchedRecord.fullName}</h3>
              <p className="text-sm text-cream/40 font-mono mt-2">PNR {matchedRecord.pnr}</p>
              <p className="text-xs text-cream/30 mt-4">Setting up your profile...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
