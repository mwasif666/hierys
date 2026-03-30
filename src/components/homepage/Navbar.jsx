import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiMiniArrowUpRight,
  HiMiniBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { PiSparkleFill } from "react-icons/pi";

import { CTA_PREVIEW, NAV_ITEMS } from "@/components/homepage/homepageData";
import styles from "@/components/homepage/Navbar.module.css";
import { cn } from "@/lib/utils";

const cardVisual = (menuKey, title) =>
  `https://picsum.photos/seed/${encodeURIComponent(`hierys-${menuKey}-${title}`)}/900/560`;

export default function Navbar() {
  const navItems = useMemo(() => NAV_ITEMS, []);
  const [openKey, setOpenKey] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState(null);
  const [compactNav, setCompactNav] = useState(false);
  const [megaLeft, setMegaLeft] = useState(18);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);
  const wrapRef = useRef(null);
  const navRef = useRef(null);
  const navItemRefs = useRef(new Map());

  const setNavItemRef = (key, element) => {
    if (!element) {
      navItemRefs.current.delete(key);
      return;
    }

    navItemRefs.current.set(key, element);
  };

  const closeAll = () => {
    setOpenKey(null);
    setMobileKey(null);
  };

  useEffect(() => {
    const onDown = (event) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target)) closeAll();
    };

    const onEsc = (event) => {
      if (event.key === "Escape") {
        closeAll();
        setMobileOpen(false);
      }
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", mobileOpen);

    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [mobileOpen]);

  useEffect(() => {
    const updateCompactNav = () => {
      const navEl = navRef.current;
      const viewportCompact = window.innerWidth <= 1512;
      const overflowCompact =
        navEl !== null && navEl.scrollWidth > navEl.clientWidth + 8;

      setCompactNav(viewportCompact || overflowCompact);
    };

    updateCompactNav();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateCompactNav())
        : null;

    if (navRef.current && resizeObserver) {
      resizeObserver.observe(navRef.current);
    }

    window.addEventListener("resize", updateCompactNav);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateCompactNav);
    };
  }, [navItems]);

  const positionMega = (key, anchorEl) => {
    const rootEl = rootRef.current;
    const wrapEl = wrapRef.current;
    const targetEl = anchorEl || navItemRefs.current.get(key);

    if (!rootEl || !wrapEl || !targetEl) return;

    const rootRect = rootEl.getBoundingClientRect();
    const wrapRect = wrapEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const slotLeft = wrapRect.left - rootRect.left;
    const slotWidth = wrapRect.width;
    const panelWidth = Math.min(920, Math.max(340, slotWidth - 36));

    let nextLeft = targetRect.left - rootRect.left;
    nextLeft = Math.max(slotLeft + 18, nextLeft);
    nextLeft = Math.min(nextLeft, slotLeft + slotWidth - panelWidth - 18);

    setMegaLeft(nextLeft);
  };

  const openMenu = (key, anchorEl) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
    if (key) positionMega(key, anchorEl);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  };

  const active = navItems.find((item) => item.key === openKey);
  const activeHasCards = !compactNav && Boolean(active?.cards?.length);

  useEffect(() => {
    if (!openKey) return undefined;

    const onResize = () => positionMega(openKey);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [openKey]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, compactNav && styles.compact)}
    >
      <header className={styles.header}>
        <div className={styles.wrap} ref={wrapRef}>
          <a className={styles.brand} href="#top">
            <span className={styles.mark}>
              <PiSparkleFill />
            </span>
            <span className={styles.brandText}>Hierys</span>
          </a>

          <nav
            ref={navRef}
            className={cn(styles.nav, "u-hideScrollbar")}
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const hasDrop = Boolean(item.cards?.length);
              const isOpen = openKey === item.key;

              return (
                <div
                  key={item.key}
                  ref={(element) => setNavItemRef(item.key, element)}
                  className={styles.navItemWrap}
                  onMouseEnter={(event) =>
                    hasDrop
                      ? openMenu(item.key, event.currentTarget)
                      : setOpenKey(null)
                  }
                  onMouseLeave={() => (hasDrop ? scheduleClose() : null)}
                >
                  <a
                    href={`#${item.key}`}
                    className={cn(
                      styles.pill,
                      hasDrop && "u-iconSwapTrigger",
                      isOpen && styles.pillOpen,
                    )}
                    onBlur={() => (hasDrop ? scheduleClose() : null)}
                    onClick={(event) => {
                      if (hasDrop) event.preventDefault();
                    }}
                    onFocus={(event) =>
                      hasDrop
                        ? openMenu(
                            item.key,
                            event.currentTarget.closest(`.${styles.navItemWrap}`),
                          )
                        : setOpenKey(null)
                    }
                  >
                    <span className={styles.pillTextSwap}>
                      <span className={styles.pillTextPrimary}>{item.label}</span>
                      <span className={styles.pillTextSecondary}>
                        {item.hoverLabel}
                      </span>
                    </span>

                    {hasDrop && (
                      <span
                        className={cn(
                          styles.pillIcon,
                          "u-iconSwap",
                          isOpen && "u-iconSwapOpen",
                        )}
                        aria-hidden="true"
                      >
                        <span className="u-iconSwap__a">
                          <GoArrowDown />
                        </span>
                        <span className="u-iconSwap__b">
                          <GoArrowUp />
                        </span>
                      </span>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className={styles.right}>
            <a className={styles.cta} href="#contact">
              <span className={styles.ctaLabel}>Start A Project</span>
              <span className={styles.ctaThumb}>
                <img src={CTA_PREVIEW} alt="Project preview" />
              </span>
            </a>

            <button
              className={styles.burger}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((value) => !value);
                closeAll();
              }}
            >
              {mobileOpen ? <HiMiniXMark /> : <HiMiniBars3 />}
            </button>
          </div>
        </div>

        <div
          className={cn(styles.megaSlot, activeHasCards && styles.megaSlotShow)}
          style={activeHasCards ? { paddingLeft: `${megaLeft}px` } : undefined}
          onMouseEnter={() => {
            if (activeHasCards) openMenu(openKey);
          }}
          onMouseLeave={() => {
            if (activeHasCards) scheduleClose();
          }}
        >
          {activeHasCards && (
            <div className={styles.mega}>
              <div className={styles.grid}>
                {active.cards.map((card) => (
                  <a key={card.title} className={styles.card} href={card.href || "#"}>
                    <div className={cn(styles.cardThumb, "u-iconSwapTrigger")}>
                      <span className={styles.cardArrow} aria-hidden="true">
                        <span className={cn(styles.cardArrowIcon, "u-iconSwap")}>
                          <span className="u-iconSwap__a">
                            <HiMiniArrowUpRight />
                          </span>
                          <span className="u-iconSwap__b">
                            <HiMiniArrowUpRight />
                          </span>
                        </span>
                      </span>

                      <div
                        className={styles.cardVisual}
                        style={{
                          backgroundImage: `
                            linear-gradient(180deg, rgba(34, 10, 24, 0.12) 0%, rgba(34, 10, 24, 0.82) 100%),
                            linear-gradient(135deg, rgba(120, 54, 146, 0.46) 0%, rgba(79, 20, 39, 0.74) 100%),
                            url("${cardVisual(active.key, card.title)}")
                          `,
                        }}
                      />
                      <div className={styles.cardLabel}>{card.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className={cn(styles.drawer, mobileOpen && styles.drawerOpen)}>
        <button
          className={styles.drawerBackdrop}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />

        <aside className={styles.drawerPanel} role="dialog" aria-modal="true">
          <div className={styles.drawerInner}>
            <div className={styles.drawerTop}>
              <div className={styles.drawerBrand}>
                <span className={styles.mark}>
                  <PiSparkleFill />
                </span>
                <span className={styles.brandText}>Hierys</span>
              </div>

              <button
                type="button"
                className={styles.drawerClose}
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <HiMiniXMark />
              </button>
            </div>

            <div className={styles.drawerContent}>
              {navItems.map((item) => {
                const hasDrop = Boolean(item.cards?.length);
                const isOpen = mobileKey === item.key;

                if (!hasDrop) {
                  return (
                    <a
                      key={item.key}
                      className={styles.mobileLink}
                      href={`#${item.key}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <div key={item.key} className={styles.mobileGroup}>
                    <button
                      type="button"
                      className={cn(
                        styles.mobileTrigger,
                        isOpen && styles.mobileTriggerOpen,
                      )}
                      onClick={() =>
                        setMobileKey((value) =>
                          value === item.key ? null : item.key,
                        )
                      }
                    >
                      <span>{item.label}</span>
                      <span className={styles.mobileIcon} aria-hidden="true">
                        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
                      </span>
                    </button>

                    <div
                      className={cn(
                        styles.mobilePanel,
                        isOpen && styles.mobilePanelOpen,
                      )}
                    >
                      <div className={styles.mobileGrid}>
                        {item.cards.map((card) => (
                          <a
                            key={card.title}
                            className={cn(styles.mobileCard, "u-iconSwapTrigger")}
                            href={card.href || "#"}
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className={styles.mobileCardTop}>
                              <span className={cn(styles.mobileCardArrow, "u-iconSwap")} aria-hidden="true">
                                <span className="u-iconSwap__a">
                                  <HiMiniArrowUpRight />
                                </span>
                                <span className="u-iconSwap__b">
                                  <HiMiniArrowUpRight />
                                </span>
                              </span>
                            </div>
                            <div className={styles.mobileCardLabel}>{card.title}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <a
                className={cn(styles.mobileCta, "u-iconSwapTrigger")}
                href="#contact"
                onClick={() => setMobileOpen(false)}
              >
                <span>Start A Project</span>
                <span className={cn(styles.mobileCtaIcon, "u-iconSwap")} aria-hidden="true">
                  <span className="u-iconSwap__a">
                    <HiMiniArrowUpRight />
                  </span>
                  <span className="u-iconSwap__b">
                    <HiMiniArrowUpRight />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
