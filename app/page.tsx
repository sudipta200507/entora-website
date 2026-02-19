import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { Navbar } from "@/components/sections/Navbar";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustSection } from "@/components/sections/TrustSection";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Entora",
  url: "https://entora.space",
  description:
    "AI development company building custom AI solutions, SaaS platforms, and automation systems.",
  email: "entoraofficial@gmail.com",
  sameAs: ["https://www.linkedin.com"],
  keywords: [
    "AI Development Company",
    "Custom AI Solutions",
    "SaaS Development",
    "AI Automation Services",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Entora",
  url: "https://entora.space",
  potentialAction: {
    "@type": "ContactAction",
    target: "https://entora.space/#contact",
  },
};

export default function HomePage() {
  return (
    <main className="relative isolate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <AboutSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
