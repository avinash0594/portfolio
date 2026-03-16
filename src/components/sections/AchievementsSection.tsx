"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Star, Award, Medal } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const achievements = [
  {
    title: "Project Implementation",
    issuer: "Mahindra & Mahindra",
    description: "Successfully developed and deployed an automated AI inspection system resolving real-world manufacturing challenges.",
    icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
  },
  {
    title: "Participant",
    issuer: "NASA Space Apps Challenge",
    description: "Collaborated in one of the world's largest hackathons to solve terrestrial and space-based challenges.",
    icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary" />
  },
  {
    title: "Merit Award",
    issuer: "IMPULSE Innovation Program",
    description: "Awarded for exceptional contribution towards industrial AI innovations.",
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
  },
  {
    title: "State-Level Recognition",
    issuer: "Home Automation & Automatic Farming",
    description: "Recognized at the state level for innovative IoT solutions in agriculture and home automation.",
    icon: <Medal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
  }
];

export function AchievementsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true for safer initial mobile paint, or false. Let's do false but trigger effect immediately.

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Extend scroll distance to 200vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Stage 1: Header Reveal (0 to 0.2 progress)
  const headerY = useTransform(scrollYProgress, [0, 0.2], ["25vh", "0vh"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1.3, 1]);
  
  // Stage 2: Content Reveal & Parallax (0.15 to 0.5 progress)
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.5], ["20vh", "0vh"]);

  return (
    <section ref={containerRef} id="achievements" className="relative z-10 w-full bg-background h-auto md:h-[200vh]">
      
      {/* Pinned Container - Only sticky on desktop */}
      <div className="relative md:sticky top-0 h-auto md:h-screen pt-24 pb-12 md:py-0 w-full flex flex-col items-center justify-center overflow-visible md:overflow-hidden border-t border-white/5">
        
        <div className="container mx-auto px-6 md:px-6 relative z-10 w-full flex flex-col items-center justify-center h-full">
          
          <motion.div 
            style={isMobile ? {} : { y: headerY, scale: headerScale }}
            initial={{ opacity: 1 }}
            className="text-center mb-10 relative z-30"
          >
            <span className="text-secondary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
              Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
              Achievements
            </h2>
            <p className="text-gray-400 mt-4 text-sm font-light uppercase tracking-widest animate-pulse">
              Scroll to explore
            </p>
          </motion.div>

          {/* Content Wrapper that orchestrates the slide-ins */}
          <motion.div 
            style={isMobile ? {} : { opacity: contentOpacity, y: contentY }} 
            initial={{ opacity: 1 }}
            className="w-full max-w-5xl relative z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full pointer-events-auto overflow-visible px-2 md:px-4">
              {achievements.map((achievement, index) => {
                
                // Row 1: index 0 and 1. Row 2: index 2 and 3.
                const isRow1 = index < 2;

                // Define when each row should start and end its stamp animation based on scroll progress
                // The section scroll runs from 0 to 1. 0.15 to 0.5 is when the content wrapper fades in and moves up.
                // We'll have Row 1 "stamp" in between 0.3 and 0.45
                // Row 2 will "stamp" in slightly later, between 0.45 and 0.6
                const startProgress = isRow1 ? 0.3 : 0.45;
                const endProgress = isRow1 ? 0.45 : 0.6;

                // Create the transform for this specific card
                // Stamped effect: starts large (scale 1.5) and opaque-ish, rapidly shrinks to 1.0 (firmly placed)
                const stampScale = useTransform(
                  scrollYProgress, 
                  [startProgress, endProgress], 
                  [1.5, 1]
                );

                // Opacity fades in over the first half of the stamp
                const cardOpacity = useTransform(
                  scrollYProgress,
                  [startProgress, startProgress + (endProgress - startProgress) / 2],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={achievement.title}
                    style={isMobile ? {} : { scale: stampScale, opacity: cardOpacity }}
                    initial={isMobile ? { opacity: 0, scale: 0.9, y: 30 } : {}}
                    whileInView={isMobile ? { opacity: 1, scale: 1, y: 0 } : {}}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={isMobile ? { duration: 0.5, delay: index * 0.1 } : {}}
                    className="glass-panel p-3 sm:p-4 md:p-8 flex items-start gap-2 sm:gap-3 md:gap-6 group hover:glass-panel-hover"
                  >
                    <div className="p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 tracking-wider mb-1.5 sm:mb-2 md:mb-3">
                        {achievement.issuer}
                      </p>
                      <p className="text-gray-400 text-[11px] sm:text-[13px] md:text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
