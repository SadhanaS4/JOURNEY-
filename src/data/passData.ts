import { journeyData } from './journeyData'

export const passCredentials = {
  journeyId: `JNY-${journeyData.trainId}-${journeyData.passenger.id.slice(-6)}`,
  boardingTime: '10:14 AM',
  issuedAt: new Date().toISOString(),
  verificationStatus: 'verified' as const,
}

export function getPassVerifyUrl(passengerId: string): string {
  if (typeof window === 'undefined') return `#/verify/${passengerId}`
  const base = `${window.location.origin}${window.location.pathname}`
  return `${base}#/verify/${encodeURIComponent(passengerId)}`
}

export function parseVerifyHash(): string | null {
  const match = window.location.hash.match(/^#\/verify\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}
