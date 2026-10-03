import { ScrollReveal } from '../components/ScrollReveal'

export function MissionSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="mission-root relative isolate overflow-hidden text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Michroma&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .mission-root {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          background-color: #050806;
          padding: 60px 16px 80px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* ─── Layer 1: Background image ─── */
        .mission-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url('/images-board/MISSION_BG.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
        }

        /* ─── Layer 2: Dark layer ─── */
        .mission-dark-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: linear-gradient(
            180deg,
            rgba(5, 8, 6, 0.97) 0%,
            rgba(5, 8, 6, 0.88) 35%,
            rgba(5, 8, 6, 0.88) 65%,
            rgba(5, 8, 6, 0.97) 100%
          );
          pointer-events: none;
        }

        /* ─── Layer 3: Texts and Design ─── */
        .mission-content-layer {
          position: relative;
          z-index: 20;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ─── Outer HUD corner brackets ─── */
        .mission-hud-frame {
          position: absolute;
          top: -30px;
          bottom:-30px;
          left: 0px;
          right: 0px;
          pointer-events: none;
          z-index: 22;
        }
        .mission-hud-frame .corner {
          position: absolute;
          width: clamp(24px, 4vw, 36px);
          height: clamp(24px, 4vw, 36px);
          border-color: #5FBF3F;
        }
        .mission-hud-frame .corner.tl { top: 0; left: 0; border-left: 2px solid; border-top: 2px solid; }
        .mission-hud-frame .corner.tr { top: 0; right: 0; border-right: 2px solid; border-top: 2px solid; }
        .mission-hud-frame .corner.bl { bottom: 0; left: 0; border-left: 2px solid; border-bottom: 2px solid; }
        .mission-hud-frame .corner.br { bottom: 0; right: 0; border-right: 2px solid; border-bottom: 2px solid; }

        /* ─── Top center notch ─── */
        .mission-notch {
          position: absolute;
          top: clamp(6px, 1.2vw, 12px);
          left: 50%;
          transform: translateX(-50%);
          width: clamp(160px, 25vw, 220px);
          height: 18px;
          pointer-events: none;
          z-index: 22;
        }
        .mission-notch svg {
          width: 100%;
          height: 100%;
        }

        /* ─── Container wrapping HUD text and Square Text Box ─── */
        .mission-wrapper {
          position: relative;
          width: min(680px, 92vw);
          margin: 0 auto;
          z-index: 25;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── HUD Readouts on top and below the text box ─── */
        .mission-hud-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          pointer-events: none;
          z-index: 26;
        }
        .mission-hud-row.top {
          margin-bottom: 10px;
        }
        .mission-hud-row.bottom {
          margin-top: -100px; /* Pulls crew slots, nav, and virus block UP */
          align-items: flex-end;
          position: relative;
          z-index: 30;
        }

        .mission-hud-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: clamp(9px, 1.1vw, 11px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.5;
          color: rgba(95, 191, 63, 0.85);
          white-space: nowrap;
        }
        .mission-hud-text.center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          text-align: center;
        }
        .mission-hud-text.right {
          text-align: right;
        }

        .mission-signal-weak {
          animation: mission-transmission-blink 1.8s steps(1) infinite;
        }

        /* ─── Virus Image overlapping the text box on top of ILOVEYOU Virus Spreading ─── */
        .mission-virus-block {
          position: relative;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          margin-top: -65px; /* Pulls virus image up to overlap with the bottom of the text box */
          pointer-events: none;
        }

        .mission-virus-icon {
          width: 200px;
          height: auto;
          position: relative; 
          bottom: -30px;
          margin: 0;
          filter: drop-shadow(0 0 12px rgba(255, 42, 42, 0.85));
          animation: virus-icon-glitch 2.6s steps(1) infinite;
        }

        .mission-virus-text {
          position: relative;
          top: 15px;   /* ↓ positive = down, negative = up */
          left: -5px;  /* → positive = right, negative = left */
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: clamp(9px, 1.1vw, 11px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FF2A2A;
          animation: virus-text-glitch 3.2s steps(1) infinite;
        }

        /* ─── Inner square content panel (transparent, no dark layer in text box) ─── */
        .mission-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          border: 1px solid rgba(95, 191, 63, 0.45);
          border-radius: 6px;
          background: transparent;
          backdrop-filter: none;
          padding: clamp(20px, 3.5vw, 34px) clamp(18px, 3.5vw, 36px);
          text-align: center;
          z-index: 35;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .mission-panel {
            aspect-ratio: auto;
            min-height: 540px;
          }
        }

        /* ─── Eyebrow (Red Incoming Transmission with Blinking) ─── */
        .mission-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: clamp(10px, 1.3vw, 12px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transform: translateY(-50px);
          color: #FF2A2A;
          margin-bottom: 8px;
          animation: mission-transmission-blink 1.8s steps(1) infinite;
        }
        .mission-eyebrow .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF2A2A;
          box-shadow: 0 0 10px #FF2A2A, 0 0 20px rgba(255, 42, 42, 0.8);
          display: inline-block;
          flex-shrink: 0;
        }

        /* ─── Title with Glitch Animation (Always below eyebrow) ─── */
        .mission-title {
          display: block;
          width: 100%;
          text-align: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(26px, 4.5vw, 46px);
          line-height: 1.08;
          top: -40px;
          margin: 0 0 10px;
          background: linear-gradient(90deg, #d63031, #e17055 30%, #fdcb6e 65%, #fbc531 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 16px rgba(253, 203, 110, 0.35));
          position: relative;
          animation: mission-title-glitch 4.5s infinite;
        }

        /* ─── Description text (In front of the hologram in the middle) ─── */
        .mission-desc {
          position: relative;
          z-index: 10;
          max-width: 540px;
          margin: 0 auto;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          font-size: clamp(12.5px, 1.6vw, 15px);
          line-height: 1.6;
          color: #7EE8F5;
          text-shadow: 0 0 14px rgba(126, 232, 245, 0.5), 0 2px 10px rgba(0, 0, 0, 0.95);
        }

        .mission-highlight {
          display: block;
          margin-top: 6px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: clamp(11.5px, 1.4vw, 13px);
          letter-spacing: 0.04em;
          color: #FDCB6E;
          text-shadow: 0 0 14px rgba(253, 203, 110, 0.6), 0 2px 10px rgba(0, 0, 0, 0.95);
        }

        /* ─── Hologram Backdrop Stage (Behind the text) ─── */
        .mission-hologram-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          border-radius: 6px;
        }

        /* mission_holo_2 (Pedestal + light cone at the base) */
        .mission-holo-base {
          position: absolute;
          bottom: 100px;                        /* Positioned at the bottom of the square box */
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 520px;
          height: auto;
          max-height: 320px;
          object-fit: contain;
          z-index: 1;
          opacity: 0.85;
        }

        /* mission_holo (Hologram GIF in the center / middle behind the text) */
        .mission-holo-projection {
          position: absolute;
          top: 38%;                            /* Centered vertically behind headers and description */
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(500px, 34vw, 340px);
          height: clamp(500px, 34vw, 340px);
          object-fit: contain;
          z-index: 2;
          opacity: 0.82;
          animation: mission-holo-float 3.5s ease-in-out infinite;
        }

        /* ─── Circular glow behind the GIF ─── */
        .mission-holo-glow {
          position: absolute;
          top: 38%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(400px, 46vw, 540px);
          height: clamp(400px, 46vw, 540px);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(126, 232, 245, 0.5) 0%,
            rgba(57, 255, 20, 0.22) 40%,
            rgba(126, 232, 245, 0.1) 60%,
            transparent 75%
          );
          filter: blur(28px);
          z-index: 1;
          pointer-events: none;
          animation: mission-glow-pulse 4s ease-in-out infinite alternate;
        }

        @keyframes mission-glow-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.75;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 1;
          }
        }

        /* ─── Info row ─── */
        .mission-info-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 16px;
          width: 100%;
          max-width: 500px;
          margin-top: 2px;
          margin-bottom: 4px;
        }
        .mission-info-block {
          text-align: center;
          flex: 1;
        }
        .mission-info-label {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: clamp(10px, 1.2vw, 11px);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #39FF14;
          margin-bottom: 2px;
          text-shadow: 0 0 8px rgba(57, 255, 20, 0.4);
        }
        .mission-info-value {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 1.4vw, 14px);
          color: #fff;
          letter-spacing: 0.05em;
        }

        /* ─── Accept Mission button ─── */
        .mission-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 32px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: clamp(11px, 1.3vw, 13px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #39FF14;
          background: rgba(57, 255, 20, 0.04);
          border: 1.5px solid #39FF14;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          position: relative;
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.2);
          margin-top: 4px;
        }
        .mission-cta:hover {
          background: rgba(57, 255, 20, 0.18);
          box-shadow: 0 0 25px rgba(57, 255, 20, 0.45), inset 0 0 14px rgba(57, 255, 20, 0.15);
          transform: translateY(-2px) scale(1.03);
        }

        /* ─── Virus Image constantly at bottom right of mission section (5x bigger) ─── */
        .mission-section-virus {
          position: absolute;
          bottom: clamp(8px, 2vw, 20px);
          right: clamp(12px, 2.5vw, 24px);
          width: clamp(150px, 18vw, 220px);
          height: auto;
          object-fit: contain;
          pointer-events: none;
          z-index: 24;
          filter: drop-shadow(0 0 16px rgba(255, 42, 42, 0.85));
          animation: virus-icon-glitch 2.6s steps(1) infinite;
        }

        /* ─── Keyframe Animations ─── */
        @keyframes mission-transmission-blink {
          0%, 55% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(255, 42, 42, 0.7));
          }
          56%, 100% {
            opacity: 0.2;
            filter: none;
          }
        }

        @keyframes mission-title-glitch {
          0%, 84%, 100% {
            transform: translate(0, 0) skew(0deg);
            filter: drop-shadow(0 0 16px rgba(253, 203, 110, 0.35));
          }
          85% {
            transform: translate(-3px, 1px) skew(-1.5deg);
            filter: drop-shadow(-3px 0 #FF0055) drop-shadow(3px 0 #00FFFF);
          }
          87% {
            transform: translate(3px, -1px) skew(1.5deg);
            filter: drop-shadow(3px 0 #FF0055) drop-shadow(-3px 0 #00FFFF);
          }
          89% {
            transform: translate(-2px, 0);
            filter: drop-shadow(-2px 0 #39FF14);
          }
          91% {
            transform: translate(0, 0) skew(0deg);
            filter: drop-shadow(0 0 16px rgba(253, 203, 110, 0.35));
          }
          94% {
            transform: translate(2px, 1px);
            filter: drop-shadow(2px 0 #FF2A2A) drop-shadow(-2px 0 #7EE8F5);
          }
          96% {
            transform: translate(0, 0);
          }
        }

        @keyframes virus-icon-glitch {
          0%, 78%, 100% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(255, 42, 42, 0.85));
          }
          79% {
            transform: translate(-5px, 2px) scale(1.06) skew(-3deg);
            filter: drop-shadow(-5px 0 #00FFFF) drop-shadow(5px 0 #FF0055);
          }
          82% {
            transform: translate(5px, -2px) scale(0.96) skew(3deg);
            filter: drop-shadow(5px 0 #00FFFF) drop-shadow(-5px 0 #FF0055);
          }
          85% {
            transform: translate(-2px, 3px) scale(1.03);
            filter: drop-shadow(0 0 22px rgba(255, 42, 42, 1));
          }
          88% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          91% {
            opacity: 1;
          }
        }

        @keyframes virus-text-glitch {
          0%, 80%, 100% {
            transform: translate(0, 0);
            color: #FF2A2A;
            text-shadow: 0 0 8px rgba(255, 42, 42, 0.6);
          }
          81% {
            transform: translate(-2px, 1px) skew(-2deg);
            color: #00FFFF;
            text-shadow: 2px 0 #FF0055, -2px 0 #00FFFF;
          }
          83% {
            transform: translate(2px, -1px) skew(2deg);
            color: #FF0055;
            text-shadow: -2px 0 #00FFFF;
          }
          85% {
            transform: translate(-1px, 0);
            color: #FF2A2A;
            text-shadow: 0 0 14px rgba(255, 42, 42, 0.9);
          }
          87% {
            transform: translate(0, 0);
            opacity: 0.35;
          }
          89% {
            opacity: 1;
          }
        }

        @keyframes mission-holo-float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mission-title,
          .mission-eyebrow,
          .mission-section-virus,
          .mission-virus-text,
          .mission-holo-projection {
            animation: none !important;
          }
        }
      `}</style>

      {/* ─── LAYER 1: Mission_BG (Bottom) ─── */}
      <div className="mission-bg-layer" aria-hidden="true" />

      {/* ─── LAYER 2: Dark layer (Middle) ─── */}
      <div className="mission-dark-layer" aria-hidden="true" />

      {/* ─── LAYER 3: Texts and Design (Top) ─── */}
      <div className="mission-content-layer">
        {/* Outer HUD Corner Brackets */}
        <div className="mission-hud-frame" aria-hidden="true">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </div>

        {/* Top Center Notch */}
        <div className="mission-notch" aria-hidden="true">
          <svg viewBox="0 0 220 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 L66 0 L78 16 L142 16 L154 0 L220 0" stroke="#5FBF3F" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Main Content Container with Fixed Top & Bottom Corner Text */}
        <ScrollReveal>
          <div className="mission-wrapper">
            {/* Top HUD Readouts (Fixed directly on top of the text box) */}
            <div className="mission-hud-row top" aria-hidden="true">
              <div className="mission-hud-text">
                SECTOR 07<br />
                <span className="mission-signal-weak">SIGNAL: WEAK</span>
              </div>
              <div className="mission-hud-text right">
                X 10.6767<br />Y 122.0927
              </div>
            </div>

            {/* Square Text Box (Transparent, no dark layer in text box) */}
            <div className="mission-panel">
              {/* Hologram Stage (Behind text, centered in the box) */}
              <div className="mission-hologram-stage" aria-hidden="true">
                {/* Circular Glow behind the GIF */}
                <div className="mission-holo-glow" />

                {/* Base Projector Light (mission_holo_2) */}
                <img
                  src="/images-board/MISSION_HOLO_2.png"
                  alt="Hologram projector base"
                  className="mission-holo-base"
                />
                {/* Hologram Projection GIF (mission_holo) */}
                <img
                  src="/images-board/MISSION_HOLO.gif"
                  alt="Hologram projection"
                  className="mission-holo-projection"
                />
              </div>

              {/* Center Content Group: Headers & Description in front and in the middle of the GIF */}
              <div className="flex flex-col items-center w-full my-auto relative z-10 -translate-y-20">
                {/* Eyebrow (Red Incoming Transmission with Blinking Animation) */}
                <div className="mission-eyebrow">
                  <span className="dot" />
                  <span>INCOMING TRANSMISSION</span>
                </div>

                {/* Title with Glitch Animation */}
                <h2 id="mission-heading" className="mission-title">
                  HAIL MARY.EXE
                </h2>

                {/* Description (Glowing Blue text + Yellow Highlight on top of hologram) */}
                <p className="mission-desc">
                  Viruses are eating Gideon&apos;s home. He needs a crew. Grab 2 to 4 friends
                  and board the ship. You&apos;ve got 15 minutes before the monsters get loud.
                  <span className="mission-highlight">
                    Fastest 5 crews win a prize from Crazy Krunch.
                  </span>
                </p>
              </div>

              {/* Bottom Controls Group: Info row + CTA Button */}
              <div className="flex flex-col items-center w-full relative z-10">
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

                {/* CTA Button (no circle pip) */}
                <a href="#tickets" className="mission-cta">
                  ACCEPT MISSION
                </a>
              </div>
            </div>

            {/* Bottom HUD Readouts (Fixed directly below the text box) */}
            <div className="mission-hud-row bottom" aria-hidden="true">
              <div className="mission-hud-text">
                CREW SLOTS 2-4<br />HULL 62%
              </div>
              <div className="mission-hud-text center hidden sm:block">
                NAV // TAU CETI SERVER
              </div>
              <div className="mission-virus-block">
                <img
                  src="/images-board/virus.png"
                  alt="Virus"
                  className="mission-virus-icon"
                />
                <span className="mission-virus-text">!! ILOVEYOU VIRUS SPREADING</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}



