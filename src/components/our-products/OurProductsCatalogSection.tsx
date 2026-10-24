import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowUpRight,
  Box,
  Globe,
  GraduationCap,
  Lock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { soundEngine } from "../../utils/audioEngine";

const KIDUART_LOGO = "/images/kiduart/kiduart.png";

/** One third of the catalog grid width (matches row of three). */
const CARD_WIDTH_LG =
  "lg:w-[calc((min(100%,80rem)-3rem)/3)] lg:max-w-[calc((80rem-3rem)/3)]";

function KiduartLogoMark() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <GraduationCap className="h-6 w-6 text-[#6B4A87]" strokeWidth={1.65} aria-hidden />;
  }
  return (
    <img
      src={KIDUART_LOGO}
      alt=""
      className="h-9 w-9 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

const TAGS = {
  kiduart: ["Admissions", "Attendance", "Fees", "Exams", "Communication"],
  customSoftware: ["Web Applications", "Internal Tools", "Business Workflows"],
  webDev: ["Business Websites", "Landing Pages", "SEO Ready"],
} as const;

function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[#B9A6D1]/32 bg-[#2A1830]/75 px-2.5 py-1 font-mono-accent text-[10px] text-[#D8CCE6] sm:text-[11px]">
      {children}
    </span>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#B9A6D1]/16 ${className ?? ""}`}
      aria-hidden
    />
  );
}

function ConfidentialSkeletonBody() {
  return (
    <>
      <div className="mt-3 space-y-2" aria-hidden>
        <SkeletonBlock className="h-2.5 w-full" />
        <SkeletonBlock className="h-2.5 w-[94%]" />
        <SkeletonBlock className="h-2.5 w-[80%]" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2" aria-hidden>
        <SkeletonBlock className="h-6 w-[6.5rem] rounded-full" />
        <SkeletonBlock className="h-6 w-[7.25rem] rounded-full" />
        <SkeletonBlock className="h-6 w-[5.75rem] rounded-full" />
      </div>
    </>
  );
}

