"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Send } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailSend = () => {
    if (!name || !message) return;

    const emailSubject = subject || "New Inquiry via Portfolio";
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:avinash9948733795@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppSend = () => {

    // Format the WhatsApp message using bold markdown
    const text = `*New Inquiry via Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject || 'No Subject'}\n\n*Message:*\n${message}`;
    
    // Redirect to WhatsApp with pre-filled text
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919948733795?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative z-10 w-full bg-background border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="text-secondary font-orbitron tracking-widest uppercase text-sm font-semibold mb-3 block">
            Communication
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-panel p-5 sm:p-8 h-full flex flex-col justify-between">
              <div className="mb-6 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Let&apos;s Connect</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                  I am actively seeking new engineering opportunities. Whether you have a specific inquiry or just want to say hi, my inbox is always open.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <a href="mailto:avinash9948733795@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 font-medium">Email</span>
                    <span className="text-white group-hover:text-primary transition-colors text-sm">avinash9948733795@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+919948733795" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-accent/20 group-hover:text-accent transition-colors text-gray-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 font-medium">Phone</span>
                    <span className="text-white group-hover:text-accent transition-colors text-sm">+91 99487 33795</span>
                  </div>
                </a>

                <a href="https://linkedin.com/in/dasari-avinash" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2] transition-colors text-gray-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 font-medium">LinkedIn</span>
                    <span className="text-white group-hover:text-[#0A66C2] transition-colors text-sm">linkedin.com/in/dasari-avinash</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3"
          >
            <div className="glass-panel p-5 sm:p-8 h-full">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Engineering Role Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors resize-y"
                    placeholder="Hello Avinash, let's discuss..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-2">
                  <button 
                    type="button" 
                    onClick={handleEmailSend}
                    className="px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-3 text-white font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Send via Email
                    <Mail className="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsAppSend}
                    className="px-6 py-3 sm:px-8 sm:py-4 flex items-center justify-center gap-3 text-white font-medium bg-[#25D366] hover:bg-[#1DA851] rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Send via WhatsApp
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
