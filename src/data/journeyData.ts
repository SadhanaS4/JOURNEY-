export interface Station {
  id: string
  name: string
  code: string
  eta?: string
  arrival?: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface JourneyInfo {
  trainId: string
  trainName: string
  service: string
  platform: string
  arrivalPlatform: string
  coach: string
  seat: string
  class: string
  pnr: string
  currentStation: string
  nextStation: string
  destination: string
  eta: string
  etaDetail: string
  progress: number
  crowdLevel: 'low' | 'moderate' | 'high'
  crowdPercent: number
  coachPosition: string
  weather: {
    temp: number
    condition: string
    humidity: number
    icon: 'clear' | 'cloudy' | 'rain'
  }
  boardingStation: string
  boardingStationCode: string
  boardingDateTime: string
  journeyDate: string
  passenger: {
    name: string
    fullName: string
    age: number
    id: string
    tier: string
  }
  route: Station[]
}

export const networkMetrics = [
  { label: 'Passengers Guided Today', value: '12,847' },
  { label: 'Platform Congestion Reduced', value: '23%' },
  { label: 'Nexa Pass Check-ins', value: '8,412' },
  { label: 'On-Time Boarding Rate', value: '94.2%' },
]

export const journeyData: JourneyInfo = {
  trainId: '12639',
  trainName: 'Brindavan Express',
  service: 'Chennai Central → Bengaluru City',
  platform: '2',
  arrivalPlatform: '6',
  coach: 'B2',
  seat: '32',
  class: 'AC Chair Car',
  pnr: '4826-719305',
  currentStation: 'Jolarpettai Junction',
  nextStation: 'Bengaluru City Junction',
  destination: 'Bengaluru City Junction',
  eta: '2h 18m',
  etaDetail: '12:42 PM at Platform 6',
  progress: 58,
  crowdLevel: 'moderate',
  crowdPercent: 52,
  coachPosition: 'Coach B2 is in the middle of the train. At Bengaluru City, align with platform marker 6B for quickest exit.',
  boardingStation: 'Chennai Central',
  boardingStationCode: 'MAS',
  boardingDateTime: 'Jun 10, 2026 · 07:50 AM',
  journeyDate: 'Jun 10, 2026',
  weather: {
    temp: 29,
    condition: 'Partly Cloudy',
    humidity: 68,
    icon: 'cloudy',
  },
  passenger: {
    name: 'Sana',
    fullName: 'Sana S',
    age: 17,
    id: 'NX-PASS-4826719305',
    tier: 'NEXA Traveller',
  },
  route: [
    { id: '1', name: 'Chennai Central', code: 'MAS', arrival: '07:50', status: 'completed' },
    { id: '2', name: 'Katpadi Junction', code: 'KPD', arrival: '09:28', status: 'completed' },
    { id: '3', name: 'Jolarpettai Junction', code: 'JTJ', arrival: '10:14', status: 'current' },
    { id: '4', name: 'Bengaluru City Junction', code: 'SBC', eta: '12:42', status: 'upcoming' },
    { id: '5', name: 'Mysuru Junction', code: 'MYS', eta: '15:08', status: 'upcoming' },
  ],
}

export interface PlatformIntel {
  platform: string
  congestion: number
  level: 'low' | 'moderate' | 'high' | 'critical'
  gates: { id: string; wait: string; recommended: boolean }[]
}

export const stationIntel = {
  station: 'Bengaluru City Junction',
  stationCode: 'SBC',
  overallCrowd: 61,
  platforms: [
    {
      platform: '6',
      congestion: 54,
      level: 'moderate' as const,
      gates: [
        { id: 'Gate 4 — East Subway', wait: '2 min', recommended: true },
        { id: 'Gate 2 — Main Hall', wait: '7 min', recommended: false },
        { id: 'Gate 1 — Metro Link', wait: '5 min', recommended: false },
      ],
    },
    {
      platform: '5',
      congestion: 78,
      level: 'high' as const,
      gates: [
        { id: 'Gate 3 — South Entry', wait: '11 min', recommended: false },
      ],
    },
    {
      platform: '8',
      congestion: 28,
      level: 'low' as const,
      gates: [
        { id: 'Gate 5 — Yeshwantpur Side', wait: '1 min', recommended: false },
      ],
    },
  ] satisfies PlatformIntel[],
  suggestions: [
    {
      title: 'Arrival at Platform 6',
      detail: 'Coach B2 stops near marker 6B. Use Gate 4 (East Subway) — 90 seconds walk to your coach position.',
      priority: 'high',
    },
    {
      title: 'Arrival window',
      detail: 'Estimated arrival 12:42 PM at Platform 6. Allow 5 minutes for deboarding.',
      priority: 'medium',
    },
    {
      title: 'Crowd forecast',
      detail: 'Platform 5 congestion peaking at 12:35 PM. Your train uses Platform 6 — remain seated until arrival.',
      priority: 'low',
    },
  ],
}

export const staffNetworkStations = [
  { name: 'Chennai Central (MAS)', crowd: 74 },
  { name: 'Bengaluru City (SBC)', crowd: 61 },
  { name: 'Secunderabad (SC)', crowd: 58 },
  { name: 'Yesvantpur (YPR)', crowd: 49 },
  { name: 'Hyderabad Deccan (HYB)', crowd: 55 },
  { name: 'Mysuru Junction (MYS)', crowd: 42 },
]

export const activeTrains = [
  { id: '12639', name: 'Brindavan Express', status: 'In Transit', station: 'Jolarpettai Junction', delay: 'On time', platform: '2' },
  { id: '12608', name: 'Lalbagh Express', status: 'Boarding', station: 'Chennai Central', delay: '+4 min', platform: '5' },
  { id: '12008', name: 'Shatabdi Express', status: 'Approaching', station: 'Katpadi Junction', delay: 'On time', platform: '3' },
]
