import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
  Smartphone,
  Server,
  Cloud,
  Globe,
  ShoppingCart,
  Code,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";

const services = [
  { id: 1, label: "Web Development", icon: <Code size={28} />, span: "md:col-span-2" },
  { id: 2, label: "Custom Software", icon: <Smartphone size={28} />, span: "md:col-span-1" },
  { id: 3, label: "Ecommerce", icon: <ShoppingCart size={28} />, span: "md:col-span-1" },
  { id: 4, label: "IT Infrastructure", icon: <Server size={28} />, span: "md:col-span-2" },
  { id: 5, label: "Cloud Hosting", icon: <Cloud size={28} />, span: "md:col-span-1" },
  { id: 6, label: "Digital Marketing", icon: <Megaphone size={28} />, span: "md:col-span-2" },
];

const HeroInteractive = () => {
  const containerRef = useRef(null);
  
  // Smooth spring physics for mouse tracking
  const mouseX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030712] flex flex-col items-center justify-center overflow-hidden py-24 px-6">
      
      {/* 1. ANIMATED AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
          className="absolute w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-50"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* 2. HEADER SECTION */}
        <header className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-widest uppercase"
          >
            The Future of Deployment
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            DEVELOP. <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">DEPLOY.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            High-performance digital solutions that power business growth. 
            From concept to scale, we build the infrastructure of tomorrow.
          </motion.p>
        </header>

        {/* 3. INTERACTIVE BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between transition-all hover:border-blue-500/50 hover:bg-white/[0.07] ${service.span}`}
    >
      {/* Card Inner Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
      
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl bg-white/5 text-blue-400 group-hover:scale-110 group-hover:text-white transition-transform duration-300">
          {service.icon}
        </div>
        <ArrowUpRight className="text-white/20 group-hover:text-blue-400 transition-colors" size={20} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors">
          {service.label}
        </h3>
        <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to explore solution →
        </p>
      </div>
    </motion.div>
  );
};

export default HeroInteractive;