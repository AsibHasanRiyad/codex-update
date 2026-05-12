# BeamCircle Responsive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `BeamCircle` hero section's orbital animation responsive to both viewport width and height so the largest orbit's top arc always clears the text block; desktop appearance stays equivalent to today; the section grows only when even a minimum-size orbit cannot fit one viewport.

**Architecture:** Extract responsive math into a pure helper module (`beamCircle.config.js`) that returns `{ size, bottomOffsetPct, sectionMinHeight }` from `(viewportWidth, viewportHeight)` using a breakpoint table. `BeamCircle.jsx` consumes this via a single `viewport` state, applies derived values to JSX with inline styles, and uses `min-h-dvh` plus dynamic `style.minHeight` for section growth. No DOM measurement, no animation rewrite.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 4, vanilla JavaScript ES2024. Project has no test framework — verification is by inline node sanity-check (for the pure function) plus manual cross-viewport check in the dev server.

**Reference spec:** `docs/superpowers/specs/2026-05-13-beamcircle-responsive-design.md`

**No git commits during execution** (per user instruction).

---

## File Structure

- **Create:** `src/components/ui/beamCircle.config.js` — pure module: constants, `getViewport()`, `getOrbitConfig()`.
- **Modify:** `src/components/ui/BeamCircle.jsx` — consume the new module, refactor state, update JSX.

The math is extracted from the JSX so the component file stays focused on rendering, and the pure function can be sanity-checked in isolation.

---

### Task 1: Create the responsive config module

**Files:**
- Create: `src/components/ui/beamCircle.config.js`

- [ ] **Step 1: Write the config module**

Create `src/components/ui/beamCircle.config.js` with this exact content:

```js
// Pure helpers for BeamCircle responsive sizing.
// See docs/superpowers/specs/2026-05-13-beamcircle-responsive-design.md

export const MIN_SIZE = 150;
export const PADDING = 16;                // matches `p-4` on orbit wrapper
export const TOP_PAD = 40;                // matches `pt-10` on text block
export const CLEARANCE = 24;              // gap between text bottom and topmost arc
export const MAX_RADIUS_FACTOR = 4.9 / 2; // largest orbit radius / size (= 2.45)

// Upward extent of orbit system above wrapper bottom = halfSize (size/2) + maxRadius (size * MAX_RADIUS_FACTOR)
const ARC_UP_FACTOR = MAX_RADIUS_FACTOR + 0.5; // = 2.95

// Each row applies when viewport.w < maxW. Last row is the catch-all.
const BREAKPOINTS = [
  { maxW: 640,      textH: 240, maxSize: 240, offsetPct: 0.40 },   // sm
  { maxW: 1024,     textH: 260, maxSize: 280, offsetPct: 0.40 },   // md
  { maxW: 1920,     textH: 260, maxSize: 300, offsetPct: 1 / 3 },  // lg
  { maxW: Infinity, textH: 260, maxSize: 360, offsetPct: 1 / 3 },  // xl ultra-wide
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
```

- [ ] **Step 2: Sanity-check the math via inline node**

Run:

```bash
node --input-type=module -e "
import { getOrbitConfig } from './src/components/ui/beamCircle.config.js';
const cases = [
  ['1920x1080', 1920, 1080],
  ['1440x900',  1440, 900],
  ['1440x720',  1440, 720],
  ['1024x768',  1024, 768],
  ['768x1024',   768, 1024],
  ['375x667',    375, 667],
  ['667x375',    667, 375],
];
for (const [label, w, h] of cases) {
  console.log(label.padEnd(10), getOrbitConfig(w, h));
}
"
```

Expected output (allow ±1px rounding):

```
1920x1080  { size: 360, bottomOffsetPct: 0.3333..., sectionMinHeight: 0 }
1440x900   { size: 291.53, bottomOffsetPct: 0.3333..., sectionMinHeight: 0 }
1440x720   { size: 210.17, bottomOffsetPct: 0.3333..., sectionMinHeight: 0 }
1024x768   { size: 231.86, bottomOffsetPct: 0.3333..., sectionMinHeight: 0 }
768x1024   { size: 280, bottomOffsetPct: 0.40, sectionMinHeight: 0 }
375x667    { size: 208.07, bottomOffsetPct: 0.40, sectionMinHeight: 0 }
667x375    { size: 150, bottomOffsetPct: 0.40, sectionMinHeight: 559 }
```

Notes on the boundary cases:
- `1024×768`: at exactly w=1024, the `w < bp.maxW` strict-less-than rule places it in the `lg` row (offsetPct=1/3, textH=260), not `md`. This is correct: Tailwind's `lg:` utilities also activate at ≥1024.
- `667×375`: w=667 places it in the `md` row (640 ≤ w < 1024, textH=260), not `sm`. Phone-landscape at 667 width uses md responsive font sizes.

