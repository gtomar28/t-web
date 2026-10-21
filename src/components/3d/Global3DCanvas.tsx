import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PersistentCoreBlock } from "./PersistentCoreBlock";
import { SiteSettings } from "../../types";
import { TrevykLogo } from "../TrevykLogo";

interface Global3DCanvasProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  settings: SiteSettings;
  hoveredCube?: number | null;
  onCubeHover?: (index: number | null) => void;
  currentPath?: string;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const Global3DCanvas: React.FC<Global3DCanvasProps> = ({
  scrollProgress,
  mousePos,
  settings,
  hoveredCube,
  onCubeHover,
  currentPath = "/",
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const path = currentPath.toLowerCase();
  const isHome = path === "/" || path === "";

  // Kiduart uses its own art direction — no floating cube companion.
  if (path.startsWith("/kiduart")) {
    return null;
  }

  const isLightSection = path.startsWith("/kiduart");

  // Hero owns early home interaction  fade global companion in after hero
  const canvasOpacity = useMemo(() => {
    if (isHome) {
      // Plum footer solar stage — hide WebGL so video + footer content read clearly
      if (scrollProgress >= 0.68) return 0;
      if (scrollProgress < 0.12) return 0;
      if (scrollProgress < 0.22)
        return smoothstep(0.12, 0.22, scrollProgress) * 0.55;
      return 0.5;
    }
    if (path.startsWith("/services")) {
      return 0.4 + scrollProgress * 0.08;
    }
    if (path.startsWith("/technology")) {
      // Damp companion WebGL so Technology Spline can own the heavy budget.
      return 0.12;
    }
    if (path.startsWith("/kiduart")) {
      return 0.45 + scrollProgress * 0.08;
    }
    if (path.startsWith("/process")) {
      return 0.48 + scrollProgress * 0.08;
    }
    if (path.startsWith("/about")) {
      return 0.52;
    }
    if (path.startsWith("/contact")) {
      return 0.45;
    }
    return 0.5;
  }, [isHome, path, scrollProgress]);

  // Canvas stays non-interactive so page UI remains clickable;
  // Technology page drives cube hover via layer buttons instead.
  const fallbackTransform = useMemo(() => {
    if (path.startsWith("/services")) {
      return isMobile
        ? "translate(40px, -40px) scale(0.7)"
        : `translate(280px, ${-20 - scrollProgress * 80}px) scale(0.78)`;
    }
    if (path.startsWith("/technology")) {
      return isMobile
        ? "translate(0px, -20px) scale(0.85)"
        : `translate(0px, ${-10 - scrollProgress * 40}px) scale(0.95)`;
    }
    if (path.startsWith("/kiduart")) {
      return isMobile
        ? "translate(30px, -30px) scale(0.72)"
        : `translate(240px, ${-10 - scrollProgress * 60}px) scale(0.8)`;
    }
    if (path.startsWith("/process")) {
      return isMobile
        ? "translate(40px, -20px) scale(0.7)"
        : `translate(260px, ${scrollProgress * -50}px) scale(0.78)`;
    }
    if (path.startsWith("/about")) {
      return isMobile
        ? "translate(20px, -20px) scale(0.75)"
        : `translate(220px, ${-scrollProgress * 40}px) scale(0.85)`;
    }
    if (path.startsWith("/contact")) {
      return isMobile
        ? "translate(0px, -30px) scale(0.72)"
        : `translate(200px, ${10 - scrollProgress * 50}px) scale(0.82)`;
    }
    if (isHome) {
      if (scrollProgress < 0.15) {
        return isMobile
          ? "translate(0px, -60px) scale(1.05)"
          : "translate(220px, 0px) scale(1.1)";
      }
      if (scrollProgress < 0.35) return "translate(300px, -160px) scale(0.75)";
      if (scrollProgress < 0.55) return "translate(-260px, 20px) scale(0.7)";
      if (scrollProgress < 0.8) return "translate(240px, 40px) scale(0.72)";
      return "translate(0px, 80px) scale(1.05)";
    }
    return isMobile
      ? "translate(0px, -40px) scale(0.8)"
      : "translate(200px, 0px) scale(0.85)";
  }, [path, isHome, isMobile, scrollProgress]);

  if (!hasWebGL || !settings.highQuality3D) {
    return (
      <div
        id="global-3d-fallback"
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden transition-opacity duration-700"
        style={{ opacity: canvasOpacity * 0.9 }}
      >
        <div
          className="transition-all duration-700 ease-out"
          style={{ transform: fallbackTransform }}
        >
          <TrevykLogo layout="icon-only" size="xl" theme="dark" />
        </div>
      </div>
    );
  }

  return (
    <div
      id="global-persistent-3d-container"
      className="fixed inset-0 z-0 overflow-hidden transition-opacity duration-500 pointer-events-none"
      style={{ opacity: canvasOpacity }}
      aria-hidden="true"
    >
      {/* Soft atmospheric wash that tracks brand light/dark bands */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isLightSection
            ? "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(231,225,240,0.12), transparent 70%)"
            : "radial-gradient(ellipse 55% 45% at 75% 35%, rgba(107,74,135,0.14), transparent 65%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: isMobile ? 48 : 42 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop={
          settings.reducedMotion || canvasOpacity < 0.05 ? "demand" : "always"
        }
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight
            intensity={isLightSection ? 1.45 : 1.15}
            color={isLightSection ? "#F8F6FB" : "#E7E1F0"}
          />

          <spotLight
            position={[5, 7, 6]}
            angle={0.42}
            penumbra={0.95}
            intensity={isLightSection ? 2.35 : 2.2}
            color="#E8A9C2"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />

          <directionalLight
            position={[-4, -3, -2]}
            intensity={isLightSection ? 1.05 : 1.1}
            color="#C4B0E0"
          />

          <pointLight position={[0, 4, 3]} intensity={1.05} color="#B9A6D1" />
          <pointLight position={[-3, 1, 2]} intensity={0.45} color="#E8A9C2" />

          <fog
            attach="fog"
            args={[isLightSection ? "#E7E1F0" : "#2A1830", 8, 16]}
          />

          <PersistentCoreBlock
            scrollProgress={scrollProgress}
            mousePos={mousePos}
            hoveredCube={hoveredCube}
            onCubeHover={onCubeHover}
            reducedMotion={settings.reducedMotion}
            isMobile={isMobile}
            currentPath={currentPath}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
