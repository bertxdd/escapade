import React from 'react';
import gdgLogo from '../assets/GDG_LOGO.png';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  iconSrc: string;
}

export interface FooterProps {
  heading?: string;
  navItems?: NavItem[];
  socials?: SocialLink[];
  contactEmail?: string;
  bgImageSrc?: string;
  bannerText?: string;
  copyrightText?: string;
}

const DEFAULT_SOCIALS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gdg.usls/',
    iconSrc: '/images/insta.png',
  },
  {
    label: 'Gmail',
    href: 'mailto:gdg@usls.edu.ph',
    iconSrc: '/images/gmail.png',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/dsc.usls',
    iconSrc: '/images/fb.png',
  },
];

export const Footer: React.FC<FooterProps> = ({
  socials = DEFAULT_SOCIALS,
  contactEmail = 'gdg.usls@gmail.com',
  bannerText = 'ESCAPADE',
  copyrightText = '© 2026 GDG On Campus USLS. All rights reserved.',
}) => {
  return (
    <footer className="w-full text-white mt-auto border-t border-white/15 overflow-hidden font-['Orbitron',sans-serif] bg-black">
      {/* Top Banner & Main Content Section */}
      <div className="relative bg-black px-8 py-16 md:px-20 md:py-20 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10">
        {/* Left Side: Logo & Brand */}
        <div className="relative z-[2] flex items-center gap-4 shrink-0">
          <a
            href="/"
            className="group flex items-center gap-4 transition-transform duration-300 hover:scale-105 no-underline"
          >
            <img
              src={gdgLogo}
              alt="GDG Logo"
              className="h-11 md:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            />
            <div className="flex flex-col justify-center leading-tight">
              <span className="text-[11px] md:text-xs tracking-[0.22em] text-white/70 uppercase font-bold">
                AGAINST ALL ODDS:
              </span>
              <span className="text-xl md:text-2xl font-extrabold tracking-[0.18em] text-white uppercase bg-gradient-to-r from-white via-gray-200 to-white/90 bg-clip-text text-transparent">
                ESCAPADE
              </span>
            </div>
          </a>
        </div>

        {/* Middle: Copyright Text */}
        <div className="relative z-[2] text-center max-w-sm md:max-w-md px-4">
          <p className="text-xs md:text-sm text-white/70 font-sans tracking-wide leading-relaxed">
            {copyrightText}
          </p>
        </div>

        {/* Right Side: Contacts & Social Links */}
        <div className="relative z-[2] flex flex-wrap items-center justify-center md:justify-end gap-4 shrink-0">
          <a
            href={`mailto:${contactEmail}?subject=Inquiry%20-%20Escapade`}
            className="text-white bg-black border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider no-underline transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap hover:bg-zinc-900 hover:text-white hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(255,107,0,0.35)] hover:-translate-y-0.5"
          >
            CONTACT US!
          </a>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black border border-white/20 p-2.5 flex items-center justify-center no-underline overflow-hidden transition-all duration-300 hover:scale-110 hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={social.iconSrc}
                  alt={social.label}
                  className="w-full h-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant Bottom Text Banner */}
      <div className="bg-black w-full py-6 md:py-8 overflow-hidden flex justify-center items-center border-t border-white/5">
        <h1 className="text-[13vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#8d929f]/40 to-[#8d929f]/10 uppercase leading-[0.85] select-none text-center whitespace-nowrap w-screen block m-0 tracking-tighter">
          {bannerText}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;