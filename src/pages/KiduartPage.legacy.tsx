import React, { useState } from "react";
import {
  GraduationCap,
  Bus,
  CreditCard,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  Send,
  Building2,
  Check,
  BookOpen,
  FileSpreadsheet,
  Briefcase,
  BarChart3,
  ShieldCheck,
  ExternalLink,
  HeartHandshake,
  UserRound,
  Wallet,
  Landmark,
} from "lucide-react";
import { SiteSettings } from "../types";
import { WowAccent } from "../components/WowAccent";
import { ScrollReveal } from "../components/ScrollReveal";
import { soundEngine } from "../utils/audioEngine";
import { trackDemoSubmit, trackOutbound } from "../utils/analytics";
import { Link } from "react-router-dom";
import { StudioFrame } from "../components/StudioFrame";
import { OurProductsHeroSection } from "../components/our-products/OurProductsHeroSection";

interface KiduartPageProps {
  settings: SiteSettings;
}

/** Official product journey  aligned with kiduart.com homepage */
const SCHOOL_JOURNEY = [
  {
    step: "01",
    title: "Admissions",
    tagline: "Enquiry to registered student",
    desc: "The year starts with an enquiry, not a student. Enquiries, applications, interview evaluations and registration run as one pipeline.",
    highlights: [
      "Enquiry capture with source and follow-up owner",
      "Application review with documents attached",
      "Interview scheduling with recorded evaluation",
      "Registration that creates the student record",
    ],
    icon: Users,
    href: "https://kiduart.com",
  },
  {
    step: "02",
    title: "Student Records",
    tagline: "One profile the whole school reads",
    desc: "Admission, documents, class and section history, guardians and contacts sit on a single record that follows the student through every session.",
    highlights: [
      "Admission to alumni",
      "Documents attached",
      "Session-wise history",
    ],
    icon: GraduationCap,
    href: "https://kiduart.com",
  },
  {
    step: "03",
    title: "Classes & Timetable",
    tagline: "Sections, class teachers, periods",
    desc: "Sections, class teachers and periods stay structured so the rest of the school can schedule around a shared calendar.",
    highlights: [
      "Sections & class teachers",
      "Period structure",
      "Shared school calendar",
    ],
    icon: Calendar,
    href: "https://kiduart.com",
  },
  {
    step: "04",
    title: "Attendance & Leave",
    tagline: "Mark fast, inform parents same day",
    desc: "Teachers mark attendance on their own screen. Parents get the update, coordinators see patterns, and reports are ready when needed.",
    highlights: ["Same-day parent alert", "Pattern flags", "Ready reports"],
    icon: Clock,
    href: "https://kiduart.com",
  },
  {
    step: "05",
    title: "Exams & Results",
    tagline: "Schedule, marks, grades, report cards",
    desc: "Exams, marks entry, grading and report cards stay on one academic trail instead of scattered sheets.",
    highlights: ["Exam schedules", "Marks & grades", "Report cards"],
    icon: FileSpreadsheet,
    href: "https://kiduart.com",
  },
  {
    step: "06",
    title: "Fees & Finance",
    tagline: "Structure, collection, dues, receipts",
    desc: "Fee heads, concessions, instalments, online and counter payments, receipts and outstanding dues stay on one ledger.",
    highlights: ["Online + counter", "Auto receipts", "Live outstanding"],
    icon: CreditCard,
    href: "https://kiduart.com",
  },
  {
    step: "07",
    title: "Parent Communication",
    tagline: "Targeted notices with a record",
    desc: "Circulars, fee reminders and attendance alerts go from one place to the right class, section or parent group  with a delivery trail.",
    highlights: ["Targeted by class", "Delivery record", "Templates"],
    icon: Send,
    href: "https://kiduart.com",
  },
  {
    step: "08",
    title: "Transport",
    tagline: "Routes, drivers, vehicles, tracking",
    desc: "Routes, drivers and vehicles stay organised so transport is part of the same school record, not a separate spreadsheet.",
    highlights: [
      "Routes & vehicles",
      "Driver records",
      "Tracking where enabled",
    ],
    icon: Bus,
    href: "https://kiduart.com",
  },
  {
    step: "09",
    title: "Hostel & Campus",
    tagline: "Rooms, beds, mess, visitors",
    desc: "Boarding operations  rooms, beds, mess and visitors  connected to the student profile when your campus needs them.",
    highlights: ["Rooms & beds", "Mess", "Visitors"],
    icon: Building2,
    href: "https://kiduart.com",
  },
  {
    step: "10",
    title: "Library",
    tagline: "Catalog, circulation, fines",
    desc: "Catalog, issue/return and fines stay tied to student records instead of a disconnected register.",
    highlights: ["Catalog", "Circulation", "Fines"],
    icon: BookOpen,
    href: "https://kiduart.com",
  },
  {
    step: "11",
    title: "HR & Payroll",
    tagline: "Staff, leave, salary, appraisal",
    desc: "Staff records, leave and payroll workflows for the people who run the school every day.",
    highlights: ["Staff records", "Leave", "Salary & appraisal"],
    icon: Briefcase,
    href: "https://kiduart.com",
  },
  {
    step: "12",
    title: "Reports & Leadership",
    tagline: "Decisions from live records",
    desc: "Collection, attendance, academic and staff data feed views that are current  so leadership questions get answered from live records.",
    highlights: [
      "Live dashboards",
      "Exportable",
      "Multi-campus rollup where applicable",
    ],
    icon: BarChart3,
    href: "https://kiduart.com",
  },
];

