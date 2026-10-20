import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CapabilityLatticeProps {
  focus: number | null;
  reducedMotion?: boolean;
}

const PRISMS = [
  { pos: [-1.1, 0.15, 0] as const, color: "#E8A9C2", label: "Product" },
  { pos: [0, 0.35, 0.2] as const, color: "#6B4A87", label: "Engineering" },
  { pos: [1.1, 0.05, -0.15] as const, color: "#B9A6D1", label: "Cloud" },
];

/**
 * Three interlocking prisms  unique Services visual language.
 */
export const CapabilityLattice: React.FC<CapabilityLatticeProps> = ({
  focus,
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.2;
      group.current.rotation.x = 0.15 + Math.sin(t * 0.18) * 0.05;
    }
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const active = focus === null || focus === i;
      const target = active ? (focus === i ? 1.18 : 1) : 0.72;
      mesh.scale.lerp(new THREE.Vector3(target, target * 1.35, target), 0.08);
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        active ? 0.92 : 0.35,
        0.08,
      );
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        focus === i ? 0.55 : 0.15,
        0.08,
      );
    });
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {PRISMS.map((p, i) => (
        <mesh
          key={p.label}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={[...p.pos]}
          rotation={[0.4, i * 0.55, 0.2]}
        >
          <boxGeometry args={[0.7, 1.1, 0.7]} />
          <meshPhysicalMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.15}
            roughness={0.35}
            metalness={0.2}
            transparent
            opacity={0.9}
            transmission={0.05}
          />
        </mesh>
      ))}
      {/* Cross-brace bars */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial
          color="#B9A6D1"
          emissive="#6B4A87"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, -0.35, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.025, 0.025, 2.2, 8]} />
        <meshStandardMaterial
          color="#E8A9C2"
          emissive="#E8A9C2"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
};
