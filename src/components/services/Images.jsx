import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import image from "../../assets/loader/1.jpg";
import { ArrowRight } from "lucide-react";
import arrow from "../../assets/Arrow.svg";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Create custom ease
CustomEase.create("softEase", "M0,0 C0.15,0.7 0.2,1 1,1");

const cardData = [
  { title: "Mountain Escape", desc: "Experience nature like never before." },
  { title: "Urban Life", desc: "Discover the beauty of the city." },
  { title: "Ocean Breeze", desc: "Feel the calmness of the waves." },
  { title: "Forest Walk", desc: "Reconnect with the wild." },
  { title: "Forest Walk", desc: "Reconnect with the wild." },
  { title: "Forest Walk", desc: "Reconnect with the wild." },
  { title: "Forest Walk", desc: "Reconnect with the wild." },
];

const Images = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      const fromLeft = index % 2 === 0;

      const pos = {
        x: fromLeft ? "-60%" : "60%",
        y: "90%",
      };

      gsap.fromTo(
        card,
        {
          x: pos.x,
          y: pos.y,
          scale: 0.4,
          opacity: 0,
        },
        {
          x: "0%",
          y: "0%",
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "softEase",
          scrollTrigger: {
            trigger: card,
            start: "top 120%",
            // markers: false,
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
      <TextMaskReveal
        className="uppercase text-white text-center pb-12 md:pb-16 lg:pb-20"
        splitByWord
        fontSize="text-4xl md:text-5xl lg:text-6xl"
        text="Development Projects"
      />
      <div className="grid grid-cols-1  md:grid-cols-2 gap-10 ">
        {cardData.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative overflow-hidden group cursor-pointer rounded-2xl   "
          >
            {/* Image */}
            <img
              src={image}
              alt={item.title}
              className="w-full h-120 object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <h2 className="text-white text-xl font-semibold mb-1">
                {item.title}
              </h2>
              <p className="text-white/80 text-sm mb-3">{item.desc}</p>

              <button className="py-2 gap-2 text-start flex justify-start items-center text-white rounded-lg font-medium transition">
                <img
                  className="opacity-0 -translate-x-20 transition-all -mt-3 duration-500 origin-left group-hover:opacity-100 group-hover:translate-x-0 rotate-45 size-5"
                  src={arrow}
                  alt=""
                />
                <h1 className=" -translate-x-7 transition-all duration-500 origin-left  group-hover:translate-x-0">
                  Explore
                </h1>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
