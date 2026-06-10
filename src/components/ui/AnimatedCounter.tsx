import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  delay?: number
}

export function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, className = '', delay = 0 }: AnimatedCounterProps) {
  const [started, setStarted] = useState(false)
  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true)
      spring.set(value)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [value, delay, spring])

  if (!started) {
    return <span className={className}>{prefix}0{suffix}</span>
  }

  return <motion.span className={className}>{display}</motion.span>
}
