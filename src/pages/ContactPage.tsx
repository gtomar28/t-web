import React, { useState } from "react";
import {
  Building2,
  Check,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Settings2,
  User,
  Users,
} from "lucide-react";
import { PlumSelect } from "../components/ui/PlumSelect";
import { SiteSettings } from "../types";
import { contactHeroBackdrop } from "../config/media";
import { whatsappContact } from "../content/home";
import { soundEngine } from "../utils/audioEngine";
import { trackContactSubmit } from "../utils/analytics";
import { buildWhatsAppChatUrl } from "../utils/whatsappChat";

interface ContactPageProps {
  settings: SiteSettings;
}

type ContactNeed = "custom-web" | "kiduart" | "growth" | "other";

const NEED_SELECT_OPTIONS: { value: ContactNeed; label: string }[] = [
  { value: "custom-web", label: "Custom website / web app" },
  { value: "kiduart", label: "KIDUART School ERP" },
  { value: "growth", label: "SEO & Digital Marketing" },
  { value: "other", label: "Other (please specify)" },
];

const HIGHLIGHTS = [
  { icon: MessageSquare, line1: "Clear", line2: "communication" },
  { icon: Users, line1: "Right", line2: "guidance" },
  { icon: Clock, line1: "Quick", line2: "response" },
  { icon: Settings2, line1: "Practical", line2: "solutions" },
] as const;

const MESSAGE_MAX = 500;

