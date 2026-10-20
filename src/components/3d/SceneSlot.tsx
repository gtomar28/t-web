import React, { useEffect, useRef } from "react";
import { HomeSceneId, useHomeSceneOptional } from "./HomeSceneContext";

interface SceneSlotProps {
  id: HomeSceneId;
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

/**
 * DOM track target for a HomeSceneHost View portal.
 */
export const SceneSlot: React.FC<SceneSlotProps> = ({
  id,
  className = "",
  children,
  label,
}) => {
  const ctx = useHomeSceneOptional();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx) return;
    ctx.registerTrack(id, ref);
    return () => ctx.registerTrack(id, null);
  }, [ctx, id]);

  return (
    <div
      ref={ref}
      data-scene-slot={id}
      className={`relative ${className}`}
      role="img"
      aria-label={label ?? `${id} interactive scene`}
    >
      {children}
    </div>
  );
};
