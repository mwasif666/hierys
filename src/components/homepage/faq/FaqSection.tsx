import { useState } from "react";

import { FAQ_SECTION } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/faq/FaqSection.module.css";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  const { stickerLabel, headingLines, contactLines, contactEmail, items } = FAQ_SECTION;
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.sidebar}>
          <div className={styles.headingWrap}>
            <span className={styles.sticker}>{stickerLabel}</span>
            <h2 className={cn(styles.heading, "u-displayHeading")}>
              {headingLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>

          <div className={styles.contactBlock}>
            <p className={styles.contactCopy}>
              {contactLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <a className={styles.contactEmail} href={`mailto:${contactEmail.toLowerCase()}`}>
              {contactEmail}
            </a>
          </div>
        </div>

        <div className={styles.accordion}>
          {items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <article className={styles.item} key={item.question}>
                <button
                  aria-expanded={isOpen}
                  className={styles.itemButton}
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  type="button"
                >
                  <span className={cn(styles.question, "u-displayHeading")}>
                    {item.question}
                  </span>
                  <span className={cn(styles.marker, isOpen && styles.markerOpen)} aria-hidden="true">
                    <span className={styles.markerLineHorizontal} />
                    <span className={styles.markerLineVertical} />
                  </span>
                </button>

                <div className={cn(styles.answerWrap, isOpen && styles.answerWrapOpen)}>
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
