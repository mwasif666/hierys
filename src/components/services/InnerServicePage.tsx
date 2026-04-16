import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import ComparisonSection from "@/components/homepage/comparison/ComparisonSection";
import FaqSection from "@/components/homepage/faq/FaqSection";
import NeedPromptSection from "@/components/homepage/need-prompt/NeedPromptSection";
import WorkIntroSection from "@/components/homepage/work-intro/WorkIntroSection";
import FooterSection from "@/components/homepage/footer/FooterSection";
import { APP_NAVIGATION_EVENT, getInnerServiceSlug } from "@/lib/serviceRoute";
import {
  SERVICE_DATA,
  DEFAULT_SERVICE_SLUG,
  type SlideCard,
} from "./innerServiceData";
import styles from "./InnerServicePage.module.css";
import ReviewsSection from "../homepage/reviews/ReviewsSection";

gsap.registerPlugin(ScrollTrigger);

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

const PRAISE_ITEMS = [
  {
    label: "Clarity",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Audience attention",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Slide-to-slide flow",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Confidence in the room",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Time saved on prep",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Approval speed",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Response rate",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&h=160&fit=crop&auto=format&q=80",
  },
  {
    label: "Conversion potential",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=240&h=160&fit=crop&auto=format&q=80",
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
          offsets.current[i] = (((offsets.current[i] % h) + h) % h) - h;
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
  const praiseTones = [styles.tone1, styles.tone2, styles.tone3];
  const proofSectionRef = useRef<HTMLElement | null>(null);
  const proofStageRef = useRef<HTMLDivElement | null>(null);
  const proofPanelRefs = useRef<Array<HTMLElement | null>>([]);

  const service = useMemo(
    () => SERVICE_DATA[slug] ?? SERVICE_DATA[DEFAULT_SERVICE_SLUG],
    [slug],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    const panels = proofPanelRefs.current.filter(
      (panel): panel is HTMLElement => panel !== null,
    );

    if (
      !proofSectionRef.current ||
      !proofStageRef.current ||
      panels.length < 2
    ) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(panels, { clearProps: "all" });
      return undefined;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 992px)", () => {
        gsap.set(panels[0], { yPercent: 0, zIndex: 1 });
        gsap.set(panels[1], { yPercent: 100, zIndex: 2 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: proofSectionRef.current,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.7)}`,
            pin: proofStageRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.24 }).to(
          panels[1],
          {
            yPercent: 0,
            ease: "none",
            duration: 0.76,
          },
          ">",
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      media.add("(max-width: 991px)", () => {
        gsap.set(panels, { clearProps: "all" });
      });
    }, proofSectionRef);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

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
          <div className={`container ${styles.helpInner}`}>
            <p className={styles.helpEyebrow}>Channel-tailored</p>
            <h2 className={styles.helpTitle}>
              <span className={styles.helpTitleMain}>
                What we can help with
              </span>
              <span className={styles.helpTitleMain}>for your channel</span>
            </h2>
            <div className={`row ${styles.helpGrid}`}>
              {HELP_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className={`col-12 col-md-6 col-lg-4 ${styles.helpCard}`}
                  >
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

        <section className={styles.proofSection} ref={proofSectionRef}>
          <div className={styles.proofStage} ref={proofStageRef}>
            <article
              className={styles.proofRow}
              ref={(node) => {
                proofPanelRefs.current[0] = node;
              }}
            >
              <div className={`container ${styles.proofInner}`}>
                <div
                  className={`row align-items-center ${styles.proofRowInner}`}
                >
                  <div className={`col-12 col-lg-6 ${styles.proofText}`}>
                    <p className={styles.proofEyebrow}>Presentation impact</p>
                    <h3 className={styles.proofTitle}>
                      <span className={styles.proofTitleLine}>What good</span>
                      <span className={styles.proofTitleLine}>
                        presentation design
                      </span>
                      <span className={styles.proofTitleLine}>
                        actually helps with
                      </span>
                    </h3>
                  </div>
                  <div className={`col-12 col-lg-6`}>
                    <div>
                      <p className={styles.proofParagraph}>
                        A good presentation is not just prettier slides. It
                        helps you explain faster, hold attention longer, and
                        make your point without losing people halfway through.
                      </p>
                      <p className={styles.proofParagraph}>
                        It helps founders pitch better, sales teams present
                        better, leadership communicate better, and brands show
                        up better. If your slides are too busy, too boring, too
                        messy, or too unclear, the message usually gets lost
                        before it gets a chance to work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              className={styles.proofRow}
              ref={(node) => {
                proofPanelRefs.current[1] = node;
              }}
            >
              <div className={`container ${styles.proofInner}`}>
                <div
                  className={`row align-items-center ${styles.proofRowInner}`}
                >
                  <div className={`col-12 col-lg-6 ${styles.proofMediaCol}`}>
                    <div className={styles.deliverables}>
                      {PRAISE_ITEMS.map((item, index) => (
                        <div
                          key={item.label}
                          className={`${styles.deliverable} ${
                            praiseTones[index % praiseTones.length]
                          }`}
                        >
                          <img
                            className={styles.deliverableThumb}
                            src={item.image}
                            alt={item.label}
                            loading="lazy"
                          />
                          <span className={styles.deliverableLabel}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`col-12 col-lg-6 ${styles.proofText}`}>
                    <p className={styles.proofEyebrow}>Client feedback</p>
                    <h3 className={styles.proofTitle}>
                      <span className={styles.proofTitleLine}>What Hireys</span>
                      <span className={styles.proofTitleLine}>
                        Presentations have
                      </span>
                      <span className={styles.proofTitleLine}>
                        been praised for
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <WorkIntroSection />
        <ComparisonSection />
        <ReviewsSection />
        <NeedPromptSection
          onStartHereClick={() => {
            const el = document.getElementById("contact");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        />
        <FaqSection />
      </main>

      <FooterSection />
    </div>
  );
}
