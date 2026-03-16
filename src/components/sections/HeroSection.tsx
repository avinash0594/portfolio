"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Stunning Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Dramatic layered speeds for a deep 3D feel
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Name scrub animation (flies up and fades into the navbar natively)
  const yNameScrub = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100%"]);
  const scaleNameScrub = useTransform(scrollYProgress, [0, 0.15], [1, 0.5]);
  const opacityNameScrub = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track global scroll for the flying name
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Absolute floating parallax orbs in background */}
      <motion.div 
        style={{ y: yOrb1 }}
        className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ y: yOrb2 }}
        className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div 
        style={{ opacity: opacityFade }}
        className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl"
      >
        
        {/* Text Content - Elegant, Clean */}
        <motion.div style={{ y: yText }} className="flex flex-col text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4"
          >
            <span className="text-primary font-orbitron tracking-widest uppercase text-sm font-semibold">
              System Interface Online
            </span>
          </motion.div>

          {/* Reveal Animation for Title - Scrubbed by scroll */}
          <div className="mb-6 relative w-full h-auto mt-2">
            
            {/* The actual name that scrubs away */}
            <motion.div 
              style={{ y: yNameScrub, scale: scaleNameScrub, opacity: opacityNameScrub }}
              className="flex flex-col items-start z-50 w-full h-full origin-top-left"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron text-white tracking-tight leading-none xl:leading-tight">
                AVINASH
              </span>
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron text-primary tracking-tight leading-none xl:leading-tight">
                DASARI
              </span>
            </motion.div>
          </div>
          
          {/* Wave Animation for Subtitle */}
          <div className="overflow-hidden mb-8 mt-6 lg:mt-10 flex flex-wrap text-lg md:text-3xl font-medium font-sans text-gray-400">
            {Array.from("AI / ML Engineer & Vision Developer").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.03, // Staggered wave timing
                  ease: "easeOut"
                }}
                className={letter === " " ? "mr-2" : ""}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg text-gray-400 mb-12 max-w-xl leading-relaxed font-light"
          >
            Engineering elegant solutions by bridging the gap between theoretical artificial intelligence models and high-performance real-world industrial applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 items-start"
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 flex items-center gap-3 text-white font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-[0_0_30px_-5px_var(--color-primary)] hover:shadow-[0_0_40px_0px_var(--color-primary)]"
            >
              View Work
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 flex items-center gap-3 text-white font-medium border border-white/20 hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm">
              <Download className="w-5 h-5 text-gray-300" />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Image Profile - Multi-layered Parallax */}
        <motion.div 
          style={{ y: yImage, scale: scaleImage }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          {/* Aesthetic orbiting rings with parallax transforms built-in by parent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-primary/20 animate-[spin_15s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-secondary/20 animate-[spin_20s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] rounded-full border border-accent/10 border-dashed animate-[spin_25s_linear_infinite]" />

          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] bg-background">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <Image
              src="https://i.postimg.cc/1zVqDn0N/1000309709-jpg.jpg" 
              alt="Avinash Dasari"
              width={400}
              height={400}
              priority
              className="object-cover w-full h-full opacity-0 transition-opacity duration-700"
              onLoadingComplete={(img) => img.classList.remove('opacity-0')}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
