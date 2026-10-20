import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { lerp } from '../../utils/math';
import { soundEngine } from '../../utils/audioEngine';

interface CoreBlockProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
  disassembled?: boolean;
  hoveredCube?: number | null;
  onCubeHover?: (index: number | null) => void;
  onEasterEggTrigger?: () => void;
  reducedMotion?: boolean;
}

// 5 cubes forming the Trevyk "Y" architecture formation
const DEFAULT_CUBE_CONFIGS = [
  { id: 0, label: 'Edge Ingress', targetPos: [-0.85, 0.85, 0.15], color: '#E8A9C2', accent: true },
  { id: 1, label: 'API Gateway', targetPos: [0.85, 0.85, -0.15], color: '#C4B0E0', accent: false },
  { id: 2, label: 'Distributed Services', targetPos: [0, 0.15, 0], color: '#8B6BA8', accent: false },
  { id: 3, label: 'Modular ERP Core', targetPos: [0, -0.75, 0], color: '#6B4A87', accent: false },
  { id: 4, label: 'Resilient Data Store', targetPos: [0, -1.65, 0], color: '#B9A6D1', accent: false },
];

// Exploded / shattered positions for disassembly animation
const EXPLODED_POSITIONS = [
  [-2.6, 2.4, 1.2],
  [2.7, 2.2, -1.4],
  [0, 0.6, 2.0],
  [-1.5, -1.2, -1.8],
  [1.8, -2.6, 1.5],
];

