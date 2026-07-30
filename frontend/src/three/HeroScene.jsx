import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import DataNodeField from './DataNodeField';

function CoreObject() {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreGemRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.22;
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.12;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * 0.55;
      ring1Ref.current.rotation.x += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.45;
      ring2Ref.current.rotation.y -= delta * 0.3;
    }
    if (coreGemRef.current) {
      coreGemRef.current.rotation.y -= delta * 0.6;
      coreGemRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={1.35}>
      {/* Solid Translucent Inner Knot */}
      <mesh>
        <torusKnotGeometry args={[1.15, 0.26, 180, 24]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.15}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Glowing Outer Wireframe Mesh */}
      <mesh>
        <torusKnotGeometry args={[1.16, 0.265, 120, 16]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Orbiting Neon Ring 1 - Purple */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[1.85, 0.022, 20, 200]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Orbiting Neon Ring 2 - Emerald */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, -0.4, 0.5]}>
        <torusGeometry args={[2.1, 0.018, 20, 200]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.95}
        />
      </mesh>

      {/* Inner Glowing Gem Core */}
      <mesh ref={coreGemRef} rotation={[0.7, 0.2, 0.4]}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#f43f5e"
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.3], fov: 46 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[4, 3, 4]} intensity={2.8} color="#00f0ff" />
        <pointLight position={[-4, -3, 3]} intensity={2.2} color="#a855f7" />
        <pointLight position={[0, -4, 2]} intensity={1.8} color="#10b981" />
        <DataNodeField count={180} />
        <CoreObject />
      </Canvas>
      <div className="hero-scene__scanline" />
    </div>
  );
}
