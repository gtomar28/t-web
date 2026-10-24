import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getGuide, type Guide } from "../../data/guides";
import { soundEngine } from "../../utils/audioEngine";
import { WorkSectionLabel } from "./WorkSectionLabel";

type Props = {
  guide: Guide;
};

export function WorkGuideRelatedSection({ guide }: Props) {
  const related = guide.related
    .map((slug) => {
      const item = getGuide(slug);
      if (!item) return null;
      return { slug, title: item.title, kicker: item.kicker };
    })
    .filter(Boolean) as { slug: string; title: string; kicker: string }[];

  if (!related.length) return null;

  return (
    <section
      id="work-guide-related"
      aria-labelledby="work-guide-related-heading"
      className="relative w-full border-t border-[#B9A6D1]/10 bg-[#1a0f18] py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <WorkSectionLabel>Related</WorkSectionLabel>
        <h2
          id="work-guide-related-heading"
          className="mt-4 font-heading text-lg font-semibold text-[#F8F6FB] sm:text-xl"
        >
          Continue with a related guide
        </h2>
        <ul className="mt-5 space-y-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/work/${item.slug}`}
                onClick={() => soundEngine.playClick("soft")}
                className="group flex items-start justify-between gap-3 rounded-xl border border-[#B9A6D1]/30 bg-[#1E1024]/50 px-4 py-3 transition-colors hover:border-[#E8A9C2]/50"
              >
                <span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-[#E8A9C2]">
                    {item.kicker}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[#F8F6FB] group-hover:text-[#E8A9C2] sm:text-base">
                    {item.title}
                  </span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#B9A6D1] group-hover:text-[#E8A9C2]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
