"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, BrainCircuit, Factory, Code2, Cpu } from "lucide-react";
import { useRef } from "react";

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Extend scroll distance to 200vh to allow for the sticky reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Stage 1: Header Reveal (0 to 0.15 progress)
  const headerY = useTransform(scrollYProgress, [0, 0.15], ["25vh", "0vh"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1.3, 1]);
  
  // Stage 2: Content Reveal & Slide-ins (0.15 to 0.4 progress)
  // Bio card slides in from the left
  const slideXLeft = useTransform(scrollYProgress, [0.15, 0.35], ["-100vw", "0vw"]);
  // Education & Interests slide in from the right, slightly delayed
  const slideXRight = useTransform(scrollYProgress, [0.2, 0.4], ["100vw", "0vw"]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  // Background Parallax
  const bgOrb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bgOrb2Y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  const interests = [
    { name: "Computer Vision", icon: <BrainCircuit className="w-5 h-5 text-primary" /> },
    { name: "Machine Learning", icon: <BrainCircuit className="w-5 h-5 text-secondary" /> },
    { name: "Industrial AI", icon: <Factory className="w-5 h-5 text-accent" /> },
    { name: "Automation Systems", icon: <Cpu className="w-5 h-5 text-primary" /> },
    { name: "Intelligent Software", icon: <Code2 className="w-5 h-5 text-secondary" /> }
  ];

  return (
    <section ref={containerRef} id="about" className="relative z-10 w-full bg-background h-auto md:h-[200vh]">
      
      {/* Pinned Container - Only sticky on desktop */}
      <div className="relative md:sticky top-0 h-auto md:h-screen pt-24 pb-12 md:py-0 w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle Background Parallax Elements */}
        <motion.div 
          style={{ y: bgOrb1Y, rotate: 45 }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div 
          style={{ y: bgOrb2Y, rotate: -45 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-6 md:px-6 relative z-10 w-full flex flex-col items-center justify-center h-full">
          
          <motion.div style={{ y: headerY, scale: headerScale }} className="text-center mb-10 relative z-30">
            <span className="text-secondary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
              Identity
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
              About Me
            </h2>
            <p className="text-gray-400 mt-4 text-sm font-light uppercase tracking-widest animate-pulse">
              Scroll to explore
            </p>
          </motion.div>

          {/* Content Wrapper that orchestrates the slide-ins */}
          <div className="w-full max-w-6xl relative z-20 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-10">
            
            <div className="grid md:grid-cols-12 gap-8 items-stretch w-full pointer-events-auto">
              
              {/* Main Bio Card - Slides from Left */}
              <motion.div 
                style={{ x: slideXLeft, opacity: contentOpacity }}
                className="md:col-span-7 glass-panel p-3 sm:p-5 md:p-12 flex flex-col justify-center relative shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-orbitron text-white mb-3 sm:mb-4 md:mb-6">Engineering at the Edge</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg font-light mb-3 sm:mb-4 md:mb-6">
                  I am an AI / ML Engineer dedicated to solving complex problems safely and efficiently. My core strength lies in bridging the gap between <strong className="text-white font-medium">theoretical AI models</strong> and <strong className="text-white font-medium">real-world industrial applications</strong>.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                  With extensive exposure to heavy manufacturing environments, I specialize in building and deploying highly accurate computer vision pipelines and intelligent systems that function reliably in latency-critical scenarios.
                </p>
              </motion.div>

              <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 md:gap-8 mt-4 md:mt-0">
                {/* Education Card - Slides from Right */}
                <motion.div 
                  style={{ x: slideXRight, opacity: contentOpacity }}
                  className="glass-panel p-3 sm:p-4 md:p-8 shadow-xl"
                >
                   <div className="flex items-center gap-3 mb-3 sm:mb-4 md:mb-6">
                    <div className="p-2 sm:p-3 bg-white/5 rounded-lg">
                      <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-orbitron text-white">Education</h3>
                  </div>
                  <div className="pl-4 border-l-2 border-white/10 relative">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                    <h4 className="text-lg font-semibold text-white">B.Tech in CSE (AIML)</h4>
                    <p className="text-gray-400 mb-2">Sandip University, Nashik</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium text-gray-500 bg-white/5 px-3 py-1 rounded">2022 - 2026</span>
                      <span className="text-sm font-semibold text-accent">CGPA: 8.1</span>
                    </div>
                  </div>
                </motion.div>

                {/* Core Protocols / Interests - Slides from Right, sharing the transform */}
                <motion.div 
                  style={{ x: slideXRight, opacity: contentOpacity }}
                  className="glass-panel p-4 sm:p-5 md:p-8 shadow-xl"
                >
                   <h3 className="text-lg sm:text-xl font-bold font-orbitron text-white mb-4 sm:mb-6">Core Focus</h3>
                   <div className="flex flex-wrap gap-3">
                     {interests.map((interest) => (
                       <div 
                         key={interest.name}
                         className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-colors"
                       >
                         {interest.icon}
                         <span className="text-sm font-medium text-gray-300">{interest.name}</span>
                       </div>
                     ))}
                   </div>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
