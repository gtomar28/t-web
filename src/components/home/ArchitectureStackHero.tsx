import React from "react";
import { soundEngine } from "../../utils/audioEngine";
import { ARCHITECTURE_TEASER_LAYERS } from "../../data/architectureTeaserLayers";

const SLAB = 120;
/** Pull each layer up so it sits behind the one above (reference stack) */
const STACK_OVERLAP = 50;

const ISO = "rotateX(14deg) rotateZ(0deg)";

type Props = {
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
  /** Measured anchor for circuit lines (layer ↔ card) */
  onLayerAnchorRef?: (index: number, el: HTMLDivElement | null) => void;
};

export const ArchitectureStackHero: React.FC<Props> = ({
  activeIndex,
  onActiveChange,
  onLayerAnchorRef,
}) => {
  const stackHeight =
    SLAB + (ARCHITECTURE_TEASER_LAYERS.length - 1) * (SLAB - STACK_OVERLAP);

  return (
    <div
      className="relative z-20 mx-auto w-full max-w-[24rem] sm:max-w-md"
      onMouseLeave={() => onActiveChange(null)}
    >
      <div
        className="relative mx-auto flex w-full flex-col items-center py-2"
        style={{ perspective: "1200px", minHeight: stackHeight }}
      >
        {ARCHITECTURE_TEASER_LAYERS.map((layer) => {
          const active = activeIndex === layer.index;
          /** Fixed stack order — never promote hovered layer above others */
          const zIndex = 20 - layer.index;

          return (
            <div
              key={layer.index}
              ref={(el) => onLayerAnchorRef?.(layer.index, el)}
              data-arch-layer={layer.index}
              className="relative flex w-full justify-center"
              style={{
                transformStyle: "preserve-3d",
                marginTop: layer.index === 0 ? 0 : -STACK_OVERLAP,
                zIndex,
              }}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute left-1/2 top-[52%] z-0 h-[6.5rem] w-[9rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300 sm:h-28 sm:w-[10.5rem] ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: `radial-gradient(ellipse 70% 65% at 50% 50%, ${layer.accent}88 0%, ${layer.accent}33 42%, transparent 72%)`,
                }}
              />

              <div
                className="relative z-10 scale-[0.82] sm:scale-[0.92] lg:scale-100"
                style={{ width: SLAB, height: SLAB }}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: ISO,
                  }}
                >
                  <button
                    type="button"
                    aria-label={layer.name}
                    className="relative block h-full w-full appearance-none border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2]/70"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseEnter={() => {
                      soundEngine.playHover();
                      onActiveChange(layer.index);
                    }}
                  >
                    <img
                      src={layer.slabSrc}
                      alt=""
                      width={512}
                      height={512}
                      className="pointer-events-none h-full w-full object-contain"
                      draggable={false}
                      decoding="async"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="sr-only">Hover a layer to inspect architecture tier details</p>
    </div>
  );
};
