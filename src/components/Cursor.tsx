import React, { useEffect, useRef, useState } from "react";
import { isTouchDevice } from "../utils/math";

type CursorType = "default" | "pointer" | "3d" | "drag";

interface CursorProps {
  reducedMotion?: boolean;
}

const HALO_SIZE: Record<CursorType, number> = {
  default: 32,
  pointer: 56,
  "3d": 72,
  drag: 56,
};

/**
 * Custom cursor — position updates via rAF + transform (no React per-frame).
 * Hit-testing is throttled so clicks are not blocked by main-thread work.
 */
export const Cursor: React.FC<CursorProps> = ({ reducedMotion = false }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const typeRef = useRef<CursorType>("default");
  const labelRefText = useRef("");

  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [uiType, setUiType] = useState<CursorType>("default");
  const [uiLabel, setUiLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (isTouchDevice() || reducedMotion) {
      setIsTouch(true);
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");
    setMounted(true);

    let hitFrame = 0;

    const applyVisuals = () => {
      const { x, y } = posRef.current;
      const type = typeRef.current;
      const size = HALO_SIZE[type];
      const half = size / 2;

      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${x - 4}px, ${y - 4}px, 0) scale(${type === "pointer" ? 0 : 1})`,
      );
      haloRef.current?.style.setProperty(
        "transform",
        `translate3d(${x - half}px, ${y - half}px, 0)`,
      );
    };

    const schedulePaint = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        applyVisuals();
      });
    };

    const resolveTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return;

      const interactive = el.closest(
        "button, a, input, [role='button'], .interactive-target",
      );
      const canvasTarget = el.closest("#three-canvas-wrapper, canvas");
      const customLabel = el
        .closest("[data-cursor-label]")
        ?.getAttribute("data-cursor-label");

      let nextType: CursorType = "default";
      let nextLabel = "";

      if (customLabel) {
        nextType = "pointer";
        nextLabel = customLabel;
      } else if (canvasTarget) {
        nextType = "3d";
        nextLabel = "TILT 3D";
      } else if (interactive) {
        nextType = "pointer";
      }

      if (nextType !== typeRef.current || nextLabel !== labelRefText.current) {
        typeRef.current = nextType;
        labelRefText.current = nextLabel;
        setUiType(nextType);
        setUiLabel(nextLabel);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      schedulePaint();

      const frame = ++hitFrame;
      requestAnimationFrame(() => {
        if (frame !== hitFrame) return;
        resolveTarget(e.target);
      });
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const handleMouseEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  if (!mounted || isTouch || reducedMotion || !visible) return null;

  const haloSize = HALO_SIZE[uiType];

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#E8A9C2] shadow-[0_0_12px_#E8A9C2] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      <div
        ref={haloRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-[#B9A6D1]/60 will-change-transform"
        style={{
          width: haloSize,
          height: haloSize,
          transform: "translate3d(-100px, -100px, 0)",
          backgroundColor:
            uiType === "3d"
              ? "rgba(107, 74, 135, 0.25)"
              : uiType === "pointer"
                ? "rgba(232, 169, 194, 0.18)"
                : "rgba(42, 24, 48, 0.05)",
          borderColor:
            uiType === "3d" || uiType === "pointer" ? "#E8A9C2" : "#B9A6D1",
          transition:
            "width 120ms ease-out, height 120ms ease-out, background-color 120ms, border-color 120ms",
        }}
      >
        {uiLabel ? (
          <span
            ref={labelRef}
            className="select-none px-1 text-center font-mono-accent text-[9px] font-bold uppercase leading-none tracking-wider text-[#F8F6FB]"
          >
            {uiLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
