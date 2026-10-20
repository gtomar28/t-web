import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { TrevykLogo } from "./TrevykLogo";
import { SITE_TAGLINE } from "../config/site";
import { trackOutbound } from "../utils/analytics";

interface FooterProps {
  onOpenArchitectureModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchitectureModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navSolutions: Array<{
    label: string;
    path: string;
    badge?: string;
    external?: boolean;
  }> = [
    { label: "Kiduart School ERP", path: "/kiduart", badge: "Flagship" },
    {
      label: "Kiduart official site",
      path: "https://kiduart.com",
      external: true,
    },
    { label: "AI solutions", path: "/ai" },
    { label: "Custom AI agents", path: "/work/ai-agents" },
    { label: "RAG assistants", path: "/work/rag-knowledge-assistants" },
    { label: "AI for schools", path: "/work/ai-for-schools" },
    { label: "Custom websites", path: "/work/custom-websites" },
    { label: "Web applications", path: "/work/web-applications" },
    { label: "SEO & campaigns", path: "/work/seo" },
    { label: "Digital marketing", path: "/work/digital-marketing" },
    { label: "Social media", path: "/work/social-media" },
    { label: "Video and scripts", path: "/work/video-scripts" },
    { label: "Custom Software", path: "/services" },
    { label: "Modular Core Technology", path: "/technology", badge: "Core" },
    { label: "Book Consultation", path: "/contact" },
  ];

  const navCompany = [
    { label: "About Trevyk", path: "/about" },
    { label: "5-Stage Engineering Process", path: "/process" },
    { label: "IT Services Overview", path: "/services" },
    { label: "System Architecture", path: "/technology" },
    { label: "Site map", path: "/sitemap" },
    { label: "Inspect 3D Core", action: onOpenArchitectureModal },
    { label: "Book Consultation", path: "/contact" },
  ];

  const navPrinciples = [
    { label: "Publish only what exists", badge: "Honest" },
    { label: "Scoped delivery, clear handoff", badge: "Craft" },
    { label: "School data export on request", badge: "Privacy" },
    { label: "Reply within one business day", badge: "Support" },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#160A1C] text-[#F8F6FB] border-t border-[#B9A6D1]/30 overflow-hidden select-none"
    >
      <div
        className="w-full h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, #2A1830 0%, #6B4A87 40%, #C89B6C 75%, #E8A9C2 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-t from-[#6B4A87]/20 to-transparent blur-3xl" />
        <div className="absolute top-0 right-0 w-[320px] h-[200px] bg-gradient-to-bl from-[#E8A9C2]/08 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-[#B9A6D1]/25">
          {/* Brand + vision */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link
                to="/"
                className="inline-flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A9C2] rounded-xl"
                aria-label="Trevyk Technologies Home"
              >
                <TrevykLogo size="md" showTagline={false} theme="dark" />
              </Link>

              <p className="mt-5 font-heading font-semibold text-base sm:text-lg text-[#F8F6FB] leading-snug tracking-tight max-w-sm">
                {SITE_TAGLINE}
              </p>
              <p className="mt-2.5 text-sm text-[#E7E1F0] leading-relaxed max-w-sm">
                We build custom websites, web applications, and custom software,
                then help the business get found with SEO, campaigns, social
                media, and video. Starter plans. Clear scope. Based in Noida.
              </p>
              <p className="mt-3 text-xs text-[#B9A6D1] leading-relaxed max-w-sm">
                Flagship product:{" "}
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8A9C2] font-semibold underline underline-offset-2 hover:text-[#F8F6FB]"
                >
                  Kiduart School ERP
                </a>{" "}
                for Indian schools plus custom software when a product alone is
                not enough.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/about"
                className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#E8A9C2]/35 text-xs font-mono-accent text-[#F8F6FB] hover:border-[#E8A9C2] hover:bg-[#24132B] transition-colors"
              >
                Our vision
              </Link>
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackOutbound("https://kiduart.com", "footer_kiduart")
                }
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/40 text-xs font-mono-accent text-[#E7E1F0] hover:border-[#E8A9C2] hover:text-[#F8F6FB] transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#E8A9C2]" />
                <span>kiduart.com</span>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono-accent uppercase tracking-widest text-[#E8A9C2] font-semibold">
              Solutions &amp; products
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {navSolutions.map((link, idx) => (
                <li key={idx}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E7E1F0] hover:text-[#E8A9C2] transition-colors inline-flex items-center space-x-1.5"
                    >
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-[#E7E1F0] hover:text-[#E8A9C2] transition-colors inline-flex items-center space-x-1.5"
                    >
                      <span>{link.label}</span>
                      {"badge" in link && link.badge && (
                        <span className="text-[9px] font-mono-accent px-1.5 py-0.5 rounded bg-[#2A1830] border border-[#E8A9C2]/45 text-[#E8A9C2]">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-mono-accent uppercase tracking-widest text-[#E8A9C2] font-semibold">
              Company
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {navCompany.map((link, idx) => (
                <li key={idx}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      className="text-[#E7E1F0] hover:text-[#E8A9C2] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={link.action}
                      className="text-[#E7E1F0] hover:text-[#E8A9C2] transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Principles */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono-accent uppercase tracking-widest text-[#E8A9C2] font-semibold">
              How we work
            </div>
            <ul className="space-y-2 text-xs font-mono-accent">
              {navPrinciples.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-2 py-1.5 border-b border-[#B9A6D1]/20 text-[#E7E1F0]"
                >
                  <span className="truncate">{item.label}</span>
                  <span className="text-[10px] text-[#E8A9C2] bg-[#2A1830] px-1.5 py-0.5 rounded border border-[#E8A9C2]/35 shrink-0">
                    {item.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-accent text-[#B9A6D1]">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Trevyk Technologies. All rights
              reserved. Noida, India.
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trevyk GitHub"
              className="w-8 h-8 rounded-lg bg-[#1E1024] border border-[#B9A6D1]/40 flex items-center justify-center text-[#E7E1F0] hover:text-[#F8F6FB] hover:border-[#E8A9C2] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trevyk LinkedIn"
              className="w-8 h-8 rounded-lg bg-[#1E1024] border border-[#B9A6D1]/40 flex items-center justify-center text-[#E7E1F0] hover:text-[#F8F6FB] hover:border-[#E8A9C2] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trevyk Twitter/X"
              className="w-8 h-8 rounded-lg bg-[#1E1024] border border-[#B9A6D1]/40 flex items-center justify-center text-[#E7E1F0] hover:text-[#F8F6FB] hover:border-[#E8A9C2] transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <MagneticButton
            onClick={scrollToTop}
            magneticStrength={0.2}
            variant="custom"
            className="px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#E8A9C2]/40 text-[#F8F6FB] hover:border-[#E8A9C2] hover:bg-[#24132B] transition-all flex items-center space-x-1.5 cursor-pointer interactive-target text-xs font-mono-accent"
            cursorLabel="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E8A9C2]" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
