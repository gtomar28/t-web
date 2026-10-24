import { lazy, Suspense, type ReactNode } from "react";

const MotionPageTransition = lazy(() =>
  import("./MotionPageTransition").then((m) => ({ default: m.MotionPageTransition })),
);

type Props = {
  pathname: string;
  reducedMotion?: boolean;
  children: ReactNode;
};

/** Loads `motion/react` only for non-home routes (keeps home initial JS smaller). */
export function LazyMotionPageTransition({ pathname, reducedMotion, children }: Props) {
  return (
    <Suspense fallback={<div className="relative">{children}</div>}>
      <MotionPageTransition pathname={pathname} reducedMotion={reducedMotion}>
        {children}
      </MotionPageTransition>
    </Suspense>
  );
}
