import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react";

import {
  SERVICES_SHOWCASE,
  type ServiceShowcaseItem,
} from "@/components/homepage/data/homepageData";
import ServiceSlide from "@/components/homepage/services/ServiceSlide";
import styles from "@/components/homepage/services/Services.module.css";
import { cn } from "@/lib/utils";

const INNER_SLIDE_DURATION = 2800;
const DRAG_THRESHOLD = 56;

export default function Services() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startTranslateX: number;
  }>({
    pointerId: null,
    startX: 0,
    startTranslateX: 0,
  });
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [isOuterTransitioning, setIsOuterTransitioning] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragTranslateX, setDragTranslateX] = useState<number | null>(null);

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
    if (isOuterTransitioning || isDragging) return undefined;

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
  }, [activeImageIndex, activeSlideIndex, isDragging, isOuterTransitioning]);

  const slides: ServiceShowcaseItem[] = [...SERVICES_SHOWCASE, ...SERVICES_SHOWCASE];
  const visibleOffsets = offsets.length ? offsets : [0];
  const maxTranslateX = visibleOffsets[visibleOffsets.length - 1] ?? 0;
  const snappedTranslateX =
    visibleOffsets[Math.min(trackIndex, visibleOffsets.length - 1)] ?? 0;
  const translateX = dragTranslateX ?? snappedTranslateX;

  const getNearestOffsetIndex = (nextTranslateX: number) => {
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    visibleOffsets.forEach((offset, index) => {
      const distance = Math.abs(offset - nextTranslateX);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || isOuterTransitioning || !offsets.length) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTranslateX: snappedTranslateX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsAnimating(false);
    setIsDragging(true);
    setDragTranslateX(snappedTranslateX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const nextTranslateX = Math.max(
      0,
      Math.min(maxTranslateX, dragStateRef.current.startTranslateX - deltaX),
    );

    setDragTranslateX(nextTranslateX);
  };

  const wrapToPreviousSlide = () => {
    setIsAnimating(false);
    setTrackIndex(SERVICES_SHOWCASE.length);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsAnimating(true);
        setIsOuterTransitioning(true);
        setTrackIndex(SERVICES_SHOWCASE.length - 1);
      });
    });
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const dragDelta = event.clientX - dragStateRef.current.startX;
    const finalTranslateX =
      dragTranslateX ?? dragStateRef.current.startTranslateX;
    const dragDistance = Math.abs(
      finalTranslateX - dragStateRef.current.startTranslateX,
    );
    const shouldWrapToPrevious =
      trackIndex === 0 && dragDelta > DRAG_THRESHOLD;
    const targetIndex =
      dragDistance >= DRAG_THRESHOLD
        ? getNearestOffsetIndex(finalTranslateX)
        : trackIndex;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.pointerId = null;
    setIsDragging(false);
    setDragTranslateX(null);
    setIsAnimating(true);

    if (shouldWrapToPrevious) {
      wrapToPreviousSlide();
      return;
    }

    if (targetIndex !== trackIndex) {
      setIsOuterTransitioning(true);
      setTrackIndex(targetIndex);
      return;
    }

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
          <div
            className={cn(styles.viewport, isDragging && styles.viewportDragging)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
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
