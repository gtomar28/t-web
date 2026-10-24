import React from "react";
import { LazyMotionPageTransition } from "./LazyMotionPageTransition";

interface PageTransitionProps {
  pathname: string;
  reducedMotion?: boolean;
  children: React.ReactNode;
}

/** Home: no motion bundle. Other routes: lazy motion enter/exit. */
export const PageTransition: React.FC<PageTransitionProps> = ({
  pathname,
  reducedMotion = false,
  children,
}) => {
  const isHome = pathname === "/" || pathname === "";

  if (isHome) {
    return <div className="relative">{children}</div>;
  }

  return (
    <LazyMotionPageTransition pathname={pathname} reducedMotion={reducedMotion}>
      {children}
    </LazyMotionPageTransition>
  );
};
