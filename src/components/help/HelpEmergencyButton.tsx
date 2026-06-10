import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LifeBuoy,
  HeartPulse,
  Shield,
  Search,
  Accessibility,
  Users,
  AlertTriangle,
  Check,
  MapPin,
  Clock,
} from 'lucide-react'

type HelpOption = {
  id: string
  label: string
  icon: typeof LifeBuoy
  isSos?: boolean
  responseTime: string
  helpDesk: string
}

const helpOptions: HelpOption[] = [
  { id: 'sos', label: 'SOS Emergency', icon: AlertTriangle, isSos: true, responseTime: '2 min', helpDesk: 'Platform Control · Gate 4' },
  { id: 'medical', label: 'Medical Assistance', icon: HeartPulse, responseTime: '4 min', helpDesk: 'Station Medical Bay · Level 1' },
  { id: 'security', label: 'Security Help', icon: Shield, responseTime: '3 min', helpDesk: 'Security Post · East Concourse' },
  { id: 'lost', label: 'Lost & Found', icon: Search, responseTime: '8 min', helpDesk: 'Information Desk · Main Hall' },
  { id: 'accessibility', label: 'Accessibility Support', icon: Accessibility, responseTime: '5 min', helpDesk: 'Assistance Counter · Gate 2' },
  { id: 'staff', label: 'Contact Station Staff', icon: Users, responseTime: '3 min', helpDesk: 'Nearest Staff · Platform 6' },
]

export function HelpEmergencyButton() {
  const [open, setOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selected, setSelected] = useState<HelpOption | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [ripple, setRipple] = useState(false)

  const handleMainTap = () => {
    setRipple(true)
    setTimeout(() => setRipple(false), 600)
    setOpen((v) => !v)
    if (open) {
      setSheetOpen(false)
      setSelected(null)
      setSubmitted(false)
    }
  }

  const handleSelect = (option: HelpOption) => {
    setSelected(option)
    setSheetOpen(true)
    setSubmitted(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSheetOpen(false)
      setOpen(false)
      setSelected(null)
      setSubmitted(false)
    }, 2800)
  }

  return (
    <>
      <div className="fixed bottom-28 right-5 z-[60]">
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute bottom-16 right-0 flex flex-col gap-2 items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {helpOptions.map((option, i) => {
                const Icon = option.icon
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => handleSelect(option)}
                    className={`flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-2xl glass-bright text-left min-w-[200px] ${
                      option.isSos ? 'border border-red-500/30' : ''
                    }`}
                  >
                    <span className="text-xs font-medium text-cream flex-1">{option.label}</span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        option.isSos ? 'bg-red-500/15' : 'bg-nexa/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${option.isSos ? 'text-red-400' : 'text-nexa'}`} strokeWidth={1.5} />
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleMainTap}
          className="relative w-14 h-14 rounded-full glass-bright flex items-center justify-center help-pulse"
          whileTap={{ scale: 0.92 }}
        >
          {ripple && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-nexa/50"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <LifeBuoy className="w-6 h-6 text-nexa" strokeWidth={1.5} />
        </motion.button>
      </div>

      <AnimatePresence>
        {sheetOpen && selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[75] mx-auto max-w-lg"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="glass-bright rounded-t-3xl p-6 pb-10 border-t border-white/[0.08]">
                <div className="w-10 h-1 rounded-full bg-cream/15 mx-auto mb-6" />

                {!submitted ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          selected.isSos ? 'bg-red-500/15' : 'bg-nexa/10'
                        }`}
                      >
                        <selected.icon
                          className={`w-5 h-5 ${selected.isSos ? 'text-red-400' : 'text-nexa'}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-cream">{selected.label}</h3>
                        <p className="text-xs text-cream/40 mt-0.5">Demo mode · Request assistance</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03]">
                        <Clock className="w-4 h-4 text-nexa/70" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] text-cream/30 uppercase">Est. Response</p>
                          <p className="text-sm text-cream">{selected.responseTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03]">
                        <MapPin className="w-4 h-4 text-nexa/70" strokeWidth={1.5} />
                        <div>
                          <p className="text-[10px] text-cream/30 uppercase">Nearest Help Desk</p>
                          <p className="text-sm text-cream">{selected.helpDesk}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                        selected.isSos
                          ? 'bg-red-500/90 text-white hover:bg-red-500'
                          : 'bg-nexa text-cream hover:bg-nexa-deep'
                      }`}
                    >
                      {selected.isSos ? 'Send SOS Alert' : 'Request Assistance'}
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-nexa/15 border border-nexa/30 flex items-center justify-center mb-5"
                    >
                      <Check className="w-8 h-8 text-nexa" strokeWidth={2} />
                    </motion.div>
                    <p className="font-display text-lg font-semibold text-cream">Nearest Staff Alerted</p>
                    <p className="text-sm text-nexa mt-2">ETA {selected.responseTime}</p>
                    <p className="text-xs text-cream/40 mt-3 text-center">{selected.helpDesk}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
