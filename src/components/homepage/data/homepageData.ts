import { SERVICE_PAGE_PATH } from "@/lib/serviceRoute";

export type NavCard = {
  title: string;
  href: string;
};

export type NavMegaTone = "blue" | "green" | "pink" | "ink" | "purple";

export type NavMegaIcon =
  | "wallet"
  | "link"
  | "globe"
  | "handCoins"
  | "layoutGrid"
  | "network"
  | "gift"
  | "phone"
  | "shield"
  | "shoppingBag"
  | "coins";

export type NavMegaLink = {
  title: string;
  description: string;
  href: string;
  icon: NavMegaIcon;
  tone: NavMegaTone;
  external?: boolean;
};

export type NavMegaGroup = {
  title?: string;
  items: NavMegaLink[];
};

export type NavMegaColumn = {
  groups: NavMegaGroup[];
};

export type NavTextMegaLink = {
  title: string;
  href: string;
};

export type NavTextMegaGroup = {
  title: string;
  items: NavTextMegaLink[];
};

export type NavTextMegaColumn = {
  groups: NavTextMegaGroup[];
};

export type NavPromoCard = {
  eyebrow: string;
  title: string;
  href: string;
};

export type NavItem = {
  key: string;
  label: string;
  hoverLabel: string;
  cards?: NavCard[];
  megaColumns?: NavMegaColumn[];
  textColumns?: NavTextMegaColumn[];
  promoCard?: NavPromoCard;
};

export type HeroImageCard = {
  type: "image";
  alt: string;
  src: string;
};

export type HeroNoteCard = {
  type: "note";
  alt: string;
  label: string;
  src?: string;
};

export type HeroCard = HeroImageCard | HeroNoteCard;

export type HeroScene = {
  word: string;
  strap: string;
  cards: HeroCard[];
};

export type BrandPartner = {
  name: string;
  logo: string;
};

export type ServiceImage = {
  src: string;
  position?: string;
};

export type ServiceShowcaseItem = {
  title: string;
  images: ServiceImage[];
  tags: string[];
};

export type WorkflowStep = {
  titleLines: string[];
  description: string;
};

export type WhyChooseCard = {
  titleLines: string[];
  description: string;
};

export type ComparisonStatus = "yes" | "no" | "sometimes";

export type ComparisonColumnKey =
  | "hierys"
  | "inHouse"
  | "freelancers"
  | "agency"
  | "diy";

export type ComparisonColumn = {
  key: ComparisonColumnKey;
  labelLines: string[];
  accent?: boolean;
};

export type ComparisonRow = {
  label: string;
  values: Record<ComparisonColumnKey, ComparisonStatus>;
};

export type ComparisonLegendItem = {
  status: ComparisonStatus;
  label: string;
};

export type ComparisonSectionData = {
  titleLines: string[];
  description: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  legend: ComparisonLegendItem[];
};

export type WorkProject = {
  titleLines: string[];
  alt: string;
  image: string;
  position: string;
  services: string[];
};

export type WorkIntroSectionData = {
  stickerLabel: string;
  primaryLines: string[];
  secondaryLines: string[];
  projects: WorkProject[];
};

export type Review = {
  name: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
  quote: string;
  caseStudyTitleLines: string[];
  caseStudyAlt: string;
  caseStudyImage: string;
  href: string;
};

export type ReviewsSectionData = {
  stickerLabel: string;
  headingLines: string[];
  reviews: Review[];
};

export type NeedPrompt = {
  subject: string;
  outcome: string;
};

