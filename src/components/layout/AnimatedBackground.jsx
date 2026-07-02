import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------- Scroll Progress Hook ------------------------- */
function useScrollProgress() {
const [progress, setProgress] = useState(0);

useEffect(() => {
const handleScroll = () => {
const scrollTop = window.scrollY;
const maxScroll =
document.documentElement.scrollHeight - window.innerHeight;

 
  const value = maxScroll > 0 ? scrollTop / maxScroll : 0;
  setProgress(Math.min(Math.max(value, 0), 1));
};

handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
}; 

}, []);

return progress;
}

/* ------------------------------ Camera Rig ----------------------------- */
function CameraRig({ scroll }) {
useFrame((state) => {
const t = state.clock.getElapsedTime();

 
// Scroll-based forward movement
const z = 12 - scroll * 42;
const y = 1.2 - scroll * 4.5 + Math.sin(t * 0.7) * 0.08;
const x = Math.sin(scroll * Math.PI * 2) * 1.2;

state.camera.position.lerp(new THREE.Vector3(x, y, z), 0.08);

// Look target slowly moves deeper
const target = new THREE.Vector3(
  Math.sin(t * 0.2) * 0.5,
  -0.8 + scroll * 1.2,
  -18 - scroll * 28
);
state.camera.lookAt(target);


});

return null;
}

/* ------------------------------ Tunnel Rings --------------------------- */
function TunnelRings({ scroll }) {
const groupRef = useRef();

const ringData = useMemo(() => {
return Array.from({ length: 28 }, (_, i) => ({
z: -i * 3.2,
rot: i * 0.18,
scale: 1 + i * 0.02,
}));
}, []);

useFrame((state) => {
if (!groupRef.current) return;
groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
groupRef.current.position.z = scroll * -12;
});

return ( <group ref={groupRef}>
{ringData.map((ring, i) => (
<mesh
key={i}
position={[0, 0, ring.z]}
rotation={[0, 0, ring.rot]}
scale={ring.scale}
>
<torusGeometry args={[4.5, 0.03, 16, 100]} />
<meshStandardMaterial
color={i % 2 === 0 ? "#38bdf8" : "#8b5cf6"}
emissive={i % 2 === 0 ? "#0ea5e9" : "#7c3aed"}
emissiveIntensity={1.4}
transparent
opacity={0.75 - i * 0.015}
/> </mesh>
))} </group>
);
}

/* ------------------------------ Data Lines ----------------------------- */
function DataLines({ scroll }) {
const leftRef = useRef();
const rightRef = useRef();

useFrame((state) => {
const t = state.clock.elapsedTime;
if (leftRef.current) {
leftRef.current.position.z = scroll * -14;
leftRef.current.rotation.z = Math.sin(t * 0.3) * 0.06;
}
if (rightRef.current) {
rightRef.current.position.z = scroll * -14;
rightRef.current.rotation.z = -Math.sin(t * 0.3) * 0.06;
}
});

const linePositions = useMemo(() => {
return Array.from({ length: 14 }, (_, i) => -i * 5);
}, []);

return (
<>
<group ref={leftRef} position={[-5.5, -1.8, 0]}>
{linePositions.map((z, i) => (
<mesh key={i} position={[0, 0, z]} rotation={[0, 0.15, 0]}>
<boxGeometry args={[0.03, 0.03, 4]} /> <meshStandardMaterial
           color="#22d3ee"
           emissive="#22d3ee"
           emissiveIntensity={2}
         /> </mesh>
))} </group>

 
  <group ref={rightRef} position={[5.5, -1.8, 0]}>
    {linePositions.map((z, i) => (
      <mesh key={i} position={[0, 0, z]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.03, 0.03, 4]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2}
        />
      </mesh>
    ))}
  </group>
</>
 

);
}