const ROLES = [
  {
    title: "Principals & trustees",
    body: "Live collection, attendance and academic views  without waiting on someone else’s spreadsheet.",
    icon: Landmark,
  },
  {
    title: "Accountants & fees desk",
    body: "Fee heads, concessions, receipts and outstanding dues on one ledger  online and counter.",
    icon: Wallet,
  },
  {
    title: "Teachers & coordinators",
    body: "Attendance, exams and class work on screens built for the school day  not a maze of tabs.",
    icon: UserRound,
  },
  {
    title: "Parents & guardians",
    body: "Fee reminders, attendance alerts and circulars with a delivery trail  not lost WhatsApp threads.",
    icon: HeartHandshake,
  },
];

const CHARTER = [
  {
    title: "We publish only what exists",
    body: "Every capability described maps to a screen that is already built. Anything still being made is labelled in development  not switched on, not billed.",
  },
  {
    title: "No borrowed credibility",
    body: "No stock photos posing as schools, no quotes nobody said, no ratings we wrote about ourselves.",
  },
  {
    title: "Your data leaves with you",
    body: "Student records, fee ledgers, attendance and academic data export in CSV, Excel or PDF whenever you ask. We do not sell school data or train models on student records.",
  },
  {
    title: "Nothing goes live on a guess",
    body: "We run attendance and one fee cycle in parallel with your current method first. If the numbers do not agree, the switch waits.",
  },
  {
    title: "Stories will be attributable",
    body: "When school stories appear, each will carry name, city, role, measured number, and written consent  same as on kiduart.com.",
  },
];

