/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import arrow from "../../assets/Arrow.svg";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";

const ProcessCard = ({ step, title, description, services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-white flex gap-4 "
    >
      <div>
        <div className=" relative">
          <img
            src={arrow}
            className=" size-9  rounded-full border-gray-700 border p-2.5 rotate-45 mt-1"
            alt=""
          />
          <div className=" absolute rounded-full border border-gray-500 -top-1 left-0.5 w-full h-full inset-0 "></div>
        </div>
      </div>
      <div className="space-y-4">
        <TextMaskReveal
          className="uppercase text-gray-100 text-start "
          splitByWord
          fontSize="text-2xl md:text-3xl lg:text-4xl"
          text={title}
        />

        <p className="text-white/70 text-base leading-relaxed max-w-lg">
          {description}
        </p>

        {/* Services */}
        <ul className="grid grid-cols-2 gap-y-2.5 text-white/90">
          {services.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <img src={arrow} className="size-3 opacity-70" alt="" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ProcessCard;
