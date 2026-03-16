"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function ParticleBackground() {
  const ref = useRef<THREE.Points>(null);

  // Elegant, subtle space dust background
  const sphere = useMemo(() => {
    const numPoints = 800; // Reduced for cleaner look
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        // Distribute within a large sphere
        const r = Math.cbrt(Math.random()) * 20; 
        const sinPhi = Math.sin(phi);
        
        positions[i * 3] = r * sinPhi * Math.cos(theta);
        positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Very slow, subtle drift rotation for a professional ambient feel
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          // Professional subtle blue/gray node color
          color="#3B82F6"
          size={0.02}
          opacity={0.3}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
