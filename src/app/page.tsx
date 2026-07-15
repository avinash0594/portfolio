import { BackgroundCanvas } from "@/components/3d/BackgroundCanvas";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ScrollTransition } from "@/components/ui/ScrollTransition";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <BackgroundCanvas />
      <Navbar />
      
      {/* Content wrapper with relative z-index so it sits above canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <HeroSection />
        
        <AboutSection />
        
        <SkillsSection />
        
        <ScrollTransition>
          <ExperienceSection />
        </ScrollTransition>
        
        <ProjectsSection />
        
        <AchievementsSection />
        
        <ScrollTransition>
          <ServicesSection />
        </ScrollTransition>
        
        <ScrollTransition>
          <ContactSection />
        </ScrollTransition>
      </div>
      <Footer />
    </main>
  );
}
