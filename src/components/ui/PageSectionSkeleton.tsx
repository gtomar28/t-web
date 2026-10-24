import { PageContainer } from "../plum/ui/PageContainer";
import { SkeletonBlock, SkeletonHeroTitle, SkeletonText } from "./Skeleton";

/** Route / lazy chunk loading — keeps layout stable instead of empty flash. */
export function PageSectionSkeleton() {
  return (
    <div className="relative z-10 min-h-[60vh] py-16 md:py-20" aria-busy="true" aria-label="Loading content">
      <PageContainer>
        <SkeletonBlock className="h-3 w-40 rounded-full" />
        <SkeletonHeroTitle />
        <SkeletonBlock className="mt-6 h-5 w-56 rounded-md" />
        <SkeletonText lines={4} className="mt-6 max-w-2xl" />
        <div className="mt-10 flex flex-wrap gap-3">
          <SkeletonBlock className="h-11 w-36 rounded-full" />
          <SkeletonBlock className="h-11 w-32 rounded-full" />
        </div>
      </PageContainer>
    </div>
  );
}
