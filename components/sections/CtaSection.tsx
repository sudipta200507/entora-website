import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-emerald-950/30 p-8 shadow-glow md:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Ready to Build</p>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Let&apos;s Build the Future Together</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Partner with Entora to launch AI-powered products and systems that move your business forward.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Contact Entora
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
