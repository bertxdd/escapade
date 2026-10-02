import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isAbove, setIsAbove] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (!entry.isIntersecting) {
          setIsAbove(entry.boundingClientRect.top < 0)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible, isAbove }
}
