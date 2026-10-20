import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Unlock,
  CreditCard,
  Users,
  CheckCircle2,
  Award,
  Lock,
  Server,
  FileCheck,
  Globe2,
  Sparkles,
} from "lucide-react";
import { CountUpNumber } from "./CountUpNumber";
import { AmbientParticles } from "./AmbientParticles";
import { SiteSettings } from "../types";

interface StatsTrustSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
  onOpenArchitectureModal?: () => void;
}

export const StatsTrustSection: React.FC<StatsTrustSectionProps> = ({
  settings,
}) => {
  const pillarStats = [
    {
      id: "clear-scope",
      number: 1,
      prefix: "",
      suffix: "",
      unitLabel: "Business-day reply target",
      title: "Clear scope & reply time",
      tagline: "We reply within one business day.",
      description:
        "Engagements start with written scope. No invented 15-minute SRE theatre  you get a human reply and a plan you can evaluate.",
      icon: CreditCard,
      color: "#E8A9C2",
      badge: "Honest cadence",
      decimals: 0,
    },
    {
      id: "no-lockin",
      number: 100,
      prefix: "",
      suffix: "%",
      unitLabel: "Source you own on custom work",
      title: "No vendor lock-in theatre",
      tagline: "Custom builds include source handoff.",
      description:
        "For custom IT work, you keep the code and docs we deliver. For Kiduart, schools get export paths and support via kiduart.com  not marketing lock-in slogans.",
      icon: Unlock,
      color: "#B9A6D1",
      badge: "Portable work",
      decimals: 0,
    },
    {
      id: "real-controls",
      number: 3,
      prefix: "",
      suffix: "",
      unitLabel: "Controls we actually ship",
      title: "RBAC, export, audit",
      tagline: "Privacy practices you can verify.",
      description:
        "We talk about role-based access, data export, and audit trails  the same class of controls Kiduart publishes  not borrowed SOC 2 / ISO badges.",
      icon: ShieldCheck,
      color: "#6B4A87",
      badge: "Real controls",
      decimals: 0,
    },
    {
      id: "kiduart",
      number: 12,
      prefix: "",
      suffix: "",
      unitLabel: "School journey steps on Kiduart",
      title: "Flagship product: Kiduart",
      tagline: "Live product at kiduart.com.",
      description:
        "Kiduart is Trevyk’s school ERP. Explore the journey here, then book demos on the product site  no invented school-count metrics.",
      icon: Users,
      color: "#E8A9C2",
      badge: "kiduart.com",
      decimals: 0,
    },
  ];

  const marqueeRow1 = [
    {
      label: "Kiduart School ERP",
      category: "institutions",
      icon: Award,
      accent: "#E8A9C2",
    },
    {
      label: "RBAC & role-scoped access",
      category: "compliance",
      icon: Lock,
      accent: "#B9A6D1",
    },
    {
      label: "Data export paths",
      category: "compliance",
      icon: FileCheck,
      accent: "#E8A9C2",
    },
    {
      label: "Noida, India base",
      category: "institutions",
      icon: Globe2,
      accent: "#B9A6D1",
    },
    {
      label: "Custom software builds",
      category: "stack",
      icon: Server,
      accent: "#E8A9C2",
    },
    {
      label: "Institutional platforms",
      category: "institutions",
      icon: Users,
      accent: "#B9A6D1",
    },
    {
      label: "1 business-day reply",
      category: "compliance",
      icon: ShieldCheck,
      accent: "#E8A9C2",
    },
    {
      label: "Source ownership on builds",
      category: "stack",
      icon: Unlock,
      accent: "#B9A6D1",
    },
  ];

  const marqueeRow2 = [
    {
      label: "kiduart.com product site",
      category: "institutions",
      icon: Award,
      accent: "#B9A6D1",
    },
    {
      label: "Admissions → parent updates",
      category: "institutions",
      icon: Globe2,
      accent: "#E8A9C2",
    },
    {
      label: "Scoped milestone delivery",
      category: "stack",
      icon: Server,
      accent: "#B9A6D1",
    },
    {
      label: "Practical security controls",
      category: "compliance",
      icon: Lock,
      accent: "#E8A9C2",
    },
    {
      label: "Web + mobile engineering",
      category: "stack",
      icon: Server,
      accent: "#B9A6D1",
    },
    {
      label: "support@kiduart.com",
      category: "compliance",
      icon: CreditCard,
      accent: "#E8A9C2",
    },
    {
      label: "Founding-school charter tone",
      category: "institutions",
      icon: Award,
      accent: "#B9A6D1",
    },
    {
      label: "No invented SLA badges",
      category: "compliance",
      icon: ShieldCheck,
      accent: "#E8A9C2",
    },
  ];

  return (
    <section
      id="trust"
      className="relative w-full py-28 sm:py-36 bg-[#2A1830] text-[#F8F6FB] overflow-hidden"
    >
      <AmbientParticles
        count={settings.reducedMotion ? 0 : 35}
        reducedMotion={settings.reducedMotion}
        colorScheme="brand"
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#6B4A87]/25 via-[#1E1024]/40 to-transparent blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-[#E8A9C2]/10 via-[#6B4A87]/15 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#241428 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1024] border border-[#E8A9C2]/40 text-[#6B4A87] font-mono-accent text-xs mb-4 shadow-[0_4px_20px_rgba(232,169,194,0.12)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HONEST ENGAGEMENT PRINCIPLES</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F8F6FB] tracking-tight leading-[1.1]">
            Transparent terms.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A9C2] via-[#B9A6D1] to-[#241428]">
              Claims you can check.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#B9A6D1]/80 leading-relaxed max-w-2xl mx-auto font-sans">
            No hidden fee theatre, no borrowed certifications, no fake uptime
            percentages the same honesty standard as Kiduart&apos;s
            founding-school charter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20">
          {pillarStats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <div
                key={stat.id}
                id={`trust-stat-card-${stat.id}`}
                className="p-6 sm:p-7 rounded-2xl bg-[#1E1024]/85 border border-[#6B4A87]/40 shadow-[0_15px_35px_rgba(107,74,135,0.12)] flex flex-col justify-between transition-all duration-300 hover:border-[#E8A9C2]/60 hover:bg-[#1E1024] relative group overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{
                    background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${stat.color}18`,
                        borderColor: `${stat.color}45`,
                        color: stat.color,
                      }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono-accent uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2A1830] border border-[#6B4A87]/40 text-[#B9A6D1]">
                      {stat.badge}
                    </span>
                  </div>

                  <div className="font-heading font-bold text-3xl sm:text-4xl text-[#F8F6FB] tracking-tight">
                    <CountUpNumber
                      end={stat.number}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </div>

                  <div className="text-xs font-mono-accent text-[#6B4A87] mt-1 font-semibold">
                    {stat.unitLabel}
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#F8F6FB] mt-4">
                    {stat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B9A6D1]/75 mt-2 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#6B4A87]/30 flex items-center text-[11px] font-mono-accent text-[#B9A6D1] group-hover:text-[#E8A9C2] transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{stat.tagline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full relative mt-6 py-6 bg-[#1E1024]/70 border-y border-[#6B4A87]/30 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#2A1830] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#2A1830] to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
          <span className="text-[11px] font-mono-accent uppercase tracking-widest text-[#B9A6D1]/80">
            PRODUCT • PRACTICES • HOW WE WORK
          </span>
        </div>

        <div className="flex overflow-hidden py-2 select-none group">
          <motion.div
            className="flex items-center space-x-4 sm:space-x-6 shrink-0"
            animate={{
              x: settings.reducedMotion ? 0 : ["0%", "-50%"],
            }}
            transition={{
              duration: settings.reducedMotion ? 0 : 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...marqueeRow1, ...marqueeRow1].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={`m1-${idx}`}
                  className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#2A1830]/90 border border-[#6B4A87]/40 shadow-sm hover:border-[#E8A9C2]/60 hover:bg-[#1E1024] transition-all cursor-default whitespace-nowrap"
                >
                  <IconComp
                    className="w-4 h-4"
                    style={{ color: item.accent }}
                  />
                  <span className="text-xs font-mono-accent text-[#F8F6FB] font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex overflow-hidden py-2 select-none group mt-1">
          <motion.div
            className="flex items-center space-x-4 sm:space-x-6 shrink-0"
            animate={{
              x: settings.reducedMotion ? 0 : ["-50%", "0%"],
            }}
            transition={{
              duration: settings.reducedMotion ? 0 : 38,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...marqueeRow2, ...marqueeRow2].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={`m2-${idx}`}
                  className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#2A1830]/90 border border-[#6B4A87]/40 shadow-sm hover:border-[#B9A6D1]/60 hover:bg-[#1E1024] transition-all cursor-default whitespace-nowrap"
                >
                  <IconComp
                    className="w-4 h-4"
                    style={{ color: item.accent }}
                  />
                  <span className="text-xs font-mono-accent text-[#F8F6FB] font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
