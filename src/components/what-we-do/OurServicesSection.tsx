import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Code2,
  LayoutGrid,
  Palette,
  Settings2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { soundEngine } from "../../utils/audioEngine";

const SERVICE_CARDS = [
  {
    title: "Web Development",
    description:
      "Modern, responsive and high-performance websites built for your business.",
    icon: Code2,
    image: "/images/what-we-do/services/service-web-development-v2.jpg",
    imagePosition: "right center",
    href: "/work/custom-websites",
  },
  {
    title: "Web Applications",
    description:
      "Scalable and secure web applications tailored to your unique workflows.",
    icon: LayoutGrid,
    image: "/images/what-we-do/services/service-web-applications-v2.jpg",
    imagePosition: "85% center",
    href: "/work/web-applications",
  },
  {
    title: "Custom Software Development",
    description:
      "End-to-end software solutions designed around your specific needs.",
    icon: Settings2,
    image: "/images/what-we-do/services/service-custom-software-v2.jpg",
    imagePosition: "90% center",
    href: "/work/web-applications",
  },
  {
    title: "UI/UX Design",
    description:
      "User-friendly and modern designs that create meaningful experiences.",
    icon: Palette,
    image: "/images/what-we-do/services/service-ui-ux-v2.jpg",
    imagePosition: "88% center",
    href: "/contact",
  },
  {
    title: "SEO & Digital Marketing",
    description:
      "Improve your online presence and reach the right audience with data-driven strategies.",
    icon: BarChart3,
    image: "/images/what-we-do/services/service-seo-marketing-v2.jpg",
    imagePosition: "85% center",
    href: "/work/seo",
  },
  {
    title: "AI & Automation",
    description:
      "Smarter workflows with AI-powered solutions to save time and increase efficiency.",
    icon: Bot,
    image: "/images/what-we-do/services/service-ai-automation-v2.jpg",
    imagePosition: "88% center",
    href: "/work/ai-agents",
  },
] as const;

export function OurServicesSection() {
  return (
    <section
      id="our-services"
      aria-labelledby="our-services-heading"
      className="scroll-mt-28 relative w-full border-t border-[#6B4A87]/30 bg-[#120a14] py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,74,135,0.28) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Our services
          </div>

          <h2
            id="our-services-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Digital solutions built{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              for your goals
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            From custom software to scalable web applications, we help schools,
            businesses and organisations turn ideas into real-world solutions.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {SERVICE_CARDS.map(
            ({ title, description, icon: Icon, image, imagePosition, href }) => (
              <li key={title}>
                <article className="group relative flex min-h-[17.5rem] flex-col overflow-hidden rounded-2xl border border-[#B9A6D1]/28 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:min-h-[18.5rem]">
                  <img
                    src={image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    style={{ objectPosition: imagePosition }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#0f0810]/92 via-[#1a0f18]/55 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0f0810]/75 via-[#0f0810]/10 to-transparent"
                    aria-hidden
                  />

                  <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8A9C2]/35 bg-[#1E1024]/75 text-[#E8A9C2] backdrop-blur-sm">
                      <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-[#F8F6FB] sm:text-xl">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#D8CCE6]">
                      {description}
                    </p>

                    <Link
                      to={href}
                      onClick={() => soundEngine.playClick("soft")}
                      className="mt-5 inline-flex w-fit items-center gap-2 font-heading text-sm font-semibold text-[#F8F6FB] transition hover:text-[#E8A9C2]"
                    >
                      Learn more
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/80 transition group-hover:border-[#E8A9C2]/50 group-hover:bg-[#2A1830]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </div>
                </article>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
