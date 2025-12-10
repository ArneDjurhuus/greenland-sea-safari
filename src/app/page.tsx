import { HeroSection } from "@/components/sections/HeroSection";
import { ToursSection } from "@/components/sections/ToursSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { BoatSection } from "@/components/sections/BoatSection";
import { createClient } from "@/lib/supabase/server";
import { Tour } from "@/types/tour";
import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  noStore();
  const supabase = await createClient();
  
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <BoatSection />
      <ToursSection tours={(tours || []) as Tour[]} />
    </div>
  );
}

