import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  ARCHITECTURE_TEASER_LAYERS,
  type ArchitectureTeaserLayer,
} from "../../data/architectureTeaserLayers";
import { ArchitectureStackHero } from "./ArchitectureStackHero";

type Props = {
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
};

type Route = {
  index: number;
  d: string;
  sx: number;
  sy: number;
  cx: number;
  cy: number;
};

const H_STUB = 44;

function buildCircuitPath(
  sx: number,
  sy: number,
  cx: number,
  cy: number,
  side: "left" | "right",
): string {
  const midX = side === "left" ? sx - H_STUB : sx + H_STUB;
  return `M ${sx} ${sy} H ${midX} V ${cy} H ${cx}`;
}

function LayerDetailCardInner({
  layer,
  emphasized,
}: {
  layer: ArchitectureTeaserLayer;
  emphasized: boolean;
}) {
  return (
    <div className="relative z-20">
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[1.15rem] transition-opacity duration-300 ${
          emphasized ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 65% at 22% 18%, ${layer.accent}55, transparent 62%), radial-gradient(ellipse 55% 45% at 85% 75%, rgba(107,74,135,0.4), transparent 68%)`,
          filter: "blur(12px)",
        }}
      />
      <div
        className={`relative rounded-2xl border bg-[#1E1024]/82 p-4 shadow-[inset_0_1px_0_rgba(248,246,251,0.28),0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl ring-1 transition-all duration-300 sm:p-5 ${
          emphasized
            ? "border-[#F8F6FB]/45 ring-[#E8A9C2]/40 shadow-[inset_0_1px_0_rgba(248,246,251,0.32),0_0_32px_rgba(232,169,194,0.28),0_0_56px_rgba(107,74,135,0.22),0_16px_40px_rgba(0,0,0,0.35)]"
            : "border-[#F8F6FB]/18 ring-[#B9A6D1]/10"
        }`}
      >
      <div className="flex items-start gap-2.5">
        <span
          className="mt-1 h-2 w-2 shrink-0 rounded-full transition-[box-shadow] duration-300"
          style={{
            backgroundColor: layer.accent,
            boxShadow: emphasized
              ? `0 0 12px ${layer.accent}`
              : `0 0 6px ${layer.accent}88`,
          }}
          aria-hidden
        />
        <div>
          <p className="font-mono-accent text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8A9C2]">
            {layer.num} {layer.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#E7E1F0]">
            {layer.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {layer.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#B9A6D1]/35 bg-[#2A1830]/45 px-2.5 py-1 font-mono-accent text-[9px] uppercase tracking-wide text-[#B9A6D1]"
          >
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}

function MeasuredCircuitConnector({
  layer,
  route,
  active,
}: {
  layer: ArchitectureTeaserLayer;
  route: Route | undefined;
  active: boolean;
}) {
  if (!route) return null;

  const stroke = active ? layer.accent : "#B9A6D1";
  const opacity = active ? 1 : 0.38;

  return (
    <g className="transition-opacity duration-300">
      {active ? (
        <>
          <path
            d={route.d}
            fill="none"
            stroke={stroke}
            strokeWidth={10}
            strokeOpacity={0.35}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={route.d}
            fill="none"
            stroke={stroke}
            strokeWidth={5}
            strokeOpacity={0.45}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : null}
      <path
        d={route.d}
        fill="none"
        stroke={stroke}
        strokeWidth={active ? 2.25 : 1.5}
        strokeOpacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={route.cx}
        cy={route.cy}
        r={active ? 3.5 : 2.5}
        fill={active ? layer.accent : "#1E1024"}
        stroke={stroke}
        strokeWidth={1.25}
        strokeOpacity={opacity * 0.85}
      />
    </g>
  );
}

function LayerCard({
  layer,
  activeIndex,
  cardRef,
}: {
  layer: ArchitectureTeaserLayer;
  activeIndex: number | null;
  cardRef: (index: number, el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={(el) => cardRef(layer.index, el)} data-arch-card={layer.index}>
      <LayerDetailCardInner
        layer={layer}
        emphasized={activeIndex === layer.index}
      />
    </div>
  );
}

export const ArchitectureStackDiagram: React.FC<Props> = ({
  activeIndex,
  onActiveChange,
}) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const layerAnchors = useRef<(HTMLDivElement | null)[]>([]);
  const cardAnchors = useRef<(HTMLDivElement | null)[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 1, h: 1 });

  const setLayerAnchor = useCallback((index: number, el: HTMLDivElement | null) => {
    layerAnchors.current[index] = el;
  }, []);

  const setCardAnchor = useCallback((index: number, el: HTMLDivElement | null) => {
    cardAnchors.current[index] = el;
  }, []);

  const measureRoutes = useCallback(() => {
    const root = layoutRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    if (rootRect.width < 1 || rootRect.height < 1) return;

    setSvgSize({ w: rootRect.width, h: rootRect.height });

    const next: Route[] = ARCHITECTURE_TEASER_LAYERS.map((layer) => {
      const layerEl = layerAnchors.current[layer.index];
      const cardEl = cardAnchors.current[layer.index];
      if (!layerEl || !cardEl) {
        return { index: layer.index, d: "", sx: 0, sy: 0, cx: 0, cy: 0 };
      }

      const layerRect = layerEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const isLeft = layer.cardSide === "left";

      const sy = layerRect.top - rootRect.top + layerRect.height * 0.56;
      const cy = cardRect.top - rootRect.top + cardRect.height / 2;

      /** Stack edge toward the card — line sits behind slabs (z-index) */
      const sx = isLeft
        ? layerRect.left - rootRect.left + 6
        : layerRect.right - rootRect.left - 6;

      /** Card inner edge (toward stack) — line terminates behind the card panel */
      const cx = isLeft
        ? cardRect.right - rootRect.left - 3
        : cardRect.left - rootRect.left + 3;

      const d = buildCircuitPath(sx, sy, cx, cy, layer.cardSide);

      return { index: layer.index, d, sx, sy, cx, cy };
    }).filter((r) => r.d.length > 0);

    setRoutes(next);
  }, []);

  useLayoutEffect(() => {
    measureRoutes();
    const t = window.setTimeout(measureRoutes, 120);
    const root = layoutRef.current;
    if (!root) return () => clearTimeout(t);

    const ro = new ResizeObserver(() => measureRoutes());
    ro.observe(root);

    window.addEventListener("resize", measureRoutes);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measureRoutes);
    };
  }, [measureRoutes, activeIndex]);

  const layerByIndex = (i: number) =>
    ARCHITECTURE_TEASER_LAYERS.find((l) => l.index === i)!;

  const routeByIndex = (i: number) => routes.find((r) => r.index === i);

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="relative hidden lg:block">
        <div
          ref={layoutRef}
          className="relative flex items-center justify-center gap-4 py-3 xl:gap-8"
        >
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            width={svgSize.w}
            height={svgSize.h}
            viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
            aria-hidden
          >
            {ARCHITECTURE_TEASER_LAYERS.map((layer) => (
              <MeasuredCircuitConnector
                key={layer.index}
                layer={layer}
                route={routeByIndex(layer.index)}
                active={activeIndex === layer.index}
              />
            ))}
          </svg>

          <div className="relative z-20 flex min-w-0 flex-1 flex-col items-end justify-center gap-5 pr-1 xl:gap-6 xl:pr-2">
            {[0, 2, 4].map((i) => (
              <div key={i} className="w-full max-w-[17.5rem] xl:max-w-[18.5rem]">
                <LayerCard
                  layer={layerByIndex(i)}
                  activeIndex={activeIndex}
                  cardRef={setCardAnchor}
                />
              </div>
            ))}
          </div>

          <div className="relative z-20 shrink-0 px-1">
            <ArchitectureStackHero
              activeIndex={activeIndex}
              onActiveChange={onActiveChange}
              onLayerAnchorRef={setLayerAnchor}
            />
          </div>

          <div className="relative z-20 flex min-w-0 flex-1 flex-col items-start justify-center gap-5 pl-1 xl:gap-6 xl:pl-2">
            {[1, 3].map((i) => (
              <div key={i} className="w-full max-w-[17.5rem] xl:max-w-[18.5rem]">
                <LayerCard
                  layer={layerByIndex(i)}
                  activeIndex={activeIndex}
                  cardRef={setCardAnchor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <ArchitectureStackHero
          activeIndex={activeIndex}
          onActiveChange={onActiveChange}
        />
        <div className="relative z-30 mx-auto mt-6 flex max-w-md flex-col gap-4 px-1">
          {ARCHITECTURE_TEASER_LAYERS.map((layer) => (
            <LayerDetailCardInner
              key={layer.index}
              layer={layer}
              emphasized={activeIndex === layer.index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
