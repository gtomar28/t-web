import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SignalBeaconProps {
  track: number;
  reducedMotion?: boolean;
}

const RING_COLORS = ["#E8A9C2", "#6B4A87", "#B9A6D1"];

/**
 * Concentric signal rings  Contact engagement language.
 */
export const SignalBeacon: React.FC<SignalBeaconProps> = ({
  track,
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    rings.current.forEach((mesh, i) => {
      if (!mesh) return;
      if (!reducedMotion) {
        mesh.rotation.x = Math.PI / 2 + Math.sin(t * 0.4 + i) * 0.08;
        mesh.rotation.z = t * (0.2 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
      }
      const active = i === track;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        active ? 0.95 : 0.2,
        0.1,
      );
      const s = active ? 1.08 : 0.95;
      mesh.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    });
    // Core pulse
    const core = group.current.children.find((c) => c.userData?.beaconCore) as
      | THREE.Mesh
      | undefined;
    if (core && !reducedMotion) {
      const s = 1 + Math.sin(t * 2.2) * 0.08;
      core.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh userData={{ beaconCore: true }}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial
          color="#F8F6FB"
          emissive="#E8A9C2"
          emissiveIntensity={0.7}
          roughness={0.2}
        />
      </mesh>
      {[0.7, 1.15, 1.6].map((r, i) => (
        <mesh
          key={r}
          ref={(el) => {
            rings.current[i] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[r, 0.04, 12, 48]} />
          <meshStandardMaterial
            color={RING_COLORS[i]}
            emissive={RING_COLORS[i]}
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};
