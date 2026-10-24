import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Code2,
  Lightbulb,
  Settings,
  Smartphone,
  Users,
} from "lucide-react";
import { technologyBuildBand } from "../../config/media";

type BuildOffering = {
  num: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
};

const OFFERINGS: BuildOffering[] = [
  {
    num: "01",
    title: "Custom Web Applications",
    body: "Tailored web solutions designed to match your business goals and user needs.",
    icon: Lightbulb,
    accent: "#F5C542",
  },
  {
    num: "02",
    title: "Mobile-First Experiences",
    body: "Responsive and modern applications that work seamlessly across all devices.",
    icon: Smartphone,
    accent: "#E8A9C2",
  },
  {
    num: "03",
    title: "Product Development",
    body: "End-to-end development from MVP to full-scale products with focus on quality and growth.",
    icon: Code2,
    accent: "#4ADE80",
  },
  {
    num: "04",
    title: "Team Extension",
    body: "Skilled developers and designers to extend your in-house team and accelerate delivery.",
    icon: Users,
    accent: "#60A5FA",
  },
  {
    num: "05",
    title: "System Modernization",
    body: "Upgrade and optimize legacy systems with modern technologies and architectures.",
    icon: BarChart3,
    accent: "#F87171",
  },
  {
    num: "06",
    title: "Ongoing Support",
    body: "Continuous maintenance, feature enhancements and technical support.",
    icon: Settings,
    accent: "#A78BFA",
  },
];

function OfferingRow({
  item,
  isLast,
}: {
  item: BuildOffering;
  isLast: boolean;
}) {
  const Icon = item.icon;
  return (
    <li className="relative grid grid-cols-[3.25rem_1fr] gap-4 sm:grid-cols-[4rem_1fr] sm:gap-5">
      <div className="relative flex flex-col items-center">
        {!isLast ? (
          <span
            className="absolute top-10 bottom-0 w-px bg-gradient-to-b from-[#B9A6D1]/45 to-[#B9A6D1]/15"
            aria-hidden
          />
        ) : null}
        <span
          className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-full border border-[#B9A6D1]/35 bg-[#1E1024]/95 font-mono-accent text-[11px] font-semibold text-[#E8A9C2] sm:h-10 sm:w-10"
          aria-hidden
        >
          {item.num}
        </span>
        <span
          className="relative z-[1] mt-1 h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]"
          style={{ backgroundColor: item.accent, color: item.accent }}
          aria-hidden
        />
      </div>

      <article className="flex min-h-[4.5rem] flex-col gap-3 rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/55 px-4 py-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10"
          style={{
            background: `linear-gradient(145deg, ${item.accent}33, ${item.accent}12)`,
            color: item.accent,
          }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="hidden h-10 w-px shrink-0 bg-[#B9A6D1]/25 sm:block" aria-hidden />
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-5">
          <h3 className="shrink-0 font-heading text-base font-bold text-[#F8F6FB] sm:min-w-[11rem] sm:text-[17px]">
            {item.title}
          </h3>
          <div className="hidden h-10 w-px shrink-0 bg-[#B9A6D1]/25 sm:block" aria-hidden />
          <p className="text-sm leading-relaxed text-[#C4B4D8]">{item.body}</p>
        </div>
      </article>
    </li>
  );
}

export function BuildWithTrevykSection() {
  return (
    <section
      id="build-with-trevyk"
      aria-labelledby="build-with-trevyk-heading"
      className="relative scroll-mt-28 sm:scroll-mt-32"
      style={{ backgroundColor: technologyBuildBand.base }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 88% 12%, rgba(107,74,135,0.35) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 8% 88%, rgba(232,169,194,0.12) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Build with Trevyk
          </div>

          <h2
            id="build-with-trevyk-heading"
            className="mt-5 font-heading text-[clamp(1.85rem,4.2vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            From ideas to impactful{" "}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F8F6FB] bg-clip-text text-transparent">
              digital products.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            We partner with startups, businesses and organizations to design, develop
            and scale modern digital solutions that solve real problems and create
            long-term value.
          </p>
        </div>

        <ol className="mt-10 space-y-3 sm:mt-12 sm:space-y-3.5">
          {OFFERINGS.map((item, index) => (
            <OfferingRow
              key={item.num}
              item={item}
              isLast={index === OFFERINGS.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
