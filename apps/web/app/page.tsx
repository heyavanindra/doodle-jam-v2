import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero/hero-section';

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-[#FEF08A]">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
