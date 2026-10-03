import { useEffect, useRef } from 'react';

/**
 * Parallax background hook for mobile browsers (iOS Safari, Android Chrome).
 *
 * Desktop (≥768 px) already gets parallax via `background-attachment: fixed` in CSS.
 * Mobile ignores that property entirely, so we shift `background-position-y` with JS
 * as the section scrolls — the background moves at a slower rate than the content,
 * creating the same parallax illusion on all devices.
 *
 * @param strength  Total px range the background travels (default 80).
 *                  Higher = more movement. Safe range: 40–120.
 * @returns  A ref to attach to the <section> element.
 */
export function useParallaxBg<T extends HTMLElement>(strength = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      // Desktop: CSS `background-attachment: fixed` handles it — skip JS work.
      if (window.innerWidth >= 768) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress → 0 when section just entered from bottom, 1 when it's left at top
      const raw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, raw));

      // Shift background vertically: center ± half of strength
      const offset = (progress - 0.5) * strength;
      el.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set initial position without waiting for a scroll event

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
