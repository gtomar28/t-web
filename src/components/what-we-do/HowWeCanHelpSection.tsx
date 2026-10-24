import { ArrowRight, BarChart3, Code2, MessageSquare, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { soundEngine } from "../../utils/audioEngine";

const HELP_PATHS = [
  {
    title: "Build Something New",
    description:
      "Custom websites, web applications and business software designed around your needs.",
    icon: Code2,
    href: "/contact",
  },
  {
    title: "Improve What Exists",
    description:
      "Refine an existing website, improve workflows, or extend a current application.",
    icon: BarChart3,
    href: "/contact",
  },
  {
    title: "Get Technical Direction",
    description:
      "Clarify architecture, technology choices and a practical implementation plan.",
    icon: Settings2,
    href: "/contact",
  },
] as const;

export function HowWeCanHelpSection() {
  return (
    <section
      id="how-we-can-help"
      aria-labelledby="how-we-can-help-heading"
      className="relative z-10 w-full scroll-mt-28 py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            How we can help
          </div>

          <h2
            id="how-we-can-help-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Choose the right{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              starting point.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            Whether you are building something new or improving what exists, we
            can help you define the next step.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {HELP_PATHS.map(({ title, description, icon: Icon, href }) => (
            <li key={title} className="flex">
              <article className="flex w-full flex-col rounded-2xl border border-[#B9A6D1]/32 bg-[#1E1024]/82 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-[2px] sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/35 bg-[#2A1830]/90 text-[#E8A9C2]">
                  <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#F8F6FB]">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#C4B4D8]">
                  {description}
                </p>
                <Link
                  to={href}
                  onClick={() => soundEngine.playClick("soft")}
                  className="mt-6 inline-flex w-fit items-center gap-2 font-heading text-sm font-semibold text-[#E8A9C2] transition hover:text-[#F8F6FB]"
                >
                  Discuss this need
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#B9A6D1]/25 bg-[#1E1024]/75 px-5 py-4 text-center backdrop-blur-[2px] sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B9A6D1]/30 bg-[#2A1830]/80 text-[#E8A9C2]">
              <MessageSquare className="h-4 w-4" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-[#B9A6D1] sm:text-[15px]">
              Not sure which path fits?{" "}
              <Link
                to="/contact"
                onClick={() => soundEngine.playClick("soft")}
                className="font-semibold text-[#F8F6FB] underline decoration-[#E8A9C2]/45 underline-offset-[3px] transition hover:text-[#E8A9C2]"
              >
                Tell us what you need
              </Link>{" "}
              and we&apos;ll help you scope it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
