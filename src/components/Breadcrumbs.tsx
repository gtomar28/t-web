import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { buildBreadcrumbItems } from "../config/seo";

/**
 * Fixed under navbar  high-contrast so it stays readable on all pages.
 */
export const Breadcrumbs: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { pathname } = useLocation();
  const items = buildBreadcrumbItems(pathname);

  if (pathname === "/" || pathname === "") return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`fixed top-[52px] sm:top-[58px] left-0 right-0 z-40 ${className}`}
    >
      <div className="bg-[#1E1024]/92 backdrop-blur-md border-b border-[#6B4A87]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono-accent tracking-wide">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight
                      className="w-3 h-3 text-[#B9A6D1]/80"
                      aria-hidden
                    />
                  )}
                  {isLast ? (
                    <span
                      className="text-[#E8A9C2] font-semibold"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-1 text-[#F8F6FB]/90 hover:text-[#E8A9C2] transition-colors"
                    >
                      {index === 0 ? (
                        <Home className="w-3 h-3" aria-hidden />
                      ) : null}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
};