function ProductCta({
  cta,
}: {
  cta: { label: string; href: string; external?: boolean; primary?: boolean };
}) {
  const inner = (
    <>
      <span>{cta.label}</span>
      {cta.primary ? (
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/80 transition group-hover:border-[#E8A9C2]/45">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      )}
    </>
  );

  const className = cta.primary
    ? "group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-5 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_26px_rgba(232,169,194,0.35)] transition hover:brightness-105 sm:w-fit"
    : "group mt-auto inline-flex w-fit items-center gap-2.5 rounded-full border border-[#B9A6D1]/38 bg-[#1E1024]/50 px-4 py-2 font-heading text-sm font-semibold text-[#F8F6FB] transition hover:border-[#E8A9C2]/50 hover:text-[#E8A9C2]";

  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playClick("soft")}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      to={cta.href}
      onClick={() => soundEngine.playClick("soft")}
      className={className}
    >
      {inner}
    </Link>
  );
}

type ProductCardProps = {
  featured?: boolean;
  confidential?: boolean;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  tags?: readonly string[];
  visualSrc: string;
  cta: { label: string; href: string; external?: boolean; primary?: boolean };
};

function ProductCard({
  featured,
  confidential,
  icon,
  title,
  subtitle,
  description,
  tags,
  visualSrc,
  cta,
}: ProductCardProps) {
  return (
    <article
      className={`group relative flex min-h-[21rem] overflow-hidden rounded-2xl border sm:min-h-[22.5rem] ${
        featured
          ? "border-[#E8A9C2]/50 bg-[#2a1830]/90 shadow-[0_0_0_1px_rgba(232,169,194,0.15),0_0_56px_rgba(107,74,135,0.55),0_24px_48px_rgba(0,0,0,0.4)]"
          : "border-[#B9A6D1]/26 bg-[#1E1024]/92 shadow-[0_18px_44px_rgba(0,0,0,0.34)]"
      }`}
    >
      {featured ? (
        <>
          <div
            className="pointer-events-none absolute -right-6 top-0 h-48 w-48 rounded-full bg-[#8558A5]/40 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-40 w-56 rounded-full bg-[#E8A9C2]/14 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6B4A87]/30 via-[#1E1024]/20 to-[#E8A9C2]/12"
            aria-hidden
          />
        </>
      ) : null}

      {/* Right visual panel (design: art bleeds on the right) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[46%] sm:w-[44%]"
        aria-hidden
      >
        <img
          src={visualSrc}
          alt=""
          className={`h-full w-full object-cover ${
            confidential
              ? "scale-110 object-center blur-[6px] opacity-30"
              : "object-[72%_center] opacity-95"
          }`}
          loading="lazy"
        />
        <div
          className={`absolute inset-0 ${
            confidential
              ? "bg-[#1a0f18]/55"
              : "bg-gradient-to-r from-[#1E1024] via-[#1E1024]/55 to-transparent"
          }`}
        />
        {confidential ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
            <div className="rounded-xl border border-[#B9A6D1]/28 bg-[#1E1024]/65 px-4 py-5 backdrop-blur-md">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#B9A6D1]/35 bg-[#2A1830]/90 text-[#E8A9C2]">
                <Lock className="h-4 w-4" strokeWidth={1.65} aria-hidden />
              </div>
              <p className="mt-2.5 font-heading text-[11px] font-semibold leading-snug text-[#F8F6FB]">
                Project details are confidential
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative z-10 flex min-h-[inherit] w-full max-w-[58%] flex-col p-5 sm:p-6">
        {featured ? (
          <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#E8A9C2]/45 bg-[#1E1024]/80 px-2.5 py-1 font-mono-accent text-[9px] uppercase tracking-[0.12em] text-[#E8A9C2] sm:text-[10px]">
            <Star className="h-3 w-3 fill-[#E8A9C2]" aria-hidden />
            Featured product
          </div>
        ) : null}

        <div className="flex items-start gap-3">
          {icon ? (
            <div
              className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border ${
                featured
                  ? "h-14 w-14 border-[#F8F6FB]/25 bg-[#F8F6FB]/95"
                  : "h-11 w-11 border-[#B9A6D1]/35 bg-[#2A1830]/90 text-[#E8A9C2]"
              }`}
            >
              {icon}
            </div>
          ) : null}
          <div className="min-w-0 pt-0.5">
            <h3 className="font-heading text-base font-bold leading-tight text-[#F8F6FB] sm:text-lg">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-[#B9A6D1] sm:text-sm">{subtitle}</p>
            ) : null}
          </div>
        </div>

        {confidential ? (
          <ConfidentialSkeletonBody />
        ) : (
          <>
            <p className="mt-3 text-[13px] leading-relaxed text-[#D8CCE6] sm:text-sm">
              {description}
            </p>
            {tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            ) : null}
          </>
        )}

        <div className="flex-1 min-h-[0.75rem]" aria-hidden />

        <ProductCta cta={cta} />
      </div>
    </article>
  );
}

export function OurProductsCatalogSection() {
  return (
    <section
      id="products-overview"
      aria-labelledby="our-products-catalog-heading"
      className="relative scroll-mt-28 border-t border-[#6B4A87]/30 py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,74,135,0.26) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Our products
          </div>

          <h2
            id="our-products-catalog-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Products that create{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              real impact.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            We build focused products and solutions for schools, businesses and
            organisations — designed to solve real-world problems and add
            long-term value.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-6">
          <ProductCard
            featured
            title="KIDUART"
            subtitle="School ERP"
            icon={<KiduartLogoMark />}
            description="A complete school management platform to streamline admissions, fees, attendance, exams, communication and more — all in one place."
            tags={TAGS.kiduart}
            visualSrc="/images/our-products/kiduart-card-visual.jpg"
            cta={{
              label: "Explore KIDUART",
              href: "https://kiduart.com",
              external: true,
              primary: true,
            }}
          />

          <ProductCard
            icon={<Box className="h-5 w-5" strokeWidth={1.65} aria-hidden />}
            title="Custom Software Development"
            description="Tailored software solutions built around your unique workflows and business needs. From internal tools to complex web applications."
            tags={TAGS.customSoftware}
            visualSrc="/images/our-products/card-custom-software.jpg"
            cta={{ label: "View product", href: "/work/web-applications" }}
          />

          <ProductCard
            icon={<Globe className="h-5 w-5" strokeWidth={1.65} aria-hidden />}
            title="Web Development"
            description="Modern, responsive and high-performance websites for businesses, organisations and institutions."
            tags={TAGS.webDev}
            visualSrc="/images/our-products/card-web-development.jpg"
            cta={{ label: "View product", href: "/work/custom-websites" }}
          />
        </div>

        <div className="mt-5 flex flex-col gap-5 lg:mt-6 lg:flex-row lg:justify-center lg:gap-6">
          <div className={`w-full ${CARD_WIDTH_LG}`}>
            <ProductCard
              confidential
              icon={<Lock className="h-5 w-5" strokeWidth={1.65} aria-hidden />}
              title="Confidential Project"
              visualSrc="/images/what-we-do/services/service-web-applications-v2.jpg"
              cta={{ label: "View project", href: "/contact" }}
            />
          </div>
          <div className={`w-full ${CARD_WIDTH_LG}`}>
            <ProductCard
              confidential
              icon={<Lock className="h-5 w-5" strokeWidth={1.65} aria-hidden />}
              title="Confidential Project"
              visualSrc="/images/what-we-do/services/service-custom-software-v2.jpg"
              cta={{ label: "View project", href: "/contact" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
