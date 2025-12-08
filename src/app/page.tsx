import { HeroSection } from "@/components/sections/HeroSection";
import { ToursSection } from "@/components/sections/ToursSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BoatSection } from "@/components/sections/BoatSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <BoatSection />
      <ToursSection />
    </div>
  );
}
