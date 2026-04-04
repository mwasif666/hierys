import { Fragment, useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WORKFLOW_STEPS } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/workflow/WorkflowSection.module.css";

gsap.registerPlugin(ScrollTrigger);

type DotPosition = {
  top: string;
  left: string;
};

const STEP_DOTS: DotPosition[][] = [
  [{ top: "50%", left: "50%" }],
  [
    { top: "26%", left: "26%" },
    { top: "74%", left: "74%" },
  ],
  [
    { top: "26%", left: "26%" },
    { top: "50%", left: "50%" },
    { top: "74%", left: "74%" },
  ],
  [
    { top: "26%", left: "26%" },
    { top: "26%", left: "74%" },
    { top: "74%", left: "26%" },
    { top: "74%", left: "74%" },
  ],
  [
    { top: "26%", left: "26%" },
    { top: "26%", left: "74%" },
    { top: "50%", left: "50%" },
    { top: "74%", left: "26%" },
    { top: "74%", left: "74%" },
  ],
];

const ICON_PHASE = 0.24;
const TITLE_PHASE = 0.34;
const DESCRIPTION_PHASE_START = ICON_PHASE + TITLE_PHASE;
const DESKTOP_SCROLL_MULTIPLIER = 2.1;
const MOBILE_PROGRESS_GAIN = 1.08;

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

type StepDotsProps = {
  index: number;
};

function StepDots({ index }: StepDotsProps) {
  const dots = STEP_DOTS[index] ?? STEP_DOTS[STEP_DOTS.length - 1]!;

  return (
    <span className={styles.pipBoard} aria-hidden="true">
      {dots.map((dot, dotIndex) => (
        <span
          className={styles.pip}
          key={`${index}-${dot.top}-${dot.left}-${dotIndex}`}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}
    </span>
  );
}

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter(
      (step): step is HTMLElement => step !== null,
    );

    if (!steps.length) return undefined;

    const setStepProgress = (node: HTMLElement, value: number) => {
      const progress = gsap.utils.clamp(0, 1, value);
      const iconProgress = gsap.utils.clamp(0, 1, progress / ICON_PHASE);
      const titleProgress = gsap.utils.clamp(
        0,
        1,
        (progress - ICON_PHASE) / TITLE_PHASE,
      );
      const descriptionProgress = gsap.utils.clamp(
        0,
        1,
        (progress - DESCRIPTION_PHASE_START) / (1 - DESCRIPTION_PHASE_START),
      );

      node.style.setProperty("--step-progress", progress.toFixed(4));
      node.style.setProperty("--step-icon-progress", iconProgress.toFixed(4));
      node.style.setProperty("--step-title-progress", titleProgress.toFixed(4));
      node.style.setProperty(
        "--step-description-progress",
        descriptionProgress.toFixed(4),
      );
    };

    const setDesktopProgress = (overallProgress: number) => {
      steps.forEach((node, index) => {
        const localProgress = gsap.utils.clamp(
          0,
          1,
          overallProgress * steps.length - index,
        );

        setStepProgress(node, localProgress);
      });
    };

    const media = gsap.matchMedia();

    media.add("(min-width: 992px)", () => {
      setDesktopProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: stageRef.current,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * DESKTOP_SCROLL_MULTIPLIER)}`,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setDesktopProgress(self.progress),
        onRefresh: (self) => setDesktopProgress(self.progress),
      });

      return () => trigger.kill();
    });

    media.add("(max-width: 991px)", () => {
      steps.forEach((node) => setStepProgress(node, 0));

      const triggers = steps.map((node) =>
        ScrollTrigger.create({
          trigger: node,
          start: "top 86%",
          end: "top 44%",
          scrub: true,
          onUpdate: (self) => {
            const progress = gsap.utils.clamp(
              0,
              1,
              self.progress * MOBILE_PROGRESS_GAIN,
            );
            setStepProgress(node, progress);
          },
          onLeave: () => setStepProgress(node, 1),
          onLeaveBack: () => setStepProgress(node, 0),
        }),
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => media.revert();
  }, []);

  return (
    <section className={styles.section} id="workflow" ref={sectionRef}>
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            <span>BUT USUALLY IT GOES</span>
            <span>SOMETHING LIKE THIS:</span>
          </h2>

          <div className={styles.steps}>
            {WORKFLOW_STEPS.map((step, index) => (
              <article
                className={styles.step}
                key={step.titleLines.join(" ")}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
              >
                <div className={styles.iconWrap} aria-hidden="true">
                  <span className={styles.iconGlow} />
                  <StepDots index={index} />
                </div>

                <div className={styles.copy}>
                  <div className={styles.titleBlock}>
                    <h3 className={styles.titleBase}>{renderLines(step.titleLines)}</h3>
                    <div className={styles.titleMask} aria-hidden="true">
                      <h3 className={styles.titleActive}>
                        {renderLines(step.titleLines)}
                      </h3>
                    </div>
                  </div>

                  <div className={styles.descriptionBlock}>
                    <p className={styles.descriptionBase}>{step.description}</p>
                    <div className={styles.descriptionMask} aria-hidden="true">
                      <p className={styles.descriptionActive}>{step.description}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
