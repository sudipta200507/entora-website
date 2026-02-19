import { Cloud, Code2, Cpu, Database, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const badges = [
  { label: "AI", icon: Sparkles },
  { label: "ML", icon: Cpu },
  { label: "Web", icon: Code2 },
  { label: "Backend", icon: Database },
  { label: "Cloud", icon: Cloud },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-16 md:py-20">
      <div className="section-shell">
        <Reveal className="glass-card rounded-3xl p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Trusted Foundations</p>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                Built for scalable growth with enterprise-grade engineering.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                We combine product strategy, AI systems, and modern infrastructure to help companies launch quickly and
                scale with confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {badges.map(({ label, icon: Icon }, idx) => (
                <Reveal
                  key={label}
                  delay={idx * 0.07}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                >
                  <Icon className="mx-auto h-5 w-5 text-cyan-200" />
                  <p className="mt-2 text-sm font-medium text-slate-200">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
