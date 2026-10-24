import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Database,
  LayoutGrid,
  Monitor,
  Search,
  Server,
  Settings2,
  X,
} from "lucide-react";
import { CAPABILITIES_DATA } from "../../data/capabilities";
import type { TechCapabilityItem, TechCategory } from "../../types";
import { soundEngine } from "../../utils/audioEngine";

type StackTab = {
  id: TechCategory;
  label: string;
  icon: LucideIcon;
};

const STACK_TABS: StackTab[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "frontend", label: "Frontend", icon: Monitor },
  { id: "backend", label: "Backend & APIs", icon: Server },
  { id: "databases", label: "Databases", icon: Database },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "ai", label: "AI & Automation", icon: Bot },
  { id: "testing", label: "Testing & Quality", icon: Settings2 },
];

const CATEGORY_PILL: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend & APIs",
  databases: "Databases",
  cloud: "Cloud & DevOps",
  testing: "Testing & Quality",
  ai: "AI & Automation",
  data: "AI & Automation",
};

function matchesCategory(item: TechCapabilityItem, category: TechCategory) {
  if (category === "all") return true;
  if (category === "ai") return item.category === "ai" || item.category === "data";
  return item.category === category;
}

function itemSearchText(item: TechCapabilityItem): string {
  const categoryLabel = CATEGORY_PILL[item.category] ?? item.category;
  return [
    item.id,
    item.name,
    item.usageNote,
    item.badge,
    item.tag,
    item.category,
    categoryLabel,
    item.iconType,
  ]
    .join(" ")
    .toLowerCase();
}

function StackIcon({ item }: { item: TechCapabilityItem }) {
  const initials = item.name
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      style={{
        background: `linear-gradient(145deg, ${item.color}33, ${item.color}18)`,
        color: item.color,
      }}
      aria-hidden
    >
      {initials || "•"}
    </div>
  );
}

