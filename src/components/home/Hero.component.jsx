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
// import heroVideo from "../../assets/hero_video.mp4";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ColorBends from "../ui/ColorBends";
export default function Hero() {
  const services = [
    "Web Development",
    "Custom Software",
    "Ecommerce",
    "Mobile Apps",
    "Digital Marketing",
    "Cloud Hosting",
    "VPS Solutions",
    "Domain Registration",
    "Web Hosting",
    "IT Infrastructure",
  ];

  return (
    <div className=" relative w-screen min-h-screen  flex flex-col justify-between overflow-hidden bg-primary">
      {/* <LightRays /> */}
      {/* <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      /> */}

      <ColorBends
        colors={["#1e293b", "#0f172a"]}
        rotation={45}
        speed={0.6}
        scale={0.5}
        frequency={2}
        warpStrength={1.01}
        mouseInfluence={0}
        parallax={0}
        noise={0.4}
        transparent
        className={"absolute top-0 h-full w-full"}
      />

      {/* <ColorBends
        // A deep, desaturated blue and a very dark grey-blue
        colors={["#1e293b", "#0f172a"]}
        rotation={45}
        speed={0.05} // Slower is usually classier
        scale={0.8} // Larger scale makes the "bends" smoother
        frequency={1.2}
        warpStrength={0.5} // Lower warp prevents "spiky" artifacts
        noise={0.1}
        transparent
        className="absolute top-0 h-full w-full opacity-60" // Lower opacity helps text pop
      /> */}

      <div className="absolute  right-[12%] z-20 top-[22%] lg:top-[20%]">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
          className=" size-24 md:size-40  lg:size-32"
          src={movingSvg}
          alt=""
        />
      </div>
      {/* Main content */}
      <div className="relative z-40 flex-1 flex items-center">
        <div className="container mx-auto px-4 md:px-8 pb-12 lg:pb-16 pt-24 lg:pt-32">
          {/* Hero Title */}
          <div className="mb-8 md:mb-12">
            <TextMaskReveal
              splitByWord={true}
              fontSize="text-5xl md:text-7xl 2xl:text-8xl"
              className="font-bold text-white mb-2 uppercase leading-[0.9]"
              text="Digital Solutions "
              delayPerItem={0.08}
            />
            <TextMaskReveal
              splitByWord={true}
              fontSize="text-5xl md:text-7xl 2xl:text-8xl"
              className="font-bold text-white  lg:ml-[15%] uppercase leading-[0.9]"
              text="that Works for You"
              delayPerItem={0.08}
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-12">
            {/* Company Name */}
            <div className="md:col-span-2 flex md:hidden lg:flex items-start">
              <h2 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wide">
                Codex IT
              </h2>
            </div>

            {/* Description & CTA */}
            <div className="md:col-span-6 border-t-2 pt-6 md:pt-8 border-white/20">
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Empowering businesses through innovative digital solutions,
                reliable IT infrastructure, and cutting-edge software
                development. We deliver excellence from concept to deployment,
                helping your business thrive in the digital world.
              </p>

              <button className="group hidden  px-8 py-3 border-2 border-white/30 text-white rounded-full hover:border-2c hover:bg-2c/10 transition-all duration-300 md:flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-2c/25 hover:scale-105 active:scale-95">
                KNOW MORE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats Card */}
            <div className="md:col-span-6 lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 flex justify-between items-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer">
              <div>
                <TextMaskReveal
                  splitByWord={true}
                  fontSize="text-4xl md:text-5xl"
                  className="font-bold text-white mb-2 leading-none"
                  text="60+"
                />
                <TextMaskReveal
                  splitByWord={false}
                  fontSize="text-sm md:text-base"
                  className="text-white/70"
                  text="Projects Delivered"
                />
              </div>
              <div>
                <button
                  className="h-12 w-12 md:h-14 md:w-14 flex justify-center items-center bg-white rounded-full hover:bg-2c hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shadow-lg"
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
