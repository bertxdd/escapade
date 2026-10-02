import { type ReactNode, type CSSProperties } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ScrollRevealProps {
  children: ReactNode
  /** Delay before the animation starts, e.g. '0ms', '100ms', '200ms' */
  delay?: string
  /** How far (in px) the element floats up from. Default: 40px */
  distance?: number
  className?: string
  style?: CSSProperties
}

/**
 * Wraps children in a float-up + fade-in animation that triggers
 * once when the element scrolls into view.
 */
export function ScrollReveal({
  children,
  delay = '0ms',
  distance = 40,
  className = '',
  style,
}: ScrollRevealProps) {
  const { ref, isVisible, isAbove } = useScrollReveal()

  const translateY = isVisible
    ? 'translateY(0)'
    : isAbove
    ? `translateY(-${distance}px)`
    : `translateY(${distance}px)`

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: translateY,
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? delay : '0ms'}, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? delay : '0ms'}`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
