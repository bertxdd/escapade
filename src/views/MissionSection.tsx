import { ScrollReveal } from '../components/ScrollReveal'

export function MissionSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="mission-root relative isolate overflow-hidden text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Michroma&family=Space+Grotesk:wght@400;500;600&display=swap');

        .mission-root {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          background-color: #0a0e08;
          background-image:
            radial-gradient(ellipse at 50% 40%, rgba(57, 255, 20, 0.05), transparent 60%),
            linear-gradient(180deg, rgba(10,14,8,0.97) 0%, rgba(10,14,8,0.82) 40%, rgba(10,14,8,0.95) 100%);
          padding: 100px 20px 120px;
          min-height: 115vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ─── Background texture ─── */
        .mission-root::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image: url('/images-board/background.png');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          pointer-events: none;
        }

        /* ─── HUD outer frame – corner brackets ─── */
        .mission-hud-frame {
          position: absolute;
          inset: 20px;
          pointer-events: none;
          z-index: 2;
        }
        .mission-hud-frame .corner {
          position: absolute;
          width: 36px;
          height: 36px;
          border-color: #5FBF3F;
        }
        .mission-hud-frame .corner.tl { top: 0; left: 0; border-left: 2px solid; border-top: 2px solid; }
        .mission-hud-frame .corner.tr { top: 0; right: 0; border-right: 2px solid; border-top: 2px solid; }
        .mission-hud-frame .corner.bl { bottom: 0; left: 0; border-left: 2px solid; border-bottom: 2px solid; }
        .mission-hud-frame .corner.br { bottom: 0; right: 0; border-right: 2px solid; border-bottom: 2px solid; }

        /* ─── Top center notch ─── */
        .mission-notch {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          height: 18px;
          pointer-events: none;
          z-index: 3;
        }
        .mission-notch svg {
          width: 100%;
          height: 100%;
        }

        /* ─── HUD data corners ─── */
        .mission-hud-data {
          position: absolute;
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.6;
          z-index: 4;
          pointer-events: none;
        }
        .mission-hud-data.top-left { top: 44px; left: 40px; color: rgba(95, 191, 63, 0.8); }
        .mission-hud-data.top-right { top: 44px; right: 40px; text-align: right; color: rgba(95, 191, 63, 0.8); }
        .mission-hud-data.bottom-left { bottom: 40px; left: 40px; color: rgba(95, 191, 63, 0.8); }
        .mission-hud-data.bottom-center { bottom: 40px; left: 50%; transform: translateX(-50%); color: rgba(95, 191, 63, 0.8); }
        .mission-hud-data.bottom-right { bottom: 40px; right: 40px; color: #A91B1B; }

        @media (min-width: 768px) {
          .mission-hud-data { font-size: 11px; }
          .mission-hud-data.top-left { top: 54px; left: 60px; }
          .mission-hud-data.top-right { top: 54px; right: 60px; }
          .mission-hud-data.bottom-left { bottom: 50px; left: 60px; }
          .mission-hud-data.bottom-right { bottom: 50px; right: 60px; }
        }

        /* ─── Inner content panel ─── */
        .mission-panel {
          position: relative;
          width: min(860px, 100%);
          margin: 0 auto;
          border: 1px solid rgba(95, 191, 63, 0.45);
          border-radius: 4px;
          background: rgba(10, 18, 12, 0.82);
          backdrop-filter: blur(8px);
          padding: 54px 32px 48px;
          text-align: center;
          z-index: 5;
          box-shadow: 0 0 35px rgba(10, 18, 12, 0.9), inset 0 0 20px rgba(95, 191, 63, 0.05);
        }
        @media (min-width: 768px) {
          .mission-panel {
            padding: 72px 64px 60px;
          }
        }

        /* ─── Eyebrow (Red Incoming Transmission) ─── */
        .mission-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FF2A2A;
          margin-bottom: 24px;
          text-shadow: 0 0 10px rgba(255, 42, 42, 0.4);
        }
        .mission-eyebrow .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF2A2A;
          box-shadow: 0 0 8px #FF2A2A, 0 0 16px rgba(255,42,42,0.6);
          animation: mission-blink 1.4s steps(1) infinite;
        }

        /* ─── Title gradient (red → gold with scanlines) ─── */
        .mission-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(34px, 7.5vw, 76px);
          line-height: 1.05;
          margin: 0 0 28px;
          background: linear-gradient(90deg, #d63031, #e17055 30%, #fdcb6e 65%, #fbc531 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 16px rgba(253,203,110,0.35));
          position: relative;
        }
        .mission-title::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0, transparent 3px,
            rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px
          );
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        /* ─── Description text (Glowing Blue + Yellow Highlight) ─── */
        .mission-desc {
          max-width: 620px;
          margin: 0 auto 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          font-size: 15px;
          line-height: 1.7;
          color: #7EE8F5;
          text-shadow: 0 0 12px rgba(126, 232, 245, 0.3);
        }
        @media (min-width: 768px) {
          .mission-desc { font-size: 17px; }
        }

        .mission-highlight {
          display: block;
          margin-top: 12px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: #FDCB6E;
          text-shadow: 0 0 12px rgba(253, 203, 110, 0.45);
        }
        @media (min-width: 768px) {
          .mission-highlight { font-size: 14px; }
        }

        /* ─── Hologram image container & spinning animation ─── */
        .mission-holo-img-wrap {
          position: relative;
          width: min(100%, 340px);
          height: 280px;
          margin: 36px auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 800px;
        }
        @media (min-width: 768px) {
          .mission-holo-img-wrap {
            width: min(100%, 420px);
            height: 350px;
            margin: 44px auto 36px;
          }
        }

        .mission-holo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 25px rgba(126, 232, 245, 0.7));
          animation: mission-spin-3d 9s linear infinite;
          transform-style: preserve-3d;
        }

        @keyframes mission-spin-3d {
          0% {
            transform: perspective(800deg) rotateY(0deg);
          }
          100% {
            transform: perspective(800deg) rotateY(360deg);
          }
        }

        /* ─── Info flanking / below hologram ─── */
        .mission-info-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 24px;
          margin-top: 24px;
          margin-bottom: 32px;
        }
        .mission-info-block {
          text-align: center;
          flex: 1;
        }
        .mission-info-label {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #39FF14;
          margin-bottom: 6px;
          text-shadow: 0 0 8px rgba(57, 255, 20, 0.4);
        }
        .mission-info-value {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #fff;
          letter-spacing: 0.05em;
        }
        @media (min-width: 768px) {
          .mission-info-label { font-size: 14px; }
          .mission-info-value { font-size: 17px; }
        }

        /* ─── Accept Mission button ─── */
        .mission-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 42px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #39FF14;
          background: rgba(57, 255, 20, 0.03);
          border: 2px solid #39FF14;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          position: relative;
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
        }
        .mission-cta:hover {
          background: rgba(57, 255, 20, 0.15);
          box-shadow: 0 0 25px rgba(57,255,20,0.4), inset 0 0 14px rgba(57,255,20,0.15);
          transform: translateY(-2px) scale(1.03);
        }
        .mission-cta .cta-pip {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7EE8F5;
          box-shadow: 0 0 8px #7EE8F5;
        }

        /* ─── Virus network overlay ─── */
        .mission-virus-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          width: clamp(200px, 38vw, 480px);
          height: clamp(200px, 38vw, 480px);
          z-index: 1;
          pointer-events: none;
          opacity: 0.65;
          animation: mission-glitch 5s steps(1, end) infinite;
        }

        /* ─── Keyframes ─── */
        @keyframes mission-blink { 0%,60% { opacity: 1; } 61%,100% { opacity: 0.2; } }
        @keyframes mission-glitch {
          0%,93%,100% { transform: translateX(0); opacity: 0.65; }
          94% { transform: translateX(-2px); opacity: 0.3; }
          96% { transform: translateX(2px); opacity: 0.75; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mission-holo-img,
          .mission-virus-overlay, .mission-eyebrow .dot { animation: none !important; }
        }
      `}</style>

      {/* ─── HUD Corner Brackets ─── */}
      <div className="mission-hud-frame" aria-hidden="true">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
      </div>

      {/* ─── Top Center Notch ─── */}
      <div className="mission-notch" aria-hidden="true">
        <svg viewBox="0 0 220 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L66 0 L78 16 L142 16 L154 0 L220 0" stroke="#5FBF3F" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* ─── HUD Data Readouts ─── */}
      <div className="mission-hud-data top-left" aria-hidden="true">
        SECTOR 07<br /><span style={{ animation: 'mission-blink 1.4s steps(1) infinite' }}>SIGNAL: WEAK</span>
      </div>
      <div className="mission-hud-data top-right" aria-hidden="true">
        X 10.6767<br />Y 122.0927
      </div>
      <div className="mission-hud-data bottom-left" aria-hidden="true">
        CREW SLOTS 2-4<br />HULL 62%
      </div>
      <div className="mission-hud-data bottom-center hidden md:block" aria-hidden="true">
        NAV // TAU CETI SERVER
      </div>
      <div className="mission-hud-data bottom-right" aria-hidden="true" style={{ animation: 'mission-glitch 5s steps(1, end) infinite' }}>
        !! ILOVEYOU VIRUS SPREADING
      </div>

      {/* ─── Virus Network Overlay ─── */}
      <svg className="mission-virus-overlay" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Red network lines */}
        <line x1="350" y1="0" x2="300" y2="150" stroke="#C62828" strokeWidth="4" />
        <line x1="300" y1="150" x2="400" y2="250" stroke="#C62828" strokeWidth="4" />
        <line x1="400" y1="250" x2="450" y2="200" stroke="#C62828" strokeWidth="4" />
        <line x1="300" y1="150" x2="200" y2="280" stroke="#C62828" strokeWidth="3.5" />
        <line x1="200" y1="280" x2="320" y2="380" stroke="#C62828" strokeWidth="4" />
        <line x1="320" y1="380" x2="450" y2="420" stroke="#C62828" strokeWidth="4" />
        <line x1="200" y1="280" x2="250" y2="400" stroke="#C62828" strokeWidth="3" />
        {/* Orange network lines */}
        <line x1="0" y1="280" x2="120" y2="200" stroke="#E67E22" strokeWidth="3.5" />
        <line x1="120" y1="200" x2="200" y2="280" stroke="#E67E22" strokeWidth="3" />
        <line x1="400" y1="250" x2="450" y2="280" stroke="#E67E22" strokeWidth="3" />
        <line x1="170" y1="340" x2="100" y2="400" stroke="#E67E22" strokeWidth="3" />
        {/* Red nodes */}
        <rect x="95" y="145" width="10" height="10" fill="#C62828" />
        <rect x="245" y="170" width="8" height="8" fill="#C62828" />
        <rect x="195" y="275" width="12" height="12" fill="#C62828" />
        <rect x="310" y="375" width="14" height="14" fill="#C62828" />
        <rect x="350" y="330" width="8" height="8" fill="#C62828" />
        <rect x="410" y="415" width="16" height="16" fill="#C62828" />
        <rect x="260" y="390" width="6" height="6" fill="#C62828" />
        {/* Orange nodes */}
        <rect x="180" y="200" width="10" height="10" fill="#E67E22" />
        <rect x="290" y="230" width="12" height="12" fill="#E67E22" />
        <rect x="355" y="315" width="10" height="10" fill="#E67E22" />
        <rect x="145" y="290" width="8" height="8" fill="#E67E22" />
      </svg>

      {/* ─── Main Content Panel ─── */}
      <ScrollReveal>
        <div className="mission-panel">
          {/* Eyebrow (Red) */}
          <div className="mission-eyebrow">
            <span className="dot" />
            INCOMING TRANSMISSION
          </div>

          {/* Title */}
          <h2 id="mission-heading" className="mission-title">
            HAIL MARY.EXE
          </h2>

          {/* Description (Glowing Blue text + Yellow Highlight) */}
          <p className="mission-desc">
            Viruses are eating Gideon's home. He needs a crew. Grab 2 to 4 friends
            and board the ship. You've got 15 minutes before the monsters get loud.
            <span className="mission-highlight">
              Fastest 5 crews win a prize from Crazy Krunch.
            </span>
          </p>

          {/* Spinning Hologram Image */}
          <div className="mission-holo-img-wrap">
            <img
              src="/images-board/hologram.png"
              alt="Glowing blue hologram pedestal emitting light beam"
              className="mission-holo-img"
            />
          </div>

          {/* Info row: Destination + Mission Window */}
          <div className="mission-info-row">
            <div className="mission-info-block">
              <p className="mission-info-label">DESTINATION:</p>
              <p className="mission-info-value">SECTOR MM37</p>
            </div>
            <div className="mission-info-block">
              <p className="mission-info-label">MISSION WINDOW:</p>
              <p className="mission-info-value">OCTOBER 5-9, 2026</p>
            </div>
          </div>

          {/* CTA Button */}
          <a href="#tickets" className="mission-cta">
            ACCEPT MISSION
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
