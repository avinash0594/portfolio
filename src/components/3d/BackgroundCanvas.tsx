"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleBackground } from "./ParticleBackground";
import { useScroll, useTransform, motion } from "framer-motion";

export function BackgroundCanvas() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ y }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <fog attach="fog" args={["#05050A", 1, 8]} />
        <ParticleBackground />
      </Canvas>
    </motion.div>
  );
}
