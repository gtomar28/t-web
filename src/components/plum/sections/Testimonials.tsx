import { useState } from "react";
import { testimonialsSection } from "../../../content/home";
import { SectionLabel } from "../ui/SectionLabel";
import { PageContainer } from "../ui/PageContainer";

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-plum-lavender/30 bg-gradient-to-br from-plum-primary to-plum-secondary text-sm font-semibold text-plum-neutral"
      aria-hidden
    >
      {initial}
    </div>
  );
}

type TestimonialsProps = {
  /** Transparent section over sticky solar video (footer stage). */
  overSolar?: boolean;
};

export function Testimonials({ overSolar = false }: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const item = testimonialsSection.items[active]!;

  return (
    <section
      className={`relative border-t py-24 md:py-32 ${
        overSolar
          ? "border-plum-lavender/20 bg-transparent"
          : "z-10 border-border bg-background"
      }`}
    >
      <PageContainer>
        <SectionLabel>{testimonialsSection.label}</SectionLabel>
        <h2 className="font-display mt-5 max-w-3xl text-3xl font-semibold text-plum-neutral md:text-4xl">
          {testimonialsSection.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-plum-lavender md:text-base">
          {testimonialsSection.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {testimonialsSection.regions.map((region) => (
            <span
              key={region.name}
              className="rounded-full border border-plum-lavender/25 bg-plum-primary/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-plum-lavender"
            >
              {region.flag} {region.name}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-10">
          <ul className="flex flex-col gap-2">
            {testimonialsSection.items.map((t, i) => (
              <li key={t.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    i === active
                      ? "border-plum-accent/45 bg-plum-primary/30 shadow-[0_0_0_1px_#F6CDCE33]"
                      : "border-transparent bg-plum-primary/10 hover:border-plum-lavender/25 hover:bg-plum-primary/20"
                  }`}
                >
                  <Avatar name={t.name} />
                  <span>
                    <span className="block text-sm font-medium text-plum-neutral">{t.name}</span>
                    <span className="text-xs text-plum-lavender">{t.region}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <figure
            className="relative overflow-hidden rounded-3xl border border-plum-lavender/20 p-8 md:p-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, #85627E 45%, transparent), transparent 55%), linear-gradient(160deg, #251422, #1a0f18)",
            }}
          >
            <span className="font-mono text-xs text-plum-lavender">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonialsSection.items.length).padStart(2, "0")}
            </span>
            <blockquote className="mt-8 font-display text-xl leading-relaxed text-plum-neutral md:text-2xl">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={item.name} />
                <div>
                  <cite className="not-italic font-medium text-plum-neutral">{item.name}</cite>
                  <p className="text-sm text-plum-lavender">{item.region}</p>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </PageContainer>
    </section>
  );
}
