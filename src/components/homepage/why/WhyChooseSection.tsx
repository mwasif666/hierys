import { Fragment, useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WHY_CHOOSE_CARDS } from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/why/WhyChooseSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = ["STILL,", "WHY SHOULD", "YOU CHOOSE", "HIERYS?"];

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLElement => card !== null,
    );

    if (!stageRef.current || !headingRef.current || !cards.length) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { clearProps: "all" });
      gsap.set(headingRef.current, { clearProps: "all" });
      return undefined;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 992px)", () => {
        gsap.set(cards, {
          x: (index) => window.innerWidth * 1.12 + index * 180,
          opacity: 1,
        });
        gsap.set(headingRef.current, { x: 0, y: 0, opacity: 0.96 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.35}`,
            pin: stageRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          cards,
          {
            x: 0,
            stagger: 0.1,
            ease: "none",
            duration: 0.72,
          },
          0,
        );
      });

      media.add("(max-width: 991px)", () => {
        gsap.set(headingRef.current, { y: 48, opacity: 0.36 });

        gsap.to(headingRef.current, {
          y: 0,
          opacity: 0.82,
          ease: "none",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              x: window.innerWidth * 0.58,
              opacity: 1,
            },
            {
              x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                end: "top 56%",
                scrub: 1,
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section className={styles.section} id="why" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.stage} ref={stageRef}>
          <h2 className={styles.heading} ref={headingRef}>
            {HEADING_LINES.map((line) => (
              <span className={styles.headingLine} key={line}>
                {line}
              </span>
            ))}
          </h2>

          <div className={styles.cards}>
            {WHY_CHOOSE_CARDS.map((card, index) => (
              <article
                className={styles.card}
                key={card.titleLines.join(" ")}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
              >
                <h3 className={styles.cardTitle}>{renderLines(card.titleLines)}</h3>
                <p className={styles.cardCopy}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
