import { useEffect, useRef, useState } from "react";

import styles from "@/components/homepage/brands/Brands.module.css";
import type { BrandPartner } from "@/components/homepage/data/homepageData";
import { cn } from "@/lib/utils";

type BrandPillProps = {
  brand: BrandPartner;
};

function BrandPill({ brand }: BrandPillProps) {
  return (
    <div className={styles.pill}>
      <span className={styles.logoWrap}>
        <img className={styles.logo} src={brand.logo} alt={brand.name} loading="lazy" />
      </span>
      <span className={styles.pillText}>{brand.name}</span>
    </div>
  );
}

type BrandTickerRowProps = {
  brands: BrandPartner[];
  reverse?: boolean;
  speed?: number;
};

export default function BrandTickerRow({
  brands,
  reverse = false,
  speed = 56,
}: BrandTickerRowProps) {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [marqueeStyle, setMarqueeStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    const updateMarquee = () => {
      if (!groupRef.current || !trackRef.current) return;

      const trackStyles = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
      const distance = groupRef.current.getBoundingClientRect().width + gap;
      const duration = Math.max(distance / speed, 26);

      setMarqueeStyle({
        "--loop-distance": `${distance}px`,
        "--marquee-duration": `${duration}s`,
      });
    };

    updateMarquee();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateMarquee())
        : null;

    if (groupRef.current && resizeObserver) {
      resizeObserver.observe(groupRef.current);
    }

    window.addEventListener("resize", updateMarquee);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateMarquee);
    };
  }, [brands, speed]);

  return (
    <div className={styles.rowViewport}>
      <div
        ref={trackRef}
        className={cn(
          styles.rowTrack,
          reverse ? styles.rowTrackReverse : styles.rowTrackForward,
        )}
        style={marqueeStyle ?? undefined}
      >
        <div ref={groupRef} className={styles.rowGroup}>
          {brands.map((brand) => (
            <BrandPill brand={brand} key={`group-a-${brand.name}`} />
          ))}
        </div>
        <div aria-hidden="true" className={styles.rowGroup}>
          {brands.map((brand) => (
            <BrandPill brand={brand} key={`group-b-${brand.name}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
