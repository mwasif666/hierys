export type ProjectSlideVariant = "editorial" | "overlay" | "minimal";

export type ProjectSlide = {
  id: string;
  variant: ProjectSlideVariant;
  image: string;
  imagePosition?: string;
  label: string;
  labelInitial?: string;
  labelAccent?: string;
  headingLines: string[];
  ctaLabel: string;
  ctaHref?: string;
};

export const PROJECT_SLIDES: ProjectSlide[] = [
  {
    id: "pixelflakes",
    variant: "editorial",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center 55%",
    label: "Awwwards",
    labelInitial: "w.",
    labelAccent: "#2ee6cc",
    headingLines: [
      "Get a behind the",
      "scenes look at our",
      "work for Pixelflakes",
    ],
    ctaLabel: "Visit Case Study",
  },
  {
    id: "aeren-atelier",
    variant: "overlay",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center 40%",
    label: "Feature",
    headingLines: [
      "Studio spotlight:",
      "The story behind",
      "our most shipped",
      "brand systems",
    ],
    ctaLabel: "Read the feature",
  },
  {
    id: "sola-editorial",
    variant: "minimal",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center 22%",
    label: "Brand Shoot",
    headingLines: [
      "Art direction and",
      "social campaign",
      "for Sola the Label",
    ],
    ctaLabel: "View the case study",
  },
  {
    id: "tradex-web",
    variant: "editorial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center 60%",
    label: "Behance",
    labelInitial: "Bē",
    labelAccent: "#1e67ff",
    headingLines: [
      "Digital identity and",
      "product storytelling",
      "for Tradex",
    ],
    ctaLabel: "Visit Behance",
  },
  {
    id: "luma-goods",
    variant: "overlay",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center center",
    label: "Packaging System",
    headingLines: [
      "Packaging and",
      "launch assets for",
      "Luma Goods",
    ],
    ctaLabel: "See the rollout",
  },
  {
    id: "nova-campaign",
    variant: "minimal",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2400&q=85",
    imagePosition: "center 45%",
    label: "Campaign",
    headingLines: [
      "Landing page and",
      "campaign visuals",
      "for Nova",
    ],
    ctaLabel: "View case study",
  },
];

export const SLIDE_DURATION_MS = 6500;
