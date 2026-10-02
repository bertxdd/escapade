import { ScrollReveal } from '../components/ScrollReveal'

export function TicketsSection() {
  return (
    <section
      id="tickets"
      className="min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-8 border-t border-white/10 text-white text-center bg-[url('/images-board/background.png')] bg-cover bg-center bg-no-repeat relative"
    >
      {/* Section Heading */}
      <ScrollReveal>
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white uppercase tracking-widest mb-8 sm:mb-12">
          Tickets
        </h2>
      </ScrollReveal>

      {/* Main Boarding Pass HUD Container */}
      <ScrollReveal delay="150ms" className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] w-full border border-[#3d2330] bg-[url('/images-board/frame-bg.png')] bg-cover bg-center bg-no-repeat font-orbitron text-left shadow-2xl relative overflow-hidden">
          
          {/* Left Main Column */}
          <main className="grid grid-rows-[auto_1fr_auto_auto] border-b lg:border-b-0 lg:border-r border-[#3d2330]">
            
            {/* Header */}
            <header className="w-full px-6 py-4 sm:px-8 sm:py-6 border-b border-[#3d2330] text-base sm:text-2xl md:text-3xl font-light tracking-[3px] sm:tracking-[8px] flex items-center justify-between bg-[#060509]/80 backdrop-blur-xs uppercase">
              <span>AGAINST ALL ODDS:</span>
              <span className="text-[#f23c3c]">ESCAPADE</span>
            </header>

            {/* Ticket Stage */}
            <section className="p-6 sm:p-[30px] flex items-center justify-center border-b border-[#3d2330] bg-[#0a080e]/40 min-h-[280px]">
              <img 
                src="/images-board/Ticket.png" 
                alt="Escapade Boarding Pass Ticket" 
                className="max-w-[90%] max-h-[380px] object-contain rounded block" 
              />
            </section>

            {/* 2x2 Details Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] border-b border-[#3d2330]">
              
              {/* TYPE */}
              <div className="p-4 sm:p-[28px_20px] border-b sm:border-b-0 sm:border-r border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-[3px] sm:tracking-[6px] uppercase bg-gradient-to-r from-[#ee6b6e] to-[#f39a79] bg-clip-text text-transparent whitespace-nowrap">
                  TYPE
                </span>
              </div>

              {/* GENERAL ADMISSION */}
              <div className="p-4 sm:p-[28px_20px] border-b border-[#3d2330] sm:border-b-0 flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-[2px] sm:tracking-[4px] uppercase bg-gradient-to-r from-[#8c6d91] via-[#618575] to-[#e28373] bg-clip-text text-transparent whitespace-nowrap">
                  GENERAL ADMISSION
                </span>
              </div>

              {/* BOARDING PASS */}
              <div className="p-4 sm:p-[28px_20px] border-b sm:border-b-0 sm:border-t sm:border-r border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-[3px] sm:tracking-[6px] uppercase text-[#9ba1a6] whitespace-nowrap">
                  BOARDING PASS
                </span>
              </div>

              {/* Php 30.00 (BOLD) */}
              <div className="p-4 sm:p-[28px_20px] sm:border-t border-[#3d2330] flex items-center justify-center text-center bg-[#07060a]/30">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-[3px] sm:tracking-[6px] uppercase text-white whitespace-nowrap">
                  Php 30.00
                </span>
              </div>

            </section>

            {/* Bottom Terminal Strip */}
            <section className="h-[90px] bg-[#0a080e]/60 overflow-hidden flex items-center justify-center">
              <img 
                src="/images-board/corrupted.gif" 
                alt="Glitch Animation" 
                className="w-full h-full object-cover block" 
              />
            </section>

          </main>

          {/* Right Sidebar (Logo + Gideon Mascot) */}
          <aside className="grid grid-rows-[160px_1fr] sm:grid-rows-[200px_1fr]">
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