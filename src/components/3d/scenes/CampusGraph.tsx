import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CampusGraphProps {
  step: number;
  nodeCount?: number;
  reducedMotion?: boolean;
  /** Light-band friendly materials */
  lightBand?: boolean;
}

const NODE_LABELS = [
  "Admissions",
  "Records",
  "Attendance",
  "Fees",
  "Parents",
  "Exams",
];

/**
 * Soft campus node network  Kiduart product language.
 */
export const CampusGraph: React.FC<CampusGraphProps> = ({
  step,
  nodeCount = 6,
  reducedMotion = false,
  lightBand = true,
}) => {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);

  const positions = useMemo(() => {
    const n = Math.min(nodeCount, NODE_LABELS.length);
    return Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = 1.35;
      return new THREE.Vector3(
        Math.cos(a) * r,
        Math.sin(a) * r * 0.75,
        Math.sin(a * 2) * 0.25,
      );
    });
  }, [nodeCount]);

  const lineGeo = useMemo(() => {
    const edges: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      const next = (i + 1) % positions.length;
      edges.push(
        positions[i].x,
        positions[i].y,
        positions[i].z,
        positions[next].x,
        positions[next].y,
        positions[next].z,
      );
      // spokes to center
      edges.push(positions[i].x, positions[i].y, positions[i].z, 0, 0, 0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(edges, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reducedMotion) {
      group.current.rotation.z = Math.sin(t * 0.2) * 0.08;
      group.current.rotation.y = t * 0.08;
    }
    const active = step % positions.length;
    nodes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const on = i === active;
      const s = on ? 1.35 : 0.9;
      mesh.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = on ? 0.85 : 0.2;
    });
  });

  const ink = lightBand ? "#6B4A87" : "#E8A9C2";
  const glow = lightBand ? "#E8A9C2" : "#B9A6D1";

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={ink} transparent opacity={0.45} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={glow}
          emissive={glow}
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>
      {positions.map((pos, i) => (
        <mesh
          key={NODE_LABELS[i]}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          position={pos}
        >
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? ink : glow}
            emissive={glow}
            emissiveIntensity={0.2}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};
