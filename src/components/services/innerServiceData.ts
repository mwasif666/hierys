export type SlideCard = {
  src: string;
  alt: string;
};

export type InnerServiceData = {
  title: string;
  headline: string;
  paragraph: string;
  supportingTitle: string;
  supportingParagraph: string;
  deliverables: string[];
  slides: SlideCard[];
};

const u = (id: string, h = 400) =>
  `https://images.unsplash.com/${id}?w=400&h=${h}&fit=crop&auto=format&q=80`;

const img = {
  paint: { src: u("photo-1558655146-9f40138edfeb", 460), alt: "Creative design" },
  sphere: { src: u("photo-1618005182384-a83a8bd57fbe", 380), alt: "Abstract sphere" },
  greenGrad: { src: u("photo-1557683316-973673baf926", 400), alt: "Gradient design" },
  colorGrad: { src: u("photo-1579546929518-9e396f3cc809", 440), alt: "Color gradient" },
  purpleArt: { src: u("photo-1557672172-298e090bd0f1", 360), alt: "Purple abstract" },
  neon: { src: u("photo-1550859492-d5da9d8e45f3", 460), alt: "Neon cityscape" },
  workspace: { src: u("photo-1541462608143-67571c6738dd", 380), alt: "Design workspace" },
  swatches: { src: u("photo-1558618666-fcd25c85f82e", 400), alt: "Color swatches" },
  artSupply: { src: u("photo-1513364776144-60967b0f800f", 420), alt: "Art supplies" },
  painting: { src: u("photo-1460661419201-fd4cecdf8a8b", 380), alt: "Abstract painting" },
  wave: { src: u("photo-1493612276216-ee3925520721", 440), alt: "Abstract wave" },
  product: { src: u("photo-1586717791821-3f44a563fa4c", 400), alt: "Product photography" },
  dashboard: { src: u("photo-1460925895917-afdab827c52f", 380), alt: "Analytics dashboard" },
  laptop: { src: u("photo-1551434678-e076c223a692", 420), alt: "Laptop workspace" },
  meeting: { src: u("photo-1542744173-8e7e53415bb0", 360), alt: "Team meeting" },
  conference: { src: u("photo-1517245386807-bb43f82c33c4", 400), alt: "Conference room" },
  collab: { src: u("photo-1556761175-5973dc0f32e7", 380), alt: "Collaboration" },
  brainstorm: { src: u("photo-1552664730-d307ca884978", 440), alt: "Brainstorming" },
  workshop: { src: u("photo-1522202176988-66273c2fd55f", 380), alt: "Workshop" },
  whiteboard: { src: u("photo-1553877522-43269d4ea984", 400), alt: "Strategy board" },
  code: { src: u("photo-1504384308090-c894fdcc538d", 420), alt: "Code on screen" },
  techOffice: { src: u("photo-1519389950473-47ba0277781c", 380), alt: "Tech workspace" },
  monitors: { src: u("photo-1531297484001-80022131f5a1", 400), alt: "Multiple screens" },
  typing: { src: u("photo-1498050108023-c5249f4df085", 360), alt: "Typing code" },
  darkCode: { src: u("photo-1555066931-4365d14bab8c", 440), alt: "Dark code editor" },
  camera: { src: u("photo-1536240478700-b869070f9279", 400), alt: "Camera setup" },
  filming: { src: u("photo-1574717024653-61fd2cf4d44d", 380), alt: "Video production" },
  cinema: { src: u("photo-1492691527719-9d1e07e534b4", 460), alt: "Cinema experience" },
  filmStrip: { src: u("photo-1485846234645-a62644f84728", 360), alt: "Film strip" },
  phoneSocial: { src: u("photo-1611162617213-7d7a39e9b1d7", 400), alt: "Social media" },
  socialApps: { src: u("photo-1611162616305-c69b3fa7fbe0", 380), alt: "Social apps" },
  sharing: { src: u("photo-1432888498266-38ffec3eaf0a", 420), alt: "Content sharing" },
  mockup: { src: u("photo-1611532736597-de2d4265fba3", 360), alt: "Phone mockup" },
  ai: { src: u("photo-1677442136019-21780ecad995", 400), alt: "Artificial intelligence" },
  robot: { src: u("photo-1620712943543-bcc4688e7485", 420), alt: "AI technology" },
  network: { src: u("photo-1555255707-c07966088b7b", 380), alt: "Data network" },
  robotHand: { src: u("photo-1485827404703-89b55fcc595e", 360), alt: "Robot technology" },
  packaging: { src: u("photo-1605000797499-95a51c5269ae", 400), alt: "Packaging" },
  inbox: { src: u("photo-1596526131083-e8c633c948d2", 380), alt: "Email inbox" },
  desk: { src: u("photo-1501366062246-723b4d3e4eb6", 400), alt: "Minimal desk" },
  palette: { src: u("photo-1572044162444-ad60f128bdea", 380), alt: "Color palette" },
  blueArt: { src: u("photo-1561070791-2526d30994b5", 360), alt: "Blue abstract" },
  colorArt: { src: u("photo-1547891654-e66ed7ebb968", 440), alt: "Colorful artwork" },
};

