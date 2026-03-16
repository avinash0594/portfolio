"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ExternalLink, Github, MonitorPlay, Cloud, Flame, Factory, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Industrial Vision System for Metal Fragment Detection",
    description: "AI-powered inspection system deployed in manufacturing with adaptive thresholding and real-time PLC synchronization.",
    features: ["94% Detection Accuracy", "Real-time PLC Sync", "Adaptive Thresholding"],
    tech: ["Python", "Scikit-learn", "AI Inspection"],
    icon: <Factory className="w-6 h-6 text-primary" />,
    color: "bg-primary"
  },
  {
    title: "AI-Based Vision System for Panel Defect Detection",
    description: "Computer vision system detecting surface defects on automotive panels.",
    features: ["95% Accuracy", "GPU Training", "Modbus TCP Integration"],
    tech: ["YOLOv8", "4K IP Cameras", "Python"],
    icon: <MonitorPlay className="w-6 h-6 text-secondary" />,
    color: "bg-secondary"
  },
  {
    title: "Speak to Stop (STS)",
    description: "Conversation-aware audio system that automatically pauses music when the user speaks.",
    features: ["Silero Voice Activity Detection", "Real-time Windows Integration", "Wearable Potential"],
    tech: ["Audio Processing", "Python", "VAD"],
    icon: <Volume2 className="w-6 h-6 text-accent" />,
    color: "bg-accent"
  },
  {
    title: "ClimaWatch – Weather Prediction System",
    description: "AI-based weather prediction platform forecasting future weather trends using probabilistic models.",
    features: ["Trend Prediction", "Sector-aware Analysis", "Probabilistic Modeling"],
    tech: ["Machine Learning", "Python", "Data Analysis"],
    icon: <Cloud className="w-6 h-6 text-primary" />,
    color: "bg-primary"
  },
  {
    title: "Automatic Fire Extinguisher Robot",
    description: "Autonomous robot designed to detect and extinguish fires without human intervention.",
    features: ["Autonomous Navigation", "Fire Detection", "Automated Extinguishing"],
    tech: ["IoT", "Robotics", "Sensors"],
    icon: <Flame className="w-6 h-6 text-secondary" />,
    color: "bg-secondary"
  }
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 projects = index 0 to 4
    let index = Math.round(latest * (projects.length - 1));
    index = Math.max(0, Math.min(index, projects.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Background Parallax Orbs
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["50%", "-100%"]);

  return (
    <section ref={containerRef} id="projects" className="relative z-10 w-full bg-background" style={{ height: "300vh" }}>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle Background Parallax Elements */}
        <motion.div
          style={{ y: yBg1 }}
          className="absolute top-0 right-0 w-full max-w-lg h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          style={{ y: yBg2 }}
          className="absolute bottom-0 left-0 w-full max-w-lg h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-4 md:px-6 pt-16 relative z-10 w-full">

          <div className="text-center mb-10">
            <span className="text-secondary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
              Selected Work
            </h2>
            <p className="text-gray-400 mt-4 text-sm font-light uppercase tracking-widest animate-pulse">
              Scroll to explore
            </p>
          </div>

          {/* 3D Coverflow Carousel */}
          <div className="relative w-full h-[550px] flex justify-center items-center perspective-[2000px]">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);

              const isCenter = offset === 0;

              // Spreading cards 125% apart prevents them from physically overlapping or clipping
              const xTransform = `calc(${offset * 125}%)`;
              const scaleTransform = isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.15);
              const rotateYTransform = isCenter ? 0 : offset > 0 ? -45 : 45;
              const blurFilter = isCenter ? "blur(0px)" : `blur(${absOffset * 2}px)`;
              const zIndexVal = 100 - absOffset;
              const opacityVal = isCenter ? 1 : Math.max(0, 0.7 - absOffset * 0.4);

              return (
                <motion.div
                  key={project.title}
                  animate={{
                    x: xTransform,
                    scale: scaleTransform,
                    rotateY: rotateYTransform,
                    zIndex: zIndexVal,
                    opacity: opacityVal,
                    filter: blurFilter
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: "center center" }}
                  className={`absolute w-[85vw] max-w-[320px] sm:max-w-[360px] md:max-w-[420px] h-auto min-h-[260px] sm:min-h-[320px] md:min-h-[500px]`}
                >
                  <div className={`glass-panel h-full w-full flex flex-col p-4 sm:p-5 md:p-8 transition-all duration-500 relative overflow-hidden shadow-xl ${isCenter ? 'bg-white/5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] border-white/20' : 'border-white/5 bg-background/80'}`}>
                    {/* Subtle top border accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${project.color} ${isCenter ? 'opacity-100' : 'opacity-20'} transition-opacity duration-500`} />
                    <div className={`absolute top-0 right-0 w-32 h-32 ${project.color} opacity-0 ${isCenter ? 'md:opacity-10' : ''} blur-[50px] transition-opacity duration-700 pointer-events-none`} />

                    <div className="flex items-center justify-between mb-3 md:mb-8 relative z-10">
                      <div className={`p-2 sm:p-3 md:p-4 rounded-xl shadow-lg border border-white/5 bg-background/50 backdrop-blur-md`}>
                        {project.icon}
                      </div>
                      <div className={`flex gap-2 ${!isCenter ? 'hidden' : ''}`}>
                        <a href="#" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
                          <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 delay-75">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold font-orbitron text-white mb-2 md:mb-4 transition-colors duration-300 relative z-10 ${isCenter ? 'hover:text-primary' : ''}`}>
                      {project.title}
                    </h3>

                    <p className="text-gray-400 mb-3 md:mb-8 leading-relaxed flex-grow text-[11px] sm:text-[13px] md:text-[14px] font-light relative z-10 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4 md:mb-6 space-y-1.5 md:space-y-2 relative z-10 bg-black/30 p-3 md:p-4 rounded-xl border border-white/5">
                      {project.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-1.5 md:gap-2 text-[10px] sm:text-[11px] md:text-[13px] text-gray-300 font-medium tracking-wide">
                          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full shrink-0 ${project.color}`} />
                          {feature}
                        </div>
                      ))}
                      {project.features.length > 2 && (
                        <div className="text-[9px] md:text-[11px] text-gray-500 italic pl-2 md:pl-3">+ {project.features.length - 2} more</div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mt-auto relative z-10">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/5 text-[11px] font-semibold tracking-wider text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll Navigation Dots */}
          <div className="flex justify-center mt-12 gap-2 relative z-20">
            {projects.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-secondary shadow-[0_0_8px_var(--color-secondary)]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
