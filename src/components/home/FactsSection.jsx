/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg_video from "../../assets/video/card_bg.mp4";
gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title1: "Web",
    title2: "Development",
    subtitle: "Modern, fast & scalable",
    description:
      "We craft high-performance websites, dashboards, and full-scale web apps using the latest technologies—optimized for speed, security, and growth.",
    image: "image",
  },
  {
    title1: "Mobile",
    title2: "Apps",
    subtitle: "iOS & Android",
    description:
      "Beautiful, responsive, and blazing-fast mobile experiences, built using native and cross-platform frameworks tailored to your product.",
    image: "image",
  },
  {
    title1: "Cloud",
    title2: "Services",
    subtitle: "Secure, scalable & automated",
    description:
      "Cloud infrastructure, APIs, automation, CI/CD, and microservices designed to scale effortlessly and run reliably across AWS, GCP, and Azure.",
    image: "image",
  },
  {
    title1: "Digital",
    title2: "Marketing",
    subtitle: "Data-driven growth",
    description:
      "SEO, ads, content, and marketing funnels engineered to boost visibility and drive conversions using modern analytics and optimization tools.",
    image: "image",
  },
  {
    title1: "UX/UI",
    title2: "Design",
    subtitle: "Beautiful, intuitive experiences",
    description:
      "Stunning interfaces built with user psychology, clarity, and conversion in mind—designed to elevate your brand and simplify interactions.",
    image: "image",
  },
  {
    title1: "Smart",
    title2: "IoT",
    subtitle: "Connected, intelligent systems",
    description:
      "IoT devices, sensor ecosystems, and monitoring dashboards that connect the physical and digital worlds with real-time data and automation.",
    image: "image",
  },
];

const FactsSection = () => {
  const factsRef = useRef([]);
  const mainContainerRef = useRef(null);
  const factsContainerRef = useRef(null);

  useEffect(() => {
    const facts = factsRef.current;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Horizontal scroll animation with faster scrub
        const totalCards = facts.length;

        gsap.to(facts, {
          x: () => {
            const cardWidth = facts[0].offsetWidth;
            const gap = 24;
            const totalWidth = (cardWidth + gap) * totalCards;
            const viewportWidth = window.innerWidth;
            return -(totalWidth - viewportWidth + gap);
          },
          ease: "none",
          scrollTrigger: {
            trigger: factsContainerRef.current,
            start: "center center",
            pin: true,
            pinSpacing: true,
            scrub: 0.3, // Changed from 1 to 0.3 for faster response
            snap: {
              snapTo: 1 / (totalCards - 1), // Snap to each card
              duration: { min: 0.2, max: 0.4 }, // Faster snap
              ease: "power2.inOut",
            },
            end: () => {
              const cardWidth = facts[0].offsetWidth;
              const gap = 24;
              // Reduced multiplier for less scroll distance
              return `+=${(cardWidth + gap) * totalCards * 0.8}`;
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      }, mainContainerRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === factsContainerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen -mt-60 bg-transparent overflow-hidden relative z-10">
      <div ref={mainContainerRef} className=" text-center">
        <div
          ref={factsContainerRef}
          className="overflow-hidden h-screen flex items-center relative"
        >
          <div className="flex w-max factsContainer_sm gap-6 px-6 first:pl-24">
            {servicesData.map((service, index) => (
              <section
                key={index}
                ref={(el) => (factsRef.current[index] = el)}
                id="hero"
                className={`card my-8 lg:w-[calc(50vw-12px)] shrink-0 relative overflow-hidden shadow-md ${
                  index === servicesData.length - 1 ? "mr-[50vw]" : ""
                }`}
              >
                <div className=" absolute inset-0 w-full h-full">
                  <video
                    playsInline
                    muted
                    autoPlay
                    loop
                    className=" w-full rounded-2xl h-full object-cover"
                    src={bg_video}
                  ></video>
                </div>
                <div className=" absolute inset-0 rounded-2xl w-full h-full bg-black/90"></div>
                <div className=" rounded-2xl   container mx-auto">
                  <div className="p-8 md:p-10 lg:p-24 flex flex-col md:flex-row items-start">
                    <div className="w-full  z-10">
                      <p className=" text-gray-200 text-start">
                        {service.subtitle}
                      </p>
                      <h1 className="text-black dark:text-white text-4xl md:text-5xl lg:text-8xl font-semibold text-start  leading-tight">
                        {service.title1}
                        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">
                          {service.title2}
                        </span>
                      </h1>
                      <p className="my-6 text-base md:text-2xl max-w-lg md:max-w-3xl  text-gray-700 text-start dark:text-gray-300 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        {/* <ContactFormButton /> */}
                        <a
                          href="#services"
                          className="btn-secondary text-black dark:text-white"
                        >
                          Learn more
                        </a>
                      </div>
                    </div>

                    {/* Image - hidden on mobile, visible on md and up */}
                    {/* <div className="   w-2/5 absolute right-0 top-0 bottom-0 flex items-center justify-between">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_BDOeBmoJgIDcVbz6Kf1h2fqpgvr5/uMrYbVYunzD2-lMHwTqpjV/public/purple-circle-wave-static.png"
                        alt="Purple Wave"
                        className=" h-fit max-h-min   w-52 lg:w-full md:max-w-[500px]  md:object-contain  md:object-left"
                      />
                    </div> */}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactsSection;
