import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

export default function DataNodeField({ count = 220 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 8;
      values[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      values[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x += delta * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0284c7" size={0.068} sizeAttenuation transparent opacity={0.95} />
    </points>
  );
}
