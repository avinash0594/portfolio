"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Target, Activity } from "lucide-react";
import { useRef } from "react";

const roadmapData = [
  {
    phase: "Current Objective",
    title: "Mahindra & Mahindra Ltd., Nashik",
    role: "Computer Vision Intern",
    time: "Mar 2025 – Jan 2026",
    desc: "Developed automated AI inspection system processing 1450+ automotive panels daily. Achieved 99.2% uptime and reduced inspection latency by 50%. Integrated system with PLC using Modbus TCP and built configurable defect detection modules with 94% accuracy.",
    icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />,
    color: "bg-primary"
  },
  {
    phase: "Leadership",
    title: "Sun Nexus Solutions",
    role: "Secretary",
    time: "Mar 2024 – Present",
    desc: "Managed 30-member technical team and organized technical seminar KARMASIDDHI. Mentored students in AI, IoT, and automation while working on real-world technology projects.",
    icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary" />,
    color: "bg-secondary"
  },
  {
    phase: "Backend Architecture",
    title: "Pentagon Space, Hyderabad",
    role: "Python Full Stack Developer Intern",
    time: "Jan 2026 – Apr 2026",
    desc: "Developing applications using Python and Django. Building backend systems and REST APIs, improving database-driven application development.",
    icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />,
    color: "bg-accent"
  }
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const pathHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="experience" className="py-32 relative z-10 w-full overflow-hidden bg-background">

      {/* Parallax Background Orbs */}
      <motion.div
        style={{ y: yBg1 }}
        className="absolute top-40 left-0 w-full max-w-2xl h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: yBg2 }}
        className="absolute bottom-40 right-0 w-full max-w-2xl h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
            Career Roadmap
          </h2>
        </motion.div>

        <div className="relative">
          {/* Continuous Roadmap Path Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden origin-top">
            <motion.div
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {roadmapData.map((node, i) => {
              // Exact alternating layout: 0 = Left, 1 = Right, 2 = Left
              const isLeftSidesc = i % 2 === 0;

              return (
                <div key={node.title} className="relative flex flex-col md:flex-row items-center w-full group">

                  {/* Central Node Marker */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.2) }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-white/10 flex items-center justify-center z-10 group-hover:border-white/30 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full ${node.color} shadow-lg`} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isLeftSidesc ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.6 + (i * 0.2), ease: "easeOut" }}
                    className={`w-full md:w-1/2 flex pl-16 pr-2 sm:pl-20 sm:pr-4 md:px-0 ${!isLeftSidesc ? 'md:ml-auto' : ''}`}
                  >
                    <div className={`w-full ${isLeftSidesc ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} flex flex-col`}>
                      <span className={`text-sm font-bold font-orbitron ${node.color.replace('bg-', 'text-')} tracking-widest uppercase mb-2`}>
                        {node.phase}
                      </span>

                      <div className="glass-panel p-3 sm:p-4 md:p-8 group-hover:glass-panel-hover text-left flex flex-col items-start w-full">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 pb-2 sm:pb-3 md:pb-4 border-b border-white/10 w-full">
                          <div className={`p-1.5 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 ${node.color.replace('bg-', 'text-')}`}>
                            {node.icon}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 leading-tight">{node.title}</h3>
                            <h4 className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm">{node.role}</h4>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed font-light mb-3 sm:mb-4 text-[11px] sm:text-[13px] md:text-base">
                          {node.desc}
                        </p>
                        <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded">
                          {node.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
