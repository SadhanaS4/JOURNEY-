import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { WaveMesh } from '../../components/layout/WaveMesh'
import { LogoDrawSplash } from '../../components/brand/LogoDrawSplash'

export function SplashScreen() {
  const { completeSplash } = useApp()

  useEffect(() => {
    const timer = setTimeout(completeSplash, 3400)
    return () => clearTimeout(timer)
  }, [completeSplash])

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onClick={completeSplash}
    >
      <WaveMesh />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative px-8"
      >
        <LogoDrawSplash />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4] }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-16 flex justify-center gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-nexa/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
