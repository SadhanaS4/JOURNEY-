import { motion } from 'framer-motion'
import type { DestinationTheme } from '../../data/destinationThemes'

interface PassThemeArtProps {
  destinationCode: string
  theme: DestinationTheme
}

/** Unique AI-style abstract art per destination — never the passenger photo */
export function PassThemeArt({ destinationCode, theme }: PassThemeArtProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base mesh */}
      <div className="absolute inset-0 opacity-60" style={{ background: theme.pattern }} />
      <motion.div
        className="absolute inset-0"
        style={{ background: theme.holo, backgroundSize: '300% 100%' }}
        animate={{ backgroundPosition: ['0% 0', '100% 0', '0% 0'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {destinationCode === 'SBC' && <BengaluruArt accent={theme.accent} />}
      {destinationCode === 'MAS' && <ChennaiArt accent={theme.accent} />}
      {destinationCode === 'MYS' && <MysuruArt accent={theme.accent} />}
      {(destinationCode === 'JTJ' || !['SBC', 'MAS', 'MYS'].includes(destinationCode)) && (
        <CorridorArt accent={theme.accent} />
      )}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: theme.accent,
            left: `${12 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}

function BengaluruArt({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bng-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F5E9" />
          <stop offset="100%" stopColor="#A5D6A7" />
        </linearGradient>
        <linearGradient id="bng-hill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill="url(#bng-sky)" opacity="0.4" />
      {/* Stylized Cubbon Park / garden hills */}
      <motion.path
        d="M0 140 Q60 100 120 130 T240 110 T300 125 L300 200 L0 200 Z"
        fill="url(#bng-hill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M0 160 Q80 120 160 150 T300 140 L300 200 L0 200 Z"
        fill={accent}
        fillOpacity="0.15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
      {/* Abstract tree forms */}
      {[40, 100, 180, 250].map((x, i) => (
        <motion.g key={x} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.5 }} transition={{ delay: 0.3 + i * 0.15 }}>
          <ellipse cx={x} cy={130 - i * 5} rx={18} ry={28} fill={accent} fillOpacity="0.25" />
          <rect x={x - 3} y={130 - i * 5} width={6} height={20} fill={accent} fillOpacity="0.35" />
        </motion.g>
      ))}
      {/* Vidhana Soudha inspired geometric crown */}
      <motion.path
        d="M130 55 L150 35 L170 55 L165 75 L135 75 Z"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </svg>
  )
}

function ChennaiArt({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="maa-sun" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="220" cy="50" r="35"
        fill="url(#maa-sun)"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Coastal wave ribbons */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M0 ${120 + i * 20} Q75 ${100 + i * 15} 150 ${125 + i * 18} T300 ${115 + i * 22}`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeOpacity={0.25 - i * 0.05}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.3 }}
        />
      ))}
      {/* Temple gopuram silhouette */}
      <motion.path
        d="M60 160 L75 90 L90 160 M68 120 L82 120 M72 100 L78 100"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />
    </svg>
  )
}

function MysuruArt({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      {/* Palace-inspired arches */}
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M${50 + i * 55} 160 L${50 + i * 55} 100 Q${72 + i * 55} 75 ${95 + i * 55} 100 L${95 + i * 55} 160`}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.12 }}
        />
      ))}
      <motion.rect
        x="100" y="70" width="100" height="8" rx="2"
        fill={accent}
        fillOpacity="0.2"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  )
}

function CorridorArt({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      {/* Rail corridor — converging tracks */}
      <motion.path
        d="M20 180 L140 80 L260 180"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeOpacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8 }}
      />
      <motion.path
        d="M60 180 L140 95 L220 180"
        fill="none"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
      />
      {/* Speed lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.line
          key={i}
          x1={30 + i * 50}
          y1={40 + i * 8}
          x2={80 + i * 50}
          y2={40 + i * 8}
          stroke={accent}
          strokeWidth="1"
          strokeOpacity="0.2"
          animate={{ x1: [30 + i * 50, 20 + i * 50], x2: [80 + i * 50, 70 + i * 50] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.2 }}
        />
      ))}
    </svg>
  )
}
