import type { Guide } from "../../data/guides";
import { WorkSectionLabel } from "./WorkSectionLabel";

type Props = {
  guide: Guide;
};

/** Visible long-form copy from `guides.ts` — matches prerender / JSON-LD source. */
export function WorkGuideDeepDiveSection({ guide }: Props) {
  return (
    <section
      id="work-guide-deep-dive"
      aria-labelledby="work-guide-title"
      className="relative w-full scroll-mt-28 border-t border-[#B9A6D1]/15 bg-[#1a0f18] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <WorkSectionLabel>{guide.kicker} guide</WorkSectionLabel>

        <h2
          id="work-guide-title"
          className="mt-5 font-heading text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-[1.16] text-[#F8F6FB]"
        >
          {guide.title}
        </h2>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
          {guide.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {guide.sections?.map((section) => (
          <div key={section.heading} className="mt-10">
            <h3 className="font-heading text-xl font-semibold text-[#F8F6FB] sm:text-2xl">
              {section.heading}
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-[#C4B4D8]">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {guide.points.length > 0 ? (
          <div className="mt-10">
            <h3 className="font-heading text-xl font-semibold text-[#F8F6FB] sm:text-2xl">
              What you leave with
            </h3>
            <ul className="mt-4 space-y-2.5">
              {guide.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[#E7E1F0] sm:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A9C2]"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
