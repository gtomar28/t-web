import React from "react";
import { useParams } from "react-router-dom";
import { getWorkPageContent } from "../data/workPages";
import { NotFoundPage } from "./NotFoundPage";
import { WorkHeroSection } from "../components/work/WorkHeroSection";
import { WorkProblemApproachSection } from "../components/work/WorkProblemApproachSection";
import { WorkWhatYouGetSection } from "../components/work/WorkWhatYouGetSection";
import { WorkHowWeDeliverSection } from "../components/work/WorkHowWeDeliverSection";
import { ServiceProjectCtaSection } from "../components/work/ServiceProjectCtaSection";

export const GuidePage: React.FC = () => {
  const { slug = "" } = useParams();
  const content = getWorkPageContent(slug);

  if (!content) {
    return <NotFoundPage />;
  }

  return (
    <div id="work-page" className="relative w-full overflow-hidden">
      <WorkHeroSection {...content.hero} />
      <WorkProblemApproachSection {...content.problemApproach} />
      <WorkWhatYouGetSection {...content.whatYouGet} />
      <WorkHowWeDeliverSection {...content.howWeDeliver} />

      <div className="relative bg-[#1a0f18] px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ServiceProjectCtaSection slug={slug} />
        </div>
      </div>
    </div>
  );
};
