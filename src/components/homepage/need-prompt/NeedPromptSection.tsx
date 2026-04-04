import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { ArrowDown } from "lucide-react";

import { NEED_PROMPT_SECTION } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/need-prompt/NeedPromptSection.module.css";
import TextRoll from "@/components/ui/text-roll";
import { cn } from "@/lib/utils";

type SlotStyle = CSSProperties;
type NeedPromptSectionProps = {
  onStartHereClick: () => void;
};

function getTextWidths(group: HTMLElement | null) {
  if (!group) {
    return [];
  }

  const children = Array.from(group.children) as HTMLElement[];

  if (!children.length) {
    return [];
  }

  return children.map((node) => Math.ceil(node.getBoundingClientRect().width));
}

export default function NeedPromptSection({
  onStartHereClick,
}: NeedPromptSectionProps) {
  const { prompts, subtitle, ctaLabel } = NEED_PROMPT_SECTION;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [topPromptWidth, setTopPromptWidth] = useState<number>(320);
  const topPromptMeasureRef = useRef<HTMLSpanElement | null>(null);
  const topPromptWidthsRef = useRef<number[]>([]);

  const applyWidths = useCallback((index: number) => {
    const nextTopPromptWidth = topPromptWidthsRef.current[index];

    if (nextTopPromptWidth) {
      setTopPromptWidth(nextTopPromptWidth + 44);
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % prompts.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [prompts.length]);

  useEffect(() => {
    const updateWidths = () => {
      topPromptWidthsRef.current = getTextWidths(topPromptMeasureRef.current);
      applyWidths(activeIndex);
    };

    updateWidths();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateWidths())
        : null;

    [topPromptMeasureRef.current].forEach((group) => {
      if (!group || !resizeObserver) {
        return;
      }

      const children = Array.from(group.children) as Element[];
      children.forEach((node) => resizeObserver.observe(node));
    });

    window.addEventListener("resize", updateWidths);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateWidths);
    };
  }, [activeIndex, applyWidths]);

  useEffect(() => {
    applyWidths(activeIndex);
  }, [activeIndex, applyWidths]);

  const activePrompt = prompts[activeIndex]!;
  const topPrompt = `NEED ${activePrompt.subject}`;
  const bottomPrompt = `THAT ${activePrompt.outcome}?`;
  const subjectStyle = {
    width: `${topPromptWidth}px`,
  } as SlotStyle;

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <span
          ref={topPromptMeasureRef}
          aria-hidden="true"
          className={styles.measureGroup}
        >
          {prompts.map((prompt) => (
            <span className={styles.measureText} key={`subject-${prompt.subject}`}>
              {`NEED ${prompt.subject}`}
            </span>
          ))}
        </span>

        <div className={styles.copy}>
          <h2 className={cn(styles.heading, "u-displayHeading")}>
            <span className={styles.headingLine}>
              <span className={styles.wordChip} style={subjectStyle}>
                <TextRoll
                  animateKey={`need-subject-${topPrompt}`}
                  animateOnChange
                  center
                  className={styles.word}
                  lineHeight={1}
                >
                  {topPrompt}
                </TextRoll>
              </span>
            </span>

            <span className={styles.headingLineBottom}>
              <TextRoll
                animateKey={`need-outcome-${bottomPrompt}`}
                animateOnChange
                center
                className={styles.fullPrompt}
                lineHeight={1}
              >
                {bottomPrompt}
              </TextRoll>
            </span>
          </h2>

          <p className={styles.subtitle}>{subtitle}</p>

          <button
            className={`${styles.cta} u-iconSwapTrigger`}
            onClick={onStartHereClick}
            type="button"
          >
            <span className={styles.ctaLabel}>{ctaLabel}</span>
            <span className={`${styles.ctaIcon} u-iconSwap`} aria-hidden="true">
              <span className="u-iconSwap__a">
                <ArrowDown />
              </span>
              <span className="u-iconSwap__b">
                <ArrowDown />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
