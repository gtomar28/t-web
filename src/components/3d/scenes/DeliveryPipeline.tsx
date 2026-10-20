import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DeliveryPipelineProps {
  stage: number;
  reducedMotion?: boolean;
}

const STAGES = 5;

/**
 * Stepped delivery rail with traveling tokens  Process language.
 */
export const DeliveryPipeline: React.FC<DeliveryPipelineProps> = ({
  stage,
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);
  const tokens = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.rotation.x = 0.35 + Math.sin(t * 0.15) * 0.04;
    }
    tokens.current.forEach((mesh, i) => {
      if (!mesh) return;
      const active = i === stage;
      const y = active ? 0.35 : 0;
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, y, 0.12);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = active ? 0.9 : 0.15;
      mesh.scale.setScalar(active ? 1.25 : 0.85);
    });
  });

  return (
    <group ref={group} rotation={[-0.4, 0.35, 0]}>
      {/* Rail */}
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 3.6, 12]} />
        <meshStandardMaterial color="#6B4A87" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Step platforms */}
      {Array.from({ length: STAGES }).map((_, i) => {
        const x = -1.6 + i * 0.8;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, -0.05, 0]}>
              <boxGeometry args={[0.55, 0.12, 0.55]} />
              <meshStandardMaterial
                color={i === stage ? "#E8A9C2" : "#2A1830"}
                emissive={i === stage ? "#E8A9C2" : "#6B4A87"}
                emissiveIntensity={i === stage ? 0.35 : 0.1}
              />
            </mesh>
            <mesh
              ref={(el) => {
                tokens.current[i] = el;
              }}
              position={[0, 0.2, 0]}
            >
              <octahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial
                color="#B9A6D1"
                emissive="#E8A9C2"
                emissiveIntensity={0.15}
                metalness={0.3}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
