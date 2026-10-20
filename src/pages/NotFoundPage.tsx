import React from "react";
import { Link } from "react-router-dom";
import { PageAtmosphere } from "../components/PageAtmosphere";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden pb-28 pt-36 sm:pt-44">
      <PageAtmosphere variant="about" bands={[{ top: "22%", height: "12%", tone: "pink" }]} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono-accent text-[11px] uppercase tracking-[0.28em] text-[#E8A9C2]">
          404
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-[#F8F6FB] sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E7E1F0]">
          That URL is not a public page on trevyk.in. Use the site map or go
          back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-full bg-[#E8A9C2] px-5 py-3 text-sm font-semibold text-[#241428]"
          >
            Home
          </Link>
          <Link to="/sitemap" className="rounded-full border border-[#B9A6D1]/40 px-5 py-3 text-sm text-[#E7E1F0]">
            Site map
          </Link>
        </div>
      </div>
    </div>
  );
};
