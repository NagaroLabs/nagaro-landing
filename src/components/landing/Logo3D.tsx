import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Orbital rings around the logo
const OrbitalRing = ({ radius, speed, thickness, opacity }: { 
  radius: number; 
  speed: number; 
  thickness: number;
  opacity: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial 
        color="#b8b8b8"
        transparent
        opacity={opacity}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

// Floating particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Central glowing sphere
const GlowingSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <MeshDistortMaterial
        color="#404040"
        metalness={1}
        roughness={0.1}
        distort={0.2}
        speed={2}
      />
    </mesh>
  );
};

// Light rays effect
const LightRays = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={i} 
          rotation={[0, 0, (Math.PI * 2 / 6) * i]}
          position={[0, 0, -0.5]}
        >
          <planeGeometry args={[0.02, 3]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#888888" />
      <pointLight position={[0, 0, 3]} intensity={1} color="#ffffff" />

      {/* Main floating group */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Central sphere */}
        <GlowingSphere />

        {/* Orbital rings */}
        <OrbitalRing radius={1.3} speed={0.3} thickness={0.008} opacity={0.6} />
        <OrbitalRing radius={1.6} speed={-0.2} thickness={0.005} opacity={0.4} />
        <OrbitalRing radius={1.9} speed={0.15} thickness={0.003} opacity={0.2} />
      </Float>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Light rays */}
      <LightRays />

      {/* Sparkles for extra magic */}
      <Sparkles
        count={30}
        scale={4}
        size={2}
        speed={0.3}
        opacity={0.5}
        color="#ffffff"
      />
    </>
  );
};

const Logo3D = () => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Logo3D;
