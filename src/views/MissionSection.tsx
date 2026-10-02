import { ScrollReveal } from '../components/ScrollReveal'

export function MissionSection() {
  return (
    <section
      id="mission"
      className="min-h-[70vh] flex flex-col items-center justify-center p-8 border-t border-white/10 text-white text-center bg-white/[0.01]"
    >
      <ScrollReveal>
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white uppercase tracking-widest">
          Mission
        </h2>
      </ScrollReveal>
      <ScrollReveal delay="150ms">
        <p className="mt-6 text-white text-xs sm:text-sm md:text-lg lg:text-2xl font-orbitron font-bold tracking-wider">
          [ Mission Section Placeholder ]
        </p>
      </ScrollReveal>
    </section>
  )
}
