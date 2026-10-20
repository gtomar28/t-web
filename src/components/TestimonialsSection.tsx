import React from "react";
import { Link } from "react-router-dom";
import { MessageSquareQuote, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteSettings } from "../types";

interface TestimonialsSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
}

/**
 * Honest empty testimonials  Kiduart founding-school charter style.
 * No fabricated quotes or borrowed school names.
 */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const commitments = [
    "We publish only stories a real school or client has approved in writing.",
    "No stock photos posing as campuses, no ratings we wrote about ourselves.",
    "Until then this space stays empty  honesty over borrowed credibility.",
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 sm:py-36 bg-gradient-to-b from-[#2A1830] via-[#201026] to-white text-[#F8F6FB] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-8 border-b border-[#6B4A87]/25">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1024] border border-[#6B4A87]/30 text-[#6B4A87] font-mono-accent text-xs mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>PROOF BEFORE POLISH</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#F8F6FB] tracking-tight max-w-3xl">
            Client stories will sit here when they are real
          </h2>
          <p className="mt-3 text-sm text-[#B9A6D1] max-w-2xl leading-relaxed">
            Same standard as{" "}
            <a
              href="https://kiduart.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B4A87] font-semibold underline underline-offset-2"
            >
              Kiduart’s about page
            </a>
            : we would rather show an empty template than a made-up quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#1E1024] border border-[#6B4A87]/25 shadow-sm">
            <div className="flex items-center gap-2 text-[#6B4A87] mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-heading font-bold text-lg text-[#F8F6FB]">
                Founding charter
              </span>
            </div>
            <ul className="space-y-3">
              {commitments.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-sm text-[#B9A6D1] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6B4A87] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-dashed border-[#6B4A87]/35 bg-[#2A1830]/80">
            <div className="text-[10px] font-mono-accent uppercase tracking-widest text-[#6B4A87] mb-3">
              Story template (empty on purpose)
            </div>
            <div className="space-y-4 text-sm text-[#B9A6D1]">
              <div className="h-3 w-1/3 rounded bg-[#341C3C]" />
              <div className="h-3 w-1/2 rounded bg-[#341C3C]" />
              <div className="h-16 rounded-xl bg-[#1E1024] border border-[#6B4A87]/15 p-4 text-xs text-[#B9A6D1]/80">
                School / company · City · Person &amp; role · Modules or
                services used · Measured outcome · Consent on record
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex px-5 py-2.5 rounded-full bg-[#6B4A87] text-white text-xs font-heading font-semibold"
              >
                Be an early reference
              </Link>
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-5 py-2.5 rounded-full bg-[#1E1024] border border-[#6B4A87]/30 text-[#B9A6D1] text-xs font-heading font-semibold"
              >
                See Kiduart
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
