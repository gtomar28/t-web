import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  Database,
  Layers,
  Monitor,
  Plug,
  Shield,
} from "lucide-react";
import { technologyDarkBand, technologyModularArchitecture } from "../../config/media";

type ArchitectureLayer = {
  num: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const LAYERS: ArchitectureLayer[] = [
  {
    num: "01",
    title: "Presentation Layer",
    body: "Modern and responsive user interfaces for web and mobile applications.",
    icon: Monitor,
  },
  {
    num: "02",
    title: "Application Layer",
    body: "Business logic, APIs and core services that power the application.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Data Layer",
    body: "Secure and optimized data storage for structured and unstructured data.",
    icon: Database,
  },
  {
    num: "04",
    title: "Security & Access Control",
    body: "Authentication, authorization and role-based access to keep data and systems secure.",
    icon: Shield,
  },
  {
    num: "05",
    title: "Integrations & External Services",
    body: "Connection with third-party tools, APIs and external platforms when needed.",
    icon: Plug,
  },
];

export function ModularArchitectureSection() {
  return (
    <section
      id="modular-architecture"
      aria-labelledby="modular-architecture-heading"
      className="relative scroll-mt-28 sm:scroll-mt-32"
      style={{ backgroundColor: technologyDarkBand.base }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 40%, rgba(107,74,135,0.22) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          opacity: technologyDarkBand.gridOpacity,
          backgroundImage:
            "linear-gradient(#B9A6D1 1px, transparent 1px), linear-gradient(90deg, #B9A6D1 1px, transparent 1px)",
          backgroundSize: `${technologyDarkBand.gridSizePx}px ${technologyDarkBand.gridSizePx}px`,
        }}
      />

      <div className="relative py-14 sm:py-16 lg:py-20">
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 xl:gap-10">
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
                aria-hidden
              />
              Modular architecture
            </div>

            <h2
              id="modular-architecture-heading"
              className="mt-5 font-heading text-[clamp(1.65rem,3.8vw,2.35rem)] font-bold leading-[1.14] tracking-tight text-[#F8F6FB]"
            >
              Systems designed to work together.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#C4B4D8] sm:text-[15px]">
              We follow a modular and scalable architecture to build reliable, flexible
              and future-ready solutions. Each layer is designed to work independently
              while seamlessly connecting with the rest of the system.
            </p>

            <ul className="mt-8 space-y-2.5">
              {LAYERS.map((layer) => {
                const Icon = layer.icon;
                return (
                  <li key={layer.num}>
                    <div className="group flex items-center gap-3 rounded-2xl border border-[#B9A6D1]/25 bg-[#1E1024]/85 px-3.5 py-3.5 transition hover:border-[#E8A9C2]/45 sm:gap-4 sm:px-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B9A6D1]/35 bg-[#2A1830]/90 font-mono-accent text-[11px] font-semibold text-[#E8A9C2]"
                        aria-hidden
                      >
                        {layer.num}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#B9A6D1]/25 bg-[#2A1830]/70 text-[#E8A9C2]">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-heading text-sm font-bold text-[#F8F6FB] transition-colors group-hover:text-[#E8A9C2]">
                          {layer.title}
                        </div>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-[#B9A6D1] sm:text-xs">
                          {layer.body}
                        </p>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-[#B9A6D1]/60 transition group-hover:translate-x-0.5 group-hover:text-[#E8A9C2]"
                        aria-hidden
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex justify-center lg:col-span-7 lg:justify-end xl:col-span-7">
            <div className="relative w-full max-w-[min(100%,640px)] lg:max-w-none">
              <img
                src={technologyModularArchitecture.image}
                alt="Diagram of modular system layers: presentation, application, data, security, and integrations"
                className="w-full object-contain object-right mix-blend-normal"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
