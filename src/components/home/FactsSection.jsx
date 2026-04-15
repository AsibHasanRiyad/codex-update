/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Monitor,
  ShoppingCart,
  Smartphone,
  Megaphone,
  Globe,
  Server,
  Cloud,
  HardDrive,
  Network,
} from "lucide-react";
import { servicesData as serviceDetails } from "../../data/services";
import bg_video from "../../assets/video/card_bg.mp4";

const icons = [
  Code,
  Monitor,
  ShoppingCart,
  Smartphone,
  Megaphone,
  Globe,
  Server,
  Cloud,
  HardDrive,
  Network,
];

const serviceCards = serviceDetails.map((service, i) => ({
  slug: service.slug,
  title: service.header.title,
  subtitle: service.processTagline,
  description: service.header.subtitle,
  Icon: icons[i] || Code,
}));

// Bento grid layout pattern — defines row span for each card
// Pattern: 2 tall, 1 short, 1 short, 2 tall … gives visual rhythm
const getSpan = (index) => {
  const pattern = [2, 1, 1, 2, 1, 1, 2, 1, 1, 2];
  return pattern[index % pattern.length];
};

const FactsSection = () => {
  return (
    <section className="relative bg-primary py-16 md:py-24 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <video
          playsInline
          muted
          autoPlay
          loop
          className="w-full h-full object-cover"
          src={bg_video}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-2c text-sm font-medium uppercase tracking-widest"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mt-3"
          >
            Our Services
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(160px,1fr)] gap-4 md:gap-5">
          {serviceCards.map((service, index) => {
            const span = getSpan(index);
            const Icon = service.Icon;
            const isTall = span === 2;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${
                  isTall ? "row-span-2" : "row-span-1"
                }`}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className={`group relative block h-full rounded-2xl border border-gray-700/50 bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-2c/40 hover:bg-card/50`}
                >
                  {/* Gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-2c/0 via-2c/0 to-2c/0 group-hover:from-2c/5 group-hover:via-transparent group-hover:to-2c/5 transition-all duration-500" />

                  <div
                    className={`relative z-10 h-full flex flex-col ${
                      isTall ? "p-6 md:p-8" : "p-5 md:p-6"
                    }`}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-2c/10 border border-2c/20 flex items-center justify-center mb-4 group-hover:bg-2c/20 transition-colors">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-2c" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-2 group-hover:text-2c transition-colors">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-2c/80 text-xs font-medium uppercase tracking-wider mb-3">
                      {service.subtitle}
                    </p>

                    {/* Description — only on tall cards */}
                    {isTall && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 flex-1">
                        {service.description}
                      </p>
                    )}

                    {/* Learn more */}
                    <div className="mt-auto pt-4">
                      <span className="text-sm text-gray-500 group-hover:text-2c transition-colors flex items-center gap-1.5">
                        Learn more
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
