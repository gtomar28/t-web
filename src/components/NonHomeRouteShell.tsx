import { Suspense, type ComponentProps } from "react";
import { LazyAnimatePresence } from "./LazyAnimatePresence";
import { PageTransition } from "./PageTransition";
import { AppRoutes } from "./AppRoutes";
import { PageSectionSkeleton } from "./ui/PageSectionSkeleton";

type Props = ComponentProps<typeof AppRoutes> & {
  pathname: string;
  reducedMotion: boolean;
};

/** Loaded only off home — keeps motion out of the home critical path. */
export function NonHomeRouteShell({
  pathname,
  reducedMotion,
  ...routeProps
}: Props) {
  return (
    <LazyAnimatePresence>
      <PageTransition key={pathname} pathname={pathname} reducedMotion={reducedMotion}>
        <Suspense fallback={<PageSectionSkeleton />}>
          <AppRoutes {...routeProps} />
        </Suspense>
      </PageTransition>
    </LazyAnimatePresence>
  );
}
