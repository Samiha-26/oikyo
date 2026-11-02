import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RecentEventsSection from "@/components/RecentEventsSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <RecentEventsSection />
      <ImpactStatsSection />
      <GallerySection />
    </main>
  );
}
