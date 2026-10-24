import { ChevronRight } from "lucide-react";
import type { WorkPageContent } from "../../data/workPages";
import { WorkSectionLabel } from "./WorkSectionLabel";

type Props = WorkPageContent["howWeDeliver"];

export function WorkHowWeDeliverSection({ label, steps }: Props) {
  return (
    <section
      id="work-how-we-deliver"
      aria-labelledby="work-how-we-deliver-heading"
      className="relative w-full scroll-mt-28 bg-[#120a14] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <WorkSectionLabel>{label}</WorkSectionLabel>
        <h2 id="work-how-we-deliver-heading" className="sr-only">
          {label}
        </h2>

        <ol className="mt-8 flex flex-col gap-4 lg:mt-10 lg:flex-row lg:items-stretch lg:gap-3">
          {steps.map((step, index) => (
            <li key={step.num} className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-stretch">
              <article className="flex h-full flex-1 flex-col rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/60 p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8A9C2]/40 bg-[#2A1830]/90 font-mono-accent text-xs font-semibold text-[#E8A9C2]">
                  {step.num}
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-[#F8F6FB]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#B9A6D1]">{step.description}</p>
              </article>
              {index < steps.length - 1 ? (
                <div
                  className="hidden shrink-0 items-center justify-center px-1 text-[#B9A6D1]/50 lg:flex"
                  aria-hidden
                >
                  <ChevronRight className="h-5 w-5" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
