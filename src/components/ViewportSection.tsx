import React from "react";

type ViewportSectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  /** Full-bleed layers behind inner content (absolute; section must be `relative`) */
  background?: React.ReactNode;
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

/**
 * One viewport-tall content band (100dvh), aligned with navbar container.
 */
export function ViewportSection({
  id,
  className = "",
  innerClassName = "",
  background,
  children,
  "aria-labelledby": ariaLabelledby,
}: ViewportSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`trevyk-viewport-section relative w-full ${className}`.trim()}
    >
      {background}
      <div
        className={`relative z-[1] mx-auto w-full max-w-7xl px-3.5 py-12 sm:px-6 sm:py-16 lg:px-8 ${innerClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
