export type StartHereTheme = {
  background: string;
  text: string;
  mutedText: string;
  chipBg: string;
  chipText: string;
  chipSelectedBg: string;
  chipSelectedText: string;
  buttonBg: string;
  buttonText: string;
  buttonIconBg: string;
  buttonIconText: string;
  stickerBg: string;
  stickerText: string;
  inputBg?: string;
  inputText?: string;
  inputPlaceholder?: string;
  inputBorder?: string;
};

export type StartHereSelectionKey =
  | "services"
  | "clientType"
  | "projectGoal"
  | "timeline"
  | "deliverable";

export type StartHereChoiceStep = {
  kind: "choice";
  id: StartHereSelectionKey;
  stepLabel: string;
  titleLines: string[];
  description: string;
  selectionMode: "single" | "multi";
  options: string[];
  theme: StartHereTheme;
};

export type StartHereFormStep = {
  kind: "form";
  id: "contact";
  stepLabel: string;
  titleLines: string[];
  description: string;
  theme: StartHereTheme;
};

export type StartHereStep = StartHereChoiceStep | StartHereFormStep;

const yellowTheme: StartHereTheme = {
  background: "#ffee27",
  text: "#241705",
  mutedText: "rgba(36, 23, 5, 0.88)",
  chipBg: "rgba(255, 248, 193, 0.88)",
  chipText: "rgba(70, 61, 17, 0.78)",
  chipSelectedBg: "#fff8e4",
  chipSelectedText: "#20150a",
  buttonBg: "#241705",
  buttonText: "#ffee27",
  buttonIconBg: "#ffee27",
  buttonIconText: "#241705",
  stickerBg: "#e73f8f",
  stickerText: "#fff8e4",
};

const oliveTheme: StartHereTheme = {
  background: "#272905",
  text: "#f8efcf",
  mutedText: "rgba(248, 239, 207, 0.88)",
  chipBg: "rgba(240, 236, 216, 0.72)",
  chipText: "#28240f",
  chipSelectedBg: "#fff8e8",
  chipSelectedText: "#1f1907",
  buttonBg: "#ff6121",
  buttonText: "#fff7e5",
  buttonIconBg: "#342d0f",
  buttonIconText: "#fff7e5",
  stickerBg: "#e73f8f",
  stickerText: "#fff8e4",
};

const tealTheme: StartHereTheme = {
  background: "#0d4452",
  text: "#f5f4ec",
  mutedText: "rgba(245, 244, 236, 0.86)",
  chipBg: "rgba(225, 238, 242, 0.72)",
  chipText: "#11353f",
  chipSelectedBg: "#fffaf0",
  chipSelectedText: "#0f2e38",
  buttonBg: "#14d5d0",
  buttonText: "#08373e",
  buttonIconBg: "#08373e",
  buttonIconText: "#f5f4ec",
  stickerBg: "#ff7b1b",
  stickerText: "#fff7eb",
};

const orangeTheme: StartHereTheme = {
  background: "#f85a1b",
  text: "#fff3de",
  mutedText: "rgba(255, 243, 222, 0.9)",
  chipBg: "rgba(255, 214, 188, 0.78)",
  chipText: "#6a2d15",
  chipSelectedBg: "#fff9ed",
  chipSelectedText: "#22160c",
  buttonBg: "#2e2f0c",
  buttonText: "#fff4df",
  buttonIconBg: "#f85a1b",
  buttonIconText: "#fff7ef",
  stickerBg: "#2f3010",
  stickerText: "#fff7ef",
};

const plumTheme: StartHereTheme = {
  background: "#3b0f36",
  text: "#f7efd8",
  mutedText: "rgba(247, 239, 216, 0.88)",
  chipBg: "rgba(228, 215, 225, 0.74)",
  chipText: "#2d1a2d",
  chipSelectedBg: "#fff8ea",
  chipSelectedText: "#241222",
  buttonBg: "#c898fb",
  buttonText: "#2d1534",
  buttonIconBg: "#3b0f36",
  buttonIconText: "#fff8ea",
  stickerBg: "#ff6c1a",
  stickerText: "#fff8ea",
};

