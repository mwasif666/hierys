import { useEffect, useRef, useState } from "react";

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
import FooterSection from "@/components/homepage/footer/FooterSection";
import StartHereFlow from "@/components/homepage/start-here/StartHereFlow";

const HOMEPAGE_THEME_SECTIONS = [
  { key: "banner", color: "#451627" },
  { key: "brands", color: "#dfd8c8" },
  { key: "services", color: "#7a7b38" },
  { key: "process", color: "#e03b8f" },
  { key: "workflow", color: "#19050d" },
  { key: "why", color: "#aab4f2" },
  { key: "comparison", color: "#19050d" },
  { key: "work-intro", color: "#fff6d6" },
  { key: "reviews", color: "#003512" },
  { key: "contact", color: "#21080f" },
  { key: "faq", color: "#9fb5ff" },
  { key: "footer", color: "#2b0d1a" },
] as const;

export default function Homepage() {
  const [isStartHereOpen, setIsStartHereOpen] = useState(false);
  const [activeThemeColor, setActiveThemeColor] = useState(
    HOMEPAGE_THEME_SECTIONS[0].color,
  );
  const themeSectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-surface-color",
      activeThemeColor,
    );

    return () => {
      document.documentElement.style.removeProperty("--app-surface-color");
    };
  }, [activeThemeColor]);

  useEffect(() => {
    let frameId = 0;

    const updateActiveTheme = () => {
      frameId = 0;

      const sections = themeSectionRefs.current.filter(
        (section): section is HTMLDivElement => section !== null,
      );

      if (!sections.length) {
        return;
      }

      const probeY = window.innerHeight * 0.42;
      let nextColor =
        sections[0].dataset.themeColor ?? HOMEPAGE_THEME_SECTIONS[0].color;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const themeColor = section.dataset.themeColor;

        if (!themeColor) {
          continue;
        }

        if (probeY >= rect.top && probeY < rect.bottom) {
          nextColor = themeColor;
          closestDistance = 0;
          break;
        }

        const distance = Math.min(
          Math.abs(rect.top - probeY),
          Math.abs(rect.bottom - probeY),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          nextColor = themeColor;
        }
      }

      setActiveThemeColor((currentColor) =>
        currentColor === nextColor ? currentColor : nextColor,
      );
    };

    const requestThemeUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveTheme);
    };

    requestThemeUpdate();

    window.addEventListener("scroll", requestThemeUpdate, { passive: true });
    window.addEventListener("resize", requestThemeUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestThemeUpdate);
      window.removeEventListener("resize", requestThemeUpdate);
    };
  }, []);

  const setThemeSectionRef =
    (index: number) => (element: HTMLDivElement | null) => {
      themeSectionRefs.current[index] = element;
    };

  return (
    <div className={styles.page} id="top">
      <Navbar />
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[0].color}
        ref={setThemeSectionRef(0)}
      >
        <HomepageBanner />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[1].color}
        ref={setThemeSectionRef(1)}
      >
        <Brands />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[2].color}
        ref={setThemeSectionRef(2)}
      >
        <Services />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[3].color}
        ref={setThemeSectionRef(3)}
      >
        <ProcessSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[4].color}
        ref={setThemeSectionRef(4)}
      >
        <WorkflowSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[5].color}
        ref={setThemeSectionRef(5)}
      >
        <WhyChooseSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[6].color}
        ref={setThemeSectionRef(6)}
      >
        <ComparisonSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[7].color}
        ref={setThemeSectionRef(7)}
      >
        <WorkIntroSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[8].color}
        ref={setThemeSectionRef(8)}
      >
        <ReviewsSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[9].color}
        ref={setThemeSectionRef(9)}
      >
        <NeedPromptSection onStartHereClick={() => setIsStartHereOpen(true)} />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[10].color}
        ref={setThemeSectionRef(10)}
      >
        <FaqSection />
      </div>
      <div
        className={styles.themeSection}
        data-theme-color={HOMEPAGE_THEME_SECTIONS[11].color}
        ref={setThemeSectionRef(11)}
      >
        <FooterSection />
      </div>
      {isStartHereOpen ? (
        <StartHereFlow
          onClose={() => setIsStartHereOpen(false)}
          onComplete={() => setIsStartHereOpen(false)}
        />
      ) : null}
    </div>
  );
}
