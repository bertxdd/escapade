const CONTENT = {
  heading: 'HAIL MARY.EXE',
  subheading: 'Booth Transmission',
  description:
    'Viruses are eating the system that Torch calls home. Visit our booth, join a crew, and help us repair the ship before the signal goes dark.',
  location: 'TO BE ANNOUNCED', 
  dates: 'October 5 - 9',
  hours: 'TO BE ANNOUNCED', 
  details: [
    'Crews of 2 to 4 players',
    'Beat the mission and set your escape time',
    'Climb the leaderboard',
  ],
};

export default function BoothPromotion() {
  return (
    <section
      id="booth"
      aria-labelledby="booth-heading"
      className="bp-root relative isolate overflow-hidden bg-[#0A1210] text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@800;900&family=Michroma&family=Space+Grotesk:wght@500&display=swap');

        .bp-root { font-family: 'Space Grotesk', sans-serif; font-weight: 500; }
        .bp-heading { font-family: 'Orbitron', sans-serif; font-weight: 800; }
        .bp-sub { font-family: 'Michroma', sans-serif; }
        .bp-hud { font-family: 'Orbitron', sans-serif; font-weight: 800; }

        /* Hologram beam */
        .bp-beam {
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
          background: linear-gradient(to bottom, rgba(126,232,245,0.05), rgba(126,232,245,0.55));
          animation: bp-pulse 3s ease-in-out infinite;
        }
        .bp-scan {
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0 1px, transparent 1px 6px);
          animation: bp-scroll 2s linear infinite;
        }
        .bp-core {
          clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
          background: radial-gradient(circle, #ffffff 0%, #7EE8F5 45%, rgba(126,232,245,0.2) 100%);
          filter: drop-shadow(0 0 18px #7EE8F5);
          animation: bp-float 4s ease-in-out infinite, bp-flicker 6s steps(1) infinite;
        }
        .bp-ring { animation: bp-ring 3s ease-in-out infinite; }

        /* HUD + virus */
        .bp-blink { animation: bp-blink 1.2s steps(1) infinite; }
        .bp-glitch { animation: bp-glitch 5s steps(1) infinite; }

        @keyframes bp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes bp-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes bp-scroll { from { background-position-y: 0; } to { background-position-y: 6px; } }
        @keyframes bp-flicker { 0%,92%,96%,100% { opacity: 1; } 94%,98% { opacity: 0.35; } }
        @keyframes bp-ring { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.08); opacity: 0.5; } }
        @keyframes bp-blink { 0%,60% { opacity: 1; } 61%,100% { opacity: 0.2; } }
        @keyframes bp-glitch { 0%,93%,100% { transform: translateX(0); } 94% { transform: translateX(-3px); } 96% { transform: translateX(3px); } }

        @media (prefers-reduced-motion: reduce) {
          .bp-beam, .bp-scan, .bp-core, .bp-ring, .bp-blink, .bp-glitch { animation: none !important; }
        }
      `}</style>

      <img
        src="/booth-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A1210]/70 via-transparent to-[#0A1210]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-8">
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#5FBF3F]" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#5FBF3F]" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#5FBF3F]" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#5FBF3F]" />

        <p className="bp-hud absolute left-3 top-3 text-[9px] leading-relaxed tracking-widest text-[#5FBF3F]/80 md:left-12 md:top-6 md:text-xs">
          SECTOR 07 <br /> <span className="bp-blink">SIGNAL: WEAK</span>
        </p>
        <p className="bp-hud absolute right-3 top-3 text-right text-[9px] leading-relaxed tracking-widest text-[#5FBF3F]/80 md:right-12 md:top-6 md:text-xs">
          X 10.6767 <br /> Y 122.0927
        </p>
        <p className="bp-hud absolute bottom-3 left-3 text-[9px] leading-relaxed tracking-widest text-[#5FBF3F]/80 md:bottom-6 md:left-12 md:text-xs">
          CREW SLOTS 2-4 <br /> HULL 62%
        </p>
        <p className="bp-hud absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-xs tracking-widest text-[#5FBF3F]/80 md:block">
          NAV // TAU CETI SERVER
        </p>
        <p className="bp-hud bp-glitch absolute bottom-3 right-3 text-[9px] tracking-widest text-[#A91B1B] md:bottom-6 md:right-12 md:text-xs">
          !! ILOVEYOU VIRUS SPREADING
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="bp-sub text-xs text-[#7EE8F5] md:text-sm">{CONTENT.subheading}</p>
          <h2
            id="booth-heading"
            className="bp-heading mt-3 text-4xl leading-tight text-white md:text-6xl"
          >
            {CONTENT.heading}
          </h2>
          <p className="mt-6 max-w-md text-base text-white/85 md:text-lg">
            {CONTENT.description}
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border-l-2 border-[#39FF14] pl-4">
              <dt className="bp-sub text-xs text-[#39FF14]">Location</dt>
              <dd className="mt-1">{CONTENT.location}</dd>
            </div>
            <div className="border-l-2 border-[#39FF14] pl-4">
              <dt className="bp-sub text-xs text-[#39FF14]">Dates</dt>
              <dd className="mt-1">{CONTENT.dates}</dd>
            </div>
            <div className="border-l-2 border-[#39FF14] pl-4">
              <dt className="bp-sub text-xs text-[#39FF14]">Hours</dt>
              <dd className="mt-1">{CONTENT.hours}</dd>
            </div>
          </dl>

          <ul className="mt-8 space-y-2 text-sm text-white/80 md:text-base">
            {CONTENT.details.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-[#39FF14]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

  
        <div
          role="img"
          aria-label="Animated hologram of a glowing core floating above a projector platform"
          className="relative mx-auto h-80 w-64 md:h-[28rem] md:w-80"
        >
         
          <div className="bp-beam absolute bottom-10 left-1/2 h-[75%] w-full -translate-x-1/2" />
          <div className="bp-scan bp-beam absolute bottom-10 left-1/2 h-[75%] w-full -translate-x-1/2 opacity-60" />

          
          <div className="bp-core absolute left-1/2 top-[18%] h-20 w-20 -translate-x-1/2 md:h-24 md:w-24" />

          
          <div className="bp-ring absolute bottom-4 left-1/2 h-10 w-full -translate-x-1/2 rounded-[50%] border-2 border-[#7EE8F5] shadow-[0_0_24px_#7EE8F5]" />
          <div className="absolute bottom-7 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-[50%] border border-[#7EE8F5]/70" />
        </div>
      </div>
    </section>
  );
}