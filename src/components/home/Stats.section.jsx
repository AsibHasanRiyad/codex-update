import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const card1Ref = useRef();
  const card2Ref = useRef();
  const card3Ref = useRef();

  useGSAP(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;

    // ----- Title Section Pin -----
    ScrollTrigger.create({
      trigger: container,
      start: "top 10%",
      end: "bottom center",
      pin: title,
      pinSpacing: false,
      //   markers: true,
    });

    // ----- Cards Movement -----
    const gap = 100;
    const h1 = card1.offsetHeight + gap;
    const h2 = card2.offsetHeight + gap;

    const totalScroll = h1 + h2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card1,
        start: "top 40%",
        end: `+=${totalScroll + 100}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    });

    tl.to(card2, { y: -h1, ease: "none" }, 0);
    tl.to(card3, { y: -(h1 + h2), ease: "none" }, h2 / (h1 + h2 + 80));
  });

  return (
    <div ref={containerRef} className="relative ">
      {/* Title Section */}
      <div
        ref={titleRef}
        className="text-5xl px-4 md:px-8 my-16 lg:my-32 text-white text-center"
      >
        <TextMaskReveal
          splitByWord={true}
          className=" uppercase italic"
          fontSize=" text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl"
          text="Committed to  results"
        />
      </div>

      {/* Cards Section */}
      <div className="relative space-y-20">
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className=" h-20 md:h-24 lg:h-32 flex items-center justify-center bg-white"
          style={{ transform: "rotate(3deg)" }}
        >
          <h2 className=" text-2xl md:text-4xl lg:text-5xl font-bold text-black">
            30+ Innovative team members
          </h2>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className="h-20 md:h-24 lg:h-32 flex items-center justify-center bg-emerald-500"
          style={{ transform: "rotate(-3deg)" }}
        >
          <h2 className=" text-2xl md:text-4xl lg:text-5xl font-bold text-black">
            50+ Completed projects
          </h2>
        </div>

        {/* Card 3 */}
        <div
          ref={card3Ref}
          className="h-20 md:h-24 lg:h-32 flex items-center justify-center bg-blue-400"
          style={{ transform: "rotate(3deg)" }}
        >
          <h2 className=" text-2xl md:text-4xl lg:text-5xl font-bold text-black">
            4 Years of experience
          </h2>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Stats;
