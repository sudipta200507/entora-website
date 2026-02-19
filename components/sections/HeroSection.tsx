"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-40 md:pb-28 md:pt-48">
      <div className="absolute inset-0 -z-20 grid-overlay" />
      <motion.div
        className="hero-glow absolute -left-16 top-16 -z-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-glow absolute -right-14 top-24 -z-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium tracking-[0.18em] text-cyan-200">
            AI-FIRST PRODUCT ENGINEERING
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Build Intelligent Software That
            <span className="block bg-gradient-to-r from-cyan-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Drives Real Business Growth
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Entora builds AI products, automation systems, and scalable web platforms designed to improve operations,
            accelerate delivery, and convert users into customers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Work With Us
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-200/40 hover:bg-white/10"
            >
              View Our Work
            </a>
          </div>

          <a
            href="#trust"
            className="mt-12 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-200"
          >
            Scroll to explore
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
