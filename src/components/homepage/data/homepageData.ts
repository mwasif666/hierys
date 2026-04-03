export type NavCard = {
  title: string;
  href: string;
};

export type NavItem = {
  key: string;
  label: string;
  hoverLabel: string;
  cards: NavCard[];
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

export const NAV_ITEMS: NavItem[] = [
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
