import { ArrowUpRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewportSection } from "../ViewportSection";
import { soundEngine } from "../../utils/audioEngine";

const DEFINES_CARDS = [
  {
    index: "01",
    title: "We Build Our Own Products",
    description:
      "Our portfolio includes products built to solve real challenges — starting with KIDUART, our School ERP focused on simplifying school operations and improving the learning experience.",
    cta: "Explore KIDUART",
    href: "/our-products",
    image: "/images/about/defines-card-01-products.jpg",
    imageAlt: "Laptop showing a school operations dashboard",
  },
  {
    index: "02",
    title: "Custom Engineering for Real Needs",
    description:
      "We design and build custom websites, applications, and software solutions tailored to how your organization actually works — from early planning to long-term support.",
    cta: "Our Engineering Services",
    href: "/what-we-do",
    image: "/images/about/defines-card-02-engineering.jpg",
    imageAlt: "Floating screens with code and interface design",
  },
  {
    index: "03",
    title: "A Connected Partner for Digital Growth",
    description:
      "We offer a connected set of capabilities across products, engineering, and digital growth support — helping clients move forward with clarity and confidence.",
    cta: "Explore Our Capabilities",
    href: "/what-we-do",
    image: "/images/about/defines-card-03-partner.jpg",
    imageAlt: "Connected product, engineering, and growth capability blocks",
  },
] as const;

function DefinesCard({
  index,
  title,
  description,
  cta,
  href,
  image,
  imageAlt,
}: (typeof DEFINES_CARDS)[number]) {
  return (
    <article className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#6B4A87]/45 bg-[#2A1830]/90 shadow-[0_16px_48px_rgba(0,0,0,0.32)] sm:min-h-[24rem]">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[length:92%_auto] bg-[position:right_bottom] bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={imageAlt}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#1A0D20]/98 via-[#1A0D20]/88 45% to-transparent 72%"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <span className="inline-flex w-fit rounded-md border border-[#B9A6D1]/35 bg-[#1E1024]/80 px-2 py-0.5 font-mono-accent text-[10px] font-medium text-[#E8A9C2] sm:text-[11px]">
          {index}
        </span>
        <h3 className="mt-4 max-w-[16rem] font-heading text-lg font-semibold leading-snug text-[#F8F6FB] sm:text-xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[18rem] text-xs leading-relaxed text-[#D8CCE6] sm:text-[13px]">
          {description}
        </p>
        <Link
          to={href}
          onClick={() => soundEngine.playClick("soft")}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 font-heading text-xs font-medium text-[#F8F6FB] transition hover:text-[#E8A9C2] sm:text-[13px]"
        >
          {cta}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function WhatDefinesTrevykSection() {
  return (
    <ViewportSection
      id="what-defines-trevyk"
      aria-labelledby="what-defines-heading"
      className="trevyk-viewport-section--center"
      innerClassName="flex flex-col justify-center py-10 sm:py-12"
    >
      <div className="inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
        <Target className="h-4 w-4" aria-hidden />
        <span>04 / What defines Trevyk</span>
      </div>

      <p className="mt-5 font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2] sm:text-xs">
        Our differentiators
      </p>

      <h2
        id="what-defines-heading"
        className="mt-3 max-w-3xl font-heading text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
      >
        More than development.{" "}
        <span className="bg-gradient-to-r from-[#E8A9C2] via-[#F0B8CE] to-[#B9A6D1] bg-clip-text text-transparent">
          A partner for what&apos;s next.
        </span>
      </h2>

      <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
        We bring together product thinking, engineering discipline, and
        long-term partnership — so schools and businesses get software that grows
        with them, not just software that ships.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:gap-5">
        {DEFINES_CARDS.map((card) => (
          <DefinesCard key={card.index} {...card} />
        ))}
      </div>
    </ViewportSection>
  );
}