/* ---------------------------- Floating Panels -------------------------- */
function FloatingPanels({ scroll }) {
const group = useRef();

const panels = useMemo(() => {
return [
{ pos: [-3.6, 1.6, -7], rot: [0.08, 0.35, 0.03], color: "#0ea5e9" },
{ pos: [3.3, 0.7, -12], rot: [-0.05, -0.35, -0.04], color: "#8b5cf6" },
{ pos: [-2.8, -1.1, -18], rot: [0.03, 0.28, -0.05], color: "#22c55e" },
{ pos: [2.9, 1.8, -24], rot: [-0.08, -0.25, 0.02], color: "#f59e0b" },
{ pos: [0, 2.3, -30], rot: [0.02, 0, 0], color: "#ec4899" },
];
}, []);

useFrame((state) => {
if (!group.current) return;
group.current.position.z = scroll * -18;
group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
});

return ( <group ref={group}>
{panels.map((panel, i) => (
<Float
key={i}
speed={1.2 + i * 0.15}
rotationIntensity={0.2}
floatIntensity={0.5}
> <group position={panel.pos} rotation={panel.rot}>
{/* Glass panel */}
<RoundedBox args={[2.3, 1.35, 0.08]} radius={0.08} smoothness={4}> <meshPhysicalMaterial
             color="#0f172a"
             transmission={0.9}
             roughness={0.08}
             thickness={0.5}
             transparent
             opacity={0.55}
             metalness={0.25}
             clearcoat={1}
           /> </RoundedBox>

 
        {/* Neon border plane */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.15, 1.2]} />
          <meshBasicMaterial
            color={panel.color}
            transparent
            opacity={0.14}
          />
        </mesh>

        {/* Fake code lines */}
        {Array.from({ length: 5 }).map((_, lineIndex) => (
          <mesh
            key={lineIndex}
            position={[
              -0.55 + lineIndex * 0.08,
              0.35 - lineIndex * 0.18,
              0.07,
            ]}
          >
            <boxGeometry args={[0.85 + lineIndex * 0.12, 0.035, 0.02]} />
            <meshStandardMaterial
              color={panel.color}
              emissive={panel.color}
              emissiveIntensity={1.4}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  ))}
</group>


);
}

/* ----------------------------- Center Computer ------------------------- */
function ComputerCore({ scroll }) {
const groupRef = useRef();
const screenGlowRef = useRef();

useFrame((state) => {
const t = state.clock.elapsedTime;

 
if (groupRef.current) {
  groupRef.current.position.z = -8 - scroll * 18;
  groupRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.06;
  groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.12;
}

if (screenGlowRef.current) {
  screenGlowRef.current.material.opacity = 0.18 + Math.sin(t * 2.5) * 0.05;
}
 

});

return (
<group ref={groupRef} position={[0, -0.5, -8]}>
{/* Monitor */}
<mesh position={[0, 1.2, 0]}>
<boxGeometry args={[4.4, 2.8, 0.22]} /> <meshStandardMaterial
       color="#0f172a"
       metalness={0.9}
       roughness={0.25}
     /> </mesh>

 
  {/* Screen */}
  <mesh position={[0, 1.2, 0.13]}>
    <planeGeometry args={[3.85, 2.2]} />
    <meshStandardMaterial
      color="#020617"
      emissive="#0ea5e9"
      emissiveIntensity={0.55}
    />
  </mesh>

  {/* Screen glow overlay */}
  <mesh ref={screenGlowRef} position={[0, 1.2, 0.145]}>
    <planeGeometry args={[3.7, 2.05]} />
    <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
  </mesh>

  {/* Code lines on screen */}
  {Array.from({ length: 10 }).map((_, i) => (
    <mesh
      key={i}
      position={[
        -1.1 + (i % 2) * 0.2,
        1.9 - i * 0.18,
        0.16,
      ]}
    >
      <boxGeometry args={[1.6 - (i % 3) * 0.25, 0.045, 0.02]} />
      <meshStandardMaterial
        color={i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}
        emissive={i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}
        emissiveIntensity={1.8}
      />
    </mesh>
  ))}

  {/* Monitor stand */}
  <mesh position={[0, -0.45, 0]}>
    <boxGeometry args={[0.28, 1.2, 0.18]} />
    <meshStandardMaterial color="#111827" metalness={0.85} roughness={0.3} />
  </mesh>

  <mesh position={[0, -1.05, 0.15]}>
    <boxGeometry args={[1.8, 0.12, 0.8]} />
    <meshStandardMaterial color="#111827" metalness={0.85} roughness={0.3} />
  </mesh>

  {/* Keyboard */}
  <mesh position={[0, -1.25, 1.25]} rotation={[-0.35, 0, 0]}>
    <boxGeometry args={[3.2, 0.12, 1.1]} />
    <meshStandardMaterial
      color="#0f172a"
      metalness={0.45}
      roughness={0.4}
    />
  </mesh>

  {/* CPU tower */}
  <mesh position={[3.3, 0.1, -0.2]}>
    <boxGeometry args={[1.15, 3.2, 1.4]} />
    <meshStandardMaterial
      color="#0f172a"
      metalness={0.85}
      roughness={0.25}
    />
  </mesh>

  {/* CPU lights */}
  {[-0.7, 0, 0.7].map((y, idx) => (
    <mesh key={idx} position={[3.3, y, 0.55]}>
      <boxGeometry args={[0.5, 0.08, 0.02]} />
      <meshStandardMaterial
        color={idx % 2 === 0 ? "#38bdf8" : "#a855f7"}
        emissive={idx % 2 === 0 ? "#38bdf8" : "#a855f7"}
        emissiveIntensity={2}
      />
    </mesh>
  ))}
</group>
 

);
}

/* ------------------------------ Core Portal ---------------------------- */
function CorePortal({ scroll }) {
const ref = useRef();

useFrame((state) => {
if (!ref.current) return;
const t = state.clock.elapsedTime;
ref.current.position.z = -26 - scroll * 16;
ref.current.rotation.z = t * 0.35;
ref.current.rotation.x = Math.sin(t * 0.5) * 0.25;
});

return ( <group ref={ref}> <mesh>
<torusGeometry args={[2.2, 0.16, 16, 100]} /> <meshStandardMaterial
       color="#38bdf8"
       emissive="#38bdf8"
       emissiveIntensity={2.5}
     /> </mesh>

 
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[1.35, 0.08, 16, 100]} />
    <meshStandardMaterial
      color="#8b5cf6"
      emissive="#8b5cf6"
      emissiveIntensity={2.2}
    />
  </mesh>

  <mesh>
    <sphereGeometry args={[0.45, 32, 32]} />
    <meshStandardMaterial
      color="#ffffff"
      emissive="#60a5fa"
      emissiveIntensity={3}
    />
  </mesh>
</group>
 

);
}

/* ------------------------------ Particles ------------------------------ */
function DataParticles({ scroll }) {
const pointsRef = useRef();

const { positions, colors } = useMemo(() => {
const count = 2200;
const pos = new Float32Array(count * 3);
const col = new Float32Array(count * 3);

 
const colorA = new THREE.Color("#38bdf8");
const colorB = new THREE.Color("#a855f7");

for (let i = 0; i < count; i++) {
  const i3 = i * 3;
  const radius = 3 + Math.random() * 9;
  const angle = Math.random() * Math.PI * 2;
  const z = -Math.random() * 120;

  pos[i3] = Math.cos(angle) * radius;
  pos[i3 + 1] = (Math.random() - 0.5) * 7;
  pos[i3 + 2] = z;

  const mixed = i % 2 === 0 ? colorA : colorB;
  col[i3] = mixed.r;
  col[i3 + 1] = mixed.g;
  col[i3 + 2] = mixed.b;
}

return { positions: pos, colors: col };
 

}, []);

useFrame((state) => {
if (!pointsRef.current) return;

 
pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
pointsRef.current.position.z = scroll * -22;
  

});

return ( <points ref={pointsRef}> <bufferGeometry>
<bufferAttribute
attach="attributes-position"
count={positions.length / 3}
array={positions}
itemSize={3}
/>
<bufferAttribute
attach="attributes-color"
count={colors.length / 3}
array={colors}
itemSize={3}
/> </bufferGeometry> <pointsMaterial
     size={0.05}
     vertexColors
     transparent
     opacity={0.9}
     sizeAttenuation
     depthWrite={false}
   /> </points>
);
}

/* ------------------------------- Ground ------------------------------- */
function GroundGrid({ scroll }) {
const ref = useRef();

useFrame(() => {
if (!ref.current) return;
ref.current.position.z = scroll * -15;
});

return (
<group ref={ref} position={[0, -2.1, -10]}>
{Array.from({ length: 24 }).map((_, i) => (
<mesh key={`line-z-${i}`} position={[0, 0, -i * 4]}>
<boxGeometry args={[16, 0.01, 0.03]} /> <meshStandardMaterial
         color="#0ea5e9"
         emissive="#0ea5e9"
         emissiveIntensity={0.8}
         transparent
         opacity={0.4}
       /> </mesh>
))}

 
  {Array.from({ length: 13 }).map((_, i) => (
    <mesh
      key={`line-x-${i}`}
      position={[-6 + i, 0, -44]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <boxGeometry args={[88, 0.01, 0.03]} />
      <meshStandardMaterial
        color={i % 2 === 0 ? "#0ea5e9" : "#7c3aed"}
        emissive={i % 2 === 0 ? "#0ea5e9" : "#7c3aed"}
        emissiveIntensity={0.8}
        transparent
        opacity={0.25}
      />
    </mesh>
  ))}
</group>
 

);
}

/* ------------------------------- Scene ------------------------------- */
function SceneContent() {
const scroll = useScrollProgress();

return (
<> <CameraRig scroll={scroll} />

 
  <fog attach="fog" args={["#020617", 12, 70]} />

  <ambientLight intensity={0.55} />
  <directionalLight position={[6, 8, 4]} intensity={1.5} color="#67e8f9" />
  <pointLight position={[0, 1, 3]} intensity={2.2} color="#60a5fa" />
  <pointLight position={[0, 0, -24]} intensity={2.5} color="#a855f7" />

  <Stars
    radius={120}
    depth={80}
    count={1400}
    factor={4}
    saturation={0}
    fade
    speed={0.4}
  />

  <DataParticles scroll={scroll} />
  <TunnelRings scroll={scroll} />
  <GroundGrid scroll={scroll} />
  <DataLines scroll={scroll} />
  <FloatingPanels scroll={scroll} />
  <ComputerCore scroll={scroll} />
  <CorePortal scroll={scroll} />
</>
 

);
}

/* ------------------------- Main Background Wrapper --------------------- */
function AnimatedBackground() {
return ( <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950">
{/* Gradient overlays */} <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_35%)]" /> <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/20 to-slate-950/70" />

 
  <Canvas
    camera={{ position: [0, 1, 12], fov: 55 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
  >
    <SceneContent />
  </Canvas>
</div>
 

);
}

export default AnimatedBackground;
