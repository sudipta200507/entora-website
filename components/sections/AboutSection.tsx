import { Reveal } from "@/components/ui/reveal";

const highlights = [
  { label: "AI-first strategy", value: "100%" },
  { label: "Product-focused delivery", value: "End-to-end" },
  { label: "Long-term partnerships", value: "Built to scale" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">About Entora</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              We exist to turn ambitious ideas into intelligent products that endure.
            </h2>
            <p className="mt-5 text-slate-300">
              Entora was founded to help companies use AI beyond experimentation. Our mission is to design software that
              creates measurable business value, from automation and product growth to infrastructure resilience.
            </p>
            <p className="mt-4 text-slate-300">
              Our long-term vision is to become the trusted AI product partner for modern organizations building the next
              generation of digital experiences.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <div className="glass-card rounded-2xl p-5">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