export const CoreBlock: React.FC<CoreBlockProps> = ({
  scrollProgress = 0,
  mousePos = { x: 0, y: 0 },
  disassembled = false,
  hoveredCube = null,
  onCubeHover,
  onEasterEggTrigger,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<(THREE.Mesh | null)[]>([]);
  const shadowRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Hidden Easter Egg interaction state (wow #28)
  const [clickCount, setClickCount] = useState(0);
  const resonanceEnergy = useRef(0);
  const easterEggSpin = useRef(0);

  // Smooth interpolated values for physics feel
  const currentRotation = useRef({ x: 0.35, y: 0.55, z: 0 });
  const currentFloat = useRef(0);
  const currentExplode = useRef(disassembled ? 1 : 0);

  // Cube geometry with beveled look
  const cubeGeometry = useMemo(() => {
    return new THREE.BoxGeometry(0.72, 0.72, 0.72);
  }, []);

  // Soft shadow texture generated procedurally
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(10, 4, 16, 0.85)');
      gradient.addColorStop(0.3, 'rgba(42, 24, 48, 0.45)');
      gradient.addColorStop(0.7, 'rgba(42, 24, 48, 0.15)');
      gradient.addColorStop(1, 'rgba(42, 24, 48, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const handleCubeClick = (index: number) => {
    soundEngine.playCubeChime(index);
    resonanceEnergy.current = 1.0;
    
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        easterEggSpin.current = Math.PI * 4;
        soundEngine.playEasterEgg();
        onEasterEggTrigger?.();
        return 0;
      }
      return next;
    });
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Optimization: if scrolled far out of hero view, pause high-frequency physics
    if (scrollProgress > 0.35) return;

    const time = state.clock.getElapsedTime();

    // Decay resonance pulse and easter egg spin
    resonanceEnergy.current = lerp(resonanceEnergy.current, 0, 0.05);
    easterEggSpin.current = lerp(easterEggSpin.current, 0, 0.06);

    if (!reducedMotion) {
      // 1. Idle float oscillation (wow item #7)
      const floatOffset = Math.sin(time * 1.5) * 0.09;
      currentFloat.current = lerp(currentFloat.current, floatOffset, 0.08);

      // 2. Cursor parallax tilt (max ~12° tilt, wow item #6)
      const targetTiltX = 0.32 + mousePos.y * 0.18;
      const targetTiltY = 0.52 + mousePos.x * 0.22;

      // 3. Scroll-scrubbed rotation (wow item #8)
      const scrollRotY = scrollProgress * Math.PI * 1.2;
      const scrollRotX = scrollProgress * 0.4;

      currentRotation.current.x = lerp(
        currentRotation.current.x,
        targetTiltX + scrollRotX + Math.sin(time * 0.8) * 0.03,
        0.06
      );
      currentRotation.current.y = lerp(
        currentRotation.current.y,
        targetTiltY + scrollRotY + time * 0.05 + easterEggSpin.current,
        0.06
      );

      groupRef.current.position.y = currentFloat.current + 0.25 + resonanceEnergy.current * 0.15;
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;
    } else {
      // Static elegant isometric view for reduced motion
      groupRef.current.position.y = 0.25;
      groupRef.current.rotation.x = 0.35;
      groupRef.current.rotation.y = 0.55;
    }

    // 4. Disassembly animation interpolation (wow item #3)
    const targetExplode = disassembled ? 1 : 0;
    currentExplode.current = lerp(currentExplode.current, targetExplode, 0.08);

    // Update individual cubes positions & individual hover scale/lift
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      const config = DEFAULT_CUBE_CONFIGS[i];
      const exploded = EXPLODED_POSITIONS[i];

      const tx = lerp(config.targetPos[0], exploded[0], currentExplode.current);
      const ty = lerp(config.targetPos[1], exploded[1], currentExplode.current);
      const tz = lerp(config.targetPos[2], exploded[2], currentExplode.current);

      const isHovered = hoveredCube === i;
      const hoverScale = isHovered ? 1.08 : 1.0;
      const targetScale = (hoverScale + resonanceEnergy.current * 0.08) * (1 - currentExplode.current * 0.15);

      cube.position.x = lerp(cube.position.x, tx, 0.1);
      cube.position.y = lerp(cube.position.y, ty + (isHovered ? 0.08 : 0), 0.1);
      cube.position.z = lerp(cube.position.z, tz, 0.1);

      cube.scale.setScalar(lerp(cube.scale.x, targetScale, 0.12));

      // Individual cube rotation flutter when exploded
      if (currentExplode.current > 0.05) {
        cube.rotation.x = Math.sin(time * 2 + i) * currentExplode.current * 0.8;
        cube.rotation.y = Math.cos(time * 1.7 + i) * currentExplode.current * 0.8;
      } else {
        cube.rotation.x = lerp(cube.rotation.x, 0, 0.1);
        cube.rotation.y = lerp(cube.rotation.y, 0, 0.1);
      }
    });

    // 5. Soft moving contact shadow (wow item #10)
    if (shadowRef.current) {
      const shadowHeightFactor = 1 - currentFloat.current * 1.5;
      const shadowScale = (1.8 + currentExplode.current * 0.5) * shadowHeightFactor;
      shadowRef.current.scale.set(shadowScale, shadowScale, 1);
      const shadowMat = shadowRef.current.material as THREE.MeshBasicMaterial;
      if (shadowMat) {
        shadowMat.opacity = THREE.MathUtils.clamp(
          (0.7 - currentFloat.current * 0.8) * (1 - currentExplode.current * 0.4),
          0.2,
          0.85
        );
      }
    }

    // 6. Holographic Shockwave Ring (wow #28 Easter egg feedback)
    if (pulseRingRef.current) {
      if (resonanceEnergy.current > 0.02) {
        const ringScale = 1.0 + (1 - resonanceEnergy.current) * 2.2;
        pulseRingRef.current.scale.set(ringScale, ringScale, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = resonanceEnergy.current * 0.6;
        }
      } else {
        pulseRingRef.current.scale.set(0.001, 0.001, 1);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Moving Contact Shadow Plane */}
      <mesh
        ref={shadowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.4, 0]}
      >
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      {/* Holographic Resonance Shockwave Ring (Delight Item #28) */}
      <mesh
        ref={pulseRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0]}
      >
        <ringGeometry args={[1.2, 1.35, 48]} />
        <meshBasicMaterial
          color="#E8A9C2"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* The Core 3D "Y" Cube Cluster */}
      <group ref={groupRef}>
        {DEFAULT_CUBE_CONFIGS.map((config, index) => {
          const isHovered = hoveredCube === index;
          return (
            <mesh
              key={config.id}
              ref={(el) => { cubesRef.current[index] = el; }}
              geometry={cubeGeometry}
              position={[config.targetPos[0], config.targetPos[1], config.targetPos[2]]}
              castShadow
              receiveShadow
              onClick={(e) => {
                e.stopPropagation();
                handleCubeClick(index);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                soundEngine.playHover();
                onCubeHover?.(index);
              }}
              onPointerOut={() => {
                onCubeHover?.(null);
              }}
            >
              <meshPhysicalMaterial
                color={config.color}
                roughness={0.22}
                metalness={0.28}
                envMapIntensity={0.85}
                clearcoat={0.35}
                clearcoatRoughness={0.2}
                reflectivity={0.6}
                emissive={config.accent ? '#E8A9C2' : isHovered ? '#C4B0E0' : '#6B4A87'}
                emissiveIntensity={config.accent ? 0.45 : isHovered ? 0.55 : 0.22}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

