import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import caseStudies from "@/data/caseStudies.json";

type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  results: string;
};

const projects = caseStudies as CaseStudy[];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Case Studies</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Real projects. Measurable outcomes.</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group glass-card h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-200" />
                </div>

                <div className="mt-5 space-y-4 text-sm text-slate-300">
                  <p>
                    <span className="font-medium text-slate-100">Problem:</span> {project.problem}
                  </p>
                  <p>
                    <span className="font-medium text-slate-100">Solution:</span> {project.solution}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Results Achieved
                  </span>
                  <p className="mt-2 text-emerald-100/90">{project.results}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
