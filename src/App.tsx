import { useLandingController } from './controllers/useLandingController';
import { Navbar } from './views/Navbar';
import { HeroSection } from './views/HeroSection';
import { StorySection } from './views/StorySection';
import { MissionSection } from './views/MissionSection';
import BoothPromotion from './components/BoothPromotion';
import { TicketsSection } from './views/TicketsSection';
import { LeaderboardSection } from './views/LeaderboardSection';
import { Footer } from './views/Footer';

export default function App() {
  const controller = useLandingController();

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans selection:bg-white/30 selection:text-white">
      {/* View: Navbar with Tab Typewriter Animation */}
      <Navbar
        navSections={controller.navSections}
        activeSection={controller.activeSection}
        mobileMenuOpen={controller.mobileMenuOpen}
        onToggleMobileMenu={controller.toggleMobileMenu}
        onCloseMobileMenu={controller.closeMobileMenu}
      />

      {/* View: Hero Section */}
      <HeroSection />

      {/* View: Story Section */}
      <StorySection />

      {/* View: Mission Section */}
      <MissionSection />

      {/* View: Booth Promotion */}
      <BoothPromotion />

      {/* View: Tickets Section */}
      <TicketsSection />

      {/* View: Leaderboard Section */}
      <LeaderboardSection />

      {/* View: Footer */}
      <Footer />
    </div>
  );
}
