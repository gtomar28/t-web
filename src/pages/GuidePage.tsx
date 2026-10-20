import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GUIDES, getGuide } from "../data/guides";
import { StudioFrame } from "../components/StudioFrame";
import { PageAtmosphere } from "../components/PageAtmosphere";
import { NotFoundPage } from "./NotFoundPage";

export const GuidePage: React.FC = () => {
  const { slug = "" } = useParams();
  const guide = getGuide(slug);

  if (!guide) {
    return <NotFoundPage />;
  }

  const related = GUIDES.filter((item) => guide.related.includes(item.slug));

  return (
    <div className="relative min-h-screen overflow-hidden pb-28 pt-36 sm:pt-44">
      <PageAtmosphere variant="services" bands={[{ top: "20%", height: "12%", tone: "pink" }]} />
      <article className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono-accent text-[11px] uppercase tracking-[0.28em] text-[#E8A9C2]">
          {guide.kicker}
        </p>
        <div className="mt-4 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h1 className="font-heading text-3xl font-bold leading-tight text-[#F8F6FB] sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#E7E1F0] sm:text-lg">
              {guide.description}
            </p>
          </div>
          <div className="lg:col-span-6">
            <StudioFrame
              src={guide.image}
              alt={guide.alt}
              caption={guide.caption}
              kicker={guide.kicker}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            {guide.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-[#E7E1F0]">
                {paragraph}
              </p>
            ))}
            {guide.sections?.map((section) => (
              <section key={section.heading} className="pt-4">
                <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 28)}
                      className="text-base leading-relaxed text-[#E7E1F0]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            {guide.faqs && guide.faqs.length > 0 ? (
              <section className="mt-10" aria-labelledby="guide-faq-heading">
                <h2
                  id="guide-faq-heading"
                  className="font-heading text-2xl font-semibold text-[#F8F6FB]"
                >
                  Questions buyers ask
                </h2>
                <dl className="mt-4 space-y-4">
                  {guide.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-[#B9A6D1]/25 bg-[#160A1C]/50 px-4 py-4"
                    >
                      <dt className="font-heading text-base font-semibold text-[#F8F6FB]">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[#B9A6D1]">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-[#B9A6D1]/30 bg-[#1E1024]/80 p-6">
              <h2 className="font-heading text-xl font-semibold text-[#F8F6FB]">What you leave with</h2>
              <ul className="mt-4 space-y-2">
                {guide.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-[#B9A6D1]">
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-[#E8A9C2] px-5 py-3 text-sm font-semibold text-[#241428]"
              >
                Start this conversation
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
              <Link
                to="/ai"
                className="mt-3 flex items-center text-sm font-semibold text-[#E8A9C2]"
              >
                AI solutions hub
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        <nav className="mt-14" aria-label="Related pages">
          <h2 className="font-heading text-2xl font-bold text-[#F8F6FB]">Continue through the site</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/work/${item.slug}`}
                  className="block rounded-2xl border border-[#B9A6D1]/30 px-4 py-4 text-sm text-[#F8F6FB] hover:border-[#E8A9C2]"
                >
                  {item.kicker}
                  <span className="mt-1 block text-[#B9A6D1]">{item.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/ai"
                className="block rounded-2xl border border-[#B9A6D1]/30 px-4 py-4 text-sm text-[#F8F6FB] hover:border-[#E8A9C2]"
              >
                AI solutions
                <span className="mt-1 block text-[#B9A6D1]">Hub for agents, RAG, and schools</span>
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block rounded-2xl border border-[#B9A6D1]/30 px-4 py-4 text-sm text-[#F8F6FB] hover:border-[#E8A9C2]"
              >
                Services
                <span className="mt-1 block text-[#B9A6D1]">Full catalogue</span>
              </Link>
            </li>
          </ul>
        </nav>
      </article>
    </div>
  );
};
