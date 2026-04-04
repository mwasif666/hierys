import { useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import Lenis from "lenis";

import "@/components/ui/ScrollStack.css";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  smoothScroll?: boolean;
  onStackComplete?: () => void;
}

type TransformSnapshot = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

type CardMeasurement = {
  top: number;
  height: number;
};

const EASE_OUT_EXPO = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const DEFAULT_TRANSFORM: TransformSnapshot = {
  translateY: 0,
  scale: 1,
  rotation: 0,
  blur: 0,
};

const INNER_SELECTOR = ".scroll-stack-inner";
const SCROLL_END_SELECTOR = ".scroll-stack-end";
const CARD_SELECTOR = ".scroll-stack-card";
const MIN_SCALE_TRAVEL = 96;
const STACK_BOTTOM_GAP = 24;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const parsePercentage = (value: string | number, containerHeight: number) => {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * containerHeight;
  }

  return Number.parseFloat(String(value));
};

const calculateProgress = (scrollTop: number, start: number, end: number) => {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / (end - start);
};

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  smoothScroll = true,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, TransformSnapshot>>(new Map());
  const measurementsRef = useRef<CardMeasurement[]>([]);
  const endMeasurementRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return {
        scrollTop: 0,
        containerHeight: 0,
      };
    }

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, [useWindowScroll]);

  const measureElement = useCallback(
    (element: HTMLElement): CardMeasurement => {
      const previousTransform = element.style.transform;
      const previousFilter = element.style.filter;

      element.style.transform = "none";
      element.style.filter = "none";

      const rect = element.getBoundingClientRect();
      const measurement = {
        top: useWindowScroll ? rect.top + window.scrollY : element.offsetTop,
        height: rect.height,
      };

      element.style.transform = previousTransform;
      element.style.filter = previousFilter;

      return measurement;
    },
    [useWindowScroll],
  );

  const measureLayout = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    measurementsRef.current = cardsRef.current.map((card) => measureElement(card));

    const content = scroller.querySelector(INNER_SELECTOR) as HTMLElement | null;
    const endElement = scroller.querySelector(SCROLL_END_SELECTOR) as HTMLElement | null;
    const paddingBottom = content
      ? Number.parseFloat(window.getComputedStyle(content).paddingBottom) || 0
      : 0;

    if (!endElement) {
      endMeasurementRef.current = 0;
      return;
    }

    const endMeasurement = measureElement(endElement);
    endMeasurementRef.current =
      endMeasurement.top + endMeasurement.height + paddingBottom;
  }, [measureElement]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endMeasurementRef.current;

    cardsRef.current.forEach((card, index) => {
      const measurement = measurementsRef.current[index];
      if (!measurement) return;

      const cardTop = measurement.top;
      const cardHeight = measurement.height;
      const naturalPinOffset = stackPositionPx + itemStackDistance * index;
      const availableHeightAtNaturalPin = Math.max(
        containerHeight - naturalPinOffset - STACK_BOTTOM_GAP,
        containerHeight * 0.4,
      );
      const fitScale = Math.min(1, availableHeightAtNaturalPin / cardHeight);
      const scaledCardHeight = cardHeight * fitScale;
      const fullyVisibleTop = Math.max(
        containerHeight - scaledCardHeight - STACK_BOTTOM_GAP,
        0,
      );
      const effectivePinOffset = Math.min(naturalPinOffset, fullyVisibleTop);
      const pinStart = cardTop - effectivePinOffset;
      const triggerStart = pinStart;
      const triggerEnd = Math.max(
        triggerStart + Math.max(containerHeight * 0.12, MIN_SCALE_TRAVEL),
        cardTop - Math.min(scaleEndPositionPx, effectivePinOffset),
      );
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = fitScale * (1 - scaleProgress * (1 - targetScale));
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j += 1) {
          const nextMeasurement = measurementsRef.current[j];
          if (!nextMeasurement) continue;

          const jCardTop = nextMeasurement.top;
          const jCardHeight = nextMeasurement.height;
          const jNaturalPinOffset = stackPositionPx + itemStackDistance * j;
          const jAvailableHeightAtNaturalPin = Math.max(
            containerHeight - jNaturalPinOffset - STACK_BOTTOM_GAP,
            containerHeight * 0.4,
          );
          const jFitScale = Math.min(
            1,
            jAvailableHeightAtNaturalPin / jCardHeight,
          );
          const jScaledCardHeight = jCardHeight * jFitScale;
          const jFullyVisibleTop = Math.max(
            containerHeight - jScaledCardHeight - STACK_BOTTOM_GAP,
            0,
          );
          const jEffectivePinOffset = Math.min(
            jNaturalPinOffset,
            jFullyVisibleTop,
          );
          const jTriggerStart = jCardTop - jEffectivePinOffset;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (index < topCardIndex) {
          const depthInStack = topCardIndex - index;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + effectivePinOffset;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + effectivePinOffset;
      }

      const nextTransform: TransformSnapshot = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform =
        lastTransformsRef.current.get(index) ?? DEFAULT_TRANSFORM;
      const hasChanged =
        Math.abs(lastTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        const filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (!smoothScroll) return;

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: EASE_OUT_EXPO,
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      return;
    }

    const scroller = scrollerRef.current;
    const content = scroller?.querySelector(INNER_SELECTOR) as HTMLElement | null;

    if (!scroller || !content) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content,
      duration: 1.2,
      easing: EASE_OUT_EXPO,
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [handleScroll, smoothScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(CARD_SELECTOR)) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
      card.style.setProperty("--scroll-stack-scale-duration", `${clamp(scaleDuration, 0, 10)}s`);
    });

    measureLayout();
    setupLenis();
    updateCardTransforms();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measureLayout();
            updateCardTransforms();
          })
        : null;

    cards.forEach((card) => {
      resizeObserver?.observe(card);
    });
    resizeObserver?.observe(scroller);

    const resizeHandler = () => {
      measureLayout();
      updateCardTransforms();
    };
    window.addEventListener("resize", resizeHandler);
    if (useWindowScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else if (!smoothScroll) {
      scroller.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (useWindowScroll) {
        window.removeEventListener("scroll", handleScroll);
      } else if (!smoothScroll) {
        scroller.removeEventListener("scroll", handleScroll);
      }

      resizeObserver?.disconnect();

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      lenisRef.current?.destroy();
      lenisRef.current = null;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    blurAmount,
    handleScroll,
    itemDistance,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleDuration,
    scaleEndPosition,
    measureLayout,
    setupLenis,
    stackPosition,
    updateCardTransforms,
    useWindowScroll,
    smoothScroll,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? "scroll-stack-window" : ""} ${className}`.trim()}
      ref={scrollerRef}
      data-window-scroll={useWindowScroll ? "true" : "false"}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
