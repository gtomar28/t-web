import React from "react";
import { KIDUART_TEASER_JOURNEY } from "../../data/kiduartTeaserJourney";

interface CampusGraphIllustrationProps {
  step: number;
  reducedMotion?: boolean;
  className?: string;
}

export const CampusGraphIllustration: React.FC<CampusGraphIllustrationProps> = ({
  step,
  reducedMotion = false,
  className = "",
}) => {
  const count = KIDUART_TEASER_JOURNEY.length;
  const active = ((step % count) + count) % count;
  const activeTitle = KIDUART_TEASER_JOURNEY[active]?.title ?? "Campus";

  return (
    <div className={className}>
      <div className="relative overflow-hidden">
        <img
          src="/images/kiduart/campus-graph.jpg"
          alt="Isometric connected school campus — head office, branches, library, sports, transport, and finance modules linked as one graph"
          className="block w-full aspect-[4/3] object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0f18]/35 via-transparent to-[#1a0f18]/15"
          aria-hidden
        />
        {KIDUART_TEASER_JOURNEY.map((node, i) => {
          const on = i === active;
          return (
            <div
              key={node.title}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.graph.x}%`, top: `${node.graph.y}%` }}
              aria-hidden={!on}
            >
              <div
                className={`relative h-3 w-3 rounded-full border-2 border-[#F8F6FB]/90 bg-[#E8A9C2] transition-opacity duration-300 ${
                  on ? "opacity-100" : "opacity-35"
                }`}
              >
                {on && !reducedMotion ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#E8A9C2]/50" />
                ) : null}
                {on ? (
                  <span className="absolute -inset-2 rounded-full bg-[#B9A6D1]/25 blur-md" />
                ) : null}
              </div>
            </div>
          );
        })}
        <p className="sr-only">Active module: {activeTitle}</p>
      </div>
    </div>
  );
};
