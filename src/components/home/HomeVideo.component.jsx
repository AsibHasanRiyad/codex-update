"use client";

import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import videoSrc from "../../assets/video/newOutput.mp4";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";

gsap.registerPlugin(ScrollTrigger);

const HomeVideo = () => {
  const developmentVideoRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const imageOverlayRef = useRef(null);
  const transitionTextRef = useRef(null);
  const eyebrowRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const video = developmentVideoRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const imageOverlay = imageOverlayRef.current;
    const transitionText = transitionTextRef.current;
    const eyebrow = eyebrowRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (
      !video ||
      !heading ||
      !paragraph ||
      !container ||
      !overlay ||
      !imageOverlay ||
      !transitionText ||
      !eyebrow ||
      !scrollIndicator
    )
      return;

    const transitionTextInner =
      transitionText.querySelectorAll("h2, p, span, div");

    const startValue = isMobile ? "top center" : "center center";
    const endValue = isMobile ? "200% top" : "200% center";

    // Initial positions
    gsap.set(video, { xPercent: 60, yPercent: 55, scale: 1 });
    gsap.set(imageOverlay, { xPercent: 60, yPercent: 55, scale: 1 });
    gsap.set(transitionTextInner, { opacity: 0, y: 50, scale: 0.9 });

    // Keep video paused - we'll control it via currentTime
    video.pause();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: startValue,
        end: endValue,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    video.onloadeddata = () => {
      const stopTime = Math.max(0, video.duration - 5);

      tl
        // Phase 1: Stagger text elements out
        .to(
          eyebrow,
          { y: -100, opacity: 0, ease: "power2.in", duration: 0.2 },
          0
        )
        .to(
          heading,
          { y: -100, opacity: 0, ease: "power2.in", duration: 0.2 },
          0.08
        )
        .to(
          paragraph,
          { y: -100, opacity: 0, ease: "power2.in", duration: 0.2 },
          0.16
        )
        .to(
          scrollIndicator,
          { y: -100, opacity: 0, ease: "power2.in", duration: 0.2 },
          0.24
        )
        // Phase 2: Move video & overlay to center
        .to(
          video,
          {
            xPercent: 0,
            yPercent: 0,
            ease: "power2.inOut",
            duration: 0.8,
            borderRadius: 15,
            border: 0,
            rotate: 0,
          },
          0
        )
        .to(
          imageOverlay,
          {
            xPercent: 0,
            yPercent: 0,
            ease: "power2.inOut",
            duration: 0.8,
            borderRadius: 15,
          },
          0
        )
        // Phase 3: Scrub video frame-by-frame based on scroll (slower)
        .to(
          video,
          {
            currentTime: stopTime,
            ease: "none",
            duration: 1.5, // Increased from 0.4 to make video play slower
          },
          0.8 // Start later, after video reaches center
        )
        // Phase 3b: Scale up while video is playing + fade container to black
        .to(video, { scale: 2.5, ease: "power2.inOut", duration: 0.8 }, 0.8)
        .to(
          imageOverlay,
          { scale: 2.5, ease: "power2.inOut", duration: 0.8 },
          0.8
        )
        .to(
          container,
          { backgroundColor: "#000000", ease: "power2.inOut", duration: 0.8 },
          0.8
        )
        // Phase 4: Continue scaling smoothly to full zoom
        .to(video, { scale: 20, ease: "power2.inOut", duration: 1 }, ">0")
        .to(imageOverlay, { scale: 20, ease: "power2.inOut", duration: 1 }, "<")
        // Phase 5: Fade out video & overlay
        .to(
          [video, overlay, imageOverlay],
          { opacity: 0, ease: "power2.inOut", duration: 0.2 },
          ">0"
        )
        // Phase 6: Reveal transition text
        .to(transitionText, { opacity: 1, duration: 0.5 }, ">0")
        .to(
          transitionTextInner,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
            duration: 1.2,
          },
          "<"
        );
    };

    // Ensure video stays paused during scrubbing
    const handlePlay = () => {
      video.pause();
    };

    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="video-container z-40   relative flex flex-col justify-center items-center w-screen h-screen overflow-hidden"
    >
      {/* Noisy background image */}
      <img
        src="https://img.freepik.com/premium-vector/grain-stippled-gradient-faded-stochastic-dotwork-texture-random-grunge-noise-background-black-dots_497399-682.jpg?semt=ais_hybrid&w=740&q=80"
        alt="noise"
        className="absolute w-full h-full opacity-5 object-cover"
      />

      <div ref={overlayRef} className="absolute bg-primary inset-0 z-0 " />

      {/* Initial Text */}
      <div className="absolute top-20 md:top-32 left-0 right-0 z-10 px-6 md:px-12 container mx-auto">
        <div className="space-y-6">
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-strong/40" />
            <span className="text-xs md:text-sm font-mono text-gray-100 tracking-[0.3em] uppercase">
              Digital Excellence
            </span>
          </div>

          <div
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 leading-[0.9] tracking-tight"
          >
            <TextMaskReveal
              splitByWord
              text="Crafting Digital"
              className="text-strong bg-clip-text bg-linear-to-tr from-strong to-muted"
            />

            <TextMaskReveal
              splitByWord
              text="Excellence"
              className="text-strong"
            />
          </div>

          <p
            ref={paragraphRef}
            className="text-base max-w-2xl 2xl:max-w-3xl md:text-xl lg:text-2xl text-strong/70 leading-relaxed  font-light"
          >
            We transform visionary ideas into extraordinary digital experiences
            through innovative development and cutting-edge design solutions.
          </p>

          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-3 mt-12 opacity-60"
          >
            <ChevronDown className="w-5 h-5 text-strong animate-bounce" />
            <span className="text-xs font-mono text-strong tracking-widest uppercase">
              Scroll to Explore
            </span>
          </div>
        </div>
      </div>

      {/* Video Layer */}
      <video
        ref={developmentVideoRef}
        muted
        playsInline
        preload="auto"
        src={videoSrc}
        className="absolute  w-[35%] h-[35%] 2xl:w-[40%] rotate-6 border-8 border-white drop-shadow-2xl drop-shadow-secondary/30 2xl:h-[40%] object-cover will-change-transform z-20"
      />

      {/* Image Overlay */}
      <div
        ref={imageOverlayRef}
        className="absolute w-[40%] h-[40%] rounded-lg will-change-transform z-25 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1602475063211-3d98d60e3b1f?fm=jpg&q=60&w=3000')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0,
        }}
      />

      {/* Transition Text */}
      <div
        ref={transitionTextRef}
        className="absolute inset-0 flex flex-col justify-center items-center opacity-0 z-30 px-6 bg-primary"
      >
        {/* Noisy background image */}
        <img
          src="https://img.freepik.com/premium-vector/grain-stippled-gradient-faded-stochastic-dotwork-texture-random-grunge-noise-background-black-dots_497399-682.jpg?semt=ais_hybrid&w=740&q=80"
          alt="noise"
          className="absolute w-full h-full opacity-5 object-cover"
        />

        <div className="text-center max-w-6xl space-y-12">
          <div className="flex justify-center mb-8">
            <div className="h-px w-24 bg-white/20" />
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter text-strong">
            OUR
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-tr from-white to-gray-400">
              PROJECTS
            </span>
          </h2>

          <p className="text-lg md:text-2xl lg:text-3xl text-white/50 font-light tracking-wide max-w-2xl mx-auto">
            Discover the innovation we've created
          </p>

          <div className="flex flex-col items-center gap-6 mt-16">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-white/20 rounded-full" />
              <div className="relative w-16 h-24 border border-white/30 rounded-full flex justify-center pt-3">
                <div className="w-1.5 h-3 bg-white rounded-full animate-bounce" />
              </div>
            </div>
            <span className="text-white/60 text-sm font-mono uppercase tracking-[0.3em]">
              Scroll to Explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeVideo;
