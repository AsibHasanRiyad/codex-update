// Pure helpers for BeamCircle responsive sizing.
// See docs/superpowers/specs/2026-05-13-beamcircle-responsive-design.md

export const MIN_SIZE = 150;
export const PADDING = 16;                // matches `p-4` on orbit wrapper
export const TOP_PAD = 40;                // matches `pt-10` on text block
export const CLEARANCE = 24;              // gap between text bottom and topmost arc
// MUST equal max(orbit.radiusFactor) / 2 across defaultOrbits in BeamCircle.jsx
export const MAX_RADIUS_FACTOR = 5.7 / 2;

// Upward extent of orbit system above wrapper bottom = halfSize (size/2) + maxRadius (size * MAX_RADIUS_FACTOR)
const ARC_UP_FACTOR = MAX_RADIUS_FACTOR + 0.5;

// Each row applies when viewport.w < maxW. Last row is the catch-all.
// Width thresholds (640, 1024) MUST stay in sync with the endAngleSm/Md/Lg resolution in BeamCircle.jsx.
const BREAKPOINTS = [
  { maxW: 640,      textH: 240, maxSize: 240, offsetPct: 0.40 },   // sm
  { maxW: 1024,     textH: 260, maxSize: 280, offsetPct: 0.40 },   // md
  { maxW: 1920,     textH: 280, maxSize: 300, offsetPct: 1 / 3 },  // lg  (text-6xl + text-3xl renders ~280px)
  { maxW: Infinity, textH: 280, maxSize: 360, offsetPct: 1 / 3 },  // xl ultra-wide
];

const FALLBACK_VIEWPORT = { w: 1280, h: 800 };

export function getViewport() {
  if (typeof window === "undefined") return FALLBACK_VIEWPORT;
  return { w: window.innerWidth, h: window.innerHeight };
}

function pickBreakpoint(w) {
  for (const bp of BREAKPOINTS) {
    if (w < bp.maxW) return bp;
  }
  return BREAKPOINTS[BREAKPOINTS.length - 1];
}

export function getOrbitConfig(w, h) {
  const bp = pickBreakpoint(w);
  const { textH, maxSize, offsetPct } = bp;

  const maxSizeByHeight =
    (h * (1 + offsetPct) - TOP_PAD - textH - CLEARANCE - PADDING) / ARC_UP_FACTOR;

  const size = Math.max(MIN_SIZE, Math.min(maxSize, maxSizeByHeight));

  let sectionMinHeight = 0;
  if (maxSizeByHeight < MIN_SIZE) {
    const requiredH =
      (ARC_UP_FACTOR * MIN_SIZE + PADDING + TOP_PAD + textH + CLEARANCE) /
      (1 + offsetPct);
    sectionMinHeight = Math.ceil(requiredH);
  }

  return { size, bottomOffsetPct: offsetPct, sectionMinHeight };
}
