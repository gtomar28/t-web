import type { WorkPageContent } from "../../data/workPages";
import { WorkSectionLabel } from "./WorkSectionLabel";
import { workIcon } from "./workIcons";

type Props = WorkPageContent["whatYouGet"];

export function WorkWhatYouGetSection({ label, items }: Props) {
  return (
    <section
      id="work-what-you-get"
      aria-labelledby="work-what-you-get-heading"
      className="relative w-full scroll-mt-28 bg-[#0f0812] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(#B9A6D1 1px, transparent 1px), linear-gradient(90deg, #B9A6D1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <WorkSectionLabel>{label}</WorkSectionLabel>
        <h2 id="work-what-you-get-heading" className="sr-only">
          {label}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-5 lg:gap-4">
          {items.map((item) => {
            const Icon = workIcon(item.icon);
            return (
              <li key={item.title}>
                <article className="flex h-full flex-col rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/75 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/30 bg-[#2A1830]/90 text-[#E8A9C2]">
                    <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-bold leading-snug text-[#F8F6FB] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[#B9A6D1] sm:text-sm">
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
