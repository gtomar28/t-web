import type { ComponentProps } from "react";

/** Reserved-space placeholders while async content loads (sitewide pattern). */

export function SkeletonBlock({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`skeleton-shimmer-faint rounded-md ${className}`}
      aria-hidden
      {...props}
    />
  );
}

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <SkeletonBlock className={`h-3 ${className}`} />;
}

/** Multi-line text placeholder — widths mimic real copy rhythm. */
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-[94%]", "w-[78%]", "w-[88%]", "w-[65%]"];
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonLine key={i} className={widths[i % widths.length]} />
      ))}
    </div>
  );
}

/** Hero-scale title lines (home + inner pages). */
export function SkeletonHeroTitle({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-5 space-y-3 ${className}`} aria-hidden>
      <SkeletonBlock className="h-9 w-[92%] rounded-lg sm:h-10 md:h-11" />
      <SkeletonBlock className="h-9 w-[72%] rounded-lg sm:h-10 md:h-11" />
      <SkeletonBlock className="h-9 w-[38%] rounded-lg sm:h-10 md:h-11" />
    </div>
  );
}
