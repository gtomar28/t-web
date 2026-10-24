import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Globe,
  Layers3,
  Search,
  Megaphone,
  Share2,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
type GrowthCard = {
  imageSlug: string;
  imageLabel: string;
  kicker: string;
  title: string;
  caption: string;
  bullets: string[];
  href: string;
  icon: LucideIcon;
};

const CARDS: GrowthCard[] = [
  {
    imageSlug: "websites",
    imageLabel: "Laptop and phone mockups for a custom website",
    kicker: "Websites",
    title: "Modern sites that convert",
    caption: "A site written for the search, not a template with a logo swap.",
    bullets: ["Responsive & fast", "SEO-ready structure"],
    href: "/work/custom-websites",
    icon: Globe,
  },
  {
    imageSlug: "software",
    imageLabel: "Dashboard and modules for custom web applications",
    kicker: "Software",
    title: "Apps when sites aren't enough",
    caption: "Web apps and custom software when a brochure site is not enough.",
    bullets: ["Clear scope & milestones", "Built for your workflow"],
    href: "/work/web-applications",
    icon: Layers3,
  },
  {
    imageSlug: "search",
    imageLabel: "Search results and ranking for SEO",
    kicker: "Search",
    title: "SEO for real enquiries",
    caption: "SEO written for the enquiry, not vanity traffic.",
    bullets: ["Intent-led pages", "Technical foundations"],
    href: "/work/seo",
    icon: Search,
  },
  {
    imageSlug: "campaigns",
    imageLabel: "Ad creatives and campaign progress for digital marketing",
    kicker: "Campaigns",
    title: "Starter-budget campaigns",
    caption: "Ads and landing pages sized for starter budgets.",
    bullets: ["Focused ad sets", "Landing pages that match"],
    href: "/work/digital-marketing",
    icon: Megaphone,
  },
  {
    imageSlug: "social",
    imageLabel: "Social post layout and content calendar",
    kicker: "Social",
    title: "Calendars that stay alive",
    caption: "Calendars and captions so the page stays alive.",
    bullets: ["On-brand captions", "Steady posting rhythm"],
    href: "/work/social-media",
    icon: Share2,
  },
  {
    imageSlug: "video",
    imageLabel: "Video frame with script strip for short-form content",
    kicker: "Video",
    title: "Scripts before the guesswork",
    caption: "Short scripts that say what you sell before the viewer guesses.",
    bullets: ["Clear hooks & offers", "Short-form ready"],
    href: "/work/video-scripts",
    icon: Clapperboard,
  },
];

export const GrowthOffer: React.FC = () => {
  return (
    <section
      id="growth-services"
      className="trevyk-viewport-section relative w-full scroll-mt-24 border-t border-[#B9A6D1]/10 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:scroll-mt-28 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-mono-accent text-[11px] uppercase tracking-[0.28em] text-[#E8A9C2]">
            For startups and growing businesses
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#F8F6FB] sm:text-5xl">
            Websites, software, and marketing that help a business get found
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#E7E1F0] sm:text-lg">
            Trevyk builds custom websites, web applications, and custom software,
            then the growth work around them: SEO, campaigns, social media,
            video, and scripts. Starter plans are scoped for early budgets.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-5">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                to={card.href}
                className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0f18]"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#B9A6D1]/30 bg-gradient-to-b from-[#1E1024]/95 via-[#1A0D20]/98 to-[#160A1C] p-3 shadow-[0_18px_44px_rgba(0,0,0,0.38)] transition-all duration-300 group-hover:border-[#E8A9C2]/40 group-hover:shadow-[0_22px_52px_rgba(107,74,135,0.28)] sm:p-3.5">
                  <div className="growth-card-photo relative aspect-[4/3] overflow-hidden rounded-[1.2rem] ring-1 ring-[#85627e]/45">
                    <img
                      src={`/images/growth-card-${card.imageSlug}-plum.jpg`}
                      srcSet={`/images/growth-card-${card.imageSlug}-plum-640.jpg 640w, /images/growth-card-${card.imageSlug}-plum.jpg 1200w`}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 22vw"
                      alt={card.imageLabel}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="growth-card-photo__img h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="growth-card-photo__edge pointer-events-none absolute inset-0"
                      aria-hidden
                    />
                    <span className="absolute left-3 top-3 z-10 font-mono-accent text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E8A9C2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-[11px]">
                      {card.kicker}
                    </span>
                    <span
                      className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#B9A6D1]/45 bg-[#1E1024]/80 backdrop-blur-md transition-all group-hover:border-[#E8A9C2]/60 group-hover:bg-[#241428]/90 sm:right-3 sm:top-3"
                      aria-hidden
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-[#E8A9C2] transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="sr-only">Explore {card.kicker.toLowerCase()}</span>
                  </div>

                  <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4 sm:px-2 sm:pt-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl border border-[#E8A9C2]/45 bg-[#2A1830]/90 p-2 shadow-[0_0_20px_rgba(232,169,194,0.12)]">
                        <Icon className="h-4 w-4 text-[#E8A9C2]" aria-hidden />
                      </div>
                      <h3 className="min-w-0 pt-0.5 font-heading text-sm font-semibold leading-snug text-[#F8F6FB] md:text-[0.9375rem] lg:text-base">
                        {card.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#B9A6D1]">
                      {card.caption}
                    </p>

                    <ul className="mt-3 space-y-2">
                      {card.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-[#E7E1F0]"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A9C2]"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
