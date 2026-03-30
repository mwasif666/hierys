import React, { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { HiMiniArrowRight, HiMiniArrowUpRight } from "react-icons/hi2";

import { HERO_SCENES } from "@/components/homepage/homepageData";
import styles from "@/components/homepage/HomepageBanner.module.css";
import TextRoll from "@/components/ui/text-roll";
import { cn } from "@/lib/utils";

const cardLayoutClasses = [
  styles.card0,
  styles.card1,
  styles.card2,
  styles.card3,
  styles.card4,
];

function CtaButton({ href, icon, label, tone }) {
  const toneClass = tone === "yellow" ? styles.ctaYellow : styles.ctaPink;

  return (
    <a className={cn(styles.cta, toneClass, "u-iconSwapTrigger")} href={href}>
      <span className={styles.ctaLabel}>{label}</span>
      <span className={cn(styles.ctaIcon, "u-iconSwap")} aria-hidden="true">
        <span className="u-iconSwap__a">{icon}</span>
        <span className="u-iconSwap__b">{icon}</span>
      </span>
    </a>
  );
}

export default function HomepageBanner() {
  const [activeIndex, setActiveIndex] = useState(3);
  const cardRefs = useRef([]);
  const scene = useMemo(() => HERO_SCENES[activeIndex], [activeIndex]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const sceneNodes = [...cards];

    gsap.killTweensOf(sceneNodes);

    const enterTimeline = gsap.timeline();
    enterTimeline.fromTo(
      cards,
      { autoAlpha: 0, y: 22, scale: 0.94 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        ease: "power3.out",
        stagger: 0.14,
      },
    );

    const cycleTimeout = window.setTimeout(() => {
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          setActiveIndex((current) => (current + 1) % HERO_SCENES.length);
        },
      });

      exitTimeline.to(
        cards,
        {
          autoAlpha: 0,
          y: -10,
          scale: 0.97,
          duration: 0.28,
          ease: "power2.inOut",
          stagger: 0.1,
        },
        0,
      );
    }, 2800);

    return () => {
      window.clearTimeout(cycleTimeout);
      enterTimeline.kill();
      gsap.killTweensOf(sceneNodes);
    };
  }, [activeIndex]);

  return (
    <section className={styles.shell}>
      <div className={cn("container-fluid", styles.container)}>
        <div
          className={cn(
            styles.cardRow,
            "d-flex",
            "justify-content-center",
            "align-items-end",
          )}
        >
          {scene.cards.map((card, index) => (
            <div
              key={`${scene.word}-${card.alt}-${index}`}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={cn(styles.card, cardLayoutClasses[index])}
            >
              {card.type === "note" ? (
                <div
                  className={styles.noteCard}
                  style={
                    card.src
                      ? {
                          backgroundImage: `linear-gradient(180deg, rgba(51, 13, 24, 0.22) 0%, rgba(51, 13, 24, 0.82) 100%), url("${card.src}")`,
                        }
                      : undefined
                  }
                >
                  <span className={styles.noteLabel}>{card.label}</span>
                </div>
              ) : (
                <img className={styles.cardImage} src={card.src} alt={card.alt} />
              )}
            </div>
          ))}
        </div>

        <div className={cn(styles.copy, "text-center")}>
          <div className={cn(styles.line, "u-letterSpacing2")}>
            <span>NO</span>
            <TextRoll
              animateKey={`top-${scene.word}`}
              animateOnChange
              center
              className={styles.word}
            >
              {scene.word}
            </TextRoll>
            <span>TOO BIG</span>
          </div>
          <div className={cn(styles.line, "u-letterSpacing2")}>
            <span>NO</span>
            <TextRoll
              animateKey={`bottom-${scene.word}`}
              animateOnChange
              center
              className={styles.word}
            >
              {scene.word}
            </TextRoll>
            <span>TOO SMALL</span>
          </div>

          <p className={styles.subtitle}>
            Hierys is your go-to team for{" "}
            <strong>design, content, websites, branding,</strong>{" "}
            <strong>marketing,</strong> and the in-between work that keeps
            startups, companies, contractors, and personal brands moving.
          </p>

          <p className={styles.kicker}>{scene.strap}</p>

          <div
            className={cn(
              styles.ctaRow,
              "d-flex",
              "flex-wrap",
              "justify-content-center",
            )}
          >
            <CtaButton
              href="#contact"
              icon={<HiMiniArrowUpRight />}
              label="Start a Project"
              tone="yellow"
            />
            <CtaButton
              href="#work"
              icon={<HiMiniArrowRight />}
              label="See Our Work"
              tone="pink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
