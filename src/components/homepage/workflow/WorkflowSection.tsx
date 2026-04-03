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

const DESKTOP_PROGRESS_GAIN = 1.18;
const MOBILE_PROGRESS_GAIN = 1.14;

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
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter(
      (step): step is HTMLElement => step !== null,
    );

    if (!steps.length) return undefined;

    const setStepProgress = (node: HTMLElement, value: number) => {
      node.style.setProperty("--step-progress", value.toFixed(4));
    };

    const setDesktopProgress = (overallProgress: number) => {
      steps.forEach((node, index) => {
        if (index === 0) {
          setStepProgress(node, 1);
          return;
        }

        const acceleratedProgress = gsap.utils.clamp(
          0,
          1,
          overallProgress * DESKTOP_PROGRESS_GAIN,
        );

        const localProgress = gsap.utils.clamp(
          0,
          1,
          acceleratedProgress * (steps.length - 1) - (index - 1),
        );

        setStepProgress(node, localProgress);
      });
    };

    const media = gsap.matchMedia();

    media.add("(min-width: 992px)", () => {
      setDesktopProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        end: "bottom 46%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => setDesktopProgress(self.progress),
        onRefresh: (self) => setDesktopProgress(self.progress),
      });

      return () => trigger.kill();
    });

    media.add("(max-width: 991px)", () => {
      steps.forEach((node, index) => setStepProgress(node, index === 0 ? 1 : 0));

      const triggers = steps.map((node, index) =>
        ScrollTrigger.create({
          trigger: node,
          start: "top 88%",
          end: "top 48%",
          scrub: true,
          onUpdate: (self) => {
            const progress =
              index === 0
                ? 1
                : gsap.utils.clamp(0, 1, self.progress * MOBILE_PROGRESS_GAIN);
            setStepProgress(node, progress);
          },
          onLeave: () => setStepProgress(node, 1),
          onLeaveBack: () => setStepProgress(node, index === 0 ? 1 : 0),
        }),
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    });

    return () => media.revert();
  }, []);

  return (
    <section className={styles.section} id="workflow" ref={sectionRef}>
      <div className={styles.stage}>
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
