import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    // Small delay to ensure other ScrollTriggers are set up first
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Title animation
        gsap.to(mainContainerRef.current.querySelector("h2"), {
          scale: 1,
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top center",
            end: "center center",
            scrub: true,
          },
        });

        // Horizontal scroll animation
        gsap.to(facts, {
          xPercent: -100 * (facts.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: factsContainerRef.current,
            start: "center center",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (facts.length - 1),
              duration: 0.3,
              ease: "power1.inOut",
            },
            end: () => `+=${window.innerWidth * (facts.length - 1)}`,
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
          <div className="flex w-max factsContainer_sm">
            {servicesData.map((service, index) => (
              <section
                key={index}
                ref={(el) => (factsRef.current[index] = el)}
                id="hero"
                className="card my-8  w-screen relative overflow-hidden shadow-md"
              >
                <div className="border rounded-2xl  border-white container mx-auto">
                  <div className="p-8 md:p-10 lg:p-24 flex flex-col md:flex-row items-start">
                    <div className="w-full md:w-3/5 z-10">
                      <p>{service.subtitle}</p>
                      <h1 className="text-black dark:text-white text-4xl md:text-5xl lg:text-8xl font-semibold text-start font-medium leading-tight">
                        {service.title1}
                        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">
                          {service.title2}
                        </span>
                      </h1>
                      <p className="my-6 text-base md:text-2xl max-w-3xl  text-gray-700 text-start dark:text-gray-300">
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
                    <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:flex md:items-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_BDOeBmoJgIDcVbz6Kf1h2fqpgvr5/uMrYbVYunzD2-lMHwTqpjV/public/purple-circle-wave-static.png"
                        alt="Purple Wave"
                        className="w-fit h-fit max-h-min  md:object-contain p-28 md:object-left"
                      />
                    </div>
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
