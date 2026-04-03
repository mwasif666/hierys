import { useEffect, useMemo, useRef, useState } from "react";

import {
  BRAND_PARTNERS,
  type BrandPartner,
} from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/brands/Brands.module.css";
import BrandTickerRow from "@/components/homepage/shared/BrandTickerRow";
import TextRoll from "@/components/ui/text-roll";

const STICKER_WORDS = ["TASKS", "STARTUPS", "BUILDING"] as const;

function rotateBrands(brands: BrandPartner[], offset: number): BrandPartner[] {
  return brands.map((_, index) => brands[(index + offset) % brands.length]!);
}

export default function Brands() {
  const measureGroupRef = useRef<HTMLSpanElement | null>(null);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [stickerWidth, setStickerWidth] = useState<number>(220);

  const rows = useMemo(
    () => [
      rotateBrands(BRAND_PARTNERS, 0),
      rotateBrands(BRAND_PARTNERS, 5),
      rotateBrands(BRAND_PARTNERS, 10),
      rotateBrands(BRAND_PARTNERS, 2),
    ],
    [],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveWordIndex(
        (currentIndex) => (currentIndex + 1) % STICKER_WORDS.length,
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateStickerWidth = () => {
      if (!measureGroupRef.current) return;

      const children = Array.from(measureGroupRef.current.children) as HTMLElement[];
      const widths = children.map((node) =>
        Math.ceil(node.getBoundingClientRect().width),
      );

      if (!widths.length) return;

      setStickerWidth(Math.max(...widths) + 48);
    };

    updateStickerWidth();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateStickerWidth())
        : null;

    if (measureGroupRef.current && resizeObserver) {
      const children = Array.from(measureGroupRef.current.children) as Element[];
      children.forEach((node) => {
        resizeObserver.observe(node);
      });
    }

    window.addEventListener("resize", updateStickerWidth);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateStickerWidth);
    };
  }, []);

  return (
    <section className={styles.section} id="brands">
      <div className={styles.inner}>
        <div
          className={styles.headingWrap}
          style={{ "--sticker-width": `${stickerWidth}px` }}
        >
          <span
            ref={measureGroupRef}
            aria-hidden="true"
            className={styles.stickerMeasureGroup}
          >
            {STICKER_WORDS.map((word) => (
              <span className={styles.stickerMeasure} key={word}>
                {word}
              </span>
            ))}
          </span>
          <span className={styles.sticker}>
            <span className={styles.stickerWordViewport}>
              <TextRoll
                animateKey={`brands-${STICKER_WORDS[activeWordIndex]}`}
                animateOnChange
                center
                className={styles.stickerWord}
              >
                {STICKER_WORDS[activeWordIndex]}
              </TextRoll>
            </span>
          </span>
          <div className={styles.headingStack}>
            <h2 className={styles.heading}>
              <span className={styles.headingLineTop}>
                TRUSTED BY STARTUPS, BRANDS
              </span>
              <span className={styles.headingLineBottom}>
                AND EVEN THE PEOPLE BUILDING THEM.
              </span>
            </h2>
          </div>
        </div>

        <div className={styles.rows}>
          <BrandTickerRow brands={rows[0]} speed={56} />
          <BrandTickerRow brands={rows[1]} reverse speed={52} />
          <BrandTickerRow brands={rows[2]} speed={60} />
          <BrandTickerRow brands={rows[3]} reverse speed={54} />
        </div>
      </div>
    </section>
  );
}
