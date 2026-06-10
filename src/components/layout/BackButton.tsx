import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className="flex items-center gap-2 text-cream/45 hover:text-cream/80 transition-colors py-1"
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  )
}
