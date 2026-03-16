"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const skillsData = [
  {
    category: "Programming",
    skills: [{ name: "Python" }, { name: "Bash" }, { name: "HTML" }, { name: "CSS" }]
  },
  {
    category: "AI / ML",
    skills: [{ name: "PyTorch" }, { name: "TensorFlow" }, { name: "Scikit-learn" }]
  },
  {
    category: "Computer Vision",
    skills: [{ name: "OpenCV" }, { name: "YOLO (Ultralytics)" }, { name: "Image Processing" }]
  },
  {
    category: "Data Analysis",
    skills: [{ name: "NumPy" }, { name: "Pandas" }, { name: "SciPy" }, { name: "Matplotlib" }, { name: "Plotly" }]
  },
  {
    category: "Databases",
    skills: [{ name: "SQL" }, { name: "MySQL" }, { name: "MongoDB" }]
  },
  {
    category: "Development",
    skills: [{ name: "Django" }, { name: "REST APIs" }, { name: "Full Stack Development" }]
  },
  {
    category: "Industrial Systems",
    skills: [{ name: "PLC Integration" }, { name: "Modbus TCP" }, { name: "Networking (TCP/IP)" }]
  },
  {
    category: "IoT & Hardware",
    skills: [{ name: "Sensor Integration" }, { name: "Circuit Assembly" }, { name: "Arduino" }]
  },
  {
    category: "Tools",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "VS Code" }, { name: "Streamlit" }]
  }
];

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isSpread, setIsSpread] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Extend scroll distance to 200vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If we scroll past 25% of the sticky section, trigger the spread permanently
    // Or if we scroll back up past 25%, let it close again (standard scroll behavior)
    if (latest > 0.25 && !isSpread) {
      setIsSpread(true);
    } else if (latest <= 0.25 && isSpread) {
      setIsSpread(false);
    }
  });

  // Background Parallax Orbs
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Scroll Reveal Animations
  const headerY = useTransform(scrollYProgress, [0, 0.15], ["25vh", "0vh"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1.3, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.15], ["10vh", "0vh"]);

  return (
    <section ref={containerRef} id="skills" className="relative z-10 w-full bg-background h-auto md:h-[200vh]">
      
      {/* Pinned Container */}
      <div className="relative md:sticky top-0 h-auto md:h-screen pt-24 pb-12 md:py-0 w-full flex flex-col items-center justify-center overflow-hidden border-y border-white/5">
        
        {/* Subtle Background Parallax Elements */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center justify-center h-full">
          
          <motion.div style={{ y: headerY, scale: headerScale }} className="text-center mb-10 relative z-20">
            <span className="text-primary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
              Technical Arsenal
            </h2>
            <p className="text-gray-400 mt-4 text-sm font-light uppercase tracking-widest animate-pulse">
              Scroll to explore
            </p>
          </motion.div>

          <motion.div style={{ opacity: contentOpacity, y: contentY }} className="w-full flex flex-col items-center justify-center pointer-events-none">
            
            {/* Desktop 3D Stack Reveal driven by scroll */}
            <div className="hidden md:flex relative w-full max-w-5xl h-[600px] justify-center items-center perspective-[2000px] pointer-events-auto">
              {skillsData.map((categoryGroup, index) => {
                
                // Calculate target positions for a structured 3x3 layout
                const row = Math.floor(index / 3);
                const col = index % 3;
                
                // Spread offsets
                const targetX = (col - 1) * 340; // Spacing horizontally
                const targetY = (row - 1) * 200; // Spacing vertically
                
                // Base state (Stacked tightly in center)
                const stackedX = 0;
                const stackedY = index * 5; // Slight offset down to show it's a stack
                const stackedScale = 1 - (index * 0.02);
                const stackedRotate = index % 2 === 0 ? index * 2 : -index * 2; // Messy stack effect
                
                return (
                  <motion.div
                    key={categoryGroup.category}
                    animate={{
                      x: isSpread ? targetX : stackedX,
                      y: isSpread ? targetY : stackedY,
                      scale: isSpread ? (hoveredIndex === index ? 1.05 : 1) : stackedScale,
                      rotateZ: isSpread ? 0 : stackedRotate,
                      zIndex: isSpread ? (hoveredIndex === index ? 50 : 10) : 100 - index,
                      opacity: isSpread && hoveredIndex !== null && hoveredIndex !== index ? 0.6 : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
                      delay: isSpread ? index * 0.05 : 0 // Stagger fan out, close all at once
                    }}
                    style={{ transformOrigin: "center center" }}
                    className={`absolute w-full max-w-[320px] h-auto min-h-[170px] cursor-pointer`}
                    onMouseEnter={() => isSpread && setHoveredIndex(index)}
                    onMouseLeave={() => isSpread && setHoveredIndex(null)}
                  >
                    <div className={`glass-panel h-full w-full flex flex-col p-6 transition-all duration-300 relative overflow-hidden shadow-xl ${isSpread && hoveredIndex === index ? 'bg-white/10 border-primary/50 shadow-[0_20px_50px_-15px_rgba(var(--color-primary-rgb),0.4)]' : 'border-white/10 bg-background/90 hover:border-white/20'}`}>
                      
                      <h3 className={`text-lg font-bold font-orbitron mb-4 flex items-center gap-3 ${isSpread && hoveredIndex === index ? 'text-primary' : 'text-white'}`}>
                        <span className={`w-1.5 h-6 rounded-full block ${isSpread && hoveredIndex === index ? 'bg-primary' : 'bg-white/20'}`} />
                        {categoryGroup.category}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-auto mb-auto">
                        {categoryGroup.skills.map((skill) => (
                          <div 
                            key={skill.name} 
                            className={`px-3 py-1.5 bg-white/5 border border-white/10 rounded-full transition-colors ${isSpread && hoveredIndex === index ? 'hover:bg-primary/20 hover:border-primary/50' : ''}`}
                          >
                            <span className={`text-xs font-medium ${isSpread && hoveredIndex === index ? 'text-white' : 'text-gray-300'}`}>
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Vertical Grid Reveal */}
            <div className="grid grid-cols-2 md:hidden gap-3 sm:gap-4 w-full pb-12 pointer-events-auto px-2 sm:px-4">
              {skillsData.map((categoryGroup, index) => (
                <motion.div
                  key={categoryGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full h-auto min-h-[100px] sm:min-h-[120px]"
                >
                  <div className="glass-panel h-full w-full flex flex-col p-3 sm:p-4 relative overflow-hidden shadow-xl border-white/10 bg-background/90">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold font-orbitron mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-white leading-tight">
                      <span className="w-1 h-4 sm:w-1.5 sm:h-5 rounded-full block bg-white/20 shrink-0" />
                      {categoryGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto mb-auto">
                      {categoryGroup.skills.map((skill) => (
                        <div key={skill.name} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/5 border border-white/10 rounded-full">
                          <span className="text-[9px] sm:text-[10px] font-medium text-gray-300">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
