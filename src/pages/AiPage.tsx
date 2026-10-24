import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain } from "lucide-react";
import { StudioFrame } from "../components/StudioFrame";
import { AI_HUB_FAQS } from "../data/aiHub";

const TRACKS = [
  {
    href: "/work/ai-agents",
    kicker: "AI agents",
    title: "Custom AI agent development",
    blurb:
      "Tool-calling agents with approval gates, audit logs, and one workflow before multi-agent complexity.",
  },
  {
    href: "/work/rag-knowledge-assistants",
    kicker: "RAG",
    title: "Private knowledge assistants",
    blurb:
      "Ingestion, retrieval, citations, and role-aware access so answers stay grounded in your documents.",
  },
  {
    href: "/work/ai-for-schools",
    kicker: "Education bridge",
    title: "School operations AI (beside Kiduart)",
    blurb:
      "Custom school workflows on Trevyk; the Kiduart ERP product and demos live on kiduart.com.",
  },
] as const;

const HONEST = [
  {
    label: "Live on this site",
    detail:
      "A Gemini-powered assistant with role prompts for architecture and solutions questions. It does not read private school ERP records.",
  },
  {
    label: "Credible custom work",
    detail:
      "Agents, RAG, workflow automation, CRM/ERP integrations, evaluation, and monitoring when the engagement authorizes them.",
  },
  {
    label: "Not claimed as shipped",
    detail:
      "A full inside-Kiduart AI layer over live student data. That surface is labelled separately when it ships on the product.",
  },
] as const;

const PHASES = [
  {
    title: "Discover",
    detail: "Name the workflow, roles, data sources, and decisions a human must keep.",
  },
  {
    title: "Prototype",
    detail: "Narrow path with real sample data, tool stubs, and an initial eval set.",
  },
  {
    title: "Harden",
    detail: "Permissions, logging, failure handling, cost alerts, and production credentials.",
  },
  {
    title: "Operate",
    detail: "Monitor quality and spend, refresh corpora, and change prompts through a controlled process.",
  },
] as const;

export const AiPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden pb-28 pt-36 sm:pt-44">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center space-x-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/95 px-3.5 py-1.5 font-mono-accent text-xs text-[#E8A9C2]">
              <Brain className="h-3.5 w-3.5" />
              <span>AI SOLUTIONS</span>
            </div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-[#F8F6FB] sm:text-6xl">
              AI that owns a workflow—not a slide deck
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#E7E1F0] sm:text-lg">
              Trevyk builds practical AI for Indian SMBs, startups, and
              organisations: custom agents, RAG assistants, and automation
              beside systems you already run. Kiduart remains the school ERP
              product brand—demos and product AI roadmaps belong on
              kiduart.com when features ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-[#E8A9C2] px-5 py-3 text-sm font-semibold text-[#241428]"
              >
                Scope an AI workflow
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
              <Link
                to="/what-we-do"
                className="inline-flex items-center rounded-full border border-[#B9A6D1]/40 px-5 py-3 text-sm font-semibold text-[#F8F6FB]"
              >
                Full services catalogue
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <StudioFrame
              src="/images/ai-hub-systems.jpg"
              alt="Painterly illustration of connected enterprise systems for AI solutions"
              caption="Connected systems, clear permissions, measurable outcomes."
              kicker="Enterprise AI"
            />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">
            Problems we solve
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B9A6D1]">
            Repeat support and ops work, answers trapped in documents, and
            integrations that need a human gate—not unsupervised autonomy over
            money or student records.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {TRACKS.map((track) => (
              <li key={track.href}>
                <Link
                  to={track.href}
                  className="flex h-full flex-col rounded-3xl border border-[#B9A6D1]/30 bg-[#1E1024]/75 p-5 hover:border-[#E8A9C2]"
                >
                  <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#E8A9C2]">
                    {track.kicker}
                  </span>
                  <span className="mt-2 font-heading text-xl font-semibold text-[#F8F6FB]">
                    {track.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-[#B9A6D1]">
                    {track.blurb}
                  </span>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#E8A9C2]">
                    Read the guide
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">
            Discovery to deployment
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase, index) => (
              <li
                key={phase.title}
                className="rounded-2xl border border-[#B9A6D1]/25 bg-[#160A1C]/60 px-4 py-4"
              >
                <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#E8A9C2]">
                  0{index + 1}
                </span>
                <p className="mt-2 font-heading text-lg font-semibold text-[#F8F6FB]">
                  {phase.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#B9A6D1]">
                  {phase.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">
              Security, evaluation, and monitoring
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#E7E1F0]">
              <li>
                Least-privilege tool access, audit logs, and human approval on
                irreversible actions.
              </li>
              <li>
                Evaluation sets for task success, grounding, safe refusals, and
                cost—not vanity message counts.
              </li>
              <li>
                Monitoring for latency, token spend, escalation rate, and
                retrieval misses after launch.
              </li>
              <li>
                Integrations only through APIs you authorize; secrets stay out of
                prompts and the browser.
              </li>
            </ul>
            <h2 className="mt-10 font-heading text-2xl font-semibold text-[#F8F6FB]">
              What is live versus what we build
            </h2>
            <ul className="mt-5 space-y-4">
              {HONEST.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-[#B9A6D1]/25 bg-[#160A1C]/60 px-4 py-4"
                >
                  <p className="font-heading text-lg font-semibold text-[#F8F6FB]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#B9A6D1]">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-[#B9A6D1]/30 bg-[#1E1024]/80 p-6">
              <h2 className="font-heading text-xl font-semibold text-[#F8F6FB]">
                Search visibility, honestly
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#B9A6D1]">
                Labels like AEO, GEO, and AIO overlap with SEO: clear answers,
                crawlable pages, and accurate facts. Google treats optimizing for
                its generative features as still SEO. We improve structure and
                usefulness—we do not sell acronym packages or promise AI
                citations.
              </p>
              <Link
                to="/work/seo"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#E8A9C2]"
              >
                SEO guide (includes AI-answer notes)
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <a
                href="https://kiduart.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center text-sm font-semibold text-[#E8A9C2]"
              >
                Kiduart product site
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            <div className="rounded-3xl border border-[#B9A6D1]/30 bg-[#1E1024]/80 p-6">
              <h2 className="font-heading text-xl font-semibold text-[#F8F6FB]">
                Questions buyers ask
              </h2>
              <dl className="mt-4 space-y-4">
                {AI_HUB_FAQS.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-heading text-sm font-semibold text-[#F8F6FB]">
                      {faq.question}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#B9A6D1]">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">
            Start with one workflow
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#B9A6D1]">
            Tell us the channel, the data source, and the decision a human must
            keep. We reply within one business day with a scoped next step—not a
            fake case study.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#E8A9C2] px-5 py-3 text-sm font-semibold text-[#241428]"
          >
            Tell us the workflow
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};
