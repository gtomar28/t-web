import type { GuideFaq } from "../../data/guides";
import { WorkSectionLabel } from "./WorkSectionLabel";

type Props = {
  faqs: GuideFaq[];
};

/** Visible FAQ — must match FAQPage JSON-LD on the same route. */
export function WorkGuideFaqSection({ faqs }: Props) {
  if (!faqs.length) return null;

  return (
    <section
      id="work-guide-faq"
      aria-labelledby="work-guide-faq-heading"
      className="relative w-full scroll-mt-28 border-t border-[#B9A6D1]/15 bg-[#120a14] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <WorkSectionLabel>FAQ</WorkSectionLabel>
        <h2
          id="work-guide-faq-heading"
          className="mt-5 font-heading text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-[1.16] text-[#F8F6FB]"
        >
          Questions buyers ask
        </h2>

        <dl className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-[#B9A6D1]/35 bg-[#1E1024]/70 p-5 sm:p-6"
            >
              <dt className="font-heading text-base font-semibold text-[#E8A9C2] sm:text-lg">
                {faq.question}
              </dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
