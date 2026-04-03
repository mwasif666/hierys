import { useState } from "react";

import HomepageBanner from "@/components/homepage/HomepageBanner";
import styles from "@/components/homepage/Homepage.module.css";
import Navbar from "@/components/homepage/Navbar";
import Brands from "@/components/homepage/brands/Brands";
import Services from "@/components/homepage/services/Services";
import ProcessSection from "@/components/homepage/process/ProcessSection";
import WorkflowSection from "@/components/homepage/workflow/WorkflowSection";
import WhyChooseSection from "@/components/homepage/why/WhyChooseSection";
import ComparisonSection from "@/components/homepage/comparison/ComparisonSection";
import WorkIntroSection from "@/components/homepage/work-intro/WorkIntroSection";
import ReviewsSection from "@/components/homepage/reviews/ReviewsSection";
import NeedPromptSection from "@/components/homepage/need-prompt/NeedPromptSection";
import FaqSection from "@/components/homepage/faq/FaqSection";
import StartHereFlow from "@/components/homepage/start-here/StartHereFlow";

export default function Homepage() {
  const [isStartHereOpen, setIsStartHereOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar />
      <HomepageBanner />
      <Brands />
      <Services />
      <ProcessSection />
      <WorkflowSection />
      <WhyChooseSection />
      <ComparisonSection />
      <WorkIntroSection />
      <ReviewsSection />
      <NeedPromptSection onStartHereClick={() => setIsStartHereOpen(true)} />
      <FaqSection />
      {isStartHereOpen ? (
        <StartHereFlow
          onClose={() => setIsStartHereOpen(false)}
          onComplete={() => setIsStartHereOpen(false)}
        />
      ) : null}
    </div>
  );
}
