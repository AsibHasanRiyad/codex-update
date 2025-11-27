/* eslint-disable react-refresh/only-export-components */
import { useRef } from "react";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessCard from "./ProcessCard";
import torus from "../../assets/torus.png";
import { motion } from "framer-motion";
export const processData = [
  {
    step: 1,
    title: "Discover Your Business Needs",
    description:
      "Understand your goals clearly and identify the areas where smart planning can create real growth and impact.",
    services: [
      "Market Research",
      "Audience Analysis",
      "Competitor Insights",
      "Requirement Mapping",
    ],
    image: "",
  },
  {
    step: 2,
    title: "Craft a Tailored Strategy",
    description:
      "We build a strategic roadmap that aligns with your objectives and ensures long-term sustainability and success.",
    services: [
      "Brand Positioning",
      "Content Strategy",
      "SEO Roadmap",
      "Project Planning",
    ],
    image: "",
  },
  {
    step: 3,
    title: "Find Your Ideal Itinfinite",
    description:
      "Get the oars in the water and start rowing. Execution is the single biggest factor in achievement.",
    services: [
      "Digital PR",
      "Technical Operations",
      "Accounting Outsourcing",
      "Brand Strategy",
    ],
    image: "",
  },
  {
    step: 4,
    title: "Execute With Precision",
    description:
      "We transform strategies into action using high-quality execution, modern tools, and efficient workflows.",
    services: [
      "Campaign Management",
      "Development & QA",
      "Automation Setup",
      "Performance Tracking",
    ],
    image: "",
  },
  {
    step: 5,
    title: "Measure, Improve & Scale",
    description:
      "Monitor results, refine your approach, and continuously scale your business with data-driven decisions.",
    services: [
      "Analytics Review",
      "Optimization",
      "Scaling Strategy",
      "Growth Management",
    ],
    image: "",
  },
];

const OurProcess = () => {
  const processSectionRef = useRef(null);
  const processTitleRef = useRef(null);
  const processDetailsRef = useRef(null);

  useGSAP(() => {
    const section = processSectionRef.current;
    const processTitle = processTitleRef.current;
    const processDetails = processDetailsRef.current;

    if (section && processTitle && processDetails) {
      gsap.to(processTitle, {
        scrollTrigger: {
          trigger: section,
          start: "top 6%",
          end: () => `+=${processDetails.offsetHeight - 500}`,
          pin: window.matchMedia("(min-width: 1280px)").matches
            ? processTitle
            : false,
          pinSpacing: false,
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <div className="container mx-auto text-white px-4 md:px-8">
      <div
        ref={processSectionRef}
        className="  gap-12 md:gap-16 lg:gap-20 grid lg:grid-cols-2"
      >
        <div ref={processTitleRef}>
          <h1 className=" text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300">
            Our Process
          </h1>
          <TextMaskReveal
            className="uppercase text-gray-100 text-start "
            splitByWord
            fontSize="text-4xl md:text-5xl lg:text-6xl"
            text="Smart strategy & performance"
          />

          <p className=" text-base md:text-lg  text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            labore accusantium et cum iste aperiam pariatur reiciendis, natus
            nulla alias obcaecati porro expedita enim incidunt, impedit ea,
            consequuntur possimus explicabo.
          </p>
          {/* Torus Image (CENTER + ROTATE XY) */}
          <div className="w-full flex justify-center">
            <motion.img
              src={torus}
              alt="Torus"
              className="size-52 object-contain mt-12"
              initial={{ rotate: 2 }} // start at 2deg
              animate={{ rotate: 150 }} // end at 360deg + 2deg for smooth loop
              transition={{
                duration: 40, // 50 seconds
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </div>
        </div>
        <div
          className=" space-y-12 md:space-y-16 lg:space-y-20"
          ref={processDetailsRef}
        >
          {processData.map((item, i) => (
            <ProcessCard key={i} {...item} />
          ))}
        </div>
      </div>
      <div className=" relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mt-40 border p-8 rounded-2xl max-w-6xl mx-auto border-gray-700 mb-12 md:mb-16 lg:mb-20">
        <div className=" absolute rounded-2xl border border-gray-500 -top-2.5 left-2.5 w-full h-full inset-0 "></div>
        <div className=" flex items-center  gap-10">
          <p className=" text-4xl md:text-3xl lg:text-4xl font-bold">1000+</p>
          <h3 className=" text-2xl md:text-xl lg:text-2xl font-semibold">
            Website Delivered
          </h3>
        </div>
        <div className=" flex items-center  gap-10">
          <p className=" text-4xl md:text-3xl lg:text-4xl font-bold">10000+</p>
          <h3 className=" text-2xl md:text-xl lg:text-2xl font-semibold">
            Happy Client
          </h3>
        </div>
        <div className=" flex items-center  gap-10">
          <p className=" text-4xl md:text-3xl lg:text-4xl font-bold">10+</p>
          <h3 className=" text-2xl md:text-xl lg:text-2xl font-semibold">
            Country Served
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
