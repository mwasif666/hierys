import { Fragment } from "react";

import { ArrowUpRight, Star } from "lucide-react";

import {
  REVIEWS_SECTION,
  type Review,
} from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/reviews/ReviewsSection.module.css";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

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
            className={isFilled ? styles.ratingStarFilled : styles.ratingStarEmpty}
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
            <span>Read Full</span>
            <span>Review</span>
            <ArrowUpRight aria-hidden="true" className={styles.caseStudyIcon} />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function ReviewsSection() {
  const { stickerLabel, headingLines, reviews } = REVIEWS_SECTION;

  return (
    <section className={styles.section} id="reviews">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.sticker}>{stickerLabel}</span>
          <h2 className={styles.heading}>{renderLines(headingLines)}</h2>
        </header>

        <ScrollStack
          className={styles.stack}
          useWindowScroll
          itemDistance={42}
          itemScale={0.03}
          itemStackDistance={22}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.9}
        >
          {reviews.map((review, index) => (
            <ScrollStackItem
              key={`${review.name}-${review.company}-${index}`}
              itemClassName={styles.stackItem}
            >
              <ReviewCard review={review} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
