export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Discover",
    description:
      "We align on goals, users, constraints, and measurable outcomes before writing code.",
  },
  {
    id: "02",
    title: "Design",
    description:
      "We design product architecture, UX systems, and interaction flows focused on clarity and conversion.",
  },
  {
    id: "03",
    title: "Develop",
    description:
      "Our team builds with modern frameworks, clean code practices, and high iteration speed.",
  },
  {
    id: "04",
    title: "Deploy",
    description:
      "We ship to production with monitoring, testing, and deployment workflows for dependable releases.",
  },
  {
    id: "05",
    title: "Scale",
    description:
      "We optimize performance, add automation, and evolve the platform as your business grows.",
  },
];
