"use client";

import { motion } from "framer-motion";
import { Bot, Eye, Factory, Cpu, Server, Layout } from "lucide-react";

const services = [
  {
    title: "AI & Machine Learning",
    description: "Developing custom predictive models and data-driven intelligent systems architecture.",
    icon: <Bot className="w-8 h-8 text-primary" />
  },
  {
    title: "Computer Vision Systems",
    description: "Building object detection, tracking, and image analysis pipelines for critical needs.",
    icon: <Eye className="w-8 h-8 text-secondary" />
  },
  {
    title: "Industrial Vision Inspection",
    description: "Deploying high-accuracy real-time defect detection systems natively in manufacturing.",
    icon: <Factory className="w-8 h-8 text-accent" />
  },
  {
    title: "IoT System Development",
    description: "Integrating hardware sensors with software backends via Modbus/TCP standards.",
    icon: <Cpu className="w-8 h-8 text-primary" />
  },
  {
    title: "Python Backend Development",
    description: "Creating robust REST APIs and scalable backend logic using Django frameworks.",
    icon: <Server className="w-8 h-8 text-secondary" />
  },
  {
    title: "Web Development",
    description: "Crafting modern, responsive, and elegant user interfaces tailored to your brand.",
    icon: <Layout className="w-8 h-8 text-accent" />
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative z-10 w-full bg-background/50 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="text-primary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
            Service Offerings
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-8 flex flex-col items-center text-center group hover:glass-panel-hover"
            >
              <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold font-orbitron text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
