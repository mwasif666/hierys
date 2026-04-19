import { Fragment, useMemo } from "react";

import { HiMiniArrowRight } from "react-icons/hi2";

import { WORK_INTRO_SECTION } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/work-intro/WorkIntroSection.module.css";
import { navigateToProjects } from "@/lib/serviceRoute";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE_PROJECTS = 6;

type CtaButtonProps = {
  label: string;
  onClick: () => void;
};

function CtaButton({ label, onClick }: CtaButtonProps) {
  return (
    <button
      className={cn(styles.cta, styles.ctaPink, "u-iconSwapTrigger")}
      onClick={onClick}
      type="button"
    >
      <span className={styles.ctaLabel}>{label}</span>
      <span className={cn(styles.ctaIcon, "u-iconSwap")} aria-hidden="true">
        <span className="u-iconSwap__a">
          <HiMiniArrowRight />
        </span>
        <span className="u-iconSwap__b">
          <HiMiniArrowRight />
        </span>
      </span>
    </button>
  );
}

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export default function WorkIntroSection() {
  const { stickerLabel, primaryLines, secondaryLines, projects } = WORK_INTRO_SECTION;
  const visibleProjects = useMemo(
    () => projects.slice(0, INITIAL_VISIBLE_PROJECTS),
    [projects],
  );
  const hasMoreWork = projects.length > 0;

  return (
    <>
      <section className={styles.headingSection} id="work-intro">
        <div className={styles.headingSticky}>
          <div className={styles.headingInner}>
            <h2 className={styles.primaryHeading}>{renderLines(primaryLines)}</h2>

            <div className={styles.secondaryWrap}>
              <span className={styles.sticker}>{stickerLabel}</span>
              <h2 className={styles.secondaryHeading}>{renderLines(secondaryLines)}</h2>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsInner}>
          <div className={styles.projectsGrid}>
            {visibleProjects.map((project) => (
              <article className={styles.projectCard} key={project.titleLines.join(" ")}>
                <div className={styles.projectMedia}>
                  <img
                    className={styles.projectImage}
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    style={{ objectPosition: project.position }}
                  />
                </div>

                <div className={styles.projectMeta}>
                  <h3 className={styles.projectTitle}>{renderLines(project.titleLines)}</h3>
                  <p className={styles.projectServices}>
                    {project.services.map((service, index) => (
                      <Fragment key={`${project.titleLines[0]}-${service}`}>
                        {service}
                        {index < project.services.length - 1 ? " • " : null}
                      </Fragment>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {hasMoreWork ? (
            <div className={styles.ctaRow}>
              <CtaButton label="More Work" onClick={navigateToProjects} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
