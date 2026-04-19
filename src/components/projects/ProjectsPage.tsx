import { useEffect, useRef, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import Navbar from "@/components/homepage/Navbar";
import {
  PROJECT_SLIDES,
  SLIDE_DURATION_MS,
  type ProjectSlide,
} from "@/components/projects/projectsData";
import styles from "@/components/projects/ProjectsPage.module.css";
import { cn } from "@/lib/utils";

type HoverZone = "none" | "left" | "right";

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <span
      className={styles.headingLine}
      style={{ animationDelay: `${220 + index * 90}ms` }}
      key={`${line}-${index}`}
    >
      <span className={styles.headingLineInner}>{line}</span>
    </span>
  ));
}

function Badge({ slide }: { slide: ProjectSlide }) {
  if (slide.variant === "editorial") {
    return (
      <div className={cn(styles.badge, styles.badgeEditorial)}>
        <span
          className={styles.badgeCircle}
          style={{ background: slide.labelAccent ?? "#2ee6cc" }}
        >
          {slide.labelInitial ?? slide.label.charAt(0)}
        </span>
        <span className={styles.badgeLabel}>{slide.label}</span>
      </div>
    );
  }

  if (slide.variant === "overlay") {
    return (
      <div className={cn(styles.badge, styles.badgeOverlay)}>
        <span className={styles.badgeLine} aria-hidden="true" />
        <span className={styles.badgeLabel}>{slide.label}</span>
      </div>
    );
  }

  return (
    <div className={cn(styles.badge, styles.badgeMinimal)}>
      <span className={styles.badgeLabel}>{slide.label}</span>
    </div>
  );
}

function Cta({ slide }: { slide: ProjectSlide }) {
  if (slide.variant === "editorial") {
    return (
      <a
        className={cn(styles.cta, styles.ctaEditorial)}
        href={slide.ctaHref ?? "#"}
      >
        <span className={styles.ctaDot} aria-hidden="true" />
        <span className={styles.ctaLabel}>{slide.ctaLabel}</span>
      </a>
    );
  }

  if (slide.variant === "overlay") {
    return (
      <a
        className={cn(styles.cta, styles.ctaOverlay)}
        href={slide.ctaHref ?? "#"}
      >
        <span className={styles.ctaLabel}>{slide.ctaLabel}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          <HiArrowRight />
        </span>
      </a>
    );
  }

  return (
    <a
      className={cn(styles.cta, styles.ctaMinimal)}
      href={slide.ctaHref ?? "#"}
    >
      <span className={styles.ctaLabel}>{slide.ctaLabel}</span>
    </a>
  );
}

function Slide({ slide, isActive }: { slide: ProjectSlide; isActive: boolean }) {
  return (
    <div
      className={cn(styles.slide, isActive && styles.slideActive)}
      data-variant={slide.variant}
      aria-hidden={!isActive}
    >
      <div
        className={styles.slideImage}
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundPosition: slide.imagePosition ?? "center center",
        }}
      />
      <div className={styles.slideScrim} aria-hidden="true" />

      <div className={styles.slideContent}>
        <Badge slide={slide} />
        <h2 className={styles.heading}>{renderLines(slide.headingLines)}</h2>
        <Cta slide={slide} />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const slides = PROJECT_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverZone, setHoverZone] = useState<HoverZone>("none");
  const [progressKey, setProgressKey] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const goTo = (nextIndex: number) => {
    const total = slides.length;
    const normalized = ((nextIndex % total) + total) % total;
    setActiveIndex(normalized);
    setProgressKey((value) => value + 1);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
      setProgressKey((value) => value + 1);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, progressKey, slides.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      else if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const target = stageRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    if (relativeX < 0.38) setHoverZone("left");
    else if (relativeX > 0.62) setHoverZone("right");
    else setHoverZone("none");
  };

  const handlePointerLeave = () => setHoverZone("none");

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.stageSection}>
        <div
          ref={stageRef}
          className={styles.stage}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          data-hover-zone={hoverZone}
        >
          <div className={styles.progressBars} aria-hidden="true">
            {slides.map((slide, index) => {
              const state =
                index < activeIndex
                  ? "complete"
                  : index === activeIndex
                    ? "active"
                    : "pending";
              return (
                <div key={slide.id} className={styles.progressBar}>
                  <div
                    key={
                      index === activeIndex
                        ? `active-${progressKey}`
                        : `${slide.id}-${state}`
                    }
                    className={cn(
                      styles.progressFill,
                      state === "complete" && styles.progressFillComplete,
                      state === "active" && styles.progressFillActive,
                    )}
                    style={
                      state === "active"
                        ? { animationDuration: `${SLIDE_DURATION_MS}ms` }
                        : undefined
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.slides}>
            {slides.map((slide, index) => (
              <Slide
                key={slide.id}
                slide={slide}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className={cn(styles.navButton, styles.navButtonPrev)}
            data-visible={hoverZone === "left"}
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <span className={styles.navIcon} aria-hidden="true">
              <HiArrowLeft />
            </span>
            <span className={styles.navLabel}>Prev</span>
          </button>
          <button
            type="button"
            className={cn(styles.navButton, styles.navButtonNext)}
            data-visible={hoverZone === "right"}
            onClick={goNext}
            aria-label="Next slide"
          >
            <span className={styles.navLabel}>Next</span>
            <span className={styles.navIcon} aria-hidden="true">
              <HiArrowRight />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
