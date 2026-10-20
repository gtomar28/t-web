import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BrandMarkFieldProps {
  principle: number | null;
  mousePos?: { x: number; y: number };
  reducedMotion?: boolean;
}

/**
 * Abstracted Trevyk Y from thin bars  not the 5-cube core.
 */
export const BrandMarkField: React.FC<BrandMarkFieldProps> = ({
  principle,
  mousePos = { x: 0, y: 0 },
  reducedMotion = false,
}) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = reducedMotion ? 0 : mousePos.x * 0.25;
    const targetX = reducedMotion ? 0.2 : 0.2 + mousePos.y * 0.15;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY + (reducedMotion ? 0 : Math.sin(t * 0.2) * 0.05),
      0.06,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.06,
    );
    const pulse = principle !== null ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.08);
  });

  const bar = (
    pos: [number, number, number],
    rot: [number, number, number],
    len: number,
    color: string,
  ) => (
    <mesh position={pos} rotation={rot}>
      <boxGeometry args={[0.12, len, 0.12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        metalness={0.45}
        roughness={0.25}
      />
    </mesh>
  );

  return (
    <group ref={group}>
      {/* Y: left arm, right arm, stem */}
      {bar([-0.55, 0.55, 0], [0, 0, 0.55], 1.4, "#E8A9C2")}
      {bar([0.55, 0.55, 0], [0, 0, -0.55], 1.4, "#B9A6D1")}
      {bar([0, -0.55, 0], [0, 0, 0], 1.5, "#6B4A87")}
      {/* Field dots */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={x} position={[x, -1.3 + (i % 2) * 0.2, -0.4]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i === principle ? "#E8A9C2" : "#6B4A87"} />
        </mesh>
      ))}
    </group>
  );
};
