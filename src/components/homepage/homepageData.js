export const NAV_ITEMS = [
  {
    key: "services",
    label: "Services",
    hoverLabel: "Services →",
    cards: [
      { title: "Brand Strategy", href: "#" },
      { title: "Content Design", href: "#" },
      { title: "Web Experiences", href: "#" },
      { title: "Growth Support", href: "#" },
    ],
  },
  {
    key: "work",
    label: "See Our Work",
    hoverLabel: "See Our Work →",
    cards: [
      { title: "Landing Pages", href: "#" },
      { title: "Campaign Visuals", href: "#" },
      { title: "Brand Systems", href: "#" },
      { title: "Decks & Launches", href: "#" },
    ],
  },
  {
    key: "process",
    label: "How it Works",
    hoverLabel: "How it Works →",
    cards: [
      { title: "Discovery", href: "#" },
      { title: "Creative Sprint", href: "#" },
      { title: "Refinement", href: "#" },
      { title: "Launch Support", href: "#" },
    ],
  },
  {
    key: "why",
    label: "Why Choose Hierys",
    hoverLabel: "Why Choose Hierys →",
    cards: [
      { title: "Fast Turnarounds", href: "#" },
      { title: "High Taste", href: "#" },
      { title: "Founder Friendly", href: "#" },
      { title: "Cross-Disciplinary", href: "#" },
    ],
  },
  {
    key: "faq",
    label: "Common Questions",
    hoverLabel: "Common Questions →",
    cards: [
      { title: "Pricing", href: "#" },
      { title: "Timelines", href: "#" },
      { title: "Scope", href: "#" },
      { title: "Communication", href: "#" },
    ],
  },
];

const imagePool = {
  analytics:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  desk:
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
  office:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  monitor:
    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
  studio:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  portrait:
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
};

export const HERO_SCENES = [
  {
    word: "TASK",
    strap: "NO TASK TOO BIG, NO TASK TOO SMALL.",
    cards: [
      { type: "image", alt: "Portrait concept", src: imagePool.portrait },
      { type: "image", alt: "Studio interior", src: imagePool.office },
      { type: "image", alt: "Creative desk", src: imagePool.studio },
      { type: "image", alt: "Analytics screen", src: imagePool.analytics },
      {
        type: "image",
        alt: "Task planning",
        src: imagePool.monitor,
      },
    ],
  },
  {
    word: "PROJECT",
    strap: "NO PROJECT TOO BIG, NO PROJECT TOO SMALL.",
    cards: [
      { type: "image", alt: "Desk planning", src: imagePool.desk },
      { type: "image", alt: "Workspace", src: imagePool.studio },
      { type: "image", alt: "Modern office", src: imagePool.office },
      { type: "image", alt: "Monitor layout", src: imagePool.monitor },
      {
        type: "image",
        alt: "Project planning",
        src: imagePool.analytics,
      },
    ],
  },
  {
    word: "IDEA",
    strap: "NO IDEA TOO BIG, NO IDEA TOO SMALL.",
    cards: [
      { type: "image", alt: "Creative brainstorm", src: imagePool.studio },
      { type: "image", alt: "Campaign portrait", src: imagePool.portrait },
      { type: "image", alt: "Desk setup", src: imagePool.desk },
      { type: "image", alt: "Presentation screen", src: imagePool.monitor },
      {
        type: "image",
        alt: "Idea planning",
        src: imagePool.office,
      },
    ],
  },
  {
    word: "DREAM",
    strap: "NO DREAM TOO BIG, NO DREAM TOO SMALL.",
    cards: [
      { type: "image", alt: "Desk planning", src: imagePool.desk },
      { type: "image", alt: "Studio interior", src: imagePool.office },
      { type: "image", alt: "Clean workspace", src: imagePool.monitor },
      { type: "image", alt: "Analytics view", src: imagePool.analytics },
      {
        type: "image",
        alt: "World map planning",
        src: imagePool.portrait,
      },
    ],
  },
];

export const CTA_PREVIEW =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80";