function StackCard({ item }: { item: TechCapabilityItem }) {
  const usedFor = [item.badge, item.tag].filter(Boolean);
  const categoryLabel = CATEGORY_PILL[item.category] ?? item.category;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#B9A6D1]/28 bg-[#1E1024]/92 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.28)] transition hover:border-[#E8A9C2]/40">
      <div className="flex items-start gap-4">
        <StackIcon item={item} />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-bold leading-tight text-[#F8F6FB]">
            {item.name}
          </h3>
          <p className="mt-1 font-mono-accent text-[10px] uppercase tracking-[0.14em] text-[#E8A9C2]/90">
            {categoryLabel}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#C4B4D8]">{item.usageNote}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-[#B9A6D1]/20 pt-4">
        <span className="shrink-0 font-mono-accent text-[10px] uppercase tracking-[0.12em] text-[#B9A6D1]">
          Used for:
        </span>
        <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {usedFor.map((label) => (
            <li
              key={label}
              className="rounded-full border border-[#B9A6D1]/30 bg-[#2A1830]/80 px-2.5 py-1 text-[11px] text-[#E7E1F0]"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function TechnologyStackSection() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const [scrollHints, setScrollHints] = useState({ left: false, right: false });

  const updateScrollHints = useCallback(() => {
    const el = tabScrollRef.current;
    if (!el) {
      setScrollHints({ left: false, right: false });
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setScrollHints({
      left: scrollLeft > 4,
      right: scrollLeft + clientWidth < scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateScrollHints();
    const el = tabScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollHints, { passive: true });
    const ro = new ResizeObserver(updateScrollHints);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollHints);
      ro.disconnect();
    };
  }, [updateScrollHints, activeCategory]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CAPABILITIES_DATA.filter((item) => {
      if (!matchesCategory(item, activeCategory)) return false;
      if (!q) return true;
      return itemSearchText(item).includes(q);
    });
  }, [activeCategory, searchQuery]);

  const tabCounts = useMemo(() => {
    const counts: Partial<Record<TechCategory, number>> = { all: CAPABILITIES_DATA.length };
    for (const tab of STACK_TABS) {
      if (tab.id === "all") continue;
      counts[tab.id] = CAPABILITIES_DATA.filter((item) => matchesCategory(item, tab.id)).length;
    }
    return counts;
  }, []);

  return (
    <section
      id="technology-stack"
      aria-labelledby="technology-stack-heading"
      className="relative scroll-mt-28 bg-transparent py-14 sm:scroll-mt-32 sm:py-16 lg:py-20"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#B9A6D1]/40 bg-[#1E1024]/90 px-4 py-1.5 font-mono-accent text-[11px] uppercase tracking-[0.2em] text-[#E8A9C2] sm:text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#E8A9C2] shadow-[0_0_10px_rgba(232,169,194,0.85)]"
              aria-hidden
            />
            Technology stack
          </div>
          <h2
            id="technology-stack-heading"
            className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-[#F8F6FB]"
          >
            Tools we use{" "}
            <span className="bg-gradient-to-r from-[#F8F6FB] via-[#D4C4DC] to-[#E8A9C2] bg-clip-text text-transparent">
              to build.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#C4B4D8] sm:text-[17px]">
            We work with modern and reliable technologies to build scalable, secure and
            high-performing digital products, tailored to your business needs.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-stretch">
          <div className="relative min-w-0 flex-1 sm:min-w-0">
            {scrollHints.left ? (
              <div
                className="pointer-events-none absolute left-0 top-1/2 z-[2] flex h-9 w-7 -translate-y-1/2 items-center justify-center rounded-r-md bg-gradient-to-r from-[#1a0f18] to-transparent text-[#E8A9C2]/80"
                aria-hidden
              >
                <ChevronLeft className="h-4 w-4" />
              </div>
            ) : null}
            {scrollHints.right ? (
              <div
                className="pointer-events-none absolute right-0 top-1/2 z-[2] flex h-9 w-7 -translate-y-1/2 items-center justify-center rounded-l-md bg-gradient-to-l from-[#1a0f18] to-transparent text-[#E8A9C2]/80"
                aria-hidden
              >
                <ChevronRight className="h-4 w-4" />
              </div>
            ) : null}
            <div
              ref={tabScrollRef}
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {STACK_TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeCategory === id;
                const count = tabCounts[id] ?? 0;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick("soft");
                      setActiveCategory(id);
                    }}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all sm:px-4 sm:text-[13px] ${
                      isActive
                        ? "border-[#E8A9C2]/45 bg-gradient-to-r from-[#6B4A87] to-[#8558A5] text-[#F8F6FB] shadow-[0_8px_22px_rgba(107,74,135,0.4)]"
                        : "border-[#B9A6D1]/30 bg-[#1E1024]/85 text-[#B9A6D1] hover:border-[#E8A9C2]/40 hover:text-[#F8F6FB]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                    <span className="whitespace-nowrap">{label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-mono-accent text-[10px] ${
                        isActive ? "bg-[#1E1024]/80 text-[#E8A9C2]" : "bg-[#2A1830] text-[#B9A6D1]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full shrink-0 sm:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B9A6D1]"
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies…"
              aria-label="Search technologies"
              className="w-full rounded-xl border border-[#B9A6D1]/35 bg-[#1E1024]/95 py-2.5 pl-9 pr-9 text-sm text-[#F8F6FB] outline-none transition placeholder:text-[#B9A6D1]/55 focus:border-[#E8A9C2]/55"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#B9A6D1] transition hover:bg-[#2A1830] hover:text-[#F8F6FB]"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((item) => (
              <li key={item.id}>
                <StackCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-[#B9A6D1]/25 bg-[#1E1024]/70 px-6 py-14 text-center">
            <p className="text-sm text-[#C4B4D8]">
              No technologies match
              {searchQuery ? (
                <>
                  {" "}
                  &ldquo;<span className="text-[#F8F6FB]">{searchQuery}</span>&rdquo;
                </>
              ) : null}{" "}
              in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-sm font-medium text-[#E8A9C2] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
