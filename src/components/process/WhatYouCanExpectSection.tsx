import { BarChart3, Check, ClipboardList, Handshake } from "lucide-react";

const EXPECT_CARDS = [
  {
    number: "01",
    title: "Clear Scope",
    description:
      "You get a well-defined scope, clear deliverables and complete transparency on what's included.",
    icon: ClipboardList,
    items: [
      "Detailed requirements and documentation",
      "Defined deliverables and timelines",
      "No hidden surprises",
    ],
  },
  {
    number: "02",
    title: "Visible Progress",
    description:
      "Stay informed at every stage with regular updates, demos and open communication.",
    icon: BarChart3,
    items: [
      "Regular progress updates",
      "Reviews and demo sessions",
      "Open and responsive communication",
    ],
  },
  {
    number: "03",
    title: "Documented Handoff",
    description:
      "You receive complete documentation, access and knowledge transfer for a smooth handoff.",
    icon: Handshake,
    items: [
      "Clean and structured code",
      "Documentation and setup guides",
      "Access to all project assets",
    ],
  },
] as const;

const CARD_ICON_BOX =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/30 bg-[#6B4A87] text-[#F8F6FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(107,74,135,0.45)]";

export function WhatYouCanExpectSection() {
  return (
    <section
      id="what-you-can-expect"
      aria-labelledby="what-you-can-expect-heading"
      className="trevyk-viewport-section trevyk-viewport-section--center relative border-t border-[#6B4A87]/30 bg-[#120a14]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(107,74,135,0.22) 0%, transparent 55%), linear-gradient(180deg, #1a0f18 0%, #120a14 45%, #0f0810 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            What you can expect
          </div>

          <h2
            id="what-you-can-expect-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            What you can{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              expect.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            A transparent and collaborative experience from start to finish, so
            you always know what&apos;s happening and what&apos;s next.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
          {EXPECT_CARDS.map(({ number, title, description, icon: Icon, items }) => (
            <li key={number}>
              <article className="relative flex h-full flex-col rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.32)] sm:p-6">
                <span className="absolute right-5 top-5 font-mono-accent text-xs text-[#B9A6D1]/70">
                  {number}
                </span>
                <div className={CARD_ICON_BOX}>
                  <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-[#F8F6FB]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C4B4D8]">
                  {description}
                </p>
                <ul className="mt-5 space-y-2.5 rounded-xl border border-[#B9A6D1]/22 bg-[#2A1830]/55 p-4">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#E7E1F0]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#E8A9C2]/35 bg-[#55356a] text-[#E8A9C2]">
                        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
