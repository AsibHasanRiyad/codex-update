"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function DevCard({
  title,
  icon,
  image,
  description,
  points,
  buttonText,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Card Container */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/8 hover:shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-background/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-center p-12 md:p-20">
          <div className="max-w-2xl">
            {/* Icon and Title */}
            <div className="mb-8">
              <div className="mb-6 text-6xl md:text-7xl">{icon}</div>
              <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="mb-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Points List */}
            <div className="space-y-3 mb-12">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white/40 flex-shrink-0" />
                  <span className="text-lg text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="group/btn inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base font-medium text-foreground transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-lg">
              {buttonText}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute -inset-full top-0 h-full w-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
