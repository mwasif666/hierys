import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Presentation,
  Handshake,
  Building2,
  FileBarChart2,
  WandSparkles,
  RefreshCcw,
  Play,
} from "lucide-react";
import Navbar from "@/components/homepage/Navbar";
import Brands from "@/components/homepage/brands/Brands";
import FooterSection from "@/components/homepage/footer/FooterSection";
import {
  APP_NAVIGATION_EVENT,
  getInnerServiceSlug,
} from "@/lib/serviceRoute";
import {
  SERVICE_DATA,
  DEFAULT_SERVICE_SLUG,
  type SlideCard,
} from "./innerServiceData";
import styles from "./InnerServicePage.module.css";

const COL_SPEEDS = [0.3, 0.5, 0.35];
const HELP_ITEMS = [
  {
    title: "Pitch Deck Design",
    description:
      "Investor decks, startup pitch decks, fundraising decks, and founder presentations built to help your story land clearly.",
    icon: Presentation,
  },
  {
    title: "Sales Presentation Design",
    description:
      "Sales decks, proposal decks, client presentations, and business presentations designed to support conversations, not slow them down.",
    icon: Handshake,
  },
  {
    title: "Company Profile Design",
    description:
      "Company profiles, capability decks, brand decks, and introduction presentations that make your business look clear, credible, and put together.",
    icon: Building2,
  },
  {
    title: "Report & Internal Presentation Design",
    description:
      "Quarterly reports, team updates, strategy decks, training decks, webinar decks, and internal documents that people can actually follow.",
    icon: FileBarChart2,
  },
  {
    title: "Presentation Cleanup & Redesign",
    description:
      "If the content is there but the deck is not working, we can clean it up, redesign it, tighten the flow, and make it presentation-ready.",
    icon: WandSparkles,
  },
  {
    title: "Ongoing Deck Support",
    description:
      "For teams that constantly need decks, updates, last-minute changes, and polished slides without turning every request into a whole project.",
    icon: RefreshCcw,
  },
];

