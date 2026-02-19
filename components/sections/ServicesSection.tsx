"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, BrainCircuit, DatabaseZap, Globe, Layers3 } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";

const iconMap = {
  ai: BrainCircuit,
  automation: Bot,
  web: Globe,
  backend: DatabaseZap,
  saas: Layers3,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="section-shell">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Services</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            End-to-end execution for AI products and digital growth.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];

            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group glass-card h-full rounded-2xl p-6 shadow-glow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200 transition group-hover:bg-cyan-300/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.description}</p>

                  <ul className="mt-5 space-y-2 text-sm text-slate-400">
                    {service.points.map((point) => (
                      <li key={point} className="rounded-md bg-white/[0.03] px-3 py-2 transition group-hover:bg-white/[0.06]">
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
