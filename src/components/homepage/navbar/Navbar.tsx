import React, {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  Coins,
  Gift,
  Globe,
  HandCoins,
  LayoutGrid,
  Link2,
  type LucideIcon,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  ShoppingBag,
  WalletCards,
} from "lucide-react";
import {
  HiChevronDown,
  HiChevronUp,
  HiMiniArrowUpRight,
  HiMiniBars3,
  HiMiniXMark,
} from "react-icons/hi2";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { PiSparkleFill } from "react-icons/pi";

import {
  CTA_PREVIEW,
  FAQ_SECTION,
  NAV_ITEMS,
  type NavItem,
  type NavMegaLink,
  WHY_CHOOSE_CARDS,
  WORKFLOW_STEPS,
} from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/navbar/Navbar.module.css";
import {
  SERVICE_PAGE_KEY,
  SERVICE_PAGE_PATH,
  navigateToHomepage,
  navigateToServicePage,
} from "@/lib/serviceRoute";
import { cn } from "@/lib/utils";

type MenuKey = NavItem["key"];

const navItems = NAV_ITEMS;

const cardVisual = (menuKey: string, title: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(`hierys-${menuKey}-${title}`)}/900/560`;

const serviceIcons: Record<NavMegaLink["icon"], LucideIcon> = {
  wallet: WalletCards,
  link: Link2,
  globe: Globe,
  handCoins: HandCoins,
  layoutGrid: LayoutGrid,
  network: Network,
  gift: Gift,
  phone: MonitorSmartphone,
  shield: ShieldCheck,
  shoppingBag: ShoppingBag,
  coins: Coins,
};

const serviceToneClasses = {
  blue: "serviceIconBlue",
  green: "serviceIconGreen",
  pink: "serviceIconPink",
  ink: "serviceIconInk",
  purple: "serviceIconPurple",
};

const PROCESS_STEP_DOTS = [
  [{ top: "50%", left: "50%" }],
  [
    { top: "40%", left: "38%" },
    { top: "62%", left: "62%" },
  ],
  [
    { top: "40%", left: "40%" },
    { top: "54%", left: "52%" },
    { top: "68%", left: "64%" },
  ],
  [
    { top: "40%", left: "40%" },
    { top: "40%", left: "62%" },
    { top: "62%", left: "40%" },
    { top: "62%", left: "62%" },
  ],
  [
    { top: "38%", left: "38%" },
    { top: "38%", left: "62%" },
    { top: "50%", left: "50%" },
    { top: "62%", left: "38%" },
    { top: "62%", left: "62%" },
  ],
];

const DESKTOP_CLOSE_DELAY_MS = 120;
const MEGA_EXIT_DURATION_MS = 220;

const itemHasDropdown = (item?: NavItem | null) =>
  Boolean(item?.cards?.length || item?.megaColumns?.length || item?.textColumns?.length);

const {
  stickerLabel: faqStickerLabel,
  headingLines: faqHeadingLines,
  items: faqItems,
} = FAQ_SECTION;

const faqMidpoint = Math.ceil(faqItems.length / 2);
const faqDesktopColumns = [
  faqItems.slice(0, faqMidpoint).map((item, index) => ({ item, index })),
  faqItems
    .slice(faqMidpoint)
    .map((item, index) => ({ item, index: faqMidpoint + index })),
];

const positionMegaPanel = (
  key: MenuKey,
  anchorEl: HTMLElement | null | undefined,
  rootEl: HTMLDivElement | null,
  wrapEl: HTMLDivElement | null,
  navItemMap: Map<MenuKey, HTMLDivElement>,
  setLeft: React.Dispatch<React.SetStateAction<number>>,
  setWidth: React.Dispatch<React.SetStateAction<number>>,
) => {
  const targetEl = anchorEl || navItemMap.get(key);
  const activeItem = navItems.find((item) => item.key === key);

  if (!rootEl || !wrapEl || !targetEl || !activeItem) return;

  const rootRect = rootEl.getBoundingClientRect();
  const wrapRect = wrapEl.getBoundingClientRect();
  const targetRect = targetEl.getBoundingClientRect();

  const slotLeft = wrapRect.left - rootRect.left;
  const slotWidth = wrapRect.width;
  const hasWideMenu = Boolean(
    activeItem.megaColumns?.length ||
      activeItem.textColumns?.length ||
      activeItem.key === "process" ||
      activeItem.key === "why",
  );
  const panelWidth = hasWideMenu
    ? Math.min(1520, Math.max(700, slotWidth - 36))
    : Math.min(920, Math.max(340, slotWidth - 36));

  let nextLeft = hasWideMenu ? slotLeft + 18 : targetRect.left - rootRect.left;

  nextLeft = Math.max(slotLeft + 18, nextLeft);
  nextLeft = Math.min(nextLeft, slotLeft + slotWidth - panelWidth - 18);

  setLeft(nextLeft);
  setWidth(panelWidth);
};

export default function Navbar() {
  const [openKey, setOpenKey] = useState<MenuKey | null>(null);
  const [renderedKey, setRenderedKey] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState<MenuKey | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [mobileFaqOpenIndex, setMobileFaqOpenIndex] = useState(0);
  const [compactNav, setCompactNav] = useState(false);
  const [megaLeft, setMegaLeft] = useState(18);
  const [megaWidth, setMegaWidth] = useState(920);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const megaSlotRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef(new Map<MenuKey, HTMLDivElement>());

  const setNavItemRef = (key: MenuKey, element: HTMLDivElement | null) => {
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

  const clearScheduledClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const clearScheduledUnmount = () => {
    if (unmountTimer.current) {
      clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    }
  };

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target)) closeAll();
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
        setMobileOpen(false);
      }
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);

    return () => {
      clearScheduledClose();
      clearScheduledUnmount();
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    if (openKey || !renderedKey) {
      return undefined;
    }

    unmountTimer.current = setTimeout(() => {
      setRenderedKey(null);
      unmountTimer.current = null;
    }, MEGA_EXIT_DURATION_MS);

    return () => clearScheduledUnmount();
  }, [openKey, renderedKey]);

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
  }, []);

  const openMenu = (key: MenuKey, anchorEl?: HTMLElement | null) => {
    clearScheduledClose();
    clearScheduledUnmount();
    setOpenKey(key);
    setRenderedKey(key);
    positionMegaPanel(
      key,
      anchorEl,
      rootRef.current,
      wrapRef.current,
      navItemRefs.current,
      setMegaLeft,
      setMegaWidth,
    );
  };

  const isWithinOpenMenuArea = (target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;

    return Boolean(
      navRef.current?.contains(target) || megaSlotRef.current?.contains(target),
    );
  };

  const scheduleClose = () => {
    clearScheduledClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), DESKTOP_CLOSE_DELAY_MS);
  };

  const handleDesktopHoverLeave = (event: ReactMouseEvent<HTMLElement>) => {
    if (isWithinOpenMenuArea(event.relatedTarget)) {
      clearScheduledClose();
      return;
    }

    scheduleClose();
  };

  const displayedKey = openKey ?? renderedKey;
  const active = navItems.find((item) => item.key === displayedKey);
  const activeHasMenu = !compactNav && itemHasDropdown(active);
  const megaVisible = !compactNav && itemHasDropdown(navItems.find((item) => item.key === openKey));
  const activeHasDirectory = Boolean(active?.megaColumns?.length);
  const activeHasTextMega = Boolean(active?.textColumns?.length);
  const activeHasProcessMega = active?.key === "process";
  const activeHasWhyMega = active?.key === "why";

  const shouldHandleServiceNavigation = (event: ReactMouseEvent<HTMLElement>) =>
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey;

  const handleServiceNavigation = (event: ReactMouseEvent<HTMLElement>) => {
    if (!shouldHandleServiceNavigation(event)) {
      return;
    }

    event.preventDefault();
    closeAll();
    setMobileOpen(false);
    navigateToServicePage();
  };

  const handleHomeNavigation = (event: ReactMouseEvent<HTMLElement>) => {
    if (!shouldHandleServiceNavigation(event)) {
      return;
    }

    event.preventDefault();
    closeAll();
    setMobileOpen(false);
    navigateToHomepage();
  };

  const handleMenuLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href === SERVICE_PAGE_PATH) {
      handleServiceNavigation(event);
      return;
    }

    closeAll();
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!openKey) return undefined;

    const onResize = () =>
      positionMegaPanel(
        openKey,
        null,
        rootRef.current,
        wrapRef.current,
        navItemRefs.current,
        setMegaLeft,
        setMegaWidth,
      );
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
          <a className={styles.brand} href="/" onClick={handleHomeNavigation}>
            <span className={styles.mark}>
              <PiSparkleFill />
            </span>
            <span className={styles.brandText}>Hierys</span>
          </a>

          <nav
            ref={navRef}
            className={cn(styles.nav, "u-hideScrollbar")}
            aria-label="Primary"
            onMouseEnter={() => clearScheduledClose()}
            onMouseLeave={handleDesktopHoverLeave}
          >
            {navItems.map((item) => {
              const hasDrop = itemHasDropdown(item);
              const isOpen = openKey === item.key;
              const isServiceLink = item.key === SERVICE_PAGE_KEY;
              const navHref =
                isServiceLink ? SERVICE_PAGE_PATH : `#${item.key}`;

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
                  onMouseLeave={(event) =>
                    hasDrop ? handleDesktopHoverLeave(event) : null
                  }
                >
                  <a
                    href={navHref}
                    className={cn(
                      styles.pill,
                      hasDrop && "u-iconSwapTrigger",
                      isOpen && styles.pillOpen,
                    )}
                    onBlur={() => (hasDrop ? scheduleClose() : null)}
                    onClick={(event) => {
                      if (isServiceLink) {
                        handleServiceNavigation(event);
                        return;
                      }

                      if (hasDrop) {
                        event.preventDefault();
                      }
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
          ref={megaSlotRef}
          className={cn(styles.megaSlot, megaVisible && styles.megaSlotShow)}
          style={activeHasMenu ? { paddingLeft: `${megaLeft}px` } : undefined}
          onMouseEnter={() => {
            clearScheduledClose();
            if (activeHasMenu && openKey) openMenu(openKey);
          }}
          onMouseLeave={(event) => {
            if (activeHasMenu) handleDesktopHoverLeave(event);
          }}
        >
          {activeHasMenu && active ? (
            <div
              key={active.key}
              className={cn(
                styles.mega,
                activeHasDirectory && styles.serviceMega,
                activeHasProcessMega && styles.processMega,
                activeHasWhyMega && styles.whyMega,
                activeHasTextMega && styles.textMega,
              )}
              style={{ width: `${megaWidth}px` }}
            >
              {activeHasWhyMega ? (
                <div className={styles.whyMegaGrid}>
                  {WHY_CHOOSE_CARDS.map((card) => (
                    <article
                      key={`why-card-${card.titleLines.join("-")}`}
                      className={styles.whyCard}
                    >
                      <h3 className={styles.whyCardTitle}>
                        {card.titleLines.map((line) => (
                          <span
                            key={`why-card-title-${card.titleLines.join("-")}-${line}`}
                          >
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className={styles.whyCardDescription}>
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : activeHasProcessMega ? (
                <div className={styles.processMegaGrid}>
                  {WORKFLOW_STEPS.map((step, index) => (
                    <div
                      key={`process-step-${step.titleLines.join("-")}`}
                      className={styles.processStep}
                    >
                      <div className={styles.processIcon} aria-hidden="true">
                        {PROCESS_STEP_DOTS[index]?.map((dot, dotIndex) => (
                          <span
                            key={`process-dot-${index}-${dotIndex}`}
                            className={styles.processDot}
                            style={{ top: dot.top, left: dot.left }}
                          />
                        ))}
                      </div>

                      <h3 className={styles.processTitle}>
                        {step.titleLines.map((line) => (
                          <span
                            key={`process-title-${step.titleLines.join("-")}-${line}`}
                          >
                            {line}
                          </span>
                        ))}
                      </h3>

                      <p className={styles.processDescription}>{step.description}</p>
                    </div>
                  ))}
                </div>
              ) : activeHasTextMega ? (
                active.key === "faq" ? (
                  <div className={styles.faqMegaGrid}>
                    <div className={styles.faqMegaIntro}>
                      <span className={styles.faqMegaSticker}>{faqStickerLabel}</span>
                      <h3 className={styles.faqMegaHeading}>
                        {faqHeadingLines.map((line) => (
                          <span key={`faq-heading-${line}`}>{line}</span>
                        ))}
                      </h3>
                    </div>

                    <div className={styles.faqAccordionGrid}>
                      {faqDesktopColumns.map((column, columnIndex) => (
                        <div
                          className={styles.faqAccordionColumn}
                          key={`faq-column-${columnIndex}`}
                        >
                          {column.map(({ item: faqItem, index }) => {
                            const isOpen = faqOpenIndex === index;

                            return (
                              <article className={styles.faqItem} key={faqItem.question}>
                                <button
                                  type="button"
                                  aria-expanded={isOpen}
                                  className={styles.faqItemButton}
                                  onClick={() =>
                                    setFaqOpenIndex((current) =>
                                      current === index ? -1 : index,
                                    )
                                  }
                                >
                                  <span className={styles.faqQuestion}>
                                    {faqItem.question}
                                  </span>
                                  <span
                                    className={cn(
                                      styles.faqMarker,
                                      isOpen && styles.faqMarkerOpen,
                                    )}
                                    aria-hidden="true"
                                  >
                                    <span className={styles.faqMarkerLineHorizontal} />
                                    <span className={styles.faqMarkerLineVertical} />
                                  </span>
                                </button>

                                <div
                                  className={cn(
                                    styles.faqAnswerWrap,
                                    isOpen && styles.faqAnswerWrapOpen,
                                  )}
                                >
                                  <div className={styles.faqAnswerInner}>
                                    <p className={styles.faqAnswer}>{faqItem.answer}</p>
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.textMegaGrid}>
                    <div className={styles.textMegaColumns}>
                      {active.textColumns?.map((column, columnIndex) => (
                        <div
                          key={`${active.key}-text-column-${columnIndex}`}
                          className={styles.textColumn}
                        >
                          {column.groups.map((group, groupIndex) => (
                            <section
                              key={`${active.key}-text-group-${columnIndex}-${groupIndex}`}
                              className={styles.textGroup}
                            >
                              <p className={styles.textGroupTitle}>{group.title}</p>

                              <div className={styles.textLinks}>
                                {group.items.map((link) => (
                                  <a
                                    key={link.title}
                                    className={styles.textLink}
                                    href={link.href}
                                    onClick={(event) =>
                                      handleMenuLinkClick(event, link.href)
                                    }
                                  >
                                    {link.title}
                                  </a>
                                ))}
                              </div>
                            </section>
                          ))}
                        </div>
                      ))}
                    </div>

                    {active.promoCard ? (
                      <a
                        className={styles.promoCard}
                        href={active.promoCard.href}
                        onClick={(event) =>
                          handleMenuLinkClick(event, active.promoCard.href)
                        }
                      >
                        <span className={styles.promoEyebrow}>
                          {active.promoCard.eyebrow}
                        </span>
                        <span className={styles.promoTitle}>
                          {active.promoCard.title}
                        </span>
                        <span
                          className={cn(styles.promoOrb, styles.promoOrbPrimary)}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(styles.promoOrb, styles.promoOrbSecondary)}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(styles.promoOrb, styles.promoOrbTertiary)}
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </div>
                )
              ) : activeHasDirectory ? (
                <div className={styles.serviceMegaGrid}>
                  {active.megaColumns?.map((column, columnIndex) => (
                    <div
                      key={`${active.key}-column-${columnIndex}`}
                      className={styles.serviceColumn}
                    >
                      {column.groups.map((group, groupIndex) => (
                        <section
                          key={`${active.key}-group-${columnIndex}-${groupIndex}`}
                          className={styles.serviceGroup}
                        >
                          {group.title ? (
                            <p className={styles.serviceGroupTitle}>{group.title}</p>
                          ) : null}

                          <div className={styles.serviceLinks}>
                            {group.items.map((link) => {
                              const Icon = serviceIcons[link.icon];

                              return (
                                <a
                                  key={link.title}
                                  className={styles.serviceLink}
                                  href={link.href}
                                  onClick={(event) =>
                                    handleMenuLinkClick(event, link.href)
                                  }
                                >
                                  <span
                                    className={cn(
                                      styles.serviceIcon,
                                      styles[serviceToneClasses[link.tone]],
                                    )}
                                    aria-hidden="true"
                                  >
                                    <Icon />
                                  </span>

                                  <span className={styles.serviceLinkBody}>
                                    <span className={styles.serviceLinkTitleRow}>
                                      <span className={styles.serviceLinkTitle}>
                                        {link.title}
                                      </span>

                                      {link.external ? (
                                        <span
                                          className={styles.serviceExternal}
                                          aria-hidden="true"
                                        >
                                          <HiMiniArrowUpRight />
                                        </span>
                                      ) : null}
                                    </span>

                                    <span className={styles.serviceLinkDescription}>
                                      {link.description}
                                    </span>
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.grid}>
                  {active.cards?.map((card) => (
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
              )}
            </div>
          ) : null}
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
              <a
                className={styles.drawerBrand}
                href="/"
                onClick={handleHomeNavigation}
              >
                <span className={styles.mark}>
                  <PiSparkleFill />
                </span>
                <span className={styles.brandText}>Hierys</span>
              </a>

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
                const hasDrop = Boolean(
                  item.cards?.length || item.megaColumns?.length || item.textColumns?.length,
                );
                const hasDirectory = Boolean(item.megaColumns?.length);
                const hasTextMega = Boolean(item.textColumns?.length);
                const hasProcessMega = item.key === "process";
                const hasWhyMega = item.key === "why";
                const isOpen = mobileKey === item.key;
                const isServiceLink = item.key === SERVICE_PAGE_KEY;

                if (!hasDrop) {
                  const navHref = isServiceLink ? SERVICE_PAGE_PATH : `#${item.key}`;
                  return (
                    <a
                      key={item.key}
                      className={styles.mobileLink}
                      href={navHref}
                      onClick={(event) => {
                        if (isServiceLink) {
                          handleServiceNavigation(event);
                          return;
                        }

                        setMobileOpen(false);
                      }}
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
                      {hasWhyMega ? (
                        <div className={styles.mobileWhyPanel}>
                          {WHY_CHOOSE_CARDS.map((card) => (
                            <article
                              key={`mobile-why-card-${card.titleLines.join("-")}`}
                              className={styles.mobileWhyCard}
                            >
                              <h3 className={styles.mobileWhyTitle}>
                                {card.titleLines.map((line) => (
                                  <span
                                    key={`mobile-why-card-title-${card.titleLines.join("-")}-${line}`}
                                  >
                                    {line}
                                  </span>
                                ))}
                              </h3>
                              <p className={styles.mobileWhyDescription}>
                                {card.description}
                              </p>
                            </article>
                          ))}
                        </div>
                      ) : hasProcessMega ? (
                        <div className={styles.mobileProcessPanel}>
                          {WORKFLOW_STEPS.map((step, index) => (
                            <div
                              key={`mobile-process-step-${step.titleLines.join("-")}`}
                              className={styles.mobileProcessStep}
                            >
                              <div
                                className={cn(
                                  styles.processIcon,
                                  styles.mobileProcessIcon,
                                )}
                                aria-hidden="true"
                              >
                                {PROCESS_STEP_DOTS[index]?.map((dot, dotIndex) => (
                                  <span
                                    key={`mobile-process-dot-${index}-${dotIndex}`}
                                    className={cn(
                                      styles.processDot,
                                      styles.mobileProcessDot,
                                    )}
                                    style={{ top: dot.top, left: dot.left }}
                                  />
                                ))}
                              </div>

                              <div className={styles.mobileProcessBody}>
                                <h3 className={styles.mobileProcessTitle}>
                                  {step.titleLines.map((line) => (
                                    <span
                                      key={`mobile-process-title-${step.titleLines.join("-")}-${line}`}
                                    >
                                      {line}
                                    </span>
                                  ))}
                                </h3>
                                <p className={styles.mobileProcessDescription}>
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : hasTextMega ? (
                        item.key === "faq" ? (
                          <div className={styles.mobileFaqPanel}>
                            <div className={styles.mobileFaqIntro}>
                              <span className={styles.faqMegaSticker}>{faqStickerLabel}</span>
                              <h3 className={styles.mobileFaqHeading}>
                                {faqHeadingLines.map((line) => (
                                  <span key={`mobile-faq-heading-${line}`}>{line}</span>
                                ))}
                              </h3>
                            </div>

                            <div className={styles.faqAccordion}>
                              {faqItems.map((faqItem, index) => {
                                const isOpen = mobileFaqOpenIndex === index;

                                return (
                                  <article
                                    className={styles.faqItem}
                                    key={`mobile-${faqItem.question}`}
                                  >
                                    <button
                                      type="button"
                                      aria-expanded={isOpen}
                                      className={styles.faqItemButton}
                                      onClick={() =>
                                        setMobileFaqOpenIndex((current) =>
                                          current === index ? -1 : index,
                                        )
                                      }
                                    >
                                      <span className={styles.faqQuestion}>
                                        {faqItem.question}
                                      </span>
                                      <span
                                        className={cn(
                                          styles.faqMarker,
                                          isOpen && styles.faqMarkerOpen,
                                        )}
                                        aria-hidden="true"
                                      >
                                        <span className={styles.faqMarkerLineHorizontal} />
                                        <span className={styles.faqMarkerLineVertical} />
                                      </span>
                                    </button>

                                    <div
                                      className={cn(
                                        styles.faqAnswerWrap,
                                        isOpen && styles.faqAnswerWrapOpen,
                                      )}
                                    >
                                      <div className={styles.faqAnswerInner}>
                                        <p className={styles.faqAnswer}>
                                          {faqItem.answer}
                                        </p>
                                      </div>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>

                          </div>
                        ) : (
                          <div className={styles.mobileTextPanel}>
                            <div className={styles.mobileTextColumns}>
                              {item.textColumns?.map((column, columnIndex) => (
                                <div
                                  key={`${item.key}-mobile-text-column-${columnIndex}`}
                                  className={styles.mobileTextColumn}
                                >
                                  {column.groups.map((group, groupIndex) => (
                                    <section
                                      key={`${item.key}-mobile-text-group-${columnIndex}-${groupIndex}`}
                                      className={styles.mobileTextGroup}
                                    >
                                      <p className={styles.mobileTextGroupTitle}>
                                        {group.title}
                                      </p>

                                      <div className={styles.mobileTextLinks}>
                                        {group.items.map((link) => (
                                          <a
                                            key={link.title}
                                            className={styles.mobileTextLink}
                                            href={link.href}
                                            onClick={(event) =>
                                              handleMenuLinkClick(event, link.href)
                                            }
                                          >
                                            {link.title}
                                          </a>
                                        ))}
                                      </div>
                                    </section>
                                  ))}
                                </div>
                              ))}
                            </div>

                            {item.promoCard ? (
                              <a
                                className={styles.mobilePromoCard}
                                href={item.promoCard.href}
                                onClick={(event) =>
                                  handleMenuLinkClick(event, item.promoCard.href)
                                }
                              >
                                <span className={styles.promoEyebrow}>
                                  {item.promoCard.eyebrow}
                                </span>
                                <span className={styles.mobilePromoTitle}>
                                  {item.promoCard.title}
                                </span>
                                <span
                                  className={cn(styles.promoOrb, styles.promoOrbPrimary)}
                                  aria-hidden="true"
                                />
                                <span
                                  className={cn(styles.promoOrb, styles.promoOrbSecondary)}
                                  aria-hidden="true"
                                />
                              </a>
                            ) : null}
                          </div>
                        )
                      ) : hasDirectory ? (
                        <div className={styles.mobileServicePanel}>
                          {item.megaColumns?.map((column, columnIndex) => (
                            <div
                              key={`${item.key}-mobile-column-${columnIndex}`}
                              className={styles.mobileServiceColumn}
                            >
                              {column.groups.map((group, groupIndex) => (
                                <section
                                  key={`${item.key}-mobile-group-${columnIndex}-${groupIndex}`}
                                  className={styles.mobileServiceGroup}
                                >
                                  {group.title ? (
                                    <p className={styles.mobileServiceGroupTitle}>
                                      {group.title}
                                    </p>
                                  ) : null}

                                  <div className={styles.mobileServiceLinks}>
                                    {group.items.map((link) => {
                                      const Icon = serviceIcons[link.icon];

                                      return (
                                        <a
                                          key={link.title}
                                          className={styles.mobileServiceLink}
                                          href={link.href}
                                          onClick={(event) =>
                                            handleMenuLinkClick(event, link.href)
                                          }
                                        >
                                          <span
                                            className={cn(
                                              styles.serviceIcon,
                                              styles.mobileServiceIcon,
                                              styles[serviceToneClasses[link.tone]],
                                            )}
                                            aria-hidden="true"
                                          >
                                            <Icon />
                                          </span>

                                          <span className={styles.mobileServiceBody}>
                                            <span
                                              className={styles.mobileServiceTitleRow}
                                            >
                                              <span>{link.title}</span>

                                              {link.external ? (
                                                <span
                                                  className={styles.serviceExternal}
                                                  aria-hidden="true"
                                                >
                                                  <HiMiniArrowUpRight />
                                                </span>
                                              ) : null}
                                            </span>

                                            <span
                                              className={styles.mobileServiceDescription}
                                            >
                                              {link.description}
                                            </span>
                                          </span>
                                        </a>
                                      );
                                    })}
                                  </div>
                                </section>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.mobileGrid}>
                          {item.cards?.map((card) => (
                            <a
                              key={card.title}
                              className={cn(styles.mobileCard, "u-iconSwapTrigger")}
                              href={card.href || "#"}
                              onClick={() => setMobileOpen(false)}
                            >
                              <div className={styles.mobileCardTop}>
                                <span
                                  className={cn(styles.mobileCardArrow, "u-iconSwap")}
                                  aria-hidden="true"
                                >
                                  <span className="u-iconSwap__a">
                                    <HiMiniArrowUpRight />
                                  </span>
                                  <span className="u-iconSwap__b">
                                    <HiMiniArrowUpRight />
                                  </span>
                                </span>
                              </div>
                              <div className={styles.mobileCardLabel}>
                                {card.title}
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
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
