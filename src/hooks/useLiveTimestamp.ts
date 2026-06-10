import { useEffect, useState } from 'react'

export interface LiveTimestamp {
  date: string
  time: string
  combined: string
}

export function useLiveTimestamp(): LiveTimestamp {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const interval = setInterval(tick, 30_000)
    return () => clearInterval(interval)
  }, [])

  const date = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const time = now.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return { date, time, combined: `${date} ${time}` }
}
