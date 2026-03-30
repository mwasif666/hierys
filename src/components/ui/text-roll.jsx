"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import styles from "@/components/ui/text-roll.module.css";

const STAGGER = 0.035;
const EASE = [0.22, 1, 0.36, 1];
const MotionSpan = motion.span;

function getDelay(index, length, center) {
  if (center) {
    return STAGGER * Math.abs(index - (length - 1) / 2);
  }

  return STAGGER * index;
}

function toChars(text) {
  return Array.from(text);
}

export default function TextRoll({
  children,
  className,
  center = false,
  animateOnChange = false,
  animateKey,
}) {
  const chars = toChars(children);

  if (animateOnChange) {
    const key = animateKey ?? children;

    return (
      <span
        aria-label={children}
        className={cn(styles.root, styles.changeRoot, className)}
        style={{ lineHeight: 0.85 }}
      >
        <span className={styles.srOnly}>{children}</span>
        <AnimatePresence initial={false} mode="sync">
          <MotionSpan
            key={key}
            aria-hidden="true"
            className={styles.changeTrack}
          >
            {chars.map((letter, index) => (
              <span className={styles.changeSlot} key={`${key}-${index}`}>
                <MotionSpan
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  className={styles.char}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.46,
                    ease: EASE,
                    delay: getDelay(index, chars.length, center),
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </MotionSpan>
              </span>
            ))}
          </MotionSpan>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <MotionSpan
      aria-label={children}
      className={cn(styles.root, className)}
      initial="initial"
      style={{ lineHeight: 0.85 }}
      whileHover="hovered"
    >
      <span aria-hidden="true" className={styles.layer}>
        {chars.map((letter, index) => (
          <MotionSpan
            className={styles.char}
            key={`top-${index}`}
            transition={{
              ease: "easeInOut",
              delay: getDelay(index, chars.length, center),
            }}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </MotionSpan>
        ))}
      </span>

      <span aria-hidden="true" className={cn(styles.layer, styles.layerBottom)}>
        {chars.map((letter, index) => (
          <MotionSpan
            className={styles.char}
            key={`bottom-${index}`}
            transition={{
              ease: "easeInOut",
              delay: getDelay(index, chars.length, center),
            }}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </MotionSpan>
        ))}
      </span>

      <span className={styles.srOnly}>{children}</span>
    </MotionSpan>
  );
}
