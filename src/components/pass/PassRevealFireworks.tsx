import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'

interface PassRevealFireworksProps {
  active: boolean
  intensity?: 'full' | 'fade'
}

const COLORS = ['#FFFFFF', '#FF8FAB', '#FFB347', '#00B3A4', '#E8B4F8', '#4ECDC4', '#D4A853']

function burstRays(seed: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + seed * 0.3
    const dist = 40 + (seed % 4) * 18
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      color: COLORS[(seed + i) % COLORS.length],
      delay: (seed % 6) * 0.06 + i * 0.02,
      length: 20 + (i % 5) * 8,
    }
  })
}

export function PassRevealFireworks({ active, intensity = 'full' }: PassRevealFireworksProps) {
  const bursts = useMemo(
    () =>
      [
        { left: '15%', top: '10%', seed: 1, rays: 14 },
        { left: '82%', top: '6%', seed: 2, rays: 12 },
        { left: '48%', top: '4%', seed: 3, rays: 16 },
        { left: '28%', top: '20%', seed: 4, rays: 10 },
        { left: '72%', top: '16%', seed: 5, rays: 13 },
        { left: '8%', top: '30%', seed: 6, rays: 11 },
        { left: '92%', top: '28%', seed: 7, rays: 12 },
        { left: '55%', top: '24%', seed: 8, rays: 15 },
      ].map((b) => ({ ...b, rayData: burstRays(b.seed, b.rays) })),
    [],
  )

  const rockets = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: `${8 + (i * 7.5) % 84}%`,
        delay: i * 0.18,
        color: COLORS[i % COLORS.length],
        height: 80 + (i % 4) * 40,
      })),
    [],
  )

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[45] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity === 'fade' ? 0.35 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: intensity === 'fade' ? 1.2 : 0.3 }}
        >
          {/* Dark celebration backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: intensity === 'full' ? 0.92 : 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.4, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 25%, rgba(155,89,182,0.35) 0%, rgba(255,143,171,0.15) 35%, transparent 65%)',
            }}
          />

          {/* Rising rocket trails */}
          {rockets.map((r, i) => (
            <motion.div
              key={`rocket-${i}`}
              className="absolute bottom-0 w-px origin-bottom"
              style={{ left: r.left, background: `linear-gradient(to top, transparent, ${r.color})` }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: [0, r.height, r.height * 1.2],
                opacity: [0, 1, 0],
                y: [0, -r.height * 0.8, -r.height * 1.4],
              }}
              transition={{
                duration: 1.2,
                delay: r.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Burst explosions */}
          {bursts.map((burst) => (
            <div key={burst.seed} className="absolute" style={{ left: burst.left, top: burst.top }}>
              {burst.rayData.map((ray, i) => (
                <motion.div
                  key={i}
                  className="absolute origin-center"
                  style={{ width: 2, height: ray.length, backgroundColor: ray.color, borderRadius: 1 }}
                  initial={{ x: 0, y: 0, scaleY: 0, opacity: 1, rotate: (i / burst.rays) * 360 }}
                  animate={{
                    x: [0, ray.x * 0.6, ray.x],
                    y: [0, ray.y * 0.6, ray.y + 20],
                    scaleY: [0, 1.2, 0],
                    opacity: [1, 0.95, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 0.4 + burst.seed * 0.14 + ray.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
              {burst.rayData.map((ray, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: ray.color, boxShadow: `0 0 8px ${ray.color}` }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{
                    x: [0, ray.x, ray.x * 1.15],
                    y: [0, ray.y, ray.y + 30],
                    scale: [0, 1.5, 0],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.45 + burst.seed * 0.14 + ray.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          ))}

          {/* Falling embers */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute w-0.5 h-2 rounded-full"
              style={{
                left: `${3 + (i * 3.2) % 94}%`,
                background: COLORS[i % COLORS.length],
                boxShadow: `0 0 4px ${COLORS[i % COLORS.length]}`,
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: [0, 500 + (i % 6) * 30],
                opacity: [0, 0.9, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * (15 + (i % 8) * 5)],
              }}
              transition={{
                duration: 2.2 + (i % 5) * 0.3,
                delay: 0.5 + i * 0.05,
                ease: 'easeIn',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
