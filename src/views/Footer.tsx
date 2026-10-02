import React from 'react';

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
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'Mission', href: '#mission' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Leaderboard', href: '#leaderboard' },
];

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
  heading = 'KEEP THE TORCH BURNING',
  navItems = DEFAULT_NAV_ITEMS,
  socials = DEFAULT_SOCIALS,
  contactEmail = 'gdg.usls@gmail.com',
  bgImageSrc = '/images/background.png',
  bannerText = 'ESCAPADE',
}) => {
  return (
    <footer className="w-full text-white mt-auto border-t border-white/15 overflow-hidden font-['Orbitron',sans-serif]">
      {/* Top Banner Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat bg-[#12131a] px-8 py-9 md:px-16 flex justify-between items-center flex-wrap gap-6 border-b border-white/20 before:content-[''] before:absolute before:inset-0 before:bg-black/45 before:z-[1]"
        style={{ backgroundImage: `url('${bgImageSrc}')` }}
      >
        {/* Nav Links & Info */}
        <div className="relative z-[2] flex flex-col gap-[10px]">
          {/* Muted Aurora Borealis Text Gradient (Soft Teal -> Ice Blue -> Dusty Lavender) */}
          <h3 className="text-[26px] md:text-[32px] font-black tracking-[3px] uppercase bg-gradient-to-r from-[#62c9a5] via-[#5daec7] to-[#9d7cb8] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {heading}
          </h3>
          <nav className="flex items-center gap-[6px] text-[15px] font-normal">
            {navItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  className="relative text-white/80 no-underline px-[10px] py-[4px] rounded-[5px] overflow-hidden inline-block transition-colors duration-250 z-[1] hover:text-white before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white/20 before:rounded-[4px] before:transition-[width] before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:z-[-1] hover:before:w-full"
                >
                  {item.label}
                </a>
                {index < navItems.length - 1 && (
                  <span className="text-white/40 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="relative z-[2] flex items-center gap-5">
          <a
            href={`mailto:${contactEmail}?subject=Inquiry%20-%20Escapade`}
            className="text-white bg-white/[0.08] border border-white/30 px-[18px] py-[10px] rounded-[24px] text-[13px] font-bold uppercase tracking-[1px] no-underline transition-all duration-250 inline-flex items-center justify-center whitespace-nowrap hover:bg-white hover:text-[#0c0b10] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-[2px]"
          >
            CONTACT US!
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-[52px] h-[52px] flex items-center justify-center no-underline overflow-hidden transition-transform duration-200 hover:scale-120 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.iconSrc}
                alt={social.label}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Giant Bottom Text Banner */}
      <div className="bg-[#0c0b10] w-full pt-[10px] pb-0 overflow-hidden flex justify-center items-center">
        <h1 className="text-[13.8vw] font-bold text-[#8d929f] uppercase leading-[0.82] select-none text-center whitespace-nowrap w-screen block m-0 tracking-[-0.018em]">
          {bannerText}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;