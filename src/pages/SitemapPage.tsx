import React from "react";
import { Link } from "react-router-dom";
import { GUIDES } from "../data/guides";

const CORE = [
  { path: "/", label: "Home", note: "Websites, software, and growth in one introduction." },
  { path: "/what-we-do", label: "What we do", note: "The full catalogue, including starter plans." },
  { path: "/ai", label: "AI solutions", note: "Agents, RAG, and a Kiduart bridge—honest about what is live." },
  { path: "/technology", label: "Technology", note: "How systems are designed and kept maintainable." },
  { path: "/process", label: "Process", note: "Listen, plan, build, launch, support." },
  { path: "/who-we-are", label: "Who we are", note: "Company introduction, purpose, commitments, and how to reach us." },
  { path: "/our-products", label: "Our products", note: "School ERP product lane." },
  { path: "/contact", label: "Contact", note: "Tell us the business and the budget." },
];

export const SitemapPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden pb-28 pt-36 sm:pt-44">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono-accent text-[11px] uppercase tracking-[0.28em] text-[#E8A9C2]">
          Index
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold text-[#F8F6FB] sm:text-6xl">
          Site map
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#E7E1F0]">
          Every public page on trevyk.in, linked so a visitor and a crawler can
          move from the offer to the detail. Search engines also read the XML
          file at{" "}
          <a className="text-[#E8A9C2] underline underline-offset-2" href="/sitemap.xml">
            /sitemap.xml
          </a>
          .
        </p>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">Main pages</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE.map((page) => (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className="block h-full rounded-3xl border border-[#B9A6D1]/30 bg-[#1E1024]/75 p-5 hover:border-[#E8A9C2]"
                >
                  <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#E8A9C2]">
                    {page.path}
                  </span>
                  <span className="mt-2 block font-heading text-xl font-semibold text-[#F8F6FB]">
                    {page.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[#B9A6D1]">{page.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl font-semibold text-[#F8F6FB]">Guides</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B9A6D1]">
            Deeper pages for the services we want to be found for. Each one links
            back to services, contact, and a related guide.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link
                  to={`/work/${guide.slug}`}
                  className="grid grid-cols-[7rem_1fr] gap-4 rounded-3xl border border-[#B9A6D1]/30 bg-[#160A1C]/70 p-3 hover:border-[#E8A9C2] sm:grid-cols-[9rem_1fr]"
                >
                  <img
                    src={guide.image}
                    alt=""
                    width={960}
                    height={540}
                    className="aspect-video w-full rounded-2xl object-cover"
                  />
                  <span className="py-2 pr-2">
                    <span className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-[#E8A9C2]">
                      /work/{guide.slug}
                    </span>
                    <span className="mt-1 block font-heading text-lg font-semibold leading-snug text-[#F8F6FB]">
                      {guide.kicker}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#B9A6D1]">
                      {guide.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
