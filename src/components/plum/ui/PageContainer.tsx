import { forwardRef, type ComponentProps } from "react";

/** Shared max width + horizontal padding — one vertical rhythm sitewide */
export const PageContainer = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  function PageContainer({ className = "", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`mx-auto w-full max-w-7xl px-5 md:px-8${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  },
);
