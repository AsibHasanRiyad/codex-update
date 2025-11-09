"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DevCard from "./DevCards";

gsap.registerPlugin(ScrollTrigger);

const devData = [
  {
    title: "Frontend Development",
    icon: "⚛️",
    image: "/modern-web-interface-coding.jpg",
    description:
      "Build interactive user interfaces with React, Vue, and modern JavaScript frameworks.",
    points: [
      "Responsive Design",
      "State Management",
      "Performance Optimization",
      "Accessibility (a11y)",
    ],
    buttonText: "Explore Frontend",
  },
  {
    title: "Backend Development",
    icon: "🔧",
    image: "/server-infrastructure-backend.jpg",
    description:
      "Create robust APIs and server infrastructure with Node.js, Python, and more.",
    points: [
      "RESTful APIs",
      "Database Design",
      "Authentication & Security",
      "Cloud Deployment",
    ],
    buttonText: "Explore Backend",
  },
  {
    title: "Full Stack Development",
    icon: "🚀",
    image: "/full-stack-development-architecture.jpg",
    description:
      "Master the complete development cycle from UI to server infrastructure.",
    points: [
      "End-to-End Development",
      "DevOps & CI/CD",
      "Scalability",
      "System Design",
    ],
    buttonText: "Explore Full Stack",
  },
  {
    title: "Web Design",
    icon: "🎨",
    description:
      "Create stunning visual experiences with modern design principles.",
    image: "/web-design-ui-ux-aesthetic.jpg",
    points: [
      "UI/UX Design",
      "Design Systems",
      "Typography & Color",
      "Animation & Interaction",
    ],
    buttonText: "Explore Design",
  },
  {
    title: "DevOps & Infrastructure",
    icon: "☁️",
    image: "/cloud-infrastructure-deployment.jpg",
    description:
      "Deploy and manage applications at scale with modern cloud solutions.",
    points: [
      "Container Orchestration",
      "Infrastructure as Code",
      "Monitoring & Logging",
      "Microservices",
    ],
    buttonText: "Explore DevOps",
  },
  {
    title: "Mobile Development",
    icon: "📱",
    image: "/mobile-app-development-crossplatform.jpg",
    description:
      "Build powerful mobile applications for iOS and Android platforms.",
    points: [
      "React Native",
      "Native Development",
      "Cross-Platform Apps",
      "Mobile Performance",
    ],
    buttonText: "Explore Mobile",
  },
];

export default function DevCardsSection() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: -container.offsetWidth * (devData.length - 1),
        duration: devData.length * 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: `+=${container.offsetWidth * devData.length}`,
          scrub: 1,
          markers: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-foreground">
      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-8 pb-8 px-8 text-center bg-background/95 backdrop-blur-sm border-b border-white/5">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
          Software Development
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Master the complete journey of modern software development with
          cutting-edge technologies
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden pt-32">
        <div ref={cardsContainerRef} className="flex h-full gap-0 w-max">
          {devData.map((dev, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center p-8"
            >
              <div className="w-full max-w-4xl h-full">
                <DevCard {...dev} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
        {devData.map((_, index) => (
          <div
            key={index}
            className="h-1.5 rounded-full bg-white/20 transition-all duration-300"
            style={{
              width: "8px",
            }}
          />
        ))}
      </div>

      {/* Spacer for scroll */}
      <div className="h-screen" />
    </div>
  );
}