export const SERVICE_DATA: Record<string, InnerServiceData> = {
  "ad-creative": {
    title: "Ad creative",
    headline: "Ad creative built to stop the scroll and convert.",
    paragraph:
      "Channel-native ad visuals for paid social, search, and display campaigns. Designed to perform at every stage of the funnel.",
    supportingTitle: "High-performing ads at scale",
    supportingParagraph:
      "We design ad creative that balances brand consistency with platform best practices — from static banners to animated HTML5, carousels, and video ads.",
    deliverables: [
      "Static display ads",
      "Social ad creatives",
      "HTML5 animated banners",
      "Carousel & story formats",
      "A/B test variants",
      "Retargeting visuals",
    ],
    slides: [
      img.paint, img.colorGrad, img.dashboard,
      img.sphere, img.laptop, img.neon,
      img.swatches, img.meeting, img.wave,
      img.product, img.greenGrad, img.blueArt,
    ],
  },

  "social-media-creative": {
    title: "Social media creative",
    headline: "Social creative that keeps your brand sharp daily.",
    paragraph:
      "High-quality creative systems for always-on posting and campaign moments across every platform.",
    supportingTitle: "Consistent, on-brand social presence",
    supportingParagraph:
      "From daily posts to campaign launches, we create scroll-stopping social assets that maintain brand consistency while adapting to each platform's native format.",
    deliverables: [
      "Instagram feed & stories",
      "LinkedIn visual posts",
      "X / Twitter graphics",
      "TikTok templates",
      "Platform-native formatting",
      "Content calendar templates",
    ],
    slides: [
      img.phoneSocial, img.socialApps, img.sharing,
      img.mockup, img.paint, img.colorGrad,
      img.neon, img.product, img.sphere,
      img.swatches, img.wave, img.greenGrad,
    ],
  },

  "presentation-design": {
    title: "Presentation design",
    headline: "Presentation design that helps your story land.",
    paragraph:
      "Polished investor, sales, and executive decks with strong visual hierarchy and clear narrative flow.",
    supportingTitle: "Decks that close deals",
    supportingParagraph:
      "We design presentations that combine compelling storytelling with clean visual systems — from pitch decks to company all-hands and keynote presentations.",
    deliverables: [
      "Investor pitch decks",
      "Sales enablement decks",
      "Keynote presentations",
      "Company all-hands templates",
      "Executive briefings",
      "Interactive slide systems",
    ],
    slides: [
      img.conference, img.meeting, img.laptop,
      img.whiteboard, img.brainstorm, img.collab,
      img.sphere, img.greenGrad, img.swatches,
      img.dashboard, img.wave, img.workspace,
    ],
  },

  "illustration-design": {
    title: "Illustration design",
    headline: "Custom illustration that gives your brand a visual edge.",
    paragraph:
      "Distinctive illustration systems for digital products, marketing, and brand storytelling — crafted to your unique style.",
    supportingTitle: "Illustration with purpose",
    supportingParagraph:
      "We create custom illustration libraries that bring abstract concepts to life, add personality to products, and give your brand a visual language competitors can't replicate.",
    deliverables: [
      "Brand illustration systems",
      "Icon & spot illustrations",
      "Editorial illustrations",
      "Product feature visuals",
      "Animated illustrations",
      "Character design",
    ],
    slides: [
      img.paint, img.painting, img.artSupply,
      img.colorArt, img.wave, img.swatches,
      img.palette, img.sphere, img.colorGrad,
      img.neon, img.blueArt, img.product,
    ],
  },

  "branding-services": {
    title: "Branding services",
    headline: "Branding that positions your company for what's next.",
    paragraph:
      "Strategic brand identity design that aligns your visual language with business ambition — from startups to enterprise refreshes.",
    supportingTitle: "Identity built to scale",
    supportingParagraph:
      "We build brand systems that work across every touchpoint — logo, typography, color, photography direction, and guidelines that keep execution consistent at scale.",
    deliverables: [
      "Logo & wordmark design",
      "Brand identity systems",
      "Visual language & guidelines",
      "Typography & color systems",
      "Brand collateral templates",
      "Brand refresh & evolution",
    ],
    slides: [
      img.paint, img.swatches, img.palette,
      img.product, img.workspace, img.desk,
      img.wave, img.sphere, img.greenGrad,
      img.neon, img.blueArt, img.colorArt,
    ],
  },

  "ebooks-and-report-design": {
    title: "eBooks & report design",
    headline: "eBooks and reports designed to engage, not collect dust.",
    paragraph:
      "Long-form content design that combines clear information hierarchy with premium visual treatment.",
    supportingTitle: "Content that earns attention",
    supportingParagraph:
      "We design lead magnets, annual reports, whitepapers, and long-form content assets that hold reader attention and reinforce brand authority.",
    deliverables: [
      "eBook design & layout",
      "Annual report design",
      "Whitepaper design",
      "Case study templates",
      "Data visualization",
      "Interactive PDF design",
    ],
    slides: [
      img.laptop, img.dashboard, img.desk,
      img.swatches, img.sphere, img.greenGrad,
      img.conference, img.wave, img.product,
      img.workspace, img.meeting, img.brainstorm,
    ],
  },

  "concept-creation": {
    title: "Concept creation",
    headline: "Big creative concepts built for maximum brand impact.",
    paragraph:
      "Campaign-level creative thinking that bridges strategy and execution — from initial idea to visual direction.",
    supportingTitle: "Ideas that move the needle",
    supportingParagraph:
      "We develop creative concepts and visual directions that unify campaigns across channels, giving your team a clear execution framework grounded in strategic intent.",
    deliverables: [
      "Campaign concept development",
      "Visual direction & moodboards",
      "Creative territory exploration",
      "Cross-channel concept systems",
      "Storyboarding & scripting",
      "Concept presentation decks",
    ],
    slides: [
      img.paint, img.wave, img.sphere,
      img.brainstorm, img.whiteboard, img.swatches,
      img.colorGrad, img.neon, img.colorArt,
      img.painting, img.palette, img.workspace,
    ],
  },

  "print-design": {
    title: "Print design",
    headline: "Print design that makes a lasting physical impression.",
    paragraph:
      "Tangible brand materials designed for maximum impact — from brochures and catalogs to signage and event collateral.",
    supportingTitle: "Physical touchpoints, premium craft",
    supportingParagraph:
      "We design print materials that carry the same level of craft as your digital presence — with attention to paper selection, finishing, and production-ready specifications.",
    deliverables: [
      "Brochure & catalog design",
      "Business cards & stationery",
      "Posters & signage",
      "Event collateral",
      "Direct mail design",
      "Production file preparation",
    ],
    slides: [
      img.product, img.desk, img.palette,
      img.swatches, img.workspace, img.paint,
      img.sphere, img.greenGrad, img.wave,
      img.blueArt, img.painting, img.meeting,
    ],
  },

  "packaging-and-merchandise-design": {
    title: "Packaging & merchandise design",
    headline:
      "Packaging and merch that turns products into brand experiences.",
    paragraph:
      "Physical product design that bridges brand identity and shelf appeal — from packaging systems to branded merchandise.",
    supportingTitle: "Products people want to keep",
    supportingParagraph:
      "We design packaging and branded merchandise that extends your visual identity into the physical world — creating unboxing moments and brand touchpoints that build loyalty.",
    deliverables: [
      "Product packaging design",
      "Label & wrap design",
      "Branded merchandise",
      "Unboxing experience design",
      "Retail display design",
      "Production-ready packaging files",
    ],
    slides: [
      img.product, img.packaging, img.palette,
      img.swatches, img.paint, img.desk,
      img.workspace, img.wave, img.sphere,
      img.neon, img.colorGrad, img.colorArt,
    ],
  },

  "video-production": {
    title: "Video production",
    headline: "Video production that scales without sacrificing quality.",
    paragraph:
      "End-to-end video creation for brand content, ads, social, and product — delivered fast and at the level you need.",
    supportingTitle: "Video at the speed of your business",
    supportingParagraph:
      "We handle everything from concept and scripting through post-production — creating video content that works across channels and keeps pace with your marketing calendar.",
    deliverables: [
      "Brand & corporate video",
      "Social video content",
      "Product demo videos",
      "Testimonial & interview editing",
      "Video ad production",
      "Motion titles & lower thirds",
    ],
    slides: [
      img.camera, img.filming, img.cinema,
      img.filmStrip, img.neon, img.colorGrad,
      img.sphere, img.wave, img.paint,
      img.product, img.dashboard, img.swatches,
    ],
  },

  "motion-design": {
    title: "Motion design",
    headline: "Motion design that brings your brand to life.",
    paragraph:
      "Animated content for websites, ads, presentations, and social — designed to capture attention and communicate clearly.",
    supportingTitle: "Movement with meaning",
    supportingParagraph:
      "We create motion graphics and animated content that enhances your message — from UI micro-interactions to full campaign animations and explainer videos.",
    deliverables: [
      "Animated explainer videos",
      "UI micro-interactions",
      "Social media animations",
      "Logo & brand animations",
      "Presentation animations",
      "Animated infographics",
    ],
    slides: [
      img.cinema, img.camera, img.colorGrad,
      img.neon, img.sphere, img.wave,
      img.paint, img.filming, img.swatches,
      img.colorArt, img.filmStrip, img.greenGrad,
    ],
  },

  "email-creation": {
    title: "Email creation",
    headline: "Email design that drives opens, clicks, and revenue.",
    paragraph:
      "Click-worthy email templates and campaigns built for engagement — responsive, on-brand, and conversion-optimized.",
    supportingTitle: "Emails that actually perform",
    supportingParagraph:
      "We design and build email campaigns that look great in every inbox — from drip sequences and newsletters to product launches and promotional blasts.",
    deliverables: [
      "Email template design",
      "Newsletter design & build",
      "Drip sequence campaigns",
      "Product launch emails",
      "Responsive HTML email build",
      "Email design systems",
    ],
    slides: [
      img.inbox, img.mockup, img.laptop,
      img.dashboard, img.greenGrad, img.swatches,
      img.phoneSocial, img.collab, img.wave,
      img.sphere, img.desk, img.product,
    ],
  },

  "web-design": {
    title: "Web design",
    headline: "Web design that converts visitors into customers.",
    paragraph:
      "Stunning websites and landing pages built for engagement, performance, and conversion — designed to scale with your business.",
    supportingTitle: "Websites built to perform",
    supportingParagraph:
      "We design and build web experiences that balance visual impact with usability — creating landing pages, marketing sites, and web apps that drive measurable results.",
    deliverables: [
      "Marketing website design",
      "Landing page design",
      "Responsive web development",
      "Web app interface design",
      "Design-to-code handoff",
      "Performance optimization",
    ],
    slides: [
      img.code, img.monitors, img.typing,
      img.darkCode, img.techOffice, img.laptop,
      img.sphere, img.greenGrad, img.swatches,
      img.dashboard, img.wave, img.workspace,
    ],
  },

  "design-systems": {
    title: "Design Systems",
    headline: "Design systems that drive consistency at scale.",
    paragraph:
      "Robust, maintainable design systems that align design and engineering — reducing friction and accelerating output.",
    supportingTitle: "One system, infinite outputs",
    supportingParagraph:
      "We build comprehensive design systems with tokens, components, and documentation that keep your product and marketing visuals consistent as your team and product grow.",
    deliverables: [
      "Design token architecture",
      "Component libraries",
      "Pattern documentation",
      "Figma component systems",
      "Design-dev alignment tooling",
      "System governance guides",
    ],
    slides: [
      img.code, img.darkCode, img.monitors,
      img.techOffice, img.swatches, img.palette,
      img.workspace, img.sphere, img.greenGrad,
      img.laptop, img.desk, img.typing,
    ],
  },

  "product-design": {
    title: "Product Design",
    headline:
      "Product design that puts users first and business goals close behind.",
    paragraph:
      "Engaging and intuitive digital product experiences — from early-stage prototyping to production-ready interface design.",
    supportingTitle: "Experiences users come back to",
    supportingParagraph:
      "We design digital products that balance user needs with business objectives — creating interfaces that are intuitive, accessible, and built for real-world usage patterns.",
    deliverables: [
      "UX research & strategy",
      "Wireframing & prototyping",
      "UI design & specification",
      "User flow mapping",
      "Usability testing",
      "Design handoff & QA",
    ],
    slides: [
      img.code, img.typing, img.techOffice,
      img.laptop, img.monitors, img.collab,
      img.sphere, img.greenGrad, img.dashboard,
      img.whiteboard, img.meeting, img.workspace,
    ],
  },

  copywriting: {
    title: "Copywriting",
    headline: "Copy that sounds like your brand and drives action.",
    paragraph:
      "Persuasive, clear writing for web, ads, email, and product — aligned to your brand voice and built for conversion.",
    supportingTitle: "Words that work harder",
    supportingParagraph:
      "We write copy that clarifies your message, connects with your audience, and compels them to act — across every channel and touchpoint where your brand speaks.",
    deliverables: [
      "Website & landing page copy",
      "Ad copy & headlines",
      "Email campaign writing",
      "Brand voice guidelines",
      "Product & UX copy",
      "SEO-driven content",
    ],
    slides: [
      img.desk, img.laptop, img.conference,
      img.meeting, img.collab, img.brainstorm,
      img.sphere, img.greenGrad, img.swatches,
      img.wave, img.workshop, img.whiteboard,
    ],
  },

  "ai-powered-creative": {
    title: "AI-powered creative",
    headline:
      "AI-powered creative that combines human taste with machine speed.",
    paragraph:
      "Human brilliance amplified by AI — accelerating creative production without compromising craft or brand standards.",
    supportingTitle: "Smarter creative, faster delivery",
    supportingParagraph:
      "We integrate AI tools into creative workflows to accelerate ideation, production, and iteration — keeping human creative direction at the center of every output.",
    deliverables: [
      "AI-assisted design production",
      "Generative concept exploration",
      "AI image creation & editing",
      "Automated asset resizing",
      "AI-driven copy drafts",
      "Workflow automation design",
    ],
    slides: [
      img.ai, img.robot, img.network,
      img.paint, img.colorGrad, img.sphere,
      img.code, img.neon, img.robotHand,
      img.wave, img.darkCode, img.swatches,
    ],
  },

  "ai-consulting": {
    title: "AI consulting",
    headline: "AI consulting that transforms how your creative team works.",
    paragraph:
      "Hands-on guidance to integrate AI into your design and marketing workflows — tailored to your team, tools, and goals.",
    supportingTitle: "AI strategy for creative teams",
    supportingParagraph:
      "We help creative teams understand, evaluate, and adopt AI tools — building custom workflows, running training sessions, and establishing governance frameworks.",
    deliverables: [
      "AI tool evaluation & selection",
      "Custom workflow design",
      "Team training & workshops",
      "AI governance frameworks",
      "Pilot program design",
      "ROI measurement & reporting",
    ],
    slides: [
      img.ai, img.robot, img.network,
      img.robotHand, img.meeting, img.conference,
      img.whiteboard, img.laptop, img.brainstorm,
      img.collab, img.workshop, img.dashboard,
    ],
  },

  automation: {
    title: "Automation",
    headline:
      "Creative automation that moves fast without compromising craft.",
    paragraph:
      "Streamlined production workflows and automated asset generation — so your team spends time on strategy, not repetitive tasks.",
    supportingTitle: "Scale without the grind",
    supportingParagraph:
      "We build and implement automation systems that handle repetitive creative tasks — from dynamic template engines to multi-format asset generation pipelines.",
    deliverables: [
      "Template automation systems",
      "Dynamic asset generation",
      "Multi-format production",
      "Workflow orchestration",
      "API & integration setup",
      "Production pipeline design",
    ],
    slides: [
      img.ai, img.network, img.code,
      img.darkCode, img.techOffice, img.monitors,
      img.colorGrad, img.robot, img.sphere,
      img.laptop, img.robotHand, img.typing,
    ],
  },

  "data-services": {
    title: "Data services",
    headline: "Creative data services that make your AI smarter.",
    paragraph:
      "High-quality training data, annotation, and creative datasets — purpose-built for AI models that produce brand-aligned output.",
    supportingTitle: "Better data, better AI output",
    supportingParagraph:
      "We prepare, annotate, and structure creative datasets that improve AI model performance — ensuring your generative tools produce outputs aligned with brand standards.",
    deliverables: [
      "Training dataset creation",
      "Image annotation & labeling",
      "Brand style data curation",
      "Quality assurance & validation",
      "Dataset management systems",
      "Model evaluation support",
    ],
    slides: [
      img.ai, img.network, img.robot,
      img.robotHand, img.code, img.darkCode,
      img.monitors, img.dashboard, img.techOffice,
      img.sphere, img.typing, img.laptop,
    ],
  },

  "campaign-strategy": {
    title: "Campaign strategy",
    headline:
      "Campaign strategy that unifies message, creative, and market.",
    paragraph:
      "Strategic planning, messaging, and creative direction for multi-market campaigns — from concept through execution.",
    supportingTitle: "Strategy that drives creative results",
    supportingParagraph:
      "We develop campaign strategies that connect business objectives to creative execution — defining messaging frameworks, audience targeting, and creative direction across markets.",
    deliverables: [
      "Campaign strategy & planning",
      "Messaging frameworks",
      "Audience & market analysis",
      "Creative direction briefs",
      "Multi-channel rollout plans",
      "Performance measurement strategy",
    ],
    slides: [
      img.meeting, img.conference, img.whiteboard,
      img.brainstorm, img.collab, img.workshop,
      img.dashboard, img.laptop, img.paint,
      img.colorGrad, img.wave, img.product,
    ],
  },
};

export const DEFAULT_SERVICE_SLUG = "ad-creative";
