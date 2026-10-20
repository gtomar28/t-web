import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { useHomeScene } from "./HomeSceneContext";
import { CoreBlock } from "./CoreBlock";
import { CapabilityLattice } from "./scenes/CapabilityLattice";
import { LayerStack } from "./scenes/LayerStack";
import { CampusGraph } from "./scenes/CampusGraph";
import { DeliveryPipeline } from "./scenes/DeliveryPipeline";
import { BrandMarkField } from "./scenes/BrandMarkField";
import { SignalBeacon } from "./scenes/SignalBeacon";

function SceneLights({ bright = false }: { bright?: boolean }) {
  return (
    <>
      <ambientLight intensity={bright ? 1.2 : 0.95} color="#E7E1F0" />
      <directionalLight position={[-3, 4, -2]} intensity={1.4} color="#E8A9C2" />
      <directionalLight position={[4, 5, 4]} intensity={2.1} color="#F8F6FB" />
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#B9A6D1" />
    </>
  );
}

function hasEl(ref?: React.RefObject<HTMLElement | null> | null) {
  return Boolean(ref?.current);
}

/**
 * Single WebGL context for all homepage section Views.
 */
export const HomeSceneHost: React.FC = () => {
  const ctx = useHomeScene();
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      setWebgl(Boolean(gl));
    } catch {
      setWebgl(false);
    }
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    setReady(true);
    // Re-check tracks after layout
    const id = window.setTimeout(() => setTick((t) => t + 1), 50);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(id);
    };
  }, []);

  // Re-render when tracks map changes so Views attach after slots mount
  useEffect(() => {
    setTick((t) => t + 1);
  }, [ctx.tracks]);

  const eventSource = useMemo(() => {
    if (typeof document === "undefined") return undefined;
    return (
      (document.getElementById("home-page") as HTMLElement | null) ??
      (document.getElementById("trevyk-app") as HTMLElement | null) ??
      document.body
    );
  }, [ready, tick]);

  if (!webgl || !ctx.highQuality3D || !ready || !eventSource) {
    return null;
  }

  const {
    tracks,
    reducedMotion,
    mousePos,
    scrollProgress,
    disassembled,
    hoveredCube,
    onCubeHover,
    onEasterEggTrigger,
    latticeFocus,
    layerFocus,
    campusStep,
    processStage,
    contactTrack,
    aboutPrinciple,
  } = ctx;

  const dpr: [number, number] = isMobile ? [1, 1.35] : [1, 1.5];

  return (
    <Canvas
      className="!fixed inset-0"
      style={{ zIndex: 5, pointerEvents: "none" }}
      eventSource={eventSource}
      eventPrefix="client"
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        {hasEl(tracks.hero) && tracks.hero && (
          <View track={tracks.hero}>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, isMobile ? 6.2 : 5.8]}
              fov={isMobile ? 50 : 42}
            />
            <SceneLights bright />
            <CoreBlock
              scrollProgress={scrollProgress}
              mousePos={mousePos}
              disassembled={disassembled}
              hoveredCube={hoveredCube}
              onCubeHover={onCubeHover}
              onEasterEggTrigger={onEasterEggTrigger}
              reducedMotion={reducedMotion}
            />
          </View>
        )}

        {hasEl(tracks.services) && tracks.services && (
          <View track={tracks.services}>
            <PerspectiveCamera makeDefault position={[0, 0.2, 4.8]} fov={42} />
            <SceneLights />
            <CapabilityLattice
              focus={latticeFocus}
              reducedMotion={reducedMotion}
            />
          </View>
        )}

        {hasEl(tracks.technology) && tracks.technology && (
          <View track={tracks.technology}>
            <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={40} />
            <SceneLights />
            <LayerStack
              focus={layerFocus ?? hoveredCube}
              reducedMotion={reducedMotion}
            />
          </View>
        )}

        {hasEl(tracks.kiduart) && tracks.kiduart && (
          <View track={tracks.kiduart}>
            <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={42} />
            <SceneLights />
            <CampusGraph
              step={campusStep}
              reducedMotion={reducedMotion}
              lightBand
            />
          </View>
        )}

        {hasEl(tracks.process) && tracks.process && (
          <View track={tracks.process}>
            <PerspectiveCamera makeDefault position={[0, 0.4, 4.8]} fov={40} />
            <SceneLights />
            <DeliveryPipeline
              stage={processStage}
              reducedMotion={reducedMotion}
            />
          </View>
        )}

        {hasEl(tracks.about) && tracks.about && (
          <View track={tracks.about}>
            <PerspectiveCamera makeDefault position={[0, 0, 4.6]} fov={42} />
            <SceneLights />
            <BrandMarkField
              principle={aboutPrinciple}
              mousePos={mousePos}
              reducedMotion={reducedMotion}
            />
          </View>
        )}

        {hasEl(tracks.contact) && tracks.contact && (
          <View track={tracks.contact}>
            <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />
            <SceneLights />
            <SignalBeacon track={contactTrack} reducedMotion={reducedMotion} />
          </View>
        )}
      </Suspense>
    </Canvas>
  );
};
