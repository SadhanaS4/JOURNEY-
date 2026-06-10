import { BackButton } from './BackButton'

interface ScreenHeaderProps {
  onBack?: () => void
  backLabel?: string
  eyebrow?: string
  title: string
  subtitle?: string
  right?: React.ReactNode
}

export function ScreenHeader({ onBack, backLabel, eyebrow, title, subtitle, right }: ScreenHeaderProps) {
  return (
    <header className="pt-6 pb-8">
      {onBack && (
        <div className="mb-6">
          <BackButton onClick={onBack} label={backLabel} />
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2">{eyebrow}</p>
          )}
          <h1 className="font-display text-2xl font-semibold tracking-tight text-cream">{title}</h1>
          {subtitle && <p className="text-sm text-cream/40 mt-1.5 font-light leading-relaxed">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  )
}
