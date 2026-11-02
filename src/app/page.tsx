import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RecentEventsSection from "@/components/RecentEventsSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <RecentEventsSection />
      <ImpactStatsSection />
    </main>
  );
}
