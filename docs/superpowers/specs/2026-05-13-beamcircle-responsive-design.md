# BeamCircle Responsive Redesign — Design Spec

**File:** `src/components/ui/BeamCircle.jsx`
**Date:** 2026-05-13
**Status:** Approved design, awaiting implementation plan

## Problem

`BeamCircle` is a hero section featuring a fixed-size orbital animation behind a heading + paragraph text block. The current implementation:

- Hardcodes `size = 300`, so the largest orbit has a fixed ~1470px diameter regardless of viewport.
- Positions the orbit center at `bottom: -40%` (`lg: -1/3`) of the section height.
- Uses `h-dvh` for the section.
- Only reacts to viewport **width** for orbit end-angles, not height.

On short viewports (e.g., laptop windows ~700px tall, phone landscape ~375px tall), the upper arcs of the larger orbits rise into the heading/paragraph area, overlapping the text and breaking the visual hierarchy.

## Goal

Make the orbit system responsive to both viewport width and height so:

1. The topmost arc of the largest orbit always clears the bottom of the text block.
2. The desktop appearance stays equivalent to today at common desktop sizes.
3. The orbit system grows modestly on ultra-wide displays so it doesn't look lost.
4. A minimum visual presence is guaranteed even on extremely cramped viewports, by allowing the section to extend slightly taller than `h-dvh`.
5. Animations, content, and visual style remain unchanged.

## Approved Decisions

| # | Question | Decision |
|---|----------|----------|
| 1 | Scaling strategy on small viewports | **Scale orbit system down** (keep all 7 orbits) |
| 2 | Behavior at desktop and ultra-wide | **Stay at current size (~300) across standard desktops; grow on ultra-wide (≥1920px)** |
| 3 | Clearance rule | **Top arc must clear the entire text block** (heading + paragraph) with a small gap |
| 4 | Section height policy | **`min-h-dvh` with a minimum orbit size guarantee** — section grows only when needed |
| 5 | Implementation strategy | **Breakpoint table** (Approach 3) — no DOM measurement; derive `size`, `bottomOffsetPct`, `sectionMinHeight` from a viewport-driven config function |

## Architecture

### State

Replace the existing `screenWidth` state with combined viewport state:

```js
const [viewport, setViewport] = useState(() => getViewport());
```

Where `getViewport()` reads `window.innerWidth` / `window.innerHeight`, with a fallback of `{ w: 1280, h: 800 }` for non-browser environments.

### Pure config function

A single function `getOrbitConfig(w, h)` returns:

```js
{
  size,              // base orbit size — replaces fixed 300
  bottomOffsetPct,   // % below section bottom — replaces -bottom-[40%]/-1/3
  sectionMinHeight,  // 0 normally; non-zero when section must grow
}
```

This is the only place responsive math lives. Easy to unit-test in isolation.

### Render flow

- Section container uses `min-h-dvh` (was `h-dvh`) plus `style={{ minHeight: sectionMinHeight }}` when non-zero.
- Inner orbit wrapper uses inline `style={{ bottom: \`${-bottomOffsetPct * 100}%\` }}` instead of Tailwind utility classes for the bottom offset, since the value is dynamic.
- The component's external `size` prop becomes **optional with no default** (was `size = 300`). When supplied, it overrides the derived `size` only; `bottomOffsetPct` and `sectionMinHeight` are still derived from viewport.
- `orbitsData` (with `endAngle` resolution by width) keeps its current logic — width thresholds align with those used by `getOrbitConfig`.

## Constants

Defined at the top of the file for tunability:

```js
const MIN_SIZE = 150;
const PADDING = 16;                  // p-4 on orbit wrapper
const TOP_PAD = 40;                  // pt-10 on text block
const CLEARANCE = 24;                // gap between text bottom and topmost arc
const MAX_RADIUS_FACTOR = 4.9 / 2;   // largest orbit radius / size = 2.45
```

## Breakpoint Table

```js
const BREAKPOINTS = [
  { maxW: 640,      textH: 240, maxSize: 240, offsetPct: 0.40 }, // sm
  { maxW: 1024,     textH: 260, maxSize: 280, offsetPct: 0.40 }, // md
  { maxW: 1920,     textH: 260, maxSize: 300, offsetPct: 1 / 3 }, // lg
  { maxW: Infinity, textH: 260, maxSize: 360, offsetPct: 1 / 3 }, // xl / ultra-wide
];
```