/** Archived our-products body (pre catalog redesign). Not routed — restore from here if needed. */
export const KiduartPageLegacy: React.FC<KiduartPageProps> = ({ settings }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [demoForm, setDemoForm] = useState({
    institution: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const active = SCHOOL_JOURNEY[activeStep];
  const ActiveIcon = active.icon;
  const progress = ((activeStep + 1) / SCHOOL_JOURNEY.length) * 100;

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick("hero");
    setDemoSubmitting(true);
    setDemoError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "demo",
          name: demoForm.contactName,
          contactName: demoForm.contactName,
          email: demoForm.email,
          organization: demoForm.institution,
          institution: demoForm.institution,
          phone: demoForm.phone,
          scope: "Kiduart demo / walkthrough request from trevyk.in/our-products",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error || "Could not send the demo request. Please try again.",
        );
      }
      trackDemoSubmit();
      setDemoRequested(true);
    } catch (err: unknown) {
      setDemoError(
        err instanceof Error
          ? err.message
          : "Could not send the demo request. Email support@kiduart.com.",
      );
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <div id="kiduart-page" className="relative w-full min-h-screen overflow-hidden">
      <OurProductsHeroSection />

      <div
        id="products-overview"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-4 pb-28 pt-14 sm:scroll-mt-32 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:order-2">
            <StudioFrame
              src="/images/studio-kiduart.jpg"
              alt="Gouache painting of a quiet school courtyard in morning light"
              caption="Kiduart is the product lane. Custom websites and growth work sit beside it."
              kicker="Kiduart"
            />
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <h2 className="font-heading text-2xl font-bold text-[#F8F6FB] sm:text-3xl">
              A school system with a public product site
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#E7E1F0] sm:text-base">
              Admissions, fees, attendance, exams, and parent updates are the
              work Kiduart is built for. Schools that also need a public website
              or a campaign can ask Trevyk for that as a separate starter plan.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-block text-sm text-[#E8A9C2] underline underline-offset-2"
            >
              Ask for a school demo
            </Link>
          </div>
        </div>

        {/* Roles */}
        <ScrollReveal
          className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          delay={0.05}
          reducedMotion={settings.reducedMotion}
        >
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="relative overflow-hidden p-4 pl-5 rounded-2xl bg-[#1E1024]/90 border border-[#B9A6D1]/30"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                  aria-hidden
                />
                <Icon className="w-4 h-4 text-[#E8A9C2] mb-2" />
                <div className="font-heading font-bold text-sm text-[#F8F6FB]">
                  {role.title}
                </div>
                <p className="mt-1.5 text-[11px] text-[#B9A6D1] leading-relaxed">
                  {role.body}
                </p>
              </div>
            );
          })}
        </ScrollReveal>

        <div className="mt-10 hidden lg:flex justify-end pr-8">
          <WowAccent
            kind="campus"
            reducedMotion={settings.reducedMotion}
            className="w-52 h-52"
            caption="Campus mesh"
            step={activeStep % 6}
          />
        </div>

        {/* Journey */}
        <ScrollReveal
          id="kiduart-journey"
          className="mt-2"
          reducedMotion={settings.reducedMotion}
        >
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
              <span className="font-semibold text-[#F8F6FB]/50">01</span>
              <span>SCHOOL YEAR · 12 MODULES</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB]">
              Modules that follow a real school year
            </h2>
            <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
              Content mirrors the live product map on{" "}
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8A9C2] font-semibold underline underline-offset-2"
              >
                kiduart.com
              </a>
              . Open any step here, then continue on the product site for deep
              module pages.
            </p>
          </div>

          {/* Journey scrubber */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-[10px] font-mono-accent text-[#B9A6D1] mb-2">
              <span>
                Step {active.step} / {SCHOOL_JOURNEY.length}
              </span>
              <span>{active.title}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={0}
                max={SCHOOL_JOURNEY.length - 1}
                step={1}
                value={activeStep}
                aria-label="Scrub school-year journey"
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (next !== activeStep) {
                    soundEngine.playClick("soft");
                    setActiveStep(next);
                  }
                }}
                className="journey-scrubber w-full h-2 appearance-none rounded-full cursor-pointer bg-[#1E1024] border border-[#B9A6D1]/25 outline-none
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8A9C2]
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#F8F6FB]
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(232,169,194,0.55)]
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-[#E8A9C2] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#F8F6FB]"
                style={{
                  background: `linear-gradient(90deg, #6B4A87 0%, #B9A6D1 ${progress}%, #E8A9C2 ${progress}%, rgba(30,16,36,0.95) ${progress}%)`,
                }}
              />
              <div className="mt-2 flex justify-between text-[9px] font-mono-accent text-[#B9A6D1]/70 uppercase tracking-wider">
                <span>Drag to scrub</span>
                <span>{Math.round(progress)}% through the year</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {SCHOOL_JOURNEY.map((item, idx) => (
              <button
                key={item.step}
                type="button"
                onClick={() => {
                  soundEngine.playClick("soft");
                  setActiveStep(idx);
                }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono-accent border transition-all ${
                  activeStep === idx
                    ? "bg-[#6B4A87] text-[#F8F6FB] border-[#E8A9C2]/40 shadow-[0_6px_16px_rgba(107,74,135,0.3)]"
                    : "bg-[#1E1024]/90 text-[#B9A6D1] border-[#B9A6D1]/25 hover:border-[#E8A9C2]/45 hover:text-[#F8F6FB]"
                }`}
              >
                {item.step} {item.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-[#1E1024]/95 border border-[#B9A6D1]/35 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#2A1830] border border-[#B9A6D1]/35 flex items-center justify-center text-[#E8A9C2]">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-wider">
                    Step {active.step} / 12 · Live module
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#F8F6FB]">
                    {active.title}
                  </h3>
                  <p className="text-xs text-[#B9A6D1]">{active.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-[#B9A6D1] leading-relaxed">
                {active.desc}
              </p>
              <ul className="space-y-2">
                {active.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-[#B9A6D1]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E8A9C2] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6B4A87] text-[#F8F6FB] text-xs font-heading font-semibold border border-[#E8A9C2]/20"
                >
                  Open on kiduart.com <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {activeStep < SCHOOL_JOURNEY.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setActiveStep((s) =>
                        Math.min(s + 1, SCHOOL_JOURNEY.length - 1),
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2A1830] border border-[#B9A6D1]/35 text-[#B9A6D1] hover:text-[#F8F6FB] text-xs font-mono-accent"
                  >
                    Next: {SCHOOL_JOURNEY[activeStep + 1].title}{" "}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 relative p-5 rounded-2xl bg-[#2A1830]/95 border border-[#B9A6D1]/25 overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                aria-hidden
              />
              <div className="text-[10px] font-mono-accent uppercase tracking-wider text-[#E8A9C2] mb-3">
                One system vs scattered tools
              </div>
              <p className="text-sm text-[#B9A6D1] leading-relaxed mb-4">
                When records, fees, attendance and communication share one
                system, the school day stops bouncing between spreadsheets and
                WhatsApp.
              </p>
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-accent text-[#E8A9C2] underline underline-offset-2"
              >
                Full “one Kiduart system” view on kiduart.com →
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Charter */}
        <ScrollReveal
          id="kiduart-charter"
          className="mt-2"
          reducedMotion={settings.reducedMotion}
        >
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E1024] border border-[#B9A6D1]/40 text-[#E8A9C2] font-mono-accent text-xs mb-3">
              <span className="font-semibold text-[#F8F6FB]/50">02</span>
              <span>FOUNDING CHARTER</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#F8F6FB]">
              Proof before polish
            </h2>
            <p className="mt-3 text-sm text-[#B9A6D1] leading-relaxed">
              The same commitments published on{" "}
              <a
                href="https://kiduart.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8A9C2] font-semibold underline underline-offset-2"
              >
                kiduart.com/about
              </a>
              . Listed here because Kiduart is a real product not a marketing
              slide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARTER.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden p-5 pl-5 rounded-2xl bg-[#1E1024]/95 border border-[#B9A6D1]/30"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B4A87] to-[#E8A9C2]"
                  aria-hidden
                />
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#E8A9C2]" />
                  <h3 className="font-heading font-bold text-sm text-[#F8F6FB]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#B9A6D1] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Demo */}
        <ScrollReveal
          id="kiduart-demo-section"
          className="mt-2 relative p-8 sm:p-12 rounded-3xl bg-[#1E1024]/95 border border-[#B9A6D1]/35 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
          reducedMotion={settings.reducedMotion}
        >
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl opacity-35 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,169,194,0.4), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono-accent text-[#E8A9C2] uppercase tracking-widest block">
                Live demo
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
                Ready to see it for your school?
              </h2>
              <p className="text-sm text-[#B9A6D1] leading-relaxed">
                Prefer the official product flow? Book on Kiduart. Or leave a
                note here we reply within one business day.
              </p>
              <ul className="space-y-2 text-xs text-[#B9A6D1]">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E8A9C2]" /> 30-minute
                  walkthrough around school hours
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E8A9C2]" /> Run on
                  your fee heads, classes and staff roles
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E8A9C2]" /> No card
                  required to see the product
                </li>
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://kiduart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6B4A87] text-[#F8F6FB] text-xs font-heading font-semibold border border-[#E8A9C2]/20"
                >
                  Request demo on kiduart.com{" "}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:support@kiduart.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2A1830] border border-[#B9A6D1]/35 text-[#B9A6D1] text-xs font-mono-accent"
                >
                  support@kiduart.com
                </a>
                <a
                  href="tel:+919217534128"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2A1830] border border-[#B9A6D1]/35 text-[#B9A6D1] text-xs font-mono-accent"
                >
                  +91 92175 34128, +91 88106 64797
                </a>
              </div>
              <p className="text-[11px] text-[#B9A6D1] flex items-center gap-1.5 pt-2">
                <HeartHandshake className="w-3.5 h-3.5 text-[#E8A9C2]" />
                Noida, Uttar Pradesh demos with the team that ships the product.
              </p>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#2A1830]/95 border border-[#B9A6D1]/30">
              {demoRequested ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#341C3C] text-[#E8A9C2] mx-auto flex items-center justify-center border border-[#E8A9C2]/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#F8F6FB]">
                    Request noted
                  </h3>
                  <p className="text-xs text-[#B9A6D1]">
                    Thank you
                    {demoForm.contactName ? `, ${demoForm.contactName}` : ""}.
                    We will reply within one business day. You can also book on{" "}
                    <a
                      href="https://kiduart.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8A9C2] underline"
                    >
                      kiduart.com
                    </a>
                    .
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block mt-2 text-xs font-mono-accent text-[#E8A9C2] underline"
                  >
                    Or use the main contact form →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                  <div className="text-xs font-mono-accent text-[#E8A9C2] uppercase font-bold tracking-wider">
                    Request a Kiduart walkthrough
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-accent text-[#B9A6D1] mb-1">
                      School / trust name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your school name"
                      value={demoForm.institution}
                      onChange={(e) =>
                        setDemoForm({
                          ...demoForm,
                          institution: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono-accent text-[#B9A6D1] mb-1">
                        Your name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Principal / admin"
                        value={demoForm.contactName}
                        onChange={(e) =>
                          setDemoForm({
                            ...demoForm,
                            contactName: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs focus:outline-none focus:border-[#E8A9C2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-accent text-[#B9A6D1] mb-1">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@school.edu"
                        value={demoForm.email}
                        onChange={(e) =>
                          setDemoForm({ ...demoForm, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs focus:outline-none focus:border-[#E8A9C2]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-accent text-[#B9A6D1] mb-1">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 …"
                      value={demoForm.phone}
                      onChange={(e) =>
                        setDemoForm({ ...demoForm, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1E1024] border border-[#B9A6D1]/35 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-xs focus:outline-none focus:border-[#E8A9C2]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={demoSubmitting}
                    className="w-full py-3 rounded-xl bg-[#6B4A87] text-[#F8F6FB] font-heading font-semibold text-xs hover:bg-[#8558A5] border border-[#E8A9C2]/20 disabled:opacity-50"
                  >
                    {demoSubmitting ? "Sending…" : "Send request"}
                  </button>
                  {demoError && (
                    <p className="text-xs text-red-300 text-center leading-relaxed">
                      {demoError}
                    </p>
                  )}
                  <p className="text-[10px] text-[#B9A6D1] text-center">
                    Fastest path:{" "}
                    <a
                      href="https://kiduart.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#E8A9C2]"
                    >
                      kiduart.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