const pinkTheme: StartHereTheme = {
  background: "#f64296",
  text: "#fff5d8",
  mutedText: "rgba(255, 245, 216, 0.9)",
  chipBg: "rgba(255, 214, 228, 0.7)",
  chipText: "#612244",
  chipSelectedBg: "#fff9ea",
  chipSelectedText: "#27111b",
  buttonBg: "#4b1034",
  buttonText: "#ff74b3",
  buttonIconBg: "#f64296",
  buttonIconText: "#2d1220",
  stickerBg: "#25111c",
  stickerText: "#fff8ea",
};

const formTheme: StartHereTheme = {
  background: "#dfd8c9",
  text: "#1335d3",
  mutedText: "rgba(19, 53, 211, 0.52)",
  chipBg: "rgba(205, 202, 216, 0.72)",
  chipText: "#3a4373",
  chipSelectedBg: "#fffdf4",
  chipSelectedText: "#1b2152",
  buttonBg: "#1335d3",
  buttonText: "#fff8ea",
  buttonIconBg: "#a8b7ff",
  buttonIconText: "#1335d3",
  stickerBg: "#ff4d97",
  stickerText: "#fff8ea",
  inputBg: "#c9c6d0",
  inputText: "#1335d3",
  inputPlaceholder: "rgba(19, 53, 211, 0.48)",
  inputBorder: "rgba(19, 53, 211, 0.08)",
};

export const START_HERE_STEPS: StartHereStep[] = [
  {
    kind: "choice",
    id: "services",
    stepLabel: "01/06",
    titleLines: ["WHAT DO YOU", "NEED HELP WITH?"],
    description: "Select at least one or however many things you want done.",
    selectionMode: "multi",
    options: [
      "Branding",
      "Website",
      "Pitch Deck",
      "Presentation",
      "Ad Creatives",
      "Social Media Design",
      "Content Writing",
      "Copywriting",
      "Strategy",
      "Packaging",
      "Video Editing",
      "Logo Design",
      "Marketing",
      "Development",
      "Photography",
      "Email Newsletter",
      "Something Else",
    ],
    theme: yellowTheme,
  },
  {
    kind: "choice",
    id: "clientType",
    stepLabel: "02/06",
    titleLines: ["WHAT DESCIBES", "YOU BEST?"],
    description:
      "Select only one. If you handle multiple roles, select the closest matching one to the services you need.",
    selectionMode: "single",
    options: [
      "Startup",
      "Small Business",
      "Company",
      "Enterprise",
      "Charity / NGO",
      "Institute",
      "Agency / Studio",
      "Contractor",
      "Creator / Individual",
    ],
    theme: oliveTheme,
  },
  {
    kind: "choice",
    id: "projectGoal",
    stepLabel: "03/06",
    titleLines: ["WHAT ARE YOU", "TRYING TO GET DONE?"],
    description:
      "Select at least one or more. If what you want isn't listed here, worry not because chances are we can still do it. Select the closest matching ones to your needs.",
    selectionMode: "multi",
    options: [
      "Launch something new",
      "Improve what already exists",
      "Get ongoing support",
      "Fix something urgent",
      "Test new ideas",
      "Prepare for a pitch / campaign / launch",
      "Not sure yet",
    ],
    theme: orangeTheme,
  },
  {
    kind: "choice",
    id: "timeline",
    stepLabel: "04/06",
    titleLines: ["WHAT IS YOUR", "TIMELINE?"],
    description:
      "Select only one. Doesn't have to be exact, but choose the closest.",
    selectionMode: "single",
    options: [
      "ASAP",
      "Within a week",
      "Within a month",
      "Flexible",
      "In exploration phase",
    ],
    theme: plumTheme,
  },
  {
    kind: "choice",
    id: "deliverable",
    stepLabel: "05/06",
    titleLines: ["WHAT WOULD YOU", "LIKE TO RECIEVE?"],
    description: "Please select one option.",
    selectionMode: "single",
    options: ["A Quote", "A FREE Discovery Call", "Both"],
    theme: pinkTheme,
  },
  {
    kind: "form",
    id: "contact",
    stepLabel: "06/06",
    titleLines: ["PLEASE PROVIDE A FEW", "INFO SO WE CAN CONNECT"],
    description: "Fields marked with * are mandatory",
    theme: formTheme,
  },
];

export const START_HERE_LOCATION_OPTIONS = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Canada",
  "Australia",
  "Europe",
  "Other",
];
