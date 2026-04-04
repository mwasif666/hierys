import { Fragment, useEffect, useRef, type CSSProperties } from "react";

import { ArrowUpRight, Star } from "lucide-react";

import {
  REVIEWS_SECTION,
  type Review,
} from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/reviews/ReviewsSection.module.css";

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

type RatingProps = {
  value: number;
};

function Rating({ value }: RatingProps) {
  return (
    <div className={styles.rating} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < Math.round(value);

        return (
          <Star
            aria-hidden="true"
            className={
              isFilled ? styles.ratingStarFilled : styles.ratingStarEmpty
            }
            key={`${value}-${index}`}
          />
        );
      })}
    </div>
  );
}

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.cardInner}>
        <div className={styles.metaRow}>
          <div className={styles.person}>
            <img
              alt={review.name}
              className={styles.avatar}
              loading="lazy"
              src={review.avatar}
            />

            <div className={styles.personCopy}>
              <h3 className={styles.personName}>{review.name}</h3>
              <p className={styles.personRole}>
                {review.role}
                <span className={styles.personCompany}>{review.company}</span>
              </p>
            </div>
          </div>

          <Rating value={review.rating} />
        </div>

        <p className={styles.quote}>{review.quote}</p>

        <a className={styles.caseStudy} href={review.href}>
          <img
            alt={review.caseStudyAlt}
            className={styles.caseStudyImage}
            loading="lazy"
            src={review.caseStudyImage}
          />

          <div className={styles.caseStudyBody}>
            <p className={styles.caseStudyTitle}>
              {renderLines(review.caseStudyTitleLines)}
            </p>
          </div>

          <span className={styles.caseStudyLink}>
            <span>Read Full Review</span>
            <ArrowUpRight aria-hidden="true" className={styles.caseStudyIcon} />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function ReviewsSection() {
  const { stickerLabel, headingLines, reviews } = REVIEWS_SECTION;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackShellRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const stackSpacerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stack = stackRef.current;

    if (!stack) return undefined;

    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      const stackShell = stackShellRef.current;

      if (!section || !stackShell || !stack) return;
      if (window.getComputedStyle(stackShell).position === "static") return;

      const maxScrollTop = stack.scrollHeight - stack.clientHeight;
      if (maxScrollTop <= 0) return;
      const spacerHeight = stackSpacerRef.current?.offsetHeight ?? 0;
      const releaseScrollTop = Math.max(0, maxScrollTop - spacerHeight);

      const sectionRect = section.getBoundingClientRect();
      const shellRect = stackShell.getBoundingClientRect();
      const stickyTopThreshold = 52;
      const isStickyActive =
        shellRect.top <= stickyTopThreshold &&
        sectionRect.top < stickyTopThreshold &&
        sectionRect.bottom > shellRect.bottom + 24;

      if (!isStickyActive) return;

      const isScrollingDown = event.deltaY > 0;
      const isScrollingUp = event.deltaY < 0;
      const canScrollDown = stack.scrollTop < releaseScrollTop - 1;
      const canScrollUp = stack.scrollTop > 1;

      if (
        (isScrollingDown && canScrollDown) ||
        (isScrollingUp && canScrollUp)
      ) {
        event.preventDefault();
        stack.scrollTop = Math.max(
          0,
          Math.min(releaseScrollTop, stack.scrollTop + event.deltaY),
        );
      }
    };

    stack.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      stack.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section className={styles.section} id="reviews" ref={sectionRef}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.sticker}>{stickerLabel}</span>
          <h2 className={styles.heading}>{renderLines(headingLines)}</h2>
        </header>

        <div className={styles.stackShell} ref={stackShellRef}>
          <div className={styles.stack} ref={stackRef}>
            {reviews.map((review, index) => (
              <div
                className={styles.stackItem}
                key={`${review.name}-${review.company}-${index}`}
                style={
                  {
                    "--review-stack-index": index,
                  } as CSSProperties
                }
              >
                <ReviewCard review={review} />
              </div>
            ))}
            <div
              aria-hidden="true"
              className={styles.stackSpacer}
              ref={stackSpacerRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
