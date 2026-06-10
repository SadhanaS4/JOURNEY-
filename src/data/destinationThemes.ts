export interface DestinationTheme {
  name: string
  label: string
  gradient: string
  accent: string
  accentSoft: string
  holo: string
  pattern: string
}

const themes: Record<string, DestinationTheme> = {
  SBC: {
    name: 'Bengaluru City Junction',
    label: 'Garden City Arrival',
    gradient: 'linear-gradient(145deg, #EEF6F0 0%, #C8E6D0 40%, #A8D4B8 100%)',
    accent: '#00B3A4',
    accentSoft: 'rgba(0, 179, 164, 0.12)',
    holo: 'linear-gradient(135deg, rgba(0,179,164,0.4), rgba(78,205,196,0.3), rgba(255,255,255,0.2))',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(0,179,164,0.12) 0%, transparent 50%)',
  },
  MAS: {
    name: 'Chennai Central',
    label: 'Gateway South',
    gradient: 'linear-gradient(145deg, #F5F0EB 0%, #E8DDD0 40%, #D4C4B0 100%)',
    accent: '#C17F59',
    accentSoft: 'rgba(193, 127, 89, 0.12)',
    holo: 'linear-gradient(135deg, rgba(193,127,89,0.35), rgba(0,179,164,0.2), rgba(255,255,255,0.2))',
    pattern: 'radial-gradient(circle at 30% 70%, rgba(193,127,89,0.1) 0%, transparent 50%)',
  },
  MYS: {
    name: 'Mysuru Junction',
    label: 'Heritage Line',
    gradient: 'linear-gradient(145deg, #F0EDF5 0%, #D8D0E8 40%, #C0B4D8 100%)',
    accent: '#7B6BA8',
    accentSoft: 'rgba(123, 107, 168, 0.12)',
    holo: 'linear-gradient(135deg, rgba(123,107,168,0.35), rgba(0,179,164,0.2), rgba(255,255,255,0.2))',
    pattern: 'radial-gradient(circle at 60% 30%, rgba(123,107,168,0.1) 0%, transparent 55%)',
  },
  JTJ: {
    name: 'Jolarpettai Junction',
    label: 'Corridor Transit',
    gradient: 'linear-gradient(145deg, #F0F7F6 0%, #D4EDE9 50%, #B8E0DA 100%)',
    accent: '#00B3A4',
    accentSoft: 'rgba(0, 179, 164, 0.12)',
    holo: 'linear-gradient(135deg, rgba(0,179,164,0.4), rgba(78,205,196,0.3), rgba(255,255,255,0.2))',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(0,179,164,0.1) 0%, transparent 55%)',
  },
  default: {
    name: 'NEXA Network',
    label: 'Southern Railway',
    gradient: 'linear-gradient(145deg, #F0F7F6 0%, #D4EDE9 50%, #B8E0DA 100%)',
    accent: '#00B3A4',
    accentSoft: 'rgba(0, 179, 164, 0.12)',
    holo: 'linear-gradient(135deg, rgba(0,179,164,0.4), rgba(78,205,196,0.3), rgba(255,255,255,0.2))',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(0,179,164,0.1) 0%, transparent 55%)',
  },
}

export function getDestinationTheme(code: string): DestinationTheme {
  return themes[code] ?? themes.default
}
