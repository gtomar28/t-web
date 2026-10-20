import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LayerStackProps {
  focus: number | null;
  reducedMotion?: boolean;
}

const LAYERS = [
  { y: 1.4, color: "#E8A9C2", name: "Edge" },
  { y: 0.7, color: "#C4B0E0", name: "Gateway" },
  { y: 0, color: "#8B6BA8", name: "Services" },
  { y: -0.7, color: "#6B4A87", name: "Domain" },
  { y: -1.4, color: "#B9A6D1", name: "Data" },
];

/**
 * Five translucent slabs  Technology language distinct from cubes.
 */
export const LayerStack: React.FC<LayerStackProps> = ({
  focus,
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);
  const slabs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.rotation.y = t * 0.12;
    }
    slabs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const active = focus === null || focus === i;
      const boost = focus === i ? 0.22 : 0;
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, boost, 0.1);
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        active ? (focus === i ? 0.95 : 0.55) : 0.2,
        0.1,
      );
      mat.emissiveIntensity = focus === i ? 0.6 : 0.12;
    });
  });

  return (
    <group ref={group}>
      {LAYERS.map((layer, i) => (
        <mesh
          key={layer.name}
          ref={(el) => {
            slabs.current[i] = el;
          }}
          position={[0, layer.y, 0]}
          rotation={[0.15, 0.25, 0]}
        >
          <boxGeometry args={[2.4, 0.42, 1.5]} />
          <meshPhysicalMaterial
            color={layer.color}
            emissive={layer.color}
            emissiveIntensity={0.12}
            roughness={0.25}
            metalness={0.15}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};
