import { BarChart3, Layers, ShieldCheck, Users } from "lucide-react";
import { technologyHeroBackdrop } from "../../config/media";

const HIGHLIGHTS = [
  { icon: BarChart3, label: "Modern & industry-ready" },
  { icon: Layers, label: "Scalable architecture" },
  { icon: ShieldCheck, label: "Reliable and secure" },
  { icon: Users, label: "Chosen for your business" },
] as const;

export function TechnologyHeroSection() {
  return (
    <section
      id="technology-hero"
      aria-labelledby="technology-hero-heading"
      className="relative min-h-[100dvh] min-h-[100svh] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={technologyHeroBackdrop.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-[68%_center]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(${technologyHeroBackdrop.washRgb}, ${technologyHeroBackdrop.washOpacity})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: technologyHeroBackdrop.vignetteLayers.join(", ") }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-7rem)] min-h-[calc(100svh-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-14 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-left lg:max-w-[34rem]">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Technology
          </div>

          <h1
            id="technology-hero-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.6vw,3.05rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            The technologies
            <br />
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F8F6FB] bg-clip-text text-transparent">
              behind
            </span>{" "}
            what we build.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
            We work with modern, reliable and scalable technologies to build
            custom websites, web applications, SaaS platforms and AI-powered
            solutions. Our technology choices are guided by your business goals,
            project needs and long-term growth.
          </p>

          <ul className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:gap-0">
            {HIGHLIGHTS.map(({ icon: Icon, label }, index) => (
              <li
                key={label}
                className={`flex flex-1 items-center gap-3 min-w-[9.5rem] ${
                  index > 0
                    ? "lg:border-l lg:border-[#B9A6D1]/28 lg:pl-5 xl:pl-6"
                    : "lg:pr-2"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8A9C2]/35 bg-[#55356a]/90 text-[#F8F6FB] shadow-[0_0_18px_rgba(107,74,135,0.35)]">
                  <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                </div>
                <p className="font-heading text-[13px] font-semibold leading-snug text-[#F8F6FB] sm:text-sm">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