function needToApiType(need: ContactNeed): "services" | "kiduart" {
  return need === "kiduart" ? "kiduart" : "services";
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [need, setNeed] = useState<ContactNeed>("custom-web");
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

  const formType = needToApiType(need);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    soundEngine.playClick("hero");

    const needLabel =
      NEED_SELECT_OPTIONS.find((o) => o.value === need)?.label ?? need;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formType,
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          phone: formData.phone,
          scope: `[${needLabel}]\n${formData.scope}`,
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
    <div id="contact-page" className="relative w-full overflow-x-hidden">
      {/* Hero — mirrored photo (desk/laptop on right); copy left-aligned */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative min-h-[min(100dvh,920px)] w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src={contactHeroBackdrop.image}
            alt=""
            className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[22%_55%]"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1a0f18]/75 via-[#1a0f18]/22 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(min(100dvh,920px)-7rem)] w-full max-w-7xl flex-col justify-center px-4 pb-14 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/85 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2]">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
                aria-hidden
              />
              Contact us
            </div>

            <h1
              id="contact-hero-heading"
              className="mt-5 font-heading text-[clamp(1.85rem,4.2vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-[#F8F6FB]"
            >
              Let&apos;s build what&apos;s next{" "}
              <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
                together.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#E7E1F0] sm:text-[17px]">
              Share your ideas, requirements, or questions. Our team will get back
              to you within one business day with the right next steps.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
              {HIGHLIGHTS.map(({ icon: Icon, line1, line2 }) => (
                <li key={line1} className="flex flex-col items-start gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#B9A6D1]/35 bg-[#1E1024]/75 text-[#E8A9C2]">
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.65} aria-hidden />
                  </div>
                  <p className="font-heading text-[11px] font-semibold leading-snug text-[#E8A9C2] sm:text-xs">
                    {line1}
                    <br />
                    <span className="text-[#F8F6FB]">{line2}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ReachDirectlySection />
        </div>
      </section>

      {/* Form — checkered site grid shows through (no solid band / card fill) */}
      <section
        aria-labelledby="contact-form-heading"
        className="relative z-[1] border-t border-[#6B4A87]/25 py-14 sm:py-16 lg:py-20"
      >
        <div className="relative mx-auto w-full max-w-2xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#B9A6D1]/28 shadow-[0_16px_48px_rgba(0,0,0,0.28)]">
            <div
              className="pointer-events-none absolute inset-0 trevyk-contact-form-card-bg"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 trevyk-contact-form-card__blob-tr"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 trevyk-contact-form-card__blob-bl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[#1a0f18]/25"
              aria-hidden
            />

            <div className="relative z-10 p-6 sm:p-8 lg:p-9">
            <div className="mb-6 text-center sm:text-left">
              <h2
                id="contact-form-heading"
                className="font-heading text-xl font-semibold text-[#F8F6FB] sm:text-2xl"
              >
                Send us a message
              </h2>
              <p className="mt-1.5 text-sm text-[#B9A6D1]">
                We usually reply within one business day.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E8A9C2]/35 bg-[#341C3C] text-[#E8A9C2]">
                  <Check className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-[#F8F6FB]">
                  Message sent
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#B9A6D1]">
                  Thank you{formData.name ? `, ${formData.name}` : ""}. We will reply
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick("soft");
                    setSubmitted(false);
                  }}
                  className="mt-6 rounded-xl border border-[#B9A6D1]/35 bg-[#2A1830] px-6 py-2.5 font-mono-accent text-xs text-[#E8A9C2] hover:border-[#E8A9C2]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field
                  label="Full name *"
                  icon={User}
                  required
                  placeholder="e.g. Dr. Rakesh Verma"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                />
                <Field
                  label="Work email *"
                  icon={Mail}
                  type="email"
                  required
                  placeholder="you@organisation.com"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                />
                <div>
                  <label className="mb-1.5 block font-mono-accent text-[11px] uppercase tracking-wide text-[#B9A6D1]">
                    Phone (optional)
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-[#B9A6D1]/35 bg-[#2A1830]/90 focus-within:border-[#E8A9C2]">
                    <span className="flex items-center border-r border-[#B9A6D1]/25 px-3 font-mono-accent text-xs text-[#E8A9C2]">
                      +91
                    </span>
                    <div className="relative min-w-0 flex-1">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B9A6D1]/70" />
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-[#F8F6FB] placeholder-[#B9A6D1]/45 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <PlumSelect
                  label="What do you need help with?"
                  required
                  value={need}
                  options={NEED_SELECT_OPTIONS}
                  onChange={setNeed}
                />

                <Field
                  label={need === "kiduart" ? "School *" : "Organisation *"}
                  icon={Building2}
                  required
                  placeholder={
                    need === "kiduart"
                      ? "e.g. Delhi Public School, Noida"
                      : "Your company or trust name"
                  }
                  value={formData.organization}
                  onChange={(v) =>
                    setFormData({ ...formData, organization: v })
                  }
                />

                <div>
                  <label className="mb-1.5 block font-mono-accent text-[11px] uppercase tracking-wide text-[#B9A6D1]">
                    Project details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    maxLength={MESSAGE_MAX}
                    placeholder="Describe the project, timeline, budget (if any) and any specific requirements…"
                    value={formData.scope}
                    onChange={(e) =>
                      setFormData({ ...formData, scope: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-[#B9A6D1]/35 bg-[#2A1830]/90 px-4 py-3 text-sm text-[#F8F6FB] placeholder-[#B9A6D1]/45 focus:border-[#E8A9C2] focus:outline-none"
                  />
                  <p className="mt-1 text-right font-mono-accent text-[10px] text-[#B9A6D1]/80">
                    {formData.scope.length}/{MESSAGE_MAX}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8A9C2] to-[#d892ad] py-3.5 font-heading text-sm font-semibold text-[#1E1024] shadow-[0_10px_28px_rgba(232,169,194,0.28)] transition hover:brightness-105 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>
                {submitError ? (
                  <p className="text-center text-xs leading-relaxed text-red-300">
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DIRECT_CHANNELS = [
  {
    icon: Mail,
    title: "General enquiries",
    href: "mailto:contact@trevyk.com",
    lines: ["contact@trevyk.com"],
  },
  {
    icon: GraduationCap,
    title: "KIDUART support",
    href: "mailto:support@kiduart.com",
    lines: ["support@kiduart.com"],
  },
  {
    icon: Phone,
    title: "Call or WhatsApp",
    href: buildWhatsAppChatUrl(),
    lines: [whatsappContact.displayNumber, "+91 92175 34128"],
    external: true,
  },
  {
    icon: MapPin,
    title: "Our location",
    href: "https://maps.google.com/?q=Noida,+Uttar+Pradesh",
    lines: ["Noida, Uttar Pradesh"],
    external: true,
  },
] as const;

function ReachDirectlySection({ align = "start" }: { align?: "start" | "end" }) {
  const isEnd = align === "end";

  return (
    <section
      aria-labelledby="reach-direct-heading"
      className="mt-12 border-t border-[#B9A6D1]/20 pt-10 sm:mt-14 sm:pt-12"
    >
      <div className={isEnd ? "ml-auto max-w-2xl text-right" : "max-w-2xl"}>
        <h2
          id="reach-direct-heading"
          className="font-heading text-lg font-semibold text-[#F8F6FB] sm:text-xl"
        >
          Or reach us directly
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[#B9A6D1]">
          Prefer email or a quick call? Use the channel that fits your question.
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-2 lg:gap-6 xl:gap-8">
        {DIRECT_CHANNELS.map((channel, index) => (
          <DirectChannelItem
            key={channel.title}
            {...channel}
            index={index}
            align={align}
          />
        ))}
      </ul>
    </section>
  );
}

function DirectChannelItem({
  icon: Icon,
  title,
  href,
  lines,
  external,
  index,
  align = "start",
}: {
  icon: typeof Mail;
  title: string;
  href: string;
  lines: readonly string[];
  external?: boolean;
  index: number;
  align?: "start" | "end";
}) {
  const isEnd = align === "end";

  return (
    <li
      className={`min-w-0 `}
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group block w-fit max-w-full"
      >
        <div
          className={`flex items-center gap-2.5 ${isEnd ? "justify-end" : ""}`}
        >
          <Icon
            className="h-4 w-4 shrink-0 text-[#E8A9C2]/90"
            strokeWidth={1.65}
            aria-hidden
          />
          <span className="font-heading text-sm font-semibold whitespace-nowrap text-[#F8F6FB]">
            {title}
          </span>
        </div>
        <div
          className={`mt-2.5 space-y-0.5 ${isEnd ? "pr-[1.625rem]" : "pl-[1.625rem]"}`}
        >
          {lines.map((line) => (
            <p
              key={line}
              className="text-sm leading-snug whitespace-nowrap text-[#C4B4D8] transition group-hover:text-[#E8A9C2]"
            >
              {line}
            </p>
          ))}
        </div>
      </a>
    </li>
  );
}

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  icon: typeof User;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono-accent text-[11px] uppercase tracking-wide text-[#B9A6D1]">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B9A6D1]/70" />
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-[#B9A6D1]/35 bg-[#2A1830]/90 py-2.5 pl-9 pr-3 text-sm text-[#F8F6FB] placeholder-[#B9A6D1]/45 focus:border-[#E8A9C2] focus:outline-none"
        />
      </div>
    </div>
  );
}
