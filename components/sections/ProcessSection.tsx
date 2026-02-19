import { processSteps } from "@/data/process";
import { Reveal } from "@/components/ui/reveal";

export function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Process</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">How we deliver results</h2>
        </Reveal>

        <div className="mt-10 relative">
          <div className="absolute left-5 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-cyan-300/70 to-transparent md:block" />
          <div className="grid gap-6">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.06}>
                <article className="glass-card relative rounded-2xl p-6 md:pl-20">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-sm font-semibold text-cyan-200 md:absolute md:left-6 md:top-6">
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 max-w-3xl text-slate-300">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
