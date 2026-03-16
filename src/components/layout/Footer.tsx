"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-orbitron font-bold text-lg tracking-wider text-white">
            AVINASH<span className="text-primary">.AI</span>
          </span>
          <p className="text-gray-500 text-sm mt-2">
            Designed & Built internally by Avinash Dasari
          </p>
        </motion.div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