If output mismatches by more than ±1px on size or sectionMinHeight, re-check the constants in `beamCircle.config.js` against the spec.

---

### Task 2: Refactor `BeamCircle.jsx` to consume the config module

**Files:**
- Modify: `src/components/ui/BeamCircle.jsx`

- [ ] **Step 1: Update imports**

Open `src/components/ui/BeamCircle.jsx`. Replace the import block at the top (lines 1-13) with:

```jsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Sun,
  Smartphone,
  BrainCircuit,
  Cloud,
  Home,
  Palette,
  Code,
  Megaphone,
} from "lucide-react";
import { TextMaskReveal } from "../../hooks/TextMaskReveal";
import { useInView } from "framer-motion";
import { getViewport, getOrbitConfig } from "./beamCircle.config";
```

(`Sun` is in the original import block even though unused; leave it as-is to minimize unrelated diffs.)

- [ ] **Step 2: Replace the component signature and state**

Find the component signature on line 123:

```jsx
const BeamCircle = ({ size = 300, orbits: customOrbits }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
```

Replace with:

```jsx
const BeamCircle = ({ size: sizeProp, orbits: customOrbits }) => {
  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    let rafId = 0;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setViewport(getViewport()));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);
```

Changes:
- `size = 300` → `size: sizeProp` (no default; we derive it below)
- `screenWidth` state → `viewport` state with `{ w, h }`
- `useState(window.innerWidth)` → `useState(getViewport)` (lazy initializer, SSR-safe)
- Resize handler now throttled via `requestAnimationFrame`

- [ ] **Step 3: Derive size, bottomOffsetPct, sectionMinHeight**

Immediately after the `useEffect` block (replaces lines 130-142, the `orbitsData` useMemo), insert the config derivation **before** the existing `orbitsData` useMemo:

```jsx
  const { size: derivedSize, bottomOffsetPct, sectionMinHeight } = useMemo(
    () => getOrbitConfig(viewport.w, viewport.h),
    [viewport]
  );
  const size = sizeProp ?? derivedSize;

  const orbitsData = useMemo(() => {
    return (customOrbits || defaultOrbits).map((orbit) => {
      let endAngle = orbit.endAngleLg;

      if (viewport.w < 640) {
        endAngle = orbit.endAngleSm;
      } else if (viewport.w < 1024) {
        endAngle = orbit.endAngleMd;
      }

      return { ...orbit, endAngle };
    });
  }, [customOrbits, viewport.w]);
```

Changes:
- New `useMemo` for derived config.
- `size` is now a local variable that prefers an external prop, falling back to the derived value.
- The existing `orbitsData` useMemo body is unchanged in shape but now reads `viewport.w` instead of `screenWidth`. Width buckets (640, 1024) match the breakpoint thresholds in the config module — keep them in sync.

- [ ] **Step 4: Update the section container to `min-h-dvh` with dynamic minHeight**

Find the outermost return JSX (around line 157-161):

```jsx
    <div
      ref={ref}
      className="relative w-screen flex justify-center h-dvh bg-primary overflow-hidden"
    >
```

Replace with:

```jsx
    <div
      ref={ref}
      className="relative w-screen flex justify-center min-h-dvh bg-primary overflow-hidden"
      style={sectionMinHeight ? { minHeight: sectionMinHeight } : undefined}
    >
```

Changes:
- `h-dvh` → `min-h-dvh` (allows growth)
- Inline `style.minHeight` is applied only when the config returned a non-zero value (extreme cramped viewports). On normal viewports `style` is `undefined`, so only the `min-h-dvh` class applies.

- [ ] **Step 5: Make the orbit wrapper bottom offset dynamic**

Find the orbit section wrapper (around line 188):

```jsx
      {/* --- Orbit Section --- */}
      <div className="absolute -bottom-[40%] lg:-bottom-1/3 transform -translate-x-1/2 left-1/2 p-4 bg-transparent">
```

Replace with:

```jsx
      {/* --- Orbit Section --- */}
      {/* `bottom` is derived per viewport; keep `p-4` to match PADDING constant in beamCircle.config.js */}
      <div
        className="absolute transform -translate-x-1/2 left-1/2 p-4 bg-transparent"
        style={{ bottom: `${-bottomOffsetPct * 100}%` }}
      >
```

Changes:
- Drop the static Tailwind `-bottom-[40%] lg:-bottom-1/3` classes.
- Apply `bottom` inline with the value from `getOrbitConfig`. Negative percent is computed via `-bottomOffsetPct * 100`. Percentage resolves against the section's actual height (which may be `min-h-dvh` expanded by `sectionMinHeight`), keeping geometry consistent.

