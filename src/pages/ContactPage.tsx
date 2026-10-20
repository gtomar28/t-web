import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Clock,
  Building2,
  GraduationCap,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { SiteSettings } from "../types";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { SectionBridge } from "../components/SectionBridge";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { soundEngine } from "../utils/audioEngine";
import { trackContactSubmit } from "../utils/analytics";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";

interface ContactPageProps {
  settings: SiteSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formType, setFormType] = useState<"services" | "kiduart">("services");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    scope: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    soundEngine.playClick("hero");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formType === "kiduart" ? "kiduart" : "services",
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          phone: formData.phone,
          scope: formData.scope,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error || "Could not send your message. Please try again.",
        );
      }
      trackContactSubmit(formType);
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please email contact@trevyk.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-page"
      className="relative w-full min-h-screen pt-36 sm:pt-44 pb-28 overflow-hidden"
    >
      <PageAtmosphere
        variant="contact"
        lightBand={{ top: "35%", height: "18%" }}
        bands={[
          { top: "14%", height: "10%", tone: "pink" },
          { top: "68%", height: "16%", tone: "ink" },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal reducedMotion={settings.reducedMotion}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024]/95 border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-5">
                <Mail className="w-3.5 h-3.5" />
                <span>CONTACT · PRODUCT &amp; SERVICES</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.15rem] text-[#F8F6FB] leading-[1.12] tracking-tight">
                Tell us what you need{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F6FB] via-[#B9A6D1] to-[#E8A9C2]">
                  we reply in one business day
                </span>
              </h1>

              <p className="mt-5 text-[#B9A6D1] text-base sm:text-lg leading-relaxed max-w-2xl">
                Kiduart demos for schools, or a starter plan for a website, web
                app, SEO, social page, or video. Name the business and we reply
                within one business day.
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:flex justify-end pb-2">
              <WowAccent
                kind="beacon"
                reducedMotion={settings.reducedMotion}
                className="w-48 h-48"
                focus={formType === "kiduart" ? 0 : 1}
                caption="Channel open"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              Tell us the business. We reply in one business day.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              A clinic, a shop, a school, or a startup can use the same form.
              Name the service: website, web app, SEO, social, video, or
              Kiduart. Share a budget if you have one. Starter plans are scoped
              from that, not from a price we invented on the page.
            </p>
          </div>
          <div className="lg:col-span-7">
            <StudioFrame
              src="/images/studio-contact.jpg"
              alt="Gouache painting of an envelope and a lit window"
              caption="The form below is the same conversation, written down."
              kicker="Contact"
            />
          </div>
        </div>

        <SectionBridge
          className="mt-8"
          label="Reach us"
          reducedMotion={settings.reducedMotion}
        />

        <ScrollReveal
          className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          reducedMotion={settings.reducedMotion}
        >
          <div className="lg:col-span-7 relative p-6 sm:p-10 rounded-3xl surface-lilac-mist border border-[#B9A6D1]/35 shadow-[0_24px_50px_rgba(0,0,0,0.35)] overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] via-[#B9A6D1] to-[#E8A9C2]"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={formType}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mb-5 p-3.5 rounded-xl border border-[#B9A6D1]/30 bg-[#2A1830]/90"
              >
                <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest">
                  Active lane
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm font-heading font-semibold text-[#F8F6FB]">
                  {formType === "services" ? (
                    <>
                      <Cpu className="w-4 h-4 text-[#E8A9C2]" />
                      Custom engineering
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4 text-[#E8A9C2]" />
                      Kiduart School ERP
                    </>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-[#B9A6D1] leading-relaxed">
                  {formType === "services"
                    ? "Scoped builds, advisory, and integrations  we reply with next steps for your organisation."
                    : "Product demos and school walkthroughs  routed to the Kiduart team within one business day."}
                </p>
              </motion.div>
            </AnimatePresence>
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#341C3C] text-[#E8A9C2] mx-auto flex items-center justify-center border border-[#E8A9C2]/35">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#F8F6FB]">
                  Message received
                </h3>
                <p className="text-sm text-[#B9A6D1] max-w-md mx-auto leading-relaxed">
                  Thank you{formData.name ? `, ${formData.name}` : ""}. Someone
                  from Trevyk will reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setSubmitted(false);
                  }}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-xs font-mono-accent text-[#E8A9C2] hover:border-[#E8A9C2]"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-mono-accent text-[#E8A9C2] mb-2 uppercase tracking-widest">
                    I am interested in
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick("soft");
                        setFormType("services");
                      }}
                      className={`p-3 rounded-xl border text-xs font-mono-accent flex items-center justify-center gap-2 transition-all ${
                        formType === "services"
                          ? "bg-[#6B4A87] text-[#F8F6FB] font-semibold border-[#E8A9C2]/40"
                          : "bg-[#2A1830] text-[#B9A6D1] border-[#B9A6D1]/30 hover:border-[#E8A9C2]/45"
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Custom engineering</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick("soft");
                        setFormType("kiduart");
                      }}
                      className={`p-3 rounded-xl border text-xs font-mono-accent flex items-center justify-center gap-2 transition-all ${
                        formType === "kiduart"
                          ? "bg-[#6B4A87] text-[#F8F6FB] font-semibold border-[#E8A9C2]/40"
                          : "bg-[#2A1830] text-[#B9A6D1] border-[#B9A6D1]/30 hover:border-[#E8A9C2]/45"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Kiduart School ERP</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-accent text-[#B9A6D1] mb-1">
                      Your full name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Rajesh Verma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs sm:text-sm focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-accent text-[#B9A6D1] mb-1">
                      Work email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@organisation.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs sm:text-sm focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-accent text-[#B9A6D1] mb-1">
                      Organisation / school *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Company or educational trust"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs sm:text-sm focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-accent text-[#B9A6D1] mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 …"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs sm:text-sm focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-accent text-[#B9A6D1] mb-1">
                    Scope &amp; key needs *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      formType === "services"
                        ? "Describe the problem, users, timeline, and any systems you already run…"
                        : "School size, current tools, and which areas matter most (fees, attendance, exams, parent updates)…"
                    }
                    value={formData.scope}
                    onChange={(e) =>
                      setFormData({ ...formData, scope: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 text-[#F8F6FB] text-xs sm:text-sm focus:outline-none focus:border-[#E8A9C2] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] font-heading font-semibold text-xs sm:text-sm shadow-[0_12px_28px_rgba(107,74,135,0.35)] border border-[#E8A9C2]/25 hover:opacity-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending…" : "Submit request"}</span>
                </button>
                {submitError && (
                  <p className="text-xs text-red-300 text-center leading-relaxed">
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl surface-pink-wash border border-[#B9A6D1]/35 space-y-5">
              <h3 className="font-heading font-bold text-lg text-[#F8F6FB]">
                Direct channels
              </h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#B9A6D1] font-mono-accent text-[10px] uppercase tracking-wider">
                      General
                    </div>
                    <a
                      href="mailto:contact@trevyk.com"
                      className="font-mono-accent text-[#E8A9C2] hover:underline text-sm"
                    >
                      contact@trevyk.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#B9A6D1] font-mono-accent text-[10px] uppercase tracking-wider">
                      Kiduart / product
                    </div>
                    <a
                      href="tel:+919217534128"
                      className="font-mono-accent text-[#F8F6FB] text-sm hover:text-[#E8A9C2]"
                    >
                      +91 92175 34128, +91 88106 64797
                    </a>
                    <div className="mt-1">
                      <a
                        href="mailto:support@kiduart.com"
                        className="text-[#B9A6D1] hover:text-[#E8A9C2] underline underline-offset-2"
                      >
                        support@kiduart.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1830] border border-[#B9A6D1]/30 flex items-center justify-center text-[#E8A9C2] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[#B9A6D1] font-mono-accent text-[10px] uppercase tracking-wider">
                      Based in India
                    </div>
                    <span className="text-[#B9A6D1] leading-relaxed block mt-0.5">
                      Noida, Uttar Pradesh demos and support with the team that
                      ships{" "}
                      <a
                        href="https://kiduart.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8A9C2] font-semibold underline underline-offset-2"
                      >
                        Kiduart
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#1E1024]/95 border border-[#B9A6D1]/30 flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#E8A9C2] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-heading font-semibold text-[#F8F6FB]">
                  Reply within one business day
                </div>
                <p className="text-xs text-[#B9A6D1] mt-1 leading-relaxed">
                  Product questions go to the Kiduart team. Custom engineering
                  is reviewed by Trevyk no invented SLAs.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#1E1024]/90 border border-[#B9A6D1]/25 flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#E8A9C2] shrink-0" />
              <div className="text-xs text-[#B9A6D1]">
                <strong className="text-[#F8F6FB] block font-heading font-semibold mb-1">
                  Prefer a product walkthrough?
                </strong>
                Book directly on kiduart.com, or explore how we engineer systems
                on the{" "}
                <Link
                  to="/technology"
                  className="text-[#E8A9C2] underline underline-offset-2"
                >
                  Technology
                </Link>{" "}
                page.
              </div>
            </div>

            <a
              href="https://kiduart.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick("soft")}
              className="inline-flex items-center gap-2 text-xs font-mono-accent text-[#E8A9C2] hover:text-[#F8F6FB]"
            >
              <Building2 className="w-3.5 h-3.5" />
              Open kiduart.com
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
