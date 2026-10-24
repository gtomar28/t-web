import {
  ArrowUpRight,
  Calendar,
  FileText,
  MessageSquare,
  Rocket,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { soundEngine } from "../../utils/audioEngine";

const STEPS = [
  {
    title: "Tell us your idea",
    description: "Share your goals, requirements and any references.",
    icon: MessageSquare,
  },
  {
    title: "Get a clear plan",
    description: "We'll suggest the best approach, scope and timeline.",
    icon: Search,
  },
  {
    title: "Discuss & clarify",
    description: "Ask questions, explore options and finalize the plan.",
    icon: FileText,
  },
  {
    title: "Start building",
    description: "Once aligned, we get started on your project.",
    icon: Rocket,
  },
] as const;

const STEP_ICON_BOX =
  "mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8A9C2]/30 bg-[#6B4A87] text-[#F8F6FB] shadow-[0_0_18px_rgba(107,74,135,0.45)]";

export function HaveAProjectInMindSection() {
  return (
    <section
      id="have-a-project-in-mind"
      aria-labelledby="have-a-project-heading"
      className="relative border-t border-[#6B4A87]/25 px-4 py-16 sm:px-6 sm:py-26 lg:px-8"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/92 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-[#B9A6D1]/22 p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#2A1830]/90 px-3 py-1 font-mono-accent text-[10px] uppercase tracking-[0.16em] text-[#E8A9C2]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#E8A9C2]"
                  aria-hidden
                />
                Ready to start
              </div>

              <h2
                id="have-a-project-heading"
                className="mt-4 font-heading text-[clamp(1.65rem,3.5vw,2.25rem)] font-bold leading-[1.12] text-[#F8F6FB]"
              >
                Have a project in{" "}
                <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
                  mind?
                </span>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#C4B4D8] sm:text-[15px]">
                Let&apos;s discuss your goals, explore the possibilities and
                create a clear plan for your project. No pressure, just a focused
                conversation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("hero")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] px-6 py-3 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_8px_24px_rgba(232,169,194,0.32)] transition hover:brightness-105"
                >
                  Discuss your project
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/contact"
                  onClick={() => soundEngine.playClick("soft")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/60 px-6 py-3 font-heading text-sm font-semibold text-[#F8F6FB] transition hover:border-[#E8A9C2]/50 hover:text-[#E8A9C2]"
                >
                  <Calendar className="h-4 w-4" aria-hidden />
                  Book a call
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {STEPS.map(({ title, description, icon: Icon }) => (
                  <li key={title} className="text-center">
                    <div className={STEP_ICON_BOX}>
                      <Icon className="h-5 w-5" strokeWidth={1.65} aria-hidden />
                    </div>
                    <h3 className="mt-3 font-heading text-sm font-bold text-[#F8F6FB]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#B9A6D1]">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
