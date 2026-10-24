import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  Layers3,
  Workflow,
} from "lucide-react";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";
import { MagneticCard } from "../MagneticCard";

interface ServicesTeaserProps {
  settings: SiteSettings;
}

export const ServicesTeaser: React.FC<ServicesTeaserProps> = ({ settings }) => {
  const [focus, setFocus] = useState<number | null>(null);

  const lanes = [
    {
      id: "engineering",
      title: "Enterprise engineering",
      desc: "Purpose-built systems, integrations, and internal tools when catalogs and SaaS fall short.",
      tag: "01 / ENGINEERING",
      icon: Building2,
      href: "/what-we-do",
      outcome: "Scope a custom engagement",
    },
    {
      id: "platforms",
      title: "Product platforms",
      desc: "Domain products with clear ownership  starting with Kiduart School ERP for Indian institutions.",
      tag: "02 / PRODUCT",
      icon: GraduationCap,
      href: "/our-products",
      outcome: "Ship a ready product lane",
    },
    {
      id: "experiences",
      title: "Websites, apps & growth",
      desc: "Custom websites, web applications, SEO, campaigns, social media, and video for businesses that need to be found.",
      tag: "03 / GROWTH",
      icon: Layers3,
      href: "/what-we-do",
      outcome: "Plan a delivery track",
    },
  ];

  return (
    <section
      id="services-teaser"
      className="trevyk-viewport-section relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center">
          <ScrollReveal
            className="lg:col-span-5 flex flex-col items-start"
            reducedMotion={settings.reducedMotion}
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-4">
              <span className="font-semibold text-[#F8F6FB]/50">01</span>
              <span>PRODUCTS &amp; SERVICES</span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB] leading-tight">
              Websites, software, and the work that brings customers in.
            </h2>
            <p className="mt-4 text-[#B9A6D1] text-sm sm:text-base leading-relaxed">
              Custom website development, web applications, SEO, campaigns,
              social media, and video. Plus Kiduart for schools. Starter plans
              for businesses that are still early.
            </p>

            <ul className="mt-6 space-y-2.5 w-full">
              {[
                "Clear problem framing before build",
                "Defined scope and delivery checkpoints",
                "Ownership you retain after launch",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E7E1F0]"
                >
                  <Workflow className="w-3.5 h-3.5 text-[#E8A9C2] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <ScrollReveal
              className="mt-2"
              reducedMotion={settings.reducedMotion}
            >
              <figure className="mx-auto w-full max-w-4xl px-2">
                <img
                  src="/capacities.png"
                  alt="Product platforms, enterprise engineering, and growth — three delivery lanes"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 92vw, 896px"
                />
                <figcaption className="sr-only">
                  Three capacity lanes
                </figcaption>
              </figure>
            </ScrollReveal>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col space-y-4">
            {lanes.map((lane, i) => {
              const Icon = lane.icon;
              const active = focus === i;
              return (
                <ScrollReveal
                  key={lane.id}
                  delay={0.06 * i}
                  reducedMotion={settings.reducedMotion}
                >
                  <MagneticCard
                    reducedMotion={settings.reducedMotion}
                    className="block"
                  >
                    <Link
                      to={lane.href}
                      onClick={() => soundEngine.playClick("soft")}
                      onMouseEnter={() => {
                        soundEngine.playHover();
                        setFocus(i);
                      }}
                      onMouseLeave={() => setFocus(null)}
                      className={`relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-4 p-5 pl-6 rounded-2xl bg-[#1E1024]/90 border transition-colors group ${
                        active
                          ? "border-[#E8A9C2]/75"
                          : "border-[#B9A6D1]/40 hover:border-[#E8A9C2]/65"
                      }`}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
                        aria-hidden
                      />
                      <div className="w-11 h-11 rounded-xl bg-[#6B4A87]/25 border border-[#B9A6D1]/45 flex items-center justify-center text-[#E8A9C2] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono-accent text-[#E8A9C2] font-semibold block mb-1">
                          {lane.tag}
                        </span>
                        <h3 className="font-heading font-bold text-base text-[#F8F6FB] group-hover:text-[#E8A9C2] transition-colors">
                          {lane.title}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#B9A6D1] leading-relaxed">
                          {lane.desc}
                        </p>
                      </div>
                      <span className="inline-flex items-center text-[11px] font-mono-accent text-[#E8A9C2] shrink-0">
                        Open <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </Link>
                  </MagneticCard>
                </ScrollReveal>
              );
            })}

            <div className="flex justify-end mt-4">
              <Link
                to="/what-we-do"
                onClick={() => soundEngine.playClick("soft")}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#6B4A87] text-white font-heading text-xs sm:text-sm font-semibold hover:bg-[#8558A5] transition-all group"
              >
                <span>View full offerings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
