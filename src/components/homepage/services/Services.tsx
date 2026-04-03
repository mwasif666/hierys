import { useEffect, useRef, useState, type TransitionEvent } from "react";

import {
  SERVICES_SHOWCASE,
  type ServiceShowcaseItem,
} from "@/components/homepage/data/homepageData";
import ServiceSlide from "@/components/homepage/services/ServiceSlide";
import styles from "@/components/homepage/services/Services.module.css";

const INNER_SLIDE_DURATION = 2800;

export default function Services() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isOuterTransitioning, setIsOuterTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const updateOffsets = () => {
      setOffsets(slideRefs.current.map((slide) => slide?.offsetLeft ?? 0));
    };

    updateOffsets();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateOffsets())
        : null;

    slideRefs.current.forEach((slide) => {
      if (slide && resizeObserver) {
        resizeObserver.observe(slide);
      }
    });

    if (trackRef.current && resizeObserver) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", updateOffsets);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  useEffect(() => {
    if (isOuterTransitioning) return undefined;

    const currentService =
      SERVICES_SHOWCASE[activeSlideIndex % SERVICES_SHOWCASE.length];
    const totalInnerSlides = currentService?.images.length ?? 1;

    const timeout = window.setTimeout(() => {
      if (activeImageIndex < totalInnerSlides - 1) {
        setActiveImageIndex((currentIndex) => currentIndex + 1);
        return;
      }

      setIsOuterTransitioning(true);
      setTrackIndex((currentIndex) => currentIndex + 1);
    }, INNER_SLIDE_DURATION);

    return () => window.clearTimeout(timeout);
  }, [activeImageIndex, activeSlideIndex, isOuterTransitioning]);

  const slides: ServiceShowcaseItem[] = [...SERVICES_SHOWCASE, ...SERVICES_SHOWCASE];
  const visibleOffsets = offsets.length ? offsets : [0];
  const translateX =
    visibleOffsets[Math.min(trackIndex, visibleOffsets.length - 1)] ?? 0;

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !isOuterTransitioning) {
      return;
    }

    if (trackIndex >= SERVICES_SHOWCASE.length) {
      setIsAnimating(false);
      setTrackIndex(0);
      setActiveSlideIndex(0);
      setActiveImageIndex(0);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsAnimating(true);
          setIsOuterTransitioning(false);
        });
      });

      return;
    }

    setActiveSlideIndex(trackIndex);
    setActiveImageIndex(0);
    setIsOuterTransitioning(false);
  };

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <div className={styles.copyLead}>
            <span className={styles.sticker}>Services</span>
            <h2 className={styles.heading}>
              <span>WE CAN DO</span>
              <span>EVERYTHING</span>
              <span>YOU NEED</span>
            </h2>
          </div>

          <p className={styles.more}>AND MORE.</p>
        </div>

        <div className={styles.sliderColumn}>
          <div className={styles.viewport}>
            <div
              ref={trackRef}
              className={styles.track}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(-${translateX}px, 0, 0)`,
                transitionDuration: isAnimating ? "900ms" : "0ms",
              }}
            >
              {slides.map((service, index) => (
                <div
                  className={styles.slideFrame}
                  key={`${service.title}-${index}`}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                >
                  <ServiceSlide
                    service={service}
                    isActive={index === activeSlideIndex}
                    activeImageIndex={index === activeSlideIndex ? activeImageIndex : 0}
                    progressDuration={INNER_SLIDE_DURATION}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
