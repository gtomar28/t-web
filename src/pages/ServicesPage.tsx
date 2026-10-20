import React, { useState } from "react";
import { Cpu, ArrowRight, Sparkles } from "lucide-react";
import { SiteSettings, ServiceItem } from "../types";
import { SERVICES_DATA } from "../data/services";
import { ServiceCard3D } from "../components/services/ServiceCard3D";
import { ServiceDetailModal } from "../components/ServiceDetailModal";
import { ServiceConstellation } from "../components/services/ServiceConstellation";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { SectionBridge } from "../components/SectionBridge";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { MagneticCard } from "../components/MagneticCard";
import { soundEngine } from "../utils/audioEngine";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";
import { GUIDES } from "../data/guides";

interface ServicesPageProps {
  settings: SiteSettings;
  onOpenArchitectureModal: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All", short: "ALL" },
  { id: "custom-software", label: "Custom Software", short: "SW" },
  { id: "web-mobile", label: "Web & Apps", short: "APP" },
  { id: "growth", label: "Growth & Marketing", short: "GRO" },
  { id: "cloud-devops", label: "Cloud & DevOps", short: "CLD" },
  { id: "ai-ml", label: "AI & Automation", short: "AI" },
  { id: "erp-crm", label: "Kiduart ERP", short: "ERP" },
  { id: "ui-ux", label: "UI/UX", short: "UX" },
  { id: "it-consulting", label: "Advisory", short: "ADV" },
  { id: "cybersecurity", label: "Security", short: "SEC" },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  settings,
  onOpenArchitectureModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalService, setActiveModalService] =
    useState<ServiceItem | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (selectedCategory === "all") return true;
    return service.category === selectedCategory;
  });

  const handleToggleExpandInline = (serviceId: string) => {
    setExpandedCardId((prev) => (prev === serviceId ? null : serviceId));
  };

  const activeLabel =
    CATEGORIES.find((c) => c.id === selectedCategory)?.label || "All";

  return (
    <div
      id="services-page"
      className="relative w-full min-h-screen pt-36 sm:pt-44 pb-28 overflow-hidden"
    >
      <PageAtmosphere
        variant="services"
        lightBand={{ top: "42%", height: "18%" }}
        bands={[
          { top: "18%", height: "12%", tone: "ink" },
          { top: "72%", height: "14%", tone: "pink" },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-7 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-5">
                <Cpu className="w-3.5 h-3.5" />
                <span>PRODUCTS &amp; SERVICES</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.25rem] text-[#F8F6FB] leading-[1.12] tracking-tight">
                Custom websites, software, and{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2]">
                  growth services
                </span>
              </h1>

              <p className="mt-5 text-[#B9A6D1] text-base sm:text-lg leading-relaxed max-w-2xl">
                Websites, web applications, custom software, SEO, digital
                marketing, social media, video, and scripts for startups and
                local businesses. Starter plans are priced with early budgets
                in mind. Kiduart School ERP stays the product lane.
              </p>
            </div>

            <div className="lg:col-span-5 hidden lg:flex flex-col items-end gap-4 pb-1">
              <MagneticCard
                reducedMotion={settings.reducedMotion}
                className="w-full max-w-sm"
              >
                <div className="relative rounded-2xl border border-[#B9A6D1]/35 surface-ink p-5 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                    aria-hidden
                  />
                  <div className="flex items-end justify-between gap-4 pl-1">
                    <div>
                      <div className="font-mono-accent text-[10px] tracking-[0.25em] uppercase text-[#E8A9C2]">
                        Catalogue
                      </div>
                      <div className="font-heading font-bold text-4xl text-[#F8F6FB] mt-1">
                        {SERVICES_DATA.length}
                      </div>
                      <div className="text-xs text-[#B9A6D1] mt-0.5">
                        offerings · scoped honestly
                      </div>
                    </div>
                    <WowAccent
                      kind="beacon"
                      reducedMotion={settings.reducedMotion}
                      className="w-36 h-36 scale-90 origin-bottom-right -mb-2"
                      caption="Engage signal"
                    />
                  </div>
                </div>
              </MagneticCard>
            </div>
          </div>
        </ScrollReveal>

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap gap-2 pb-5 border-b border-[#B9A6D1]/25">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? SERVICES_DATA.length
                : SERVICES_DATA.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick("soft");
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-2 rounded-full text-xs font-mono-accent transition-all inline-flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#6B4A87] text-[#F8F6FB] font-semibold shadow-[0_8px_22px_rgba(107,74,135,0.35)] border border-[#E8A9C2]/40"
                    : "bg-[#1E1024]/90 text-[#B9A6D1] border border-[#B9A6D1]/30 hover:text-[#F8F6FB] hover:border-[#E8A9C2]/50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 rounded-full ${
                    isSelected
                      ? "bg-[#1E1024] text-[#E8A9C2]"
                      : "bg-[#2A1830] text-[#B9A6D1]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StudioFrame
              src="/images/growth-website.jpg"
              alt="Gouache painting of a founder reviewing a custom website"
              caption="Every service on this page can be requested as a starter plan."
              kicker="Services"
            />
          </div>
          <div className="lg:col-span-5">
            <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              Read the offer before you scroll the cards
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              Custom websites, web applications, SEO, campaigns, social media,
              video, and AI are linked from here into longer guides, so this page
              is not the only place the words live.
            </p>
            <Link
              to="/ai"
              className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8A9C2] underline underline-offset-2 hover:text-[#F8F6FB]"
            >
              AI solutions hub
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <ul className="mt-5 space-y-2">
              {GUIDES.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    to={`/work/${guide.slug}`}
                    className="text-sm text-[#E8A9C2] underline underline-offset-2 hover:text-[#F8F6FB]"
                  >
                    {guide.kicker}: {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/sitemap"
              className="mt-4 inline-block text-sm text-[#B9A6D1] underline underline-offset-2 hover:text-[#E8A9C2]"
            >
              See every page
            </Link>
          </div>
        </div>

        <SectionBridge
          className="mt-10"
          label="Catalogue"
          reducedMotion={settings.reducedMotion}
        />

        {/* Engagement + nodes filler */}
        <ScrollReveal className="mt-2" reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#B9A6D1]/35 surface-lilac-mist p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(107,74,135,0.35) 0%, transparent 45%, rgba(232,169,194,0.12) 100%)",
                }}
                aria-hidden
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
                aria-hidden
              />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pl-2">
                <div className="max-w-xl">
                  <span className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest font-semibold">
                    How we engage
                  </span>
                  <h2 className="font-heading font-bold text-lg sm:text-2xl text-[#F8F6FB] mt-1.5">
                    Source ownership. Clear scope. Honest handoff.
                  </h2>
                  <p className="text-sm text-[#B9A6D1] mt-2 leading-relaxed">
                    Custom work includes source you own. Product conversations
                    point to{" "}
                    <a
                      href="https://kiduart.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8A9C2] font-semibold underline underline-offset-2 hover:text-[#F8F6FB]"
                    >
                      kiduart.com
                    </a>
                    . No invented SLA theatre.
                  </p>
                </div>
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("soft")}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#6B4A87] text-[#F8F6FB] text-xs font-heading font-semibold shrink-0 shadow-[0_8px_22px_rgba(107,74,135,0.35)] hover:bg-[#8558A5] border border-[#E8A9C2]/25 transition-colors"
                >
                  Talk to us
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center rounded-2xl border border-[#B9A6D1]/30 surface-pink-wash p-4">
              <WowAccent
                kind="pipeline"
                reducedMotion={settings.reducedMotion}
                className="w-48 h-44"
                caption="Problem → build → handoff"
              />
            </div>
          </div>
        </ScrollReveal>

        <SectionBridge
          className="mt-10"
          label="Offerings"
          tone="lilac"
          reducedMotion={settings.reducedMotion}
        />

        {/* Offerings: cards + sticky constellation rail */}
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest">
                  Showing
                </div>
                <div className="font-heading font-semibold text-[#F8F6FB] text-sm sm:text-base">
                  {activeLabel}{" "}
                  <span className="text-[#B9A6D1] font-mono-accent font-normal text-xs">
                    · {filteredServices.length}
                  </span>
                </div>
              </div>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setSelectedCategory("all");
                  }}
                  className="text-[11px] font-mono-accent text-[#E8A9C2] hover:text-[#F8F6FB] underline underline-offset-2"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
              onMouseLeave={() => setSpotlightId(null)}
            >
              {filteredServices.map((service, index) => (
                <ScrollReveal
                  key={service.id}
                  delay={Math.min(index * 0.04, 0.2)}
                  reducedMotion={settings.reducedMotion}
                  className={`transition-opacity duration-300 ${
                    spotlightId && spotlightId !== service.id
                      ? "opacity-40"
                      : "opacity-100"
                  }`}
                >
                  <div
                    onMouseEnter={() => setSpotlightId(service.id)}
                    onFocus={() => setSpotlightId(service.id)}
                  >
                    <ServiceCard3D
                      service={service}
                      index={index}
                      isSelected={activeModalService?.id === service.id}
                      onSelect={(s) => setActiveModalService(s)}
                      isExpandedInline={expandedCardId === service.id}
                      onToggleExpandInline={() =>
                        handleToggleExpandInline(service.id)
                      }
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-14 rounded-2xl border border-[#B9A6D1]/25 bg-[#1E1024]/70">
                <p className="text-sm font-mono-accent text-[#B9A6D1]">
                  No offerings in this lane yet.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="mt-3 text-xs font-mono-accent text-[#E8A9C2] hover:underline"
                >
                  Show all
                </button>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-[#B9A6D1]/35 surface-ink p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <ServiceConstellation
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  reducedMotion={settings.reducedMotion}
                />
              </div>
              <div className="rounded-2xl border border-[#B9A6D1]/30 surface-lilac-mist p-4 flex justify-center">
                <WowAccent
                  kind="lattice"
                  reducedMotion={settings.reducedMotion}
                  className="w-48 h-48"
                  caption="Capability lattice"
                />
              </div>
              <div className="rounded-2xl border border-[#E8A9C2]/30 surface-pink-wash p-4 text-xs text-[#B9A6D1] leading-relaxed">
                <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest mb-1.5">
                  Tip
                </div>
                Click a constellation node or a chip above to focus the
                catalogue. Hover a card to spotlight it open details for the
                full scope.
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile constellation */}
        <div className="mt-8 lg:hidden rounded-3xl border border-[#B9A6D1]/35 surface-ink p-5">
          <ServiceConstellation
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            reducedMotion={settings.reducedMotion}
          />
        </div>

        <SectionBridge
          className="mt-10"
          label="Engage"
          tone="pink"
          reducedMotion={settings.reducedMotion}
        />

        {/* Bottom CTA */}
        <ScrollReveal
          className="relative rounded-3xl border border-[#B9A6D1]/35 surface-pink-wash p-8 sm:p-12 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
          reducedMotion={settings.reducedMotion}
        >
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,169,194,0.35), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest block mb-2">
                Next step
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
                Pick the lane that matches the problem
              </h2>
              <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed max-w-xl">
                Product demos for Kiduart, scoped custom builds, or advisory we
                reply within one business day.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: "Kiduart product",
                    desc: "School ERP demos via kiduart.com",
                  },
                  {
                    title: "Scoped builds",
                    desc: "Milestone delivery with clear handoff",
                  },
                  {
                    title: "Advisory",
                    desc: "Architecture & build-vs-buy reviews",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-[#2A1830]/90 border border-[#B9A6D1]/25"
                  >
                    <div className="font-heading font-bold text-sm text-[#F8F6FB]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#B9A6D1] mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <div className="hidden lg:block w-full">
                <WowAccent
                  kind="layers"
                  reducedMotion={settings.reducedMotion}
                  className="w-48 h-44"
                  caption="Engagement stack"
                />
              </div>
              <Link
                to="/contact"
                onClick={() => soundEngine.playClick("hero")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] font-heading text-xs sm:text-sm font-semibold hover:opacity-95 transition-opacity shadow-[0_12px_28px_rgba(107,74,135,0.4)] group border border-[#E8A9C2]/25"
              >
                <span>Request a proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick("soft");
                  onOpenArchitectureModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#2A1830] border border-[#B9A6D1]/40 text-[#B9A6D1] hover:text-[#F8F6FB] hover:border-[#E8A9C2] text-xs font-mono-accent transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8A9C2]" />
                <span>Inspect architecture</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onOpenArchitecture={onOpenArchitectureModal}
      />
    </div>
  );
};
