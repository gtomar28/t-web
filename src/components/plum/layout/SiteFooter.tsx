import { ctaSection, footer, site } from "../../../content/home";
import { FooterSolarVideo } from "./FooterSolarVideo";
import { SectionLabel } from "../ui/SectionLabel";
import { PageContainer } from "../ui/PageContainer";
import { PlumLink } from "../ui/PlumLink";
import { TrevykLogo } from "../../TrevykLogo";

const wordmarkLine1 = "TREVYK";
const wordmarkLine2 = "TECHNOLOGIES";

function FooterTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 shrink-0 rounded-full border border-plum-accent/45 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-plum-accent">
      {children}
    </span>
  );
}

function TrevykMark() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <path d="M8 28V16l8-4.5 8 4.5v12l-8 4.5L8 28Z" stroke="#B397AE" strokeWidth="1.2" />
        <path d="M16 11.5V24l8 4.5V16l-8-4.5Z" fill="#85627E" fillOpacity="0.55" />
        <path d="M24 16v12l8-4.5V16l-8-4.5v4.5Z" stroke="#F6CDCE" strokeWidth="1.2" />
      </svg>
      <span className="font-display text-sm font-bold tracking-[0.22em] text-plum-neutral md:text-[0.95rem]">
        TREVYK TECHNOLOGIES
      </span>
    </div>
  );
}

function FooterLink({
  href,
  label,
  tag,
  external,
}: {
  href: string;
  label: string;
  tag?: string;
  external?: boolean;
}) {
  const className =
    "inline-flex max-w-full items-center text-sm text-plum-neutral/90 transition hover:text-plum-neutral [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]";

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="truncate">{label}</span>
        {tag ? <FooterTag>{tag}</FooterTag> : null}
      </a>
    );
  }

  return (
    <PlumLink href={href} className={className}>
      <span className="truncate">{label}</span>
      {tag ? <FooterTag>{tag}</FooterTag> : null}
    </PlumLink>
  );
}

type SiteFooterProps = {
  /** When false, solar video comes from SolarFooterStage sticky layer */
  showSolarVideo?: boolean;
};

