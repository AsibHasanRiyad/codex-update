/* eslint-disable no-unused-vars */
import {
  Code,
  Smartphone,
  Globe,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import LightRays from "../ui/LightRays";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import movingSvg from "../../assets/Asterisk.svg";
import arrow from "../../assets/Arrow.svg";
export default function Hero() {
  const services = [
    "Web Development",
    "Mobile Apps",
    "AI Solutions",
    "Cloud Services",
    "Digital Marketing",
    "UX/UI Design",
    "DevOps",
    "Cyber Security",
    "IoT",
  ];

  return (
    <div className=" relative w-screen min-h-screen flex flex-col justify-between overflow-hidden bg-primary">
      <LightRays className="absolute h-screen bg-primary left-0 top-0" />
      <div className="absolute right-[12%] z-20 top-[20%]">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className="  size-32"
          src={movingSvg}
          alt=""
        />
      </div>
      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4 md:px-8 pb-12 lg:pb-16 pt-24 lg:pt-32">
          {/* Hero Title */}
          <div className="mb-8 md:mb-12">
            <TextMaskReveal
              splitByWord={true}
              startDelay={7.6}
              fontSize="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl"
              className="font-bold text-white mb-2 uppercase leading-[0.9]"
              text="Crafting Next-Gen "
              delayPerItem={0.08}
            />
            <TextMaskReveal
              splitByWord={true}
              startDelay={7.6}
              fontSize="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl"
              className="font-bold text-white ml-[10%] md:ml-[15%] uppercase leading-[0.9]"
              text="Digital Excellence"
              delayPerItem={0.08}
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-12">
            {/* Company Name */}
            <div className="md:col-span-2 flex items-start">
              <h2 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wide">
                Cedex IT BD
              </h2>
            </div>

            {/* Description & CTA */}
            <div className="md:col-span-6 border-t-2 pt-6 md:pt-8 border-white/20">
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Transforming businesses through innovative digital solutions and
                cutting-edge technology. We deliver excellence in every project,
                combining creativity with technical expertise to help your
                business thrive in the digital age.
              </p>

              <button className="group px-8 py-3 border-2 border-white/30 text-white rounded-full hover:border-emerald-600 hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95">
                KNOW MORE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats Card */}
            <div className="md:col-span-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 flex justify-between items-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer">
              <div>
                <TextMaskReveal
                  splitByWord={true}
                  fontSize="text-4xl md:text-5xl"
                  className="font-bold text-white mb-2 leading-none"
                  text="100+"
                  startDelay={8}
                />
                <TextMaskReveal
                  splitByWord={false}
                  fontSize="text-sm md:text-base"
                  className="text-white/70"
                  text="Projects Delivered"
                  startDelay={8.2}
                />
              </div>
              <div>
                <button
                  className="h-12 w-12 md:h-14 md:w-14 flex justify-center items-center bg-white rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shadow-lg"
                  aria-label="View projects"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Marquee */}
      <div className="relative z-100 border-t border-white/10 bg-white/5 backdrop-blur-sm py-4 overflow-hidden">
        <div className="flex justify-between animate-marquee whitespace-nowrap">
          {/* First set of services */}
          {services.map((service, index) => (
            <span
              key={`first-${index}`}
              className="inline-flex cursor-pointer items-center mx-6 text-white/60 text-sm md:text-base font-medium uppercase tracking-wider hover:text-white transition-colors duration-300"
            >
              {service}
              <div className=" ml-14 w-10">
                <img className=" rotate-45 size-7" src={arrow} alt="" />
              </div>
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {services.map((service, index) => (
            <span
              key={`second-${index}`}
              className="inline-flex items-center mx-6 text-white/60 text-sm md:text-base font-medium uppercase tracking-wider hover:text-white transition-colors duration-300"
            >
              {service}
              <span className="mx-6 ">
                <img src={arrow} alt="" />
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
