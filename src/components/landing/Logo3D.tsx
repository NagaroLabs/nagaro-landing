import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Trail, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Pulsating energy core
const EnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (glowRef.current) {
      const glowScale = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 4]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={1}
          roughness={0}
          distort={0.3}
          speed={3}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Orbital particle ring
const OrbitalParticles = ({ radius, count, speed, size }: {
  radius: number;
  count: number;
  speed: number;
  size: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      offset: Math.random() * 0.2 - 0.1,
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(p.angle) * (radius + p.offset),
            Math.sin(p.angle) * (radius + p.offset),
            p.offset * 2,
          ]}
        >
          <sphereGeometry args={[size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

// DNA Helix
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 40; i++) {
      const t = i / 40 * Math.PI * 4;
      points.push({
        x1: Math.cos(t) * 1.5,
        y1: (i / 40 - 0.5) * 4,
        z1: Math.sin(t) * 1.5,
        x2: Math.cos(t + Math.PI) * 1.5,
        y2: (i / 40 - 0.5) * 4,
        z2: Math.sin(t + Math.PI) * 1.5,
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          {/* Helix strand 1 */}
          <mesh position={[point.x1, point.y1, point.z1]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
          {/* Helix strand 2 */}
          <mesh position={[point.x2, point.y2, point.z2]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#888888" transparent opacity={0.6} />
          </mesh>
          {/* Connecting bar */}
          {i % 4 === 0 && (
            <mesh position={[0, point.y1, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
              <meshBasicMaterial color="#444444" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

// Holographic rings
const HolographicRings = () => {
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rings.current) {
      rings.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      rings.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={rings}>
      {[1.2, 1.6, 2.0, 2.4].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.2]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating data cubes
const DataCubes = () => {
  const cubes = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  return (
    <>
      {cubes.map((cube, i) => (
        <Float key={i} speed={cube.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={cube.position} rotation={[cube.rotation, cube.rotation, 0]}>
            <boxGeometry args={[cube.size, cube.size, cube.size]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.4}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#888888" />
      <spotLight position={[0, 5, 0]} intensity={2} angle={0.5} penumbra={1} />

      {/* Main floating group */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <EnergyCore />
        <HolographicRings />
        <OrbitalParticles radius={1.8} count={30} speed={0.3} size={0.02} />
        <OrbitalParticles radius={2.2} count={20} speed={-0.2} size={0.015} />
      </Float>

      {/* DNA Helix in background */}
      <group position={[3, 0, -2]} scale={0.5}>
        <DNAHelix />
      </group>
      <group position={[-3, 0, -2]} scale={0.5} rotation={[0, Math.PI, 0]}>
        <DNAHelix />
      </group>

      {/* Floating data cubes */}
      <DataCubes />

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={8}
        size={3}
        speed={0.4}
        opacity={0.5}
        color="#ffffff"
      />
    </>
  );
};

const Logo3D = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
      
      {/* Glow overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default Logo3D;
