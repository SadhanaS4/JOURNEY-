import { motion } from 'framer-motion'

interface HeaderProps {
  subtitle?: string
}

export function Header({ subtitle }: HeaderProps) {
  return (
    <header className="pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-[0.2em] text-gradient">
            JOURNEY
          </h1>
          <span className="text-[10px] font-medium tracking-[0.25em] text-white/30 uppercase">
            by NEXA
          </span>
        </div>
        {subtitle && (
          <p className="mt-1.5 text-sm text-white/40 font-light tracking-wide">{subtitle}</p>
        )}
      </motion.div>
    </header>
  )
}
