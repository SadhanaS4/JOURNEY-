import { journeyData } from './journeyData'
import type { VerifiedPassenger } from '../context/AppContext'

/** Demo lookup — returns a matched record only after verification inputs are provided */
export function lookupPassengerRecord(_phoneOrPnr: string): VerifiedPassenger {
  return {
    name: journeyData.passenger.name,
    fullName: journeyData.passenger.fullName,
    pnr: journeyData.pnr,
  }
}