function useActiveSlug() {
  const [slug, setSlug] = useState(
    () => getInnerServiceSlug(window.location) ?? DEFAULT_SERVICE_SLUG,
  );

  useEffect(() => {
    const sync = () =>
      setSlug(getInnerServiceSlug(window.location) ?? DEFAULT_SERVICE_SLUG);
    window.addEventListener(APP_NAVIGATION_EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener(APP_NAVIGATION_EVENT, sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return slug;
}

function ImageGrid({ slides }: { slides: SlideCard[] }) {
  const columns = useMemo(() => {
    const cols: SlideCard[][] = [[], [], []];
    slides.forEach((s, i) => cols[i % 3].push(s));
    return cols;
  }, [slides]);

  const doubled = useMemo(
    () => columns.map((col) => [...col, ...col]),
    [columns],
  );

  const track1 = useRef<HTMLDivElement>(null);
  const track2 = useRef<HTMLDivElement>(null);
  const track3 = useRef<HTMLDivElement>(null);
  const offsets = useRef([0, 0, 0]);
  const heights = useRef([0, 0, 0]);
  const rafRef = useRef(0);
  const draggingByCol = useRef([false, false, false]);
  const lastPointerYByCol = useRef([0, 0, 0]);

  useEffect(() => {
    const tracks = [track1.current, track2.current, track3.current];

    offsets.current = [0, 0, 0];

    const measure = () => {
      tracks.forEach((t, i) => {
        if (t) heights.current[i] = t.scrollHeight / 2;
      });
    };

    requestAnimationFrame(measure);

    const tick = () => {
      tracks.forEach((t, i) => {
        const h = heights.current[i];
        if (h > 0 && !draggingByCol.current[i]) {
          offsets.current[i] -= COL_SPEEDS[i];
        }
        if (h > 0) {
          offsets.current[i] = ((offsets.current[i] % h) + h) % h - h;
        }
        if (t) {
          t.style.transform = `translateY(${offsets.current[i]}px)`;
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [slides]);

  const onPointerDown = useCallback(
    (colIdx: number) => (e: React.PointerEvent) => {
      draggingByCol.current[colIdx] = true;
      lastPointerYByCol.current[colIdx] = e.clientY;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (colIdx: number) => (e: React.PointerEvent) => {
      if (!draggingByCol.current[colIdx]) return;
      const delta = e.clientY - lastPointerYByCol.current[colIdx];
      lastPointerYByCol.current[colIdx] = e.clientY;
      offsets.current[colIdx] += delta;
    },
    [],
  );

  const onPointerUp = useCallback(
    (colIdx: number) => () => {
      draggingByCol.current[colIdx] = false;
    },
    [],
  );

  return (
    <div className={styles.gridWrap}>
      {[track1, track2, track3].map((ref, colIdx) => (
        <div
          key={colIdx}
          className={styles.sliderCol}
          onPointerDown={onPointerDown(colIdx)}
          onPointerMove={onPointerMove(colIdx)}
          onPointerUp={onPointerUp(colIdx)}
          onPointerCancel={onPointerUp(colIdx)}
        >
          <div ref={ref} className={styles.sliderColTrack}>
            {doubled[colIdx].map((card, i) => (
              <img
                key={`${colIdx}-${i}`}
                src={card.src}
                alt={card.alt}
                className={styles.slideImg}
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={styles.gridFadeTop} />
      <div className={styles.gridFadeBottom} />
    </div>
  );
}

export default function InnerServicePage() {
  const slug = useActiveSlug();

  const service = useMemo(
    () => SERVICE_DATA[slug] ?? SERVICE_DATA[DEFAULT_SERVICE_SLUG],
    [slug],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>{service.title}</p>
              <h1 className={styles.headline}>{service.headline}</h1>
              <p className={styles.paragraph}>{service.paragraph}</p>
              <div className={styles.ctaRow}>
                <a href="#contact" className={styles.primaryCta}>
                  Start A Project
                </a>
                <a href="/#work-intro" className={styles.secondaryCta}>
                  See Our Work
                </a>
              </div>
            </div>

            <ImageGrid slides={service.slides} />
          </div>
        </section>
        <div className={styles.brandsWrap}>
          <Brands />
        </div>

        <section className={styles.helpSection}>
          <div className={styles.helpInner}>
            <p className={styles.helpEyebrow}>Channel-tailored</p>
            <h2 className={styles.helpTitle}>
              <span className={styles.helpTitleMain}>What we can help with</span>
              <span className={styles.helpTitleAccent}>for your channel</span>
            </h2>
            <div className={styles.helpGrid}>
              {HELP_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className={styles.helpCard}>
                    <span className={styles.helpIcon} aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <h3 className={styles.helpCardTitle}>{item.title}</h3>
                    <p className={styles.helpCardText}>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.proofInner}>
            <article className={styles.proofRow}>
              <div className={styles.proofText}>
                <p className={styles.proofEyebrow}>Presentation impact</p>
                <h3 className={styles.proofTitle}>
                  <span className={styles.proofTitleLine}>
                    What good presentation
                  </span>
                  <span className={styles.proofTitleLine}>
                    design{" "}
                    <em className={styles.proofTitleAccent}>actually helps with</em>
                  </span>
                </h3>
                <p className={styles.proofParagraph}>
                  A good presentation is not just prettier slides. It helps you
                  explain faster, hold attention longer, and make your point
                  without losing people halfway through.
                </p>
                <p className={styles.proofParagraph}>
                  It helps founders pitch better, sales teams present better,
                  leadership communicate better, and brands show up better. If
                  your slides are too busy, too boring, too messy, or too
                  unclear, the message usually gets lost before it gets a chance
                  to work.
                </p>
              </div>
              <div className={styles.proofMedia}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=760&fit=crop&auto=format&q=80"
                  alt="Team reviewing presentation slides"
                  loading="lazy"
                />
                <span className={styles.proofPlayBadge} aria-hidden="true">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
            </article>

            <article className={styles.proofRow}>
              <div className={styles.proofMedia}>
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=760&fit=crop&auto=format&q=80"
                  alt="Presentation team collaboration"
                  loading="lazy"
                />
              </div>
              <div className={styles.proofText}>
                <p className={styles.proofEyebrow}>Client feedback</p>
                <h3 className={styles.proofTitle}>
                  <span className={styles.proofTitleLine}>
                    What Hireys&apos; Presentations
                  </span>
                  <span className={styles.proofTitleLine}>
                    have been{" "}
                    <em className={styles.proofTitleAccent}>praised for</em>
                  </span>
                </h3>
                <ul className={styles.proofList}>
                  <li>Clarity</li>
                  <li>Audience attention</li>
                  <li>Slide-to-slide flow</li>
                  <li>Confidence in the room</li>
                  <li>Time saved on prep</li>
                  <li>Approval speed</li>
                  <li>Response rate</li>
                  <li>Conversion potential</li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
