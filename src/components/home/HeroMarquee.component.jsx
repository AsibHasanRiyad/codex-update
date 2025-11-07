export default function HeroMarquee({ items }) {
  return (
    <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm py-4 overflow-hidden">
      <div
        className="
          flex
          whitespace-nowrap
          animate-marquee
        "
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: "marquee 30s linear infinite",
        }}
      >
        {/* First Loop */}
        {items.map((service, index) => (
          <span
            key={`first-${index}`}
            className="inline-flex items-center mx-6 text-white/60 text-sm md:text-base font-medium uppercase tracking-wider hover:text-white transition-colors duration-300 cursor-pointer"
          >
            {service}
          </span>
        ))}

        {/* Duplicate Loop */}
        {items.map((service, index) => (
          <span
            key={`second-${index}`}
            className="inline-flex items-center mx-6 text-white/60 text-sm md:text-base font-medium uppercase tracking-wider hover:text-white transition-colors duration-300 cursor-pointer"
          >
            {service}
          </span>
        ))}
      </div>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