export type NeedPromptSectionData = {
  prompts: NeedPrompt[];
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSectionData = {
  stickerLabel: string;
  headingLines: string[];
  contactLines: string[];
  contactEmail: string;
  items: FaqItem[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterSectionData = {
  serviceColumns: string[][];
  linkColumns: FooterColumn[];
  contactTitle: string;
  contactBlocks: FooterLink[][];
  watermarkLabel: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    key: "service",
    label: "Services",
    hoverLabel: "Services ->",
    megaColumns: [
      {
        groups: [
          {
            title: "Payments",
            items: [
              {
                title: "Codapay",
                description: "Unlock global payment coverage",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "blue",
              },
              {
                title: "Coda Links",
                description: "Your Comprehensive Link-Out Solution",
                href: SERVICE_PAGE_PATH,
                icon: "link",
                tone: "blue",
              },
            ],
          },
          {
            title: "Services",
            items: [
              {
                title: "Marketing",
                description: "Boost visibility, conversion and retention",
                href: SERVICE_PAGE_PATH,
                icon: "globe",
                tone: "ink",
              },
              {
                title: "Market Expansion",
                description: "Grow your global footprint",
                href: SERVICE_PAGE_PATH,
                icon: "handCoins",
                tone: "ink",
              },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "Commerce & Rewards",
            items: [
              {
                title: "Coda Webstore",
                description: "Your webstore, your way",
                href: SERVICE_PAGE_PATH,
                icon: "layoutGrid",
                tone: "green",
              },
              {
                title: "Coda Distribution",
                description: "Harness our partner network",
                href: SERVICE_PAGE_PATH,
                icon: "network",
                tone: "pink",
              },
              {
                title: "Giftcloud",
                description: "Drive loyalty through digital rewards",
                href: SERVICE_PAGE_PATH,
                icon: "gift",
                tone: "ink",
                external: true,
              },
              {
                title: "Recharge App",
                description: "The App for instant top-ups worldwide",
                href: SERVICE_PAGE_PATH,
                icon: "phone",
                tone: "ink",
                external: true,
              },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "Stores",
            items: [
              {
                title: "Codashop",
                description: "Our global store for digital content",
                href: SERVICE_PAGE_PATH,
                icon: "shield",
                tone: "purple",
              },
              {
                title: "Recharge.com",
                description: "Our global store for all prepaid top-ups",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "purple",
                external: true,
              },
              {
                title: "Startselect.com",
                description: "Our European digital gift and gaming cards store",
                href: SERVICE_PAGE_PATH,
                icon: "shoppingBag",
                tone: "purple",
                external: true,
              },
              {
                title: "Guthaben.de",
                description: "Our dedicated Germany & Austria store",
                href: SERVICE_PAGE_PATH,
                icon: "coins",
                tone: "purple",
                external: true,
              },
            ],
          },
        ],
      },
      {
        groups: [
          {
            items: [
              {
                title: "Beltegoed.nl",
                description: "Our dedicated Netherlands store",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "purple",
                external: true,
              },
              {
                title: "Recharge.fr",
                description: "Our dedicated France store",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "purple",
                external: true,
              },
              {
                title: "Mobiletopup.co.uk",
                description: "Our dedicated UK store",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "purple",
                external: true,
              },
              {
                title: "Herladen.com",
                description: "Our dedicated Benelux store",
                href: SERVICE_PAGE_PATH,
                icon: "wallet",
                tone: "purple",
                external: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "work",
    label: "See Our Work",
    hoverLabel: "See Our Work ->",
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
    hoverLabel: "How it Works ->",
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
    hoverLabel: "Why Choose Hierys ->",
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
    hoverLabel: "Common Questions ->",
    textColumns: [
      {
        groups: [
          {
            title: "GROW OUT-OF-APP COMMERCE",
            items: [
              { title: "Maximize Your Revenue", href: "#faq" },
              { title: "Maximize Your Reach", href: "#faq" },
            ],
          },
          {
            title: "OFFER MORE WAYS TO PAY",
            items: [
              { title: "Accept Payments Everywhere", href: "#faq" },
              { title: "Minimize Risk & Fraud", href: "#faq" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "EXPAND EFFORTLESSLY",
            items: [
              { title: "Operational Load Lifted", href: "#faq" },
              { title: "Tax, risks & compliance handled", href: "#faq" },
            ],
          },
          {
            title: "GROW WITH CONTROL",
            items: [
              { title: "Stay In Control", href: "#faq" },
              { title: "Stay True to Your Brand", href: "#faq" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "INDUSTRIES",
            items: [
              { title: "Mobile & Online Gaming Payments", href: "#faq" },
            ],
          },
        ],
      },
    ],
    promoCard: {
      eyebrow: "CODA PORTAL",
      title: "Get started with Coda today",
      href: "#faq",
    },
  },
];

const imagePool: Record<string, string> = {
  analytics:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  desk: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
  office:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  monitor:
    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
  studio:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  portrait:
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
};

export const HERO_SCENES: HeroScene[] = [
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

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    name: "Airbnb",
    logo: "https://cdn.simpleicons.org/airbnb/FF5A5F",
  },
  {
    name: "Discord",
    logo: "https://cdn.simpleicons.org/discord/5865F2",
  },
  {
    name: "PayPal",
    logo: "https://cdn.simpleicons.org/paypal/003087",
  },
  {
    name: "Walmart",
    logo: "https://cdn.simpleicons.org/walmart/0071CE",
  },
  {
    name: "Coinbase",
    logo: "https://cdn.simpleicons.org/coinbase/0052FF",
  },
  {
    name: "Meta",
    logo: "https://cdn.simpleicons.org/meta/0866FF",
  },
  {
    name: "American Express",
    logo: "https://cdn.simpleicons.org/americanexpress/2E77BC",
  },
  {
    name: "Google",
    logo: "https://cdn.simpleicons.org/google/4285F4",
  },
  {
    name: "YouTube",
    logo: "https://cdn.simpleicons.org/youtube/FF0000",
  },
  {
    name: "Uber",
    logo: "https://cdn.simpleicons.org/uber/000000",
  },
  {
    name: "Starbucks",
    logo: "https://cdn.simpleicons.org/starbucks/006241",
  },
  {
    name: "Amazon",
    logo: "https://cdn.simpleicons.org/amazon/FF9900",
  },
  {
    name: "WhatsApp",
    logo: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
  {
    name: "NielsenIQ",
    logo: "https://cdn.simpleicons.org/nielsen/00D56F",
  },
  {
    name: "HP",
    logo: "https://cdn.simpleicons.org/hp/0096D6",
  },
  {
    name: "Shopify",
    logo: "https://cdn.simpleicons.org/shopify/7AB55C",
  },
];

export const SERVICES_SHOWCASE: ServiceShowcaseItem[] = [
  {
    title: "Branding",
    images: [
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
        position: "58% center",
      },
      {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
        position: "center center",
      },
      {
        src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
        position: "54% center",
      },
    ],
    tags: [
      "Logo Design",
      "Brand Guidelines",
      "CI/CD",
      "UI/UX",
      "Story Development",
      "Rebranding",
      "Business Collaterals",
    ],
  },
  {
    title: "Ad Creatives",
    images: [
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
        position: "center center",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        position: "center 28%",
      },
      {
        src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
        position: "center 22%",
      },
    ],
    tags: [
      "Ad Design",
      "Native Ads",
      "Social Media Ads",
      "Display Ads",
      "OOH Ads",
    ],
  },
  {
    title: "Development",
    images: [
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
        position: "62% center",
      },
      {
        src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
        position: "center center",
      },
      {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
        position: "center center",
      },
    ],
    tags: [
      "Landing Pages",
      "Web Apps",
      "CMS Setup",
      "Performance",
      "Animations",
    ],
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    titleLines: ["WE START", "WITH A CALL"],
    description:
      "First, we get on a call to understand what you need, where you're at, and what success looks like.",
  },
  {
    titleLines: ["YOU SEND WHAT", "YOU'VE GOT"],
    description:
      "A full brief, rough notes, messy ideas, references, or just context. Whatever helps, we'll work with it.",
  },
  {
    titleLines: ["WE GET", "TO WORK"],
    description:
      "We shape it, build it, refine it, and keep momentum up without making you chase us.",
  },
  {
    titleLines: ["YOU REVIEW,", "WE IMPROVE"],
    description:
      "You share feedback, we tighten things up, and make sure everything lands where it should.",
  },
  {
    titleLines: ["DONE AND", "READY TO USE"],
    description:
      "Final files, final handoff, ready to launch, post, pitch, publish, or put to work the way you want it to work.",
  },
];

export const WHY_CHOOSE_CARDS: WhyChooseCard[] = [
  {
    titleLines: ["MORE RANGE,", "LESS HASSLE"],
    description:
      "Design, development, branding, writing, marketing... aaaall in one place.",
  },
  {
    titleLines: ["BUILT TO", "ADAPT"],
    description:
      "Calls, briefs, voice notes, messy ideas, we work with whatever works for you.",
  },
  {
    titleLines: ["FLEXIBLE", "BY DEFAULT"],
    description:
      "One request, ongoing support, big build, small fix, we adapt to what you need.",
  },
  {
    titleLines: ["EASY TO", "WORK WITH"],
    description:
      "Clear communication, less back-and-forth, and no unnecessary process.",
  },
  {
    titleLines: ["BUILT FOR REAL", "WORLD WORKFLOWS"],
    description:
      "Startups, companies and individuals all work differently, so we adapt to the way you already work.",
  },
  {
    titleLines: ["QUALITY", "THAT HOLDS UP"],
    description:
      "Work that not only looks good, but is ready to use and built with purpose.",
  },
];

export const COMPARISON_SECTION: ComparisonSectionData = {
  titleLines: [
    "ON TOP OF ALL THAT,",
    "WE MAKE IT WAAAAAAAY EASIER",
    "THAN IT USUALLY IS.",
  ],
  description:
    "The usual way gives you more of everything you don't want, and less of what you do. More hassle, more effort, more money, more time... yet somehow, less gets done.",
  columns: [
    {
      key: "hierys",
      labelLines: ["Hierys"],
      accent: true,
    },
    {
      key: "inHouse",
      labelLines: ["In-house", "team"],
    },
    {
      key: "freelancers",
      labelLines: ["Freelancers/", "Contractors"],
    },
    {
      key: "agency",
      labelLines: ["Traditional", "agency"],
    },
    {
      key: "diy",
      labelLines: ["Doing", "it yourself"],
    },
  ],
  rows: [
    {
      label: "Speed",
      values: {
        hierys: "yes",
        inHouse: "yes",
        freelancers: "sometimes",
        agency: "no",
        diy: "no",
      },
    },
    {
      label: "Flexibility",
      values: {
        hierys: "yes",
        inHouse: "sometimes",
        freelancers: "yes",
        agency: "no",
        diy: "sometimes",
      },
    },
    {
      label: "Range",
      values: {
        hierys: "yes",
        inHouse: "no",
        freelancers: "no",
        agency: "yes",
        diy: "no",
      },
    },
    {
      label: "Ease",
      values: {
        hierys: "yes",
        inHouse: "sometimes",
        freelancers: "no",
        agency: "no",
        diy: "no",
      },
    },
    {
      label: "Cost",
      values: {
        hierys: "yes",
        inHouse: "no",
        freelancers: "yes",
        agency: "no",
        diy: "yes",
      },
    },
    {
      label: "Consistency",
      values: {
        hierys: "yes",
        inHouse: "yes",
        freelancers: "no",
        agency: "yes",
        diy: "no",
      },
    },
  ],
  legend: [
    { status: "yes", label: "Yes" },
    { status: "no", label: "No" },
    { status: "sometimes", label: "Sometimes" },
  ],
};

export const WORK_INTRO_SECTION: WorkIntroSectionData = {
  stickerLabel: "OUR WORK",
  primaryLines: ["ENOUGH ABOUT", "WHAT WE DO & HOW WE DO"],
  secondaryLines: ["HERE'S SOME OF", "WHAT WE'VE DONE", "(SO FAR)"],
  projects: [
    {
      titleLines: ["VISUAL IDENTITY SYSTEM", "FOR M'S KITCHEN"],
      alt: "Branded orange tote bag for a cafe identity system",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Logo Design",
        "Brand Guidelines",
        "Print Design",
        "Packaging",
        "Illustration",
        "Ad Creatives",
        "Photography Content",
        "Content Writing",
      ],
    },
    {
      titleLines: ["WEBSITE AND SOCIAL", "MEDIA DESIGN FOR TRADEX"],
      alt: "Laptop showing a dark website design concept",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Website Design",
        "UI Design",
        "Ad Creatives",
        "Social Media",
        "Creative Direction",
        "Content Writing",
        "Performance Ads",
      ],
    },
    {
      titleLines: ["PACKAGING SYSTEM", "FOR LUMA GOODS"],
      alt: "Minimal product packaging and branding setup",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Packaging Design",
        "Brand Identity",
        "Print Production",
        "Mockups",
        "Photography Direction",
        "Launch Assets",
      ],
    },
    {
      titleLines: ["LANDING PAGE AND", "CAMPAIGN VISUALS FOR NOVA"],
      alt: "Desk workspace with screen for landing page design work",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Landing Page",
        "UI/UX",
        "Motion Design",
        "Ad Creatives",
        "Campaign Assets",
        "Copy Support",
      ],
    },
    {
      titleLines: ["BRAND SHOOT AND", "SOCIAL CONTENT FOR SOLA"],
      alt: "Lifestyle portrait setup for brand shoot content",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
      position: "center 18%",
      services: [
        "Art Direction",
        "Photography",
        "Social Content",
        "Editing",
        "Campaign Rollout",
        "PR Assets",
      ],
    },
    {
      titleLines: ["WEB EXPERIENCE AND", "PRODUCT STORY FOR AEREN"],
      alt: "Modern interface and product story design concept",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Website Design",
        "Product Story",
        "Content System",
        "Illustration",
        "Presentation Assets",
        "Performance Ads",
      ],
    },
    {
      titleLines: ["ECOMMERCE CAMPAIGN", "FOR PALMERA"],
      alt: "Lifestyle ecommerce campaign visuals for a fashion brand",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
      position: "center 24%",
      services: [
        "Ecommerce Design",
        "Campaign Visuals",
        "Email Assets",
        "Social Media",
        "Content Writing",
        "Performance Ads",
      ],
    },
    {
      titleLines: ["CONTENT SYSTEM AND", "LAUNCH ASSETS FOR VANTA"],
      alt: "Creative team planning launch assets around a laptop",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      position: "center center",
      services: [
        "Launch Assets",
        "Content System",
        "Presentation Design",
        "Ad Creatives",
        "Copy Support",
        "Creative Direction",
      ],
    },
  ],
};

export const REVIEWS_SECTION: ReviewsSectionData = {
  stickerLabel: "REVIEWS",
  headingLines: [
    "AND HERE'S WHAT",
    "PEOPLE WE'VE WORKED WITH",
    "SAY ABOUT OUR WORK:",
  ],
  reviews: [
    {
      name: "Hamza Akram Qawal",
      role: "Co-founder",
      company: "M's Kitchen",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      quote:
        "Working with Hierys has been a game-changer for M's Kitchen. Their expertise helped us refine our brand and implement a visual identity that truly reflects who we are. We've seen a noticeable impact in our marketing efforts, thanks to the cohesive strategy and creative direction they brought to the table.",
      caseStudyTitleLines: ["VISUAL IDENTITY SYSTEM", "FOR M'S KITCHEN"],
      caseStudyAlt: "Branded packaging and identity visuals for M's Kitchen",
      caseStudyImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      href: "#work-intro",
    },
    {
      name: "Rayan Khan",
      role: "Founder & Chairman",
      company: "Tradex",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
      quote:
        "Tradex's brand now speaks for itself. Their work streamlined our website, sharpened our campaign assets, and gave our team a cleaner system to build from. We finally had visuals and messaging that felt premium, consistent, and ready to scale.",
      caseStudyTitleLines: ["WEBSITE AND SOCIAL", "MEDIA DESIGN FOR TRADEX"],
      caseStudyAlt: "Laptop with financial dashboard website design for Tradex",
      caseStudyImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      href: "#work-intro",
    },
    {
      name: "Areeba Siddiqui",
      role: "Brand Lead",
      company: "Nova",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
      quote:
        "The biggest win for us was clarity. Hierys turned a messy set of campaign ideas into a landing page and rollout system that looked polished and actually converted. The process was smooth, fast, and surprisingly easy to stay aligned on.",
      caseStudyTitleLines: ["LANDING PAGE AND", "CAMPAIGN VISUALS FOR NOVA"],
      caseStudyAlt: "Creative landing page and campaign production workspace",
      caseStudyImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      href: "#work-intro",
    },
    {
      name: "Omar Farooq",
      role: "Product Marketing Lead",
      company: "Aeren",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=240&q=80",
      quote:
        "What stood out most was how intentional everything felt. From the product story to the web experience, the team built assets that looked sharp, felt considered, and gave us something we could actually launch with confidence.",
      caseStudyTitleLines: ["WEB EXPERIENCE AND", "PRODUCT STORY FOR AEREN"],
      caseStudyAlt: "Analytics dashboard and web experience concept for Aeren",
      caseStudyImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      href: "#work-intro",
    },
  ],
};

export const NEED_PROMPT_SECTION: NeedPromptSectionData = {
  prompts: [
    {
      subject: "A PITCH DECK",
      outcome: "ACTUALLY LANDS",
    },
    {
      subject: "AD CREATIVES",
      outcome: "ACTUALLY GET CLICKS",
    },
    {
      subject: "A BRAND",
      outcome: "PEOPLE WILL REMEMBER",
    },
    {
      subject: "A STRATEGY",
      outcome: "YOU CAN ACTUALLY USE",
    },
    {
      subject: "DESIGNS",
      outcome: "AS GOOD AS YOUR PRODUCT",
    },
  ],
  subtitle:
    "Tell us what you need, pick what fits, and we'll take it from there.",
  ctaLabel: "Start Here",
  ctaHref: "#services",
};

export const FAQ_SECTION: FaqSectionData = {
  stickerLabel: "FAQs",
  headingLines: ["SOME QUESTIONS", "WE COMMONLY GET"],
  contactLines: ["GOT MORE QUESTIONS?", "FEEL FREE TO REACH OUT"],
  contactEmail: "INQUIRE@HIERYS.COM",
  items: [
    {
      question: "WHAT KIND OF WORK CAN I BRING TO HIERYS?",
      answer:
        "Pretty much anything across design, branding, websites, content, presentations, creative support, and strategy. Big project, small fix, ongoing help, or something hard to explain, if it needs doing, send it over.",
    },
    {
      question: "WHO IS HIREYS FOR?",
      answer:
        "Startups, businesses, teams, founders, creators, contractors, and anyone who needs strong creative and strategic support without building a full in-house setup.",
    },
    {
      question: "DO YOU ONLY WORK ON BIG PROJECTS?",
      answer:
        "No. We handle both bigger builds and smaller one-off needs, whether that's a full website, a pitch deck, a quick campaign asset, or an urgent fix.",
    },
    {
      question:
        "CAN I COME TO YOU WITH SOMETHING THAT’S NOT LISTED ON THE SITE?",
      answer:
        "Yes. If it's adjacent to design, content, websites, branding, strategy, or marketing support, there's a strong chance we can help or shape the right solution with you.",
    },
    {
      question: "HOW DO WE GET STARTED?",
      answer:
        "Start with the project flow or send us a brief. Once we understand what you need, we align on scope, timing, and the best next step.",
    },
    {
      question: "DO YOU OFFER ONGOING SUPPORT OR JUST ONE-OFF WORK?",
      answer:
        "Both. Some clients come in for a specific project, others need ongoing creative support over weeks or months.",
    },
    {
      question: "HOW FAST CAN YOU USUALLY DELIVER?",
      answer:
        "It depends on the scope, but we move fast. Smaller items can often be turned around quickly, and larger projects get a clear phased timeline upfront.",
    },
    {
      question: "DO YOU OFFER REVISIONS?",
      answer:
        "Yes. Revisions are part of the process, and we use them to refine the work until it lands where it should.",
    },
    {
      question: "CAN YOU WORK WITH OUR EXISTING TEAM OR TOOLS?",
      answer:
        "Yes. We can plug into your current workflow, tools, and team setup instead of forcing you into a new system.",
    },
    {
      question: "HOW MUCH DOES IT COST?",
      answer:
        "Pricing depends on the scope, speed, and type of support needed. Once we know what you're trying to get done, we can recommend the best fit.",
    },
    {
      question: "DO I NEED A FULL BRIEF BEFORE REACHING OUT?",
      answer:
        "No. A polished brief helps, but rough notes, a voice note, a messy doc, or even a half-formed idea is enough to start.",
    },
    {
      question: "WHAT IF I’M NOT SURE WHAT I NEED YET?",
      answer:
        "That's fine. We can help you clarify the ask, shape the scope, and figure out what actually needs to be done.",
    },
  ],
};

export const FOOTER_SECTION: FooterSectionData = {
  serviceColumns: [
    ["Ad Creatives", "Social Media Design", "Brand Guidelines", "Pitch Decks"],
    ["Brand Identity", "Presentation Design", "Logo Design", "Website Design"],
    ["Website Development", "Copywriting", "Content Writing", "SEO & AEO"],
    ["Packaging Design", "Marketing", "Creative Strategy", "Custom Requests"],
  ],
  linkColumns: [
    {
      title: "Built For",
      links: [
        { label: "Startups", href: "#contact" },
        { label: "Companies", href: "#contact" },
        { label: "Contractors", href: "#contact" },
        { label: "Founders", href: "#contact" },
        { label: "Personal Brands", href: "#contact" },
        { label: "Individuals", href: "#contact" },
      ],
    },
    {
      title: "Get Started",
      links: [
        { label: "Start a Project", href: "#contact" },
        { label: "Book a Call", href: "#contact" },
        { label: "Get a Quote", href: "#contact" },
        { label: "Custom Request", href: "#contact" },
      ],
    },
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#top" },
        { label: "Services", href: "#services" },
        { label: "How We Work", href: "#process" },
        { label: "Work", href: "#work-intro" },
        { label: "About", href: "#why" },
        { label: "Contact", href: "#contact" },
        { label: "Pricing", href: "#comparison" },
      ],
    },
    {
      title: "Learn More",
      links: [
        { label: "Case Studies", href: "#work-intro" },
        { label: "FAQs", href: "#faq" },
        { label: "Blog", href: "#comparison" },
        { label: "Process", href: "#workflow" },
        { label: "Pricing", href: "#comparison" },
        { label: "Guide", href: "#process" },
      ],
    },
  ],
  contactTitle: "Contact Us",
  contactBlocks: [
    [
      { label: "+43 (0)512 345583", href: "tel:+430512345583" },
      { label: "hello@hierys.com", href: "mailto:hello@hierys.com" },
    ],
    [
      { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
      { label: "Instagram", href: "https://www.instagram.com", external: true },
    ],
    [
      { label: "Behance", href: "https://www.behance.net", external: true },
      { label: "Youtube", href: "https://www.youtube.com", external: true },
    ],
    [
      {
        label: "Reichenauer Straße 95a",
        href: "https://maps.google.com/?q=Reichenauer+Stra%C3%9Fe+95a+Innsbruck+Austria",
        external: true,
      },
      {
        label: "Innsbruck, Austria",
        href: "https://maps.google.com/?q=Innsbruck+Austria",
        external: true,
      },
    ],
  ],
  watermarkLabel: "Hierys",
};