export function SiteFooter({ showSolarVideo = true }: SiteFooterProps) {
  const titleParts = ctaSection.title.split(ctaSection.titleHighlight);
  const { brand, solutionsProducts, company, howWeWork } = footer;

  return (
    <footer className="relative overflow-hidden">
      {showSolarVideo ? (
        <FooterSolarVideo className="absolute inset-0" showGrain={false} />
      ) : null}

      <div className="relative z-10">
        <PageContainer className="pt-10 md:pt-12">
          <section
            id="contact"
            className="rounded-3xl border border-plum-lavender/25 bg-background/5 p-8 shadow-[0_12px_40px_rgba(15,8,16,0.35)] backdrop-blur-xl ring-1 ring-plum-neutral/10 md:p-10 lg:p-12"
          >
            <SectionLabel>{ctaSection.label}</SectionLabel>
            <h2 className="font-display mt-6 text-3xl font-semibold leading-snug text-plum-neutral md:text-[2.65rem]">
              {titleParts[0]}
              <span className="text-plum-accent">{ctaSection.titleHighlight}</span>
              {titleParts[1]}
            </h2>
            <p className="mt-5 text-plum-neutral/90">{ctaSection.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <PlumLink
                href={ctaSection.cta.href}
                className="inline-flex rounded-full bg-plum-accent px-6 py-3 text-sm font-medium text-plum-primary transition hover:bg-plum-neutral"
              >
                {ctaSection.cta.label}
              </PlumLink>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-sm text-plum-neutral hover:text-plum-accent"
              >
                {site.email}
              </a>
            </div>
          </section>
        </PageContainer>

        <PageContainer className="py-12 md:py-14">
          <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] lg:gap-10 xl:gap-14">
            <div className="max-w-md">
              <TrevykLogo />
              <h3 className="font-display mt-8 text-2xl font-semibold leading-snug text-plum-neutral md:text-[1.75rem]">
                {brand.tagline}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-plum-neutral/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]">
                {brand.body}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-plum-lavender">
                Flagship product:{" "}
                <PlumLink href={brand.flagshipLink.href} className="text-plum-neutral hover:text-plum-accent">
                  {brand.flagshipLink.label}
                </PlumLink>{" "}
                {brand.flagshipTail}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PlumLink
                  href={brand.visionCta.href}
                  className="inline-flex rounded-full border border-plum-neutral/35 px-5 py-2.5 text-sm text-plum-neutral transition hover:border-plum-accent/50 hover:bg-plum-primary/25"
                >
                  {brand.visionCta.label}
                </PlumLink>
                <a
                  href={brand.kiduartCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-plum-neutral/35 px-5 py-2.5 text-sm text-plum-neutral transition hover:border-plum-accent/50 hover:bg-plum-primary/25"
                >
                  <span aria-hidden className="text-plum-accent">
                    🎓
                  </span>
                  {brand.kiduartCta.label}
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-plum-accent">
                {solutionsProducts.title}
              </p>
              <ul className="mt-5 space-y-2.5">
                {solutionsProducts.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      tag={"tag" in link && link.tag ? link.tag : undefined}
                      external={link.href.startsWith("http")}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-plum-accent">
                {company.title}
              </p>
              <ul className="mt-5 space-y-2.5">
                {company.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-2 pt-6">
                {footer.social.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      label={link.label}
                      external={link.href.startsWith("http")}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-plum-accent">
                {howWeWork.title}
              </p>
              <ul className="mt-5 divide-y divide-plum-lavender/15 border-y border-plum-lavender/15">
                {howWeWork.items.map((item) => (
                  <li
                    key={item.tag}
                    className="flex items-center justify-between gap-3 py-3.5 first:pt-4 last:pb-4"
                  >
                    <span className="min-w-0 truncate text-sm text-plum-neutral/90">{item.text}</span>
                    <FooterTag>{item.tag}</FooterTag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageContainer>

        <section className="relative pt-10 md:pt-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "linear-gradient(to top, #0f0810 0%, rgba(15,8,16,0.94) 12%, rgba(15,8,16,0.78) 28%, rgba(15,8,16,0.52) 48%, rgba(15,8,16,0.52) 68%, rgba(15,8,16,0.1) 85%, transparent 100%)",
              ].join(", "),
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <PageContainer className="pb-6 pt-5">
              <p
                className="flex max-w-none justify-start font-display text-[clamp(4rem,4.5vw,5.2rem)] font-bold leading-[1.2] tracking-[0.14em] md:tracking-[0.2em]"
                aria-hidden
              >
                <span
                  // className="inline-flex gap-6 bg-[linear-gradient(90deg,#9E8C98_0%,#A995A1_22%,#B397AE_52%,#C4ACB4_78%,#D4BEC3_100%)] bg-clip-text text-transparent [-webkit-text-stroke:0.55px_rgba(210,192,200,0.42)] md:gap-10"
                  className="inline-flex gap-6 bg-[linear-gradient(90deg,#3b0f2c_0%,#652049_22%,#8d5182_52%,#bea7ae_78%,#f3edee_100%)] bg-clip-text text-transparent [-webkit-text-stroke:0.55px_rgba(210,192,200,0.42)] md:gap-10"
                  style={{
                    filter:
                      "drop-shadow(0 1px 0 rgba(15,8,16,0.85)) drop-shadow(0 0 18px rgba(15,8,16,0.35))",
                  }}
                >
                  <span>{wordmarkLine1}</span>
                  <span>{wordmarkLine2}</span>
                </span>
              </p>
            </PageContainer>

            <PageContainer className="pb-6 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-plum-neutral/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                <span>
                  © {site.copyrightYear} {site.name}. All rights reserved.
                </span>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-plum-lavender hover:text-plum-neutral"
                >
                  Back to top ↑
                </button>
              </div>
            </PageContainer>
          </div>
        </section>
      </div>
    </footer>
  );
}
