import heroBg from '../assets/HERO_BG.jpg'
import hero1 from '../assets/HERO_1.png'
import hero2 from '../assets/HERO_2.png'

export function HeroSection() {
  const handleNavigate = (path: string, elementId: string) => {
    window.history.pushState(null, '', path)
    const el = document.getElementById(elementId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(7,9,14,0.5), rgba(7,9,14,0.95)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* HERO_1: Astronaut — bottom right, partially overflowing right & bottom edges */}
      <img
        src={hero1}
        alt="Astronaut"
        className="pointer-events-none select-none absolute z-10 drop-shadow-2xl object-contain"
        style={{
          width: 'clamp(220px, 34vw, 580px)',
          bottom: '-2vh',
          right: '-2vw',
        }}
      />

      {/* HERO_2: Spaceship — bottom left, partially overflowing left & bottom edges */}
      <img
        src={hero2}
        alt="Spaceship"
        className="pointer-events-none select-none absolute z-10 drop-shadow-2xl object-contain"
        style={{
          width: 'clamp(140px, 20vw, 360px)',
          bottom: '-2vh',
          left: '4vw',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center space-y-8 z-30 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
        <h1 className="font-orbitron font-extrabold tracking-tighter uppercase leading-none text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
          <span className="block text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-normal mb-2 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
            TORCH IGNITES,
          </span>
          <span className="block text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-normal mb-2 drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
            THE WORLD UNITES
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-white text-xs sm:text-sm md:text-base lg:text-xl font-bold leading-relaxed drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
          A virus is devouring the Digiverse. Assemble your crew, trust your team, and race against the clock to save Torch's home before time runs out
        </p>
         <p className="max-w-2xl mx-auto text-white text-xs sm:text-sm md:text-base lg:text-xl font-orbitron font-light leading-relaxed drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
          Will your team be fast enough to save it?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          <a
            href="/story"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('/story', 'story')
            }}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-black/90 border border-white/20 text-white font-orbitron font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] active:scale-95 cursor-pointer no-underline"
          >
            BOARD THE SHIP
          </a>

          <a
            href="/mission"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('/mission', 'mission')
            }}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-black/40 border-2 border-white text-white font-orbitron font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] active:scale-95 cursor-pointer no-underline"
          >
            MISSION BRIEFING
          </a>
        </div>
      </div>
    </section>
  )
}
