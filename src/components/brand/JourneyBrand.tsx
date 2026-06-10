import { motion } from 'framer-motion'

interface JourneyBrandProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
  animate?: boolean
  layout?: 'stack' | 'horizontal'
  className?: string
}

const sizes = {
  sm: { logo: 'w-8 h-8', title: 'text-[10px]', tagline: 'text-[7px]' },
  md: { logo: 'w-14 h-14', title: 'text-base', tagline: 'text-[9px]' },
  lg: { logo: 'w-20 h-20', title: 'text-xl', tagline: 'text-[10px]' },
  xl: { logo: 'w-28 h-28', title: 'text-3xl', tagline: 'text-[11px]' },
}

export function JourneyBrand({
  size = 'md',
  showTagline = true,
  animate = false,
  layout = 'stack',
  className = '',
}: JourneyBrandProps) {
  const s = sizes[size]
  const Wrapper = animate ? motion.div : 'div'
  const wrapperProps = animate
    ? { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }
    : {}

  if (layout === 'horizontal') {
    return (
      <Wrapper className={`flex items-center gap-2.5 ${className}`} {...wrapperProps}>
        <img
          src="/journey-logo.png"
          alt="Journey"
          className={`${s.logo} object-contain`}
        />
        <div>
          <p className={`font-display font-semibold tracking-[0.18em] text-cream leading-none ${s.title}`}>JOURNEY</p>
          {showTagline && (
            <p className={`font-medium tracking-[0.3em] text-nexa/80 uppercase mt-0.5 ${s.tagline}`}>by NEXA</p>
          )}
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper className={`flex flex-col items-center ${className}`} {...wrapperProps}>
      <img
        src="/journey-logo.png"
        alt="Journey"
        className={`${s.logo} object-contain drop-shadow-[0_4px_24px_rgba(0,179,164,0.25)]`}
      />
      <p className={`font-display font-semibold tracking-[0.22em] text-cream mt-2 ${s.title}`}>JOURNEY</p>
      {showTagline && (
        <p className={`font-medium tracking-[0.35em] text-nexa/80 uppercase mt-0.5 ${s.tagline}`}>by NEXA</p>
      )}
    </Wrapper>
  )
}
