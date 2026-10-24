import { Linkedin, Mail } from "lucide-react";
import { ctaSection, footer, site } from "../../../content/home";
import { FooterSolarVideo } from "./FooterSolarVideo";
import { SectionLabel } from "../ui/SectionLabel";
import { PageContainer } from "../ui/PageContainer";
import { PlumLink } from "../ui/PlumLink";
import { TrevykLogo } from "../../TrevykLogo";
import { FooterWordmark } from "./FooterWordmark";

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

const FOOTER_LINK_HOVER =
  "group inline-flex max-w-full items-center text-sm text-plum-neutral/90 transition-colors hover:text-plum-neutral [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]";

const FOOTER_LINK_UNDERLINE =
  "pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E8A9C2] via-[#4A3058] to-[#E8A9C2] opacity-90 transition-[width] duration-300 ease-out group-hover:w-full";

function FooterLinkLabel({ label }: { label: string }) {
  return (
    <span className="relative inline-block max-w-full pb-1">
      <span className="truncate">{label}</span>
      <span className={FOOTER_LINK_UNDERLINE} aria-hidden />
    </span>
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
  const content = (
    <>
      <FooterLinkLabel label={label} />
      {tag ? <FooterTag>{tag}</FooterTag> : null}
    </>
  );

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={FOOTER_LINK_HOVER}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <PlumLink href={href} className={FOOTER_LINK_HOVER}>
      {content}
    </PlumLink>
  );
}

type SiteFooterProps = {
  /** When false, solar video comes from SolarFooterStage sticky layer */
  showSolarVideo?: boolean;
  /** Hide “Next project” CTA band (contact & who-we-are pages). */
  hideNextProjectCta?: boolean;
  /** Less top gap when page ends in a dark band (e.g. /technology); still padded, not flush. */
  compactTop?: boolean;
};

export function SiteFooter({
  showSolarVideo = true,
  hideNextProjectCta = false,
  compactTop = false,
}: SiteFooterProps) {
  const titleParts = ctaSection.title.split(ctaSection.titleHighlight);
  const { brand, offerings, company, howWeWork } = footer;

  return (
    <footer className="trevyk-viewport-section relative flex flex-col overflow-hidden">
      {showSolarVideo ? (
        <FooterSolarVideo className="absolute inset-0 min-h-full" showGrain={false} />
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col">
        {!hideNextProjectCta ? (
          <PageContainer
            className={
              compactTop ? "pt-8 md:pt-10" : "pt-10 md:pt-12"
            }
          >
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
        ) : null}

        <PageContainer
          className={`py-12 md:py-14${hideNextProjectCta ? " pt-10 md:pt-12" : ""}`}
        >
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
                <PlumLink
                  href={brand.flagshipLink.href}
                  className="font-medium text-plum-neutral underline decoration-plum-neutral/55 underline-offset-[3px] hover:text-plum-accent hover:decoration-plum-accent"
                >
                  {brand.flagshipLink.label}
                </PlumLink>{" "}
                {brand.flagshipTail}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PlumLink
                  href={brand.workCta.href}
                  className="inline-flex rounded-full border border-plum-neutral/35 px-5 py-2.5 text-sm text-plum-neutral transition hover:border-plum-accent/50 hover:bg-plum-primary/25"
                >
                  {brand.workCta.label}
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
                {offerings.title}
              </p>
              <ul className="mt-5 space-y-2.5">
                {offerings.links.map((link) => (
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
              <ul className="mt-8 flex flex-wrap items-center gap-4 pt-6">
                {footer.social.map((link) => {
                  const isEmail = link.href.startsWith("mailto:");
                  const Icon = isEmail ? Mail : Linkedin;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center justify-center rounded-full border border-plum-neutral/30 p-2.5 text-plum-neutral/90 transition hover:border-plum-accent/50 hover:text-plum-neutral"
                        aria-label={link.label}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    </li>
                  );
                })}
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

        <section className="relative mt-auto pt-10 md:pt-14">
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
            <PageContainer className="min-w-0 pb-2 pt-6 md:pt-8">
              <FooterWordmark />
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
