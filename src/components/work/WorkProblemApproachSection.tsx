import type { WorkPageContent } from "../../data/workPages";
import { WorkSectionLabel } from "./WorkSectionLabel";
import { workIcon } from "./workIcons";

type Props = WorkPageContent["problemApproach"];

export function WorkProblemApproachSection({
  label,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  approach,
}: Props) {
  return (
    <section
      id="work-problem-approach"
      aria-labelledby="work-problem-heading"
      className="relative w-full scroll-mt-28 bg-[#120a14] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 12% 20%, rgba(107,74,135,0.28) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-6">
          <WorkSectionLabel>{label}</WorkSectionLabel>
          <h2
            id="work-problem-heading"
            className="mt-5 font-heading text-[clamp(1.65rem,3.8vw,2.35rem)] font-bold leading-[1.14] text-[#F8F6FB]"
          >
            {headingBefore}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#D892AD] to-[#F0B8CE] bg-clip-text text-transparent">
              {headingHighlight}
            </span>
            {headingAfter}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">{body}</p>
        </div>

        <ul className="space-y-4 lg:col-span-6 lg:pt-8">
          {approach.map((item) => {
            const Icon = workIcon(item.icon);
            return (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-[#B9A6D1]/25 bg-[#1E1024]/55 p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8A9C2]/35 bg-gradient-to-br from-[#6B4A87]/50 to-[#2A1830]/90 text-[#E8A9C2] shadow-[0_0_20px_rgba(107,74,135,0.35)]">
                  <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#F8F6FB]">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#B9A6D1]">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