- [ ] **Step 6: Add a comment documenting the resize/animation behavior**

Above the `useEffect` that sets `animate` (around line 150), insert a one-line comment:

```jsx
  // The orbit keyframes are size/breakpoint-dependent. Resize that changes `size` or crosses a width
  // breakpoint may restart the entry animation; acceptable since resize during view is rare.
  useEffect(() => {
    if (isInView) {
      setAnimate(true);
    }
  }, [isInView]);
```

---

### Task 3: Manual cross-viewport verification

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev
```

Expected: Vite prints a `Local:` URL (usually `http://localhost:5173`). Open it.

- [ ] **Step 2: Open Chrome DevTools, switch to Device Mode**

Toggle device mode (Cmd-Shift-M on Mac). Set the device to "Responsive". You'll dial in custom viewport sizes.

- [ ] **Step 3: Walk through the viewport matrix**

For each viewport below, set the device dimensions and scroll the page until `BeamCircle` is in view. Verify all three checks pass.

| W × H        | Expected `size` | Expected behavior |
|--------------|----------------|-------------------|
| 1920 × 1080  | 360 (capped)   | Orbits look slightly larger than current desktop; topmost arc clears all text |
| 1440 × 900   | ~292           | Matches current desktop look |
| 1440 × 720   | ~210           | Orbits visibly smaller than current; text clear |
| 1366 × 768   | ~241           | Orbits scaled; text clear |
| 1024 × 768   | 280 (width-cap)| Tablet portrait; text clear |
| 768 × 1024   | 280 (width-cap)| Tablet landscape rotation; text clear |
| 414 × 896    | ~280           | Phone portrait; text clear |
| 375 × 667    | ~208           | Phone portrait; text clear |
| 667 × 375    | 150, section ~545px | Phone landscape; page scrolls a small amount; no overlap |
| 320 × 480    | 150, section ~600px+ | Tiny screen; page scrolls; no overlap |

For each viewport, verify:
1. **No overlap:** the upper arc of the outermost (largest) orbit does not visually touch or cross any text.
2. **Visual balance:** orbit system is neither microscopic nor escaping into adjacent sections (gradient at the bottom of the section still feels intentional).
3. **Animation:** scrolling out and back in re-triggers the entry animation only when `isInView` flips (since `once: true`, only first entry will animate per page load).

- [ ] **Step 4: Resize-during-view sanity check**

With the page in `BeamCircle`'s view at 1440×900, drag the DevTools viewport down to 1440×600, then back to 1440×900.

Expected: layout updates smoothly, orbit size shrinks then grows, no console errors. Animation may restart — that's documented as acceptable.

- [ ] **Step 5: Confirm `Home.jsx` still renders correctly**

Hard-refresh the page. Verify the page below `BeamCircle` (`HomeVideo`, `DevelopmentProject`, `Stats`, etc.) is unchanged. On cramped viewports (e.g., 667×375), the section will be ~545px tall instead of viewport height, so the next section starts farther down — that's expected and intended.

- [ ] **Step 6: Stop the dev server**

`Ctrl-C` in the terminal.

---

## Self-Review

**Spec coverage:**
- Decisions 1–5 from the spec → implemented via `getOrbitConfig` + JSX wiring (Tasks 1–2). ✓
- Geometry formula → encoded in `getOrbitConfig` with `ARC_UP_FACTOR = MAX_RADIUS_FACTOR + 0.5`. ✓
- Breakpoint table → exact match (Task 1 Step 1). ✓
- Section growth → `sectionMinHeight` applied via inline `style.minHeight` (Task 2 Step 4). ✓
- `min-h-dvh` policy → Task 2 Step 4. ✓
- Dynamic `bottom` offset → Task 2 Step 5. ✓
- External `size` prop override (no default) → Task 2 Steps 2–3. ✓
- Resize throttling via `rAF` → Task 2 Step 2. ✓
- SSR-safe initial state → `useState(getViewport)` lazy initializer + `FALLBACK_VIEWPORT`. ✓
- Animation restart documentation → Task 2 Step 6 comment. ✓
- Manual viewport testing → Task 3. ✓

**Type / name consistency:**
- `getViewport`, `getOrbitConfig`, `MIN_SIZE`, `MAX_RADIUS_FACTOR`, `ARC_UP_FACTOR`, `bottomOffsetPct`, `sectionMinHeight` — used identically in module definition and in `BeamCircle.jsx` consumption. ✓
- Width-breakpoint thresholds (640, 1024) match between `pickBreakpoint` in the config module and the `orbitsData` `endAngle` resolution in `BeamCircle.jsx`. ✓

**Placeholders:** none.
