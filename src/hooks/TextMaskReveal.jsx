/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function TextMaskReveal({
  text = "",
  fontSize = "text-[5vw]",
  className = "",
  threshold = 0.75,
  delayPerItem = 0.075,
  splitByWord = false,
  lineHeight = "leading-tight",
  startDelay = 0,
  shouldAnimate = false,
}) {
  const items = splitByWord ? text.split(" ") : text.split("\n");

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0%",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: startDelay + delayPerItem * i,
      },
    }),
  };

  // inView still works, but used only when shouldAnimate = false
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  // FINAL logic:
  const trigger = shouldAnimate ? true : inView;

  return (
    <div
      ref={ref}
      className={`${fontSize} ${lineHeight} font-bold ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden inline-block">
          <motion.span
            custom={index}
            variants={animation}
            initial="initial"
            animate={trigger ? "enter" : ""}
            className="inline-block"
          >
            {item}
          </motion.span>

          {splitByWord && index < items.length - 1 && <span>&nbsp;</span>}
        </div>
      ))}
    </div>
  );
}