`textH` values are estimates derived from the current responsive font classes used in the text block (`text-2xl md:text-5xl lg:text-6xl` heading, `text-sm md:text-lg lg:text-3xl` paragraph) plus `pt-10`, `mt-5`, and `lg:-mt-7`. They include a small buffer.

## Geometry

```
H              = viewport height
offsetPct      = breakpoint offset (0.40 or 1/3)

bottom of wrapper  = H * (1 + offsetPct)
center of system   = bottom − size/2 − PADDING
topmost arc        = center − size * MAX_RADIUS_FACTOR
                   = H * (1 + offsetPct) − 2.95 * size − PADDING
```

**Clearance constraint:**

```
topmost arc ≥ TOP_PAD + textH + CLEARANCE
```

**Solve for max size at given H:**

```js
const maxSizeByHeight =
  (H * (1 + offsetPct) − TOP_PAD − textH − CLEARANCE − PADDING) / 2.95;

const size = Math.max(MIN_SIZE, Math.min(bp.maxSize, maxSizeByHeight));
```

## Section Growth

When `maxSizeByHeight < MIN_SIZE`, the section grows so `MIN_SIZE` still clears the text:

```js
const requiredH =
  (2.95 * MIN_SIZE + PADDING + TOP_PAD + textH + CLEARANCE) / (1 + offsetPct);

const sectionMinHeight =
  maxSizeByHeight < MIN_SIZE ? Math.ceil(requiredH) : 0;
```

Applied via inline `style.minHeight` on the section element. The section uses `min-h-dvh` so normal viewports stay exactly one viewport tall; only extreme cases trigger growth and a small scroll.

`overflow-hidden` on the section continues to clip the orbits whose centers sit below the section's bottom edge.

## Sanity Check (Expected Results)

| Viewport | breakpoint | offsetPct | maxSize | maxByH | final size | sectionMinHeight |
|----------|-----------|-----------|---------|--------|------------|------------------|
| 1920×1080 | xl  | 1/3 | 360 | 373 | **360** | 0 |
| 1440×900  | lg  | 1/3 | 300 | 292 | **292** | 0 |
| 1440×720  | lg  | 1/3 | 300 | 210 | **210** | 0 |
| 1024×768  | lg  | 1/3 | 300 | 232 | **232** | 0 |
| 768×1024  | md  | 0.40 | 280 | 371 | **280** | 0 |
| 375×667   | sm  | 0.40 | 240 | 208 | **208** | 0 |
| 667×375   | md  | 0.40 | 280 | 63  | **150** | ~559 |

## Implementation Details

### Initial render and SSR safety

`getViewport()` returns `{ w: 1280, h: 800 }` when `window` is undefined. Inside the React component, `useState` uses a lazy initializer to call `getViewport()` once.

### Resize handling

Replace the existing width-only listener with a single resize listener that tracks both `w` and `h`. Throttle updates via `requestAnimationFrame` to coalesce drag-resize events.

### Animation behavior

The animation already runs once on viewport entry via `useInView` + `setAnimate(true)`. CSS `@keyframes` are written inline per orbit and depend on `endAngle`, which is resolved by width breakpoint. On resize that crosses a width breakpoint or changes `size`, the keyframes re-render and the animation may restart — acceptable since this is rare during normal viewing. Behavior documented with a code comment.

### External `size` prop override

When a caller passes `size` explicitly, the derived size is bypassed but `bottomOffsetPct` and `sectionMinHeight` are still derived from viewport. Default (no prop) = fully responsive.

### Alignment with existing `endAngle` table

Width thresholds used in `getOrbitConfig` (640, 1024) match the existing `endAngleSm/Md/Lg` resolution. Both consume the same `viewport.w`.

## Out of Scope

- Changes to text content, structure, or responsive font classes.
- Changes to `defaultOrbits` (radii, speeds, start/end angles).
- Changes to icons, colors, or `TextMaskReveal` behavior.
- Changes outside `BeamCircle.jsx`.

## Testing

Manual cross-viewport verification using Chrome DevTools device mode at:

- 1920×1080, 1440×900, 1440×720, 1366×768
- 1024×768, 768×1024
- 414×896, 390×844, 375×667
- 667×375 (phone landscape), 568×320 (older phone landscape)
- 320×480 (extreme small)

For each, verify:

1. Topmost orbit arc does not visually touch or cross any text.
2. Orbit system looks visually balanced — not microscopic, not overflowing into other sections.
3. Entry animation plays once when scrolled into view.
4. Window resize does not cause permanent layout breakage (animation restart on resize is acceptable).
