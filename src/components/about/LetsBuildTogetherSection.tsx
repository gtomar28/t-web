import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Mail,
  School,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ViewportSection } from "../ViewportSection";
import { soundEngine } from "../../utils/audioEngine";

const AUDIENCE_ITEMS = [
  {
    title: "For Schools",
    description:
      "Discuss how KIDUART can support your institution's needs.",
    icon: School,
  },
  {
    title: "For Businesses",
    description:
      "Explore custom websites, web applications, and software solutions.",
    icon: Building2,
  },
  {
    title: "For Growth",
    description:
      "Talk about digital presence and long-term growth opportunities.",
    icon: BarChart3,
  },
] as const;

function LetsBuildTogetherBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      <div className="trevyk-build-together-live-bg absolute inset-0" />
      <div className="trevyk-build-together-live-bg__glow absolute inset-0" />
      <div className="trevyk-build-together-live-bg__vignette absolute inset-0" />
    </div>
  );
}

export function LetsBuildTogetherSection() {
  return (
    <ViewportSection
      id="lets-build-together"
      aria-labelledby="lets-build-heading"
      className="trevyk-viewport-section--center overflow-hidden"
      background={<LetsBuildTogetherBackground />}
      innerClassName="flex flex-col justify-center py-10 sm:py-12"
    >
      <div className="grid w-full items-start gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <Target className="h-4 w-4" aria-hidden />
            <span>06 / Let&apos;s build together</span>
          </div>

          <p className="mt-5 font-mono-accent text-[11px] uppercase tracking-[0.22em] text-[#E8A9C2] sm:text-xs">
            Let&apos;s build together
          </p>

          <h2
            id="lets-build-heading"
            className="mt-3 font-heading text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
          >
            Your goals.{" "}
            <span className="bg-gradient-to-r from-[#E8A9C2] via-[#F0B8CE] to-[#B9A6D1] bg-clip-text text-transparent">
              Our expertise.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
            Whether you&apos;re a school looking for a smarter way to manage
            operations, a business planning a custom solution, or an
            organization exploring digital growth, we&apos;d love to understand
            your goals and see how we can help.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              onClick={() => soundEngine.playClick("hero")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              to="/what-we-do"
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center gap-2 rounded-full border border-[#B9A6D1]/45 bg-transparent px-6 py-3 font-heading text-sm font-semibold text-[#F8F6FB] transition hover:border-[#E8A9C2]/55 hover:bg-[#2A1830]/40"
            >
              Explore our work
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-7">
          <div className="rounded-2xl border border-[#6B4A87]/45 bg-[#2A1830]/78 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.28)] sm:p-7">
            <h3 className="font-heading text-xl font-semibold text-[#F8F6FB] sm:text-[1.35rem]">
              Tell us about your idea
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#D8CCE6] sm:text-[15px]">
              Share a few details and our team will get back to you to discuss
              the next steps.
            </p>
            <Link
              to="/contact"
              onClick={() => soundEngine.playClick("hero")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-5 py-2.5 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.28)] transition hover:brightness-105"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {AUDIENCE_ITEMS.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#B9A6D1]/35 bg-[#1E1024]/80 text-[#E8A9C2]">
                  <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                </div>
                <h4 className="mt-3 font-heading text-sm font-semibold text-[#F8F6FB] sm:text-[15px]">
                  {title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#C4B4D8] sm:text-[13px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ViewportSection>
  );
}
