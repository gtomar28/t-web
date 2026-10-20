import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SiteSettings } from "../../types";
import { soundEngine } from "../../utils/audioEngine";
import { ScrollReveal } from "../ScrollReveal";
import { LottieAccent } from "../motion/LottieAccent";

interface ContactTeaserProps {
  settings: SiteSettings;
  onOpenGeminiChat?: () => void;
}

type Lane = "product" | "engineering";

export const ContactTeaser: React.FC<ContactTeaserProps> = ({
  settings,
  onOpenGeminiChat,
}) => {
  const [lane, setLane] = useState<Lane>("engineering");
  const [track, setTrack] = useState(1);

  const tracks = [
    {
      title: "Product demo",
      desc: "See Kiduart on a real school journey.",
      icon: GraduationCap,
      href: "https://kiduart.com",
      external: true,
      trackIndex: 0,
      lane: "product" as Lane,
    },
    {
      title: "Engineering brief",
      desc: "Scope a custom system or integration.",
      icon: Briefcase,
      href: "/contact",
      external: false,
      trackIndex: 1,
      lane: "engineering" as Lane,
    },
    {
      title: "Architecture review",
      desc: "Walk the modular stack with our team.",
      icon: Layers,
      href: "/technology",
      external: false,
      trackIndex: 2,
      lane: "engineering" as Lane,
    },
  ];

  const visible = tracks.filter((t) => t.lane === lane || t.trackIndex === 2);

  return (
    <section
      id="contact-teaser"
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8"
    >
      <ScrollReveal
        className="max-w-7xl mx-auto"
        reducedMotion={settings.reducedMotion}
      >
        <div className="rounded-3xl bg-[#1E1024]/95 border border-[#B9A6D1]/40 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#6B4A87] via-[#E8A9C2] to-[#B9A6D1]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2A1830] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-4">
                <span className="font-semibold text-[#F8F6FB]/50">06</span>
                <span>START A CONVERSATION</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#F8F6FB] leading-tight">
                Tell us what you need to build next.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#B9A6D1] leading-relaxed">
                Choose a lane we reply within one business day.
              </p>

              <div className="mt-5 inline-flex p-1 rounded-full bg-[#2A1830] border border-[#B9A6D1]/35">
                {(
                  [
                    { id: "product" as Lane, label: "Product demo" },
                    { id: "engineering" as Lane, label: "Engineering" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setLane(opt.id);
                      setTrack(opt.id === "product" ? 0 : 1);
                      soundEngine.playClick("soft");
                    }}
                    className={`px-4 py-2 rounded-full text-[11px] font-mono-accent transition-colors ${
                      lane === opt.id
                        ? "bg-[#6B4A87] text-white"
                        : "text-[#B9A6D1] hover:text-[#F8F6FB]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <LottieAccent
                preset="signal-rings"
                reducedMotion={settings.reducedMotion}
                className="mt-6 w-full max-w-[200px]"
                caption="Signal beacon"
              />

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("hero")}
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#6B4A87] text-white font-heading text-xs sm:text-sm font-semibold group"
                >
                  <span>Contact Trevyk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                {onOpenGeminiChat && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      onOpenGeminiChat();
                    }}
                    className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-full bg-[#2A1830] border border-[#6B4A87]/50 text-[#B9A6D1] font-heading text-xs sm:text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#E8A9C2]" />
                    <span>Ask the assistant</span>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lane}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                >
                  {visible.map((t) => {
                    const Icon = t.icon;
                    const on = track === t.trackIndex;
                    const className = `h-full p-5 rounded-2xl border flex flex-col gap-3 group ${
                      on
                        ? "bg-[#2A1830] border-[#E8A9C2]/70"
                        : "bg-[#2A1830]/90 border-[#B9A6D1]/35 hover:border-[#E8A9C2]/60"
                    }`;
                    const body = (
                      <>
                        <div className="w-9 h-9 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/40 flex items-center justify-center text-[#E8A9C2]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-heading font-semibold text-sm text-[#F8F6FB]">
                          {t.title}
                        </h3>
                        <p className="text-[11px] text-[#B9A6D1]">{t.desc}</p>
                      </>
                    );
                    if (t.external) {
                      return (
                        <a
                          key={t.title}
                          href={t.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setTrack(t.trackIndex)}
                          className={className}
                        >
                          {body}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={t.title}
                        to={t.href}
                        onClick={() => soundEngine.playClick("soft")}
                        onMouseEnter={() => setTrack(t.trackIndex)}
                        className={className}
                      >
                        {body}
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
