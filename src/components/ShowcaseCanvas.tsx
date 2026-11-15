import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Html, Preload } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import { developmentProjects } from "../data/index";

type Pointer = {
  x: number;
  y: number;
};

type FloatingParticlesProps = {
  count: number;
  spreadX: number;
  spreadY: number;
  zMin: number;
  zMax: number;
  speed: number;
};

type ProjectItem = {
  image: string;
  title: string;
  tag: string;
  slug: string;
  description: string;
  siteLink: string;
  angle: number;
  y: number;
  z: number;
  x: number;
};

const HELIX_RADIUS = 2.35;
const HELIX_VERTICAL_STEP = 1.85;
const HELIX_DEPTH_STEP = -3.1;
const HELIX_ANGLE_STEP = Math.PI * 0.58;

const PROJECTS: ProjectItem[] = developmentProjects.map(
  (project, index, all) => {
    const angle = index * HELIX_ANGLE_STEP;
    const x = Math.cos(angle) * HELIX_RADIUS;
    const y =
      -((all.length - 1) * HELIX_VERTICAL_STEP) * 0.5 +
      index * HELIX_VERTICAL_STEP;
    const z = index * HELIX_DEPTH_STEP;

    return {
      image: project.image,
      title: project.siteName,
      tag: project.shortDesc,
      slug: `${project.siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
      description: project.description,
      siteLink: project.siteLink,
      angle,
      x,
      y,
      z,
    };
  },
);

const TRACK_MAX = Math.max(PROJECTS.length - 1, 0);
const TRACK_DEPTH_MIN = PROJECTS.length
  ? Math.min(...PROJECTS.map((project) => project.z))
  : -64;

type CameraRig = {
  x: number;
  y: number;
  z: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
};

type TrackPoint = {
  x: number;
  y: number;
  z: number;
};

function getTrackPoint(index: number): TrackPoint {
  if (PROJECTS[index]) return PROJECTS[index];
  const angle = index * HELIX_ANGLE_STEP;
  const x = Math.cos(angle) * HELIX_RADIUS;
  const y =
    -((PROJECTS.length - 1) * HELIX_VERTICAL_STEP) * 0.5 +
    index * HELIX_VERTICAL_STEP;
  const z = index * HELIX_DEPTH_STEP;
  return { x, y, z };
}

function sampleTrack(progress: number): TrackPoint {
  if (PROJECTS.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const clamped = THREE.MathUtils.clamp(progress, -1, TRACK_MAX + 1);
  const startIndex = Math.floor(clamped);
  const t = clamped - startIndex;
  const from = getTrackPoint(startIndex);
  const to = getTrackPoint(startIndex + 1);

  return {
    x: THREE.MathUtils.lerp(from.x, to.x, t),
    y: THREE.MathUtils.lerp(from.y, to.y, t),
    z: THREE.MathUtils.lerp(from.z, to.z, t),
  };
}

// Procedural glow + hover ripple — no texture required, no CORS issues
const DISTORTION_VERTEX_SHADER = `
varying vec2 vUv;
uniform float uHoverProgress;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  float wave = sin((uv.y * 14.0) + (uTime * 2.0)) * 0.018;
  pos.z += wave * uHoverProgress;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const DISTORTION_FRAGMENT_SHADER = `
varying vec2 vUv;
uniform float uTime;
uniform float uHoverProgress;
uniform float uVisibility;
uniform vec3 uColor;

void main() {
  vec2 center = vec2(0.5, 0.5);
  vec2 toCenter = vUv - center;
  float dist = length(toCenter);

  // Base radial gradient card shape
  float card = smoothstep(0.72, 0.05, dist);

  // Animated ripple on hover
  float ripple = sin((dist * 26.0) - (uTime * 3.2)) * 0.5 + 0.5;
  float scanH = sin((vUv.y * 80.0) + uTime * 1.5) * 0.5 + 0.5;
  float glowAmount = (ripple * 0.6 + scanH * 0.4) * uHoverProgress;

  vec3 color = uColor + glowAmount * vec3(0.32, 0.65, 1.0);

  // Subtle border glow on edges
  float edge = smoothstep(0.68, 0.62, dist) * smoothstep(0.72, 0.68, dist);
  color += edge * vec3(0.2, 0.5, 0.9) * (0.4 + uHoverProgress * 0.6);

  float alpha = card * uVisibility * 0.7;
  gl_FragColor = vec4(color, alpha);
}
`;

function FloatingParticles({
  count,
  spreadX,
  spreadY,
  zMin,
  zMax,
  speed,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      array[i3] = (Math.random() - 0.5) * spreadX;
      array[i3 + 1] = (Math.random() - 0.5) * spreadY;
      array[i3 + 2] = zMin + Math.random() * (zMax - zMin);
    }

    return array;
  }, [count, spreadX, spreadY, zMin, zMax]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }

    const positionAttr = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      array[i3 + 2] += speed * delta;

      if (array[i3 + 2] > zMax) {
        array[i3] = (Math.random() - 0.5) * spreadX;
        array[i3 + 1] = (Math.random() - 0.5) * spreadY;
        array[i3 + 2] = zMin;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#b8d0ff"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type SceneProps = {
  pointerRef: RefObject<Pointer>;
  normalizedPointerRef: RefObject<Pointer>;
  targetTravelRef: RefObject<number>;
  cameraRigRef: RefObject<CameraRig>;
  cinematicLockedRef: RefObject<boolean>;
};

type ProjectTimelineProps = {
  cinematicLockedRef: RefObject<boolean>;
  onProjectSelect: (index: number) => void;
  activeProjectIndex: number | null;
};

function ProjectTimeline({
  cinematicLockedRef,
  onProjectSelect,
  activeProjectIndex,
}: ProjectTimelineProps) {
  const groupRefs = useRef<Array<THREE.Group | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const materialRefs = useRef<Array<THREE.ShaderMaterial | null>>([]);
  const hoverTargets = useRef<number[]>(PROJECTS.map(() => 0));
  const lookAtHelper = useMemo(() => new THREE.Object3D(), []);
  const movementQuat = useMemo(() => new THREE.Quaternion(), []);
  const cameraQuat = useMemo(() => new THREE.Quaternion(), []);
  const targetQuat = useMemo(() => new THREE.Quaternion(), []);

  // One stable colour per card, derived from index — no external assets needed
  const cardColors = useMemo(
    () =>
      PROJECTS.map((_, i) => {
        const c = new THREE.Color();
        c.setHSL((i * 0.09) % 1, 0.55, 0.1);
        return c;
      }),
    [],
  );

  useFrame((state, delta) => {
    const cameraPosition = state.camera.position;

    for (let i = 0; i < PROJECTS.length; i += 1) {
      const project = PROJECTS[i];
      const group = groupRefs.current[i];
      const card = cardRefs.current[i];
      const material = materialRefs.current[i];

      if (!group || !card || !material) {
        continue;
      }

      const radialDistance = Math.sqrt(
        (cameraPosition.x - project.x) ** 2 +
          (cameraPosition.y - project.y) ** 2 +
          (cameraPosition.z - project.z) ** 2,
      );
      const focus =
        1 - THREE.MathUtils.clamp((radialDistance - 1.9) / 5.4, 0, 1);
      const isActive = activeProjectIndex === i;
      const isDimmed =
        activeProjectIndex !== null &&
        activeProjectIndex !== i &&
        cinematicLockedRef.current;
      const targetScale = 0.82 + focus * 0.26;

      group.scale.setScalar(
        THREE.MathUtils.damp(group.scale.x, targetScale, 8, delta),
      );

      group.position.y = THREE.MathUtils.damp(
        group.position.y,
        project.y,
        6,
        delta,
      );

      const next = getTrackPoint(i + 1);
      lookAtHelper.position.copy(group.position);
      lookAtHelper.lookAt(next.x, next.y, next.z);
      movementQuat.copy(lookAtHelper.quaternion);

      lookAtHelper.lookAt(cameraPosition);
      cameraQuat.copy(lookAtHelper.quaternion);
      targetQuat.copy(movementQuat).slerp(cameraQuat, 0.72);
      group.quaternion.slerp(
        targetQuat,
        THREE.MathUtils.clamp(8 * delta, 0, 1),
      );

      card.style.opacity = `${0.36 + focus * 0.64}`;
      card.style.filter = `saturate(${0.82 + focus * 0.28}) blur(${(1 - focus) * 0.75}px)`;

      const uniforms = material.uniforms;
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uHoverProgress.value = THREE.MathUtils.damp(
        uniforms.uHoverProgress.value,
        hoverTargets.current[i],
        7,
        delta,
      );
      uniforms.uVisibility.value = THREE.MathUtils.damp(
        uniforms.uVisibility.value,
        isDimmed ? 0.16 : isActive ? 1.0 : 0.68 + focus * 0.32,
        8,
        delta,
      );
      material.needsUpdate = false;
    }
  });

  return (
    <>
      {PROJECTS.map((project, index) => (
        <group
          key={project.slug}
          position={[project.x, project.y, project.z]}
          ref={(g) => {
            groupRefs.current[index] = g;
          }}
        >
          {/* Procedural glow backing plane — no texture, no network request */}
          <mesh
            onPointerEnter={() => {
              if (!cinematicLockedRef.current) hoverTargets.current[index] = 1;
            }}
            onPointerLeave={() => {
              if (!cinematicLockedRef.current) hoverTargets.current[index] = 0;
            }}
            onClick={() => onProjectSelect(index)}
          >
            <planeGeometry args={[4.8, 3, 28, 28]} />
            <shaderMaterial
              ref={(m) => {
                materialRefs.current[index] = m;
              }}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
              uniforms={{
                uTime: { value: 0 },
                uHoverProgress: { value: 0 },
                uVisibility: { value: 0.55 },
                uColor: { value: cardColors[index] },
              }}
              vertexShader={DISTORTION_VERTEX_SHADER}
              fragmentShader={DISTORTION_FRAGMENT_SHADER}
            />
          </mesh>

          {/* HTML card with image — regular <img>, zero CORS restriction */}
          <Html
            transform
            position={[0, 0.2, 0.12]}
            distanceFactor={2.1}
            zIndexRange={[10, 0]}
          >
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => onProjectSelect(index)}
              className="w-[360px] cursor-pointer overflow-hidden rounded-2xl border border-sky-100/20 bg-slate-950/72 text-white shadow-[0_20px_58px_rgba(0,0,0,0.7)] backdrop-blur-md"
              style={{ opacity: 0.36, willChange: "opacity, filter" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-[188px] w-full object-cover"
                loading="lazy"
              />
              <div className="space-y-1 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-sky-200/85">
                  {project.tag}
                </p>
                <h3 className="text-sm font-semibold leading-snug text-slate-50">
                  {project.title}
                </h3>
              </div>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

function Scene({
  pointerRef,
  normalizedPointerRef,
  targetTravelRef,
  cameraRigRef,
  cinematicLockedRef,
}: SceneProps) {
  useFrame((state, delta) => {
    const { camera, size } = state;

    if (cinematicLockedRef.current) {
      const rig = cameraRigRef.current;
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        rig.x,
        5,
        delta,
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        rig.y,
        5,
        delta,
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        rig.z,
        5,
        delta,
      );
      camera.lookAt(rig.lookAtX, rig.lookAtY, rig.lookAtZ);
      return;
    }

    const nx = (pointerRef.current.x / size.width) * 2 - 1;
    const ny = -(pointerRef.current.y / size.height) * 2 + 1;

    normalizedPointerRef.current.x = nx;
    normalizedPointerRef.current.y = ny;

    const targetX = nx * 0.55;
    const targetY = ny * 0.32;

    const travel = sampleTrack(targetTravelRef.current);
    const lookAhead = sampleTrack(targetTravelRef.current + 0.35);
    const sceneTargetX = travel.x * 0.62;
    const sceneTargetY = travel.y * 0.54;
    const sceneTargetZ = travel.z + 2.55;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      sceneTargetX + targetX,
      4.8,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      sceneTargetY + targetY,
      4.8,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      sceneTargetZ,
      5.2,
      delta,
    );

    const lookAtX = lookAhead.x * 0.62;
    const lookAtY = lookAhead.y * 0.54;
    const lookAtZ = lookAhead.z - 1.2;
    camera.lookAt(lookAtX, lookAtY, lookAtZ);

    const rig = cameraRigRef.current;
    rig.x = camera.position.x;
    rig.y = camera.position.y;
    rig.z = camera.position.z;
    rig.lookAtX = lookAtX;
    rig.lookAtY = lookAtY;
    rig.lookAtZ = lookAtZ;
  });

  return null;
}

type SceneShellProps = {
  pointerRef: RefObject<Pointer>;
  normalizedPointerRef: RefObject<Pointer>;
  targetTravelRef: RefObject<number>;
  cameraRigRef: RefObject<CameraRig>;
  cinematicLockedRef: RefObject<boolean>;
  onProjectSelect: (index: number) => void;
  activeProjectIndex: number | null;
};

function SceneShell({
  pointerRef,
  normalizedPointerRef,
  targetTravelRef,
  cameraRigRef,
  cinematicLockedRef,
  onProjectSelect,
  activeProjectIndex,
}: SceneShellProps) {
  return (
    <>
      <color attach="background" args={["#05070f"]} />
      <fog attach="fog" args={["#05070f", 8, 115]} />
      <ambientLight intensity={0.52} />
      <directionalLight position={[5, 8, 6]} intensity={0.6} color="#c0d6ff" />

      <FloatingParticles
        count={2800}
        spreadX={30}
        spreadY={18}
        zMin={TRACK_DEPTH_MIN - 26}
        zMax={10}
        speed={5.5}
      />

      <ProjectTimeline
        cinematicLockedRef={cinematicLockedRef}
        onProjectSelect={onProjectSelect}
        activeProjectIndex={activeProjectIndex}
      />

      <Scene
        pointerRef={pointerRef}
        normalizedPointerRef={normalizedPointerRef}
        targetTravelRef={targetTravelRef}
        cameraRigRef={cameraRigRef}
        cinematicLockedRef={cinematicLockedRef}
      />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
    </>
  );
}

export default function ShowcaseCanvas() {
  const pointerRef = useRef<Pointer>({
    x: typeof window === "undefined" ? 0 : window.innerWidth * 0.5,
    y: typeof window === "undefined" ? 0 : window.innerHeight * 0.5,
  });

  const normalizedPointerRef = useRef<Pointer>({ x: 0, y: 0 });
  const targetTravelRef = useRef(0);
  const previousScrollTargetRef = useRef(0);
  const cinematicLockedRef = useRef(false);
  const sectionVisibleRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRigRef = useRef<CameraRig>({
    x: 0,
    y: 0,
    z: 3.1,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: -3.5,
  });
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!sectionVisibleRef.current) {
        return;
      }

      if (cinematicLockedRef.current) {
        event.preventDefault();
        return;
      }

      const current = targetTravelRef.current;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      // Add a 0.8 deadzone buffer so the user can scroll normally at the extreme limits
      // before it releases the canvas and scrolls the rest of the page.
      if (scrollingDown && current >= TRACK_MAX + 0.8) {
        return;
      }

      if (scrollingUp && current <= -0.8) {
        return;
      }

      event.preventDefault();
      const nextTarget = current + event.deltaY * 0.0012;
      targetTravelRef.current = THREE.MathUtils.clamp(
        nextTarget,
        -0.8,
        TRACK_MAX + 0.8,
      );
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  const handleProjectSelect = (index: number) => {
    if (activeProjectIndex === index) {
      return;
    }

    const project = PROJECTS[index];
    previousScrollTargetRef.current = targetTravelRef.current;
    cinematicLockedRef.current = true;
    setActiveProjectIndex(index);

    gsap.killTweensOf(cameraRigRef.current);
    gsap.to(cameraRigRef.current, {
      duration: 1.15,
      x: project.x * 0.28,
      y: project.y * 0.24,
      z: project.z + 2.2,
      lookAtX: project.x * 0.4,
      lookAtY: project.y * 0.3,
      lookAtZ: project.z - 1,
      ease: "power3.inOut",
      onStart: () => {
        targetTravelRef.current = index;
      },
    });
  };

  const handleBack = () => {
    if (activeProjectIndex === null) {
      return;
    }

    const restoreProgress = previousScrollTargetRef.current;
    targetTravelRef.current = restoreProgress;

    const restorePoint = sampleTrack(restoreProgress);
    const restoreLook = sampleTrack(restoreProgress + 0.22);

    gsap.killTweensOf(cameraRigRef.current);
    gsap.to(cameraRigRef.current, {
      duration: 1,
      x: restorePoint.x * 0.62,
      y: restorePoint.y * 0.54,
      z: restorePoint.z + 2.55,
      lookAtX: restoreLook.x * 0.62,
      lookAtY: restoreLook.y * 0.54,
      lookAtZ: restoreLook.z - 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        cinematicLockedRef.current = false;
        setActiveProjectIndex(null);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-[120vh] w-full overflow-hidden bg-[#05070f]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_38%),linear-gradient(180deg,#030711_0%,#05070f_52%,#040916_100%)]" />
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 2.55], fov: 44, near: 0.1, far: 180 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        resize={{ debounce: { scroll: 0, resize: 0 } }}
      >
        <SceneShell
          pointerRef={pointerRef}
          normalizedPointerRef={normalizedPointerRef}
          targetTravelRef={targetTravelRef}
          cameraRigRef={cameraRigRef}
          cinematicLockedRef={cinematicLockedRef}
          onProjectSelect={handleProjectSelect}
          activeProjectIndex={activeProjectIndex}
        />
      </Canvas>

      <AnimatePresence>
        {activeProjectIndex !== null ? (
          <motion.aside
            key={PROJECTS[activeProjectIndex].title}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 z-30 flex w-full max-w-xl flex-col gap-5 border-l border-sky-200/20 bg-slate-950/88 px-5 py-6 text-slate-100 backdrop-blur-xl md:px-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-200/80">
                Case Study
              </p>
              <button
                type="button"
                onClick={handleBack}
                className="rounded-full border border-sky-200/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 transition hover:bg-sky-300/10"
              >
                Back
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
                {PROJECTS[activeProjectIndex].tag}
              </p>
              <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                {PROJECTS[activeProjectIndex].title}
              </h3>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm uppercase tracking-[0.18em] text-sky-100/90">
                Project Snapshot
              </h4>
              <p className="text-sm leading-relaxed text-slate-300">
                {PROJECTS[activeProjectIndex].description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm uppercase tracking-[0.18em] text-sky-100/90">
                Flow Position
              </h4>
              <p className="text-sm leading-relaxed text-slate-300">
                {`Node ${activeProjectIndex + 1} of ${PROJECTS.length} in the 3D DNA timeline.`}
              </p>
            </div>

            {PROJECTS[activeProjectIndex].siteLink !== "#" ? (
              <a
                href={PROJECTS[activeProjectIndex].siteLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center rounded-full border border-sky-200/35 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-100 transition hover:bg-sky-300/15"
              >
                Visit Project
              </a>
            ) : null}
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
