"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Trophy, Star, Award, Medal, ExternalLink, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const achievements = [
  {
    title: "Fragment Detection Project Implementation",
    issuer: "Mahindra & Mahindra",
    description: "Successfully developed and deployed Industrial Vision System for Metal Fragment Detection.",
    icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />,
    image: "/image/Fragment.jpg"
  }, 
  {
    title: "Panel Defect Project Implementation",
    issuer: "Mahindra & Mahindra",
    description: "Successfully developed and deployed AI-Based Vision System for Panel Defect Detection.",
    icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary" />,
    image: "/image/panel.jpg"
  },
  {
    title: "Certificate of Completion",
    issuer: "Dept of CSE , Sandip University",
    description: "successfully completed the project entitled GPS Denied Autonomous Drone For Critical Missions",
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />,
    image: "/image/image.jpg"
  },   
  {
    title: "Appreciation ",
    issuer: "Sun Nexus Solutions",
    description: "In recognition of outstanding dedication and successful tenure as a member.",
    icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />,
    image: "/image/sunnexus.jpg"
  }, 
  {
    title: "Appreciation Hackathon",
    issuer: "NASA Space Apps Challenge",
    description: "Collaborated in one of the world's largest hackathons to solve terrestrial and space-based challenges.",
    icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary" />,
    image: "/image/nasa.jpg"
  },
  {
    title: "Merit Award",
    issuer: "IMPULSE Innovation Program",
    description: "Recognized at the state level for innovative IoT solutions in Automatic Farming and Home Automation.",
    icon: <Medal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />,
    image: "/image/imagfe.jpg"
  }
];

interface AchievementCardProps {
  achievement: typeof achievements[number];
  index: number;
  scrollYProgress: any;
  isMobile: boolean;
  onClickImage: (image: string) => void;
}

function AchievementCard({ achievement, index, scrollYProgress, isMobile, onClickImage }: AchievementCardProps) {
  // Row 1: index 0 and 1. Row 2: index 2 and 3.
  const isRow1 = index < 2;

  // Define when each row should start and end its stamp animation based on scroll progress
  const startProgress = isRow1 ? 0.25 : 0.35;
  const endProgress = isRow1 ? 0.35 : 0.45;

  // Create the transform for this specific card
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
      onClick={() => onClickImage(achievement.image)}
      className="glass-panel p-3 sm:p-4 md:p-8 flex items-start gap-2 sm:gap-3 md:gap-6 group hover:glass-panel-hover cursor-pointer relative overflow-hidden"
    >
      {/* Visual background indicator for clicking */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors duration-300" />
      
      <div className="p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform relative z-10">
        {achievement.icon}
      </div>
      <div className="relative z-10 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2 group-hover:text-primary transition-colors">
            {achievement.title}
          </h3>
          <span className="p-1.5 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 group-hover:bg-primary/20 text-gray-400 group-hover:text-primary transition-all duration-300 shrink-0">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventDefault = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.addEventListener("touchmove", preventDefault, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("touchmove", preventDefault);
      };
    }
  }, [selectedImage]);

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
                  onClickImage={setSelectedImage}
                />
              ))}
            </div>
            
          </motion.div>

        </div>
      </div>

      {/* Premium Glassmorphic Modal to show the image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] glass-panel p-6 flex flex-col items-center border-white/20 bg-background/95 shadow-2xl overflow-hidden"
            >
              {/* Top-right prominent Close X button inside the modal glass card */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-20 cursor-pointer flex items-center justify-center shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* External Close Button (above card) */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-2 font-orbitron uppercase text-xs tracking-wider cursor-pointer"
              >
                <span>Close</span>
                <X className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/20">
                <img
                  src={selectedImage}
                  alt="Achievement Certificate"
                  className="object-contain max-w-full max-h-full rounded-md shadow-2xl"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 w-full justify-end px-4 pb-2 pointer-events-auto">
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-xs font-orbitron transition-all flex items-center gap-2 shadow-[0_0_15px_-3px_var(--color-primary)] cursor-pointer"
                >
                  Open in New Tab
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
