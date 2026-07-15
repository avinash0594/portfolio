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

interface AchievementCardProps {
  achievement: typeof achievements[number];
  index: number;
  scrollYProgress: any;
  isMobile: boolean;
}

function AchievementCard({ achievement, index, scrollYProgress, isMobile }: AchievementCardProps) {
  // Row 1: index 0 and 1. Row 2: index 2 and 3.
  const isRow1 = index < 2;

  // Define when each row should start and end its stamp animation based on scroll progress
  // The section scroll runs from 0 to 1. 0.15 to 0.5 is when the content wrapper fades in and moves up.
  // We'll have Row 1 "stamp" in between 0.25 and 0.35
  // Row 2 will "stamp" in slightly later, between 0.35 and 0.45
  const startProgress = isRow1 ? 0.25 : 0.35;
  const endProgress = isRow1 ? 0.35 : 0.45;

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
}

export function AchievementsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Extend scroll distance to 200vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Stage 1: Header Reveal (0.05 to 0.25 progress)
  const headerY = useTransform(scrollYProgress, [0.05, 0.25], ["10vh", "0vh"]);
  const headerScale = useTransform(scrollYProgress, [0.05, 0.25], [1.15, 1]);
  
  // Stage 2: Content Reveal & Parallax (0.10 to 0.25 progress)
  const contentOpacity = useTransform(scrollYProgress, [0.10, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.10, 0.25], ["50px", "0px"]);

  if (!mounted) {
    return <section ref={containerRef} id="achievements" className="relative z-10 w-full bg-background h-[200vh]" />;
  }

  return (
    <section ref={containerRef} id="achievements" className="relative z-10 w-full bg-background h-auto md:h-[200vh]">
      
      {/* Pinned Container - Only sticky on desktop */}
      <div className="relative md:sticky top-0 h-auto md:h-screen pt-24 pb-12 md:pt-28 md:pb-0 w-full flex flex-col items-center justify-start overflow-visible md:overflow-hidden border-t border-white/5">
        
        <div className="container mx-auto px-6 md:px-6 relative z-10 w-full flex flex-col items-center justify-center h-full">
          
          <motion.div 
            style={isMobile ? {} : { y: headerY, scale: headerScale }}
            {...(isMobile ? {
              initial: { opacity: 0, y: 15 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.8, ease: "easeOut" }
            } : {})}
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
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.title}
                  achievement={achievement}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                />
              ))}
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
