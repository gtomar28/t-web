import { lazy, Suspense, type ReactNode } from "react";

const MotionPresence = lazy(() =>
  import("./MotionPresence").then((m) => ({ default: m.MotionPresence })),
);

export function LazyAnimatePresence({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <MotionPresence>{children}</MotionPresence>
    </Suspense>
  );
}
