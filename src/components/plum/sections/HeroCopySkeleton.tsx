import { SkeletonBlock, SkeletonHeroTitle, SkeletonText } from "../../ui/Skeleton";

/** Reserved hero copy block — matches HeroScroll layout (static shell + React). */
export function HeroCopySkeleton() {
  return (
    <div className="max-w-xl" aria-busy="true" aria-label="Loading hero content">
      <SkeletonBlock className="h-3 w-44 rounded-full" />
      <SkeletonHeroTitle />
      <SkeletonBlock className="mt-4 h-5 w-52 rounded-md" />
      <SkeletonText lines={2} className="mt-6" />
      <SkeletonText lines={3} className="mt-4 max-w-lg" />
      <div className="mt-8 flex flex-wrap gap-3">
        <SkeletonBlock className="h-10 w-36 rounded-full" />
        <SkeletonBlock className="h-10 w-32 rounded-full" />
        <SkeletonBlock className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}
