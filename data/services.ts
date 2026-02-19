export type Service = {
  title: string;
  description: string;
  points: string[];
  icon: "ai" | "automation" | "web" | "backend" | "saas";
};

export const services: Service[] = [
  {
    title: "AI Product Development",
    description:
      "From concept to launch, we build AI-native products that solve real business problems.",
    points: ["LLM integrations", "Model workflows", "User-ready interfaces"],
    icon: "ai",
  },
  {
    title: "Intelligent Automation Systems",
    description:
      "Eliminate repetitive work with automation pipelines that improve speed and operational accuracy.",
    points: ["Workflow orchestration", "Agent tooling", "Ops automation"],
    icon: "automation",
  },
  {
    title: "Modern Web Platforms",
    description:
      "Launch fast, secure, and scalable platforms with polished UX engineered for conversion.",
    points: ["Next.js architecture", "SEO-first pages", "Conversion design"],
    icon: "web",
  },
  {
    title: "Backend & Database Architecture",
    description:
      "Robust APIs and data systems designed for reliability, observability, and growth.",
    points: ["API engineering", "Data modeling", "Performance tuning"],
    icon: "backend",
  },
  {
    title: "Custom SaaS Solutions",
    description:
      "We design and develop SaaS products with multitenancy, billing, analytics, and admin controls.",
    points: ["SaaS foundations", "Secure auth flows", "Revenue infrastructure"],
    icon: "saas",
  },
];
