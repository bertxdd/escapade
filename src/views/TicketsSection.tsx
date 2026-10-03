import { useParallaxBg } from '../hooks/useParallaxBg'
import { ScrollReveal } from '../components/ScrollReveal'

export function TicketsSection() {
  const sectionRef = useParallaxBg<HTMLElement>();
  return (
    <section
      ref={sectionRef}
      id="tickets"
      className="flex flex-col items-center px-4 sm:px-8 py-24 md:py-32 border-t border-white/10 text-white text-center bg-[url('/images-board/background.png')] bg-cover bg-center bg-no-repeat relative tickets-section"
    >
      <style>{`
        @media (min-width: 768px) {
          .tickets-section { background-attachment: fixed; }
        }
      `}</style>

      {/* Dark overlay between bg and content */}
      <div className="absolute inset-0 bg-[rgba(5,8,6,0.20)] pointer-events-none z-0" aria-hidden="true" />

      {/* Section Heading */}
      <ScrollReveal className="relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-orbitron font-extrabold text-white uppercase tracking-widest mb-8 sm:mb-12">
          Tickets
        </h2>
      </ScrollReveal>

      {/* Main Boarding Pass HUD Container */}
      <ScrollReveal delay="150ms" className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] w-full border border-[#3d2330] bg-[url('/images-board/frame-bg.png')] bg-cover bg-center bg-no-repeat font-orbitron text-left shadow-2xl relative overflow-hidden">

          {/* Left Main Column */}
          <main className="grid grid-rows-[auto_1fr_auto_auto] border-b lg:border-b-0 lg:border-r border-[#3d2330]">

            {/* Header */}
            <header className="w-full px-4 py-3 sm:px-8 sm:py-6 border-b border-[#3d2330] flex items-center justify-between gap-2 bg-[#060509]/80 backdrop-blur-xs uppercase shadow-[0_0_20px_rgba(242,60,60,0.15)]">
              <span className="font-light tracking-[2px] sm:tracking-[8px] text-sm sm:text-2xl md:text-3xl [text-shadow:0_0_8px_rgba(255,255,255,0.6),0_0_16px_rgba(255,255,255,0.3)] leading-tight">
                AGAINST ALL ODDS:
              </span>
              {/* GDG Logo — visible only on mobile since sidebar is hidden */}
              <img
                src="/images-board/GDG-logo.png"
                alt="GDG Logo"
                className="block lg:hidden h-8 w-auto object-contain flex-shrink-0"
              />
              <span className="font-light tracking-[2px] sm:tracking-[8px] text-sm sm:text-2xl md:text-3xl text-[#f23c3c] [text-shadow:0_0_10px_#f23c3c,0_0_20px_#f23c3c,0_0_35px_rgba(242,60,60,0.8)] leading-tight">
                ESCAPADE
              </span>
            </header>

            {/* Ticket Stage */}
            <section className="p-4 sm:p-[30px] flex items-center justify-center border-b border-[#3d2330] bg-[#0a080e]/40 min-h-[200px] sm:min-h-[280px]">
              <img
                src="/images-board/Ticket.png"
                alt="Escapade Boarding Pass Ticket"
                className="max-w-[95%] sm:max-w-[90%] max-h-[320px] sm:max-h-[380px] object-contain rounded block"
              />
            </section>

            {/* 2x2 Details Grid — always 2 columns (even on mobile) */}
            <section className="grid grid-cols-2 border-b border-[#3d2330]">

              {/* TYPE */}
              <div className="p-3 sm:p-[28px_20px] border-b border-r border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black tracking-[2px] sm:tracking-[6px] uppercase bg-gradient-to-r from-[#ee6b6e] to-[#f39a79] bg-clip-text text-transparent">
                  TYPE
                </span>
              </div>

              {/* GENERAL ADMISSION */}
              <div className="p-3 sm:p-[28px_20px] border-b border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black tracking-[1px] sm:tracking-[4px] uppercase bg-gradient-to-r from-[#8c6d91] via-[#618575] to-[#e28373] bg-clip-text text-transparent leading-tight">
                  GENERAL<br className="sm:hidden" /> ADMISSION
                </span>
              </div>

              {/* BOARDING PASS */}
              <div className="p-3 sm:p-[28px_20px] border-r border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black tracking-[2px] sm:tracking-[6px] uppercase text-[#9ba1a6] leading-tight">
                  BOARDING<br className="sm:hidden" /> PASS
                </span>
              </div>

              {/* Php 30.00 */}
              <div className="p-3 sm:p-[28px_20px] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black tracking-[2px] sm:tracking-[6px] uppercase text-white">
                  Php 30.00
                </span>
              </div>

            </section>

            {/* Bottom Terminal Strip */}
            <section className="h-[60px] sm:h-[90px] bg-[#0a080e]/60 overflow-hidden flex items-center justify-center">
              <img
                src="/images-board/corrupted.gif"
                alt="Glitch Animation"
                className="w-full h-full object-cover block"
              />
            </section>

          </main>

          {/* Right Sidebar (Logo + Gideon) — desktop only, hidden on mobile */}
          <aside className="hidden lg:grid grid-rows-[200px_1fr]">
            {/* Top GDG Logo */}
            <div className="border-b border-[#3d2330] flex items-center justify-center p-5 bg-[#060509]/80 backdrop-blur-xs">
              <img
                src="/images-board/GDG-logo.png"
                alt="GDG Logo"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>

            {/* Bottom Gideon Mascot */}
            <div className="flex items-center justify-center bg-[#0a080e]/40 relative overflow-hidden min-h-[250px] w-full h-full">
              <img
                src="/images-board/Gideon.gif"
                alt="Gideon ASCII Mascot"
                className="w-full h-full object-cover block"
              />
            </div>
          </aside>

        </div>
      </ScrollReveal>
    </section>
  )
}