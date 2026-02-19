"use client";

import { FormEvent, useMemo, useState } from "react";
import { Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type FormValues = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialForm: FormValues = {
  name: "",
  email: "",
  projectType: "AI Product Development",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const isDisabled = useMemo(() => status === "submitting", [status]);

  const updateField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status !== "idle") setStatus("idle");
    if (feedback) setFeedback("");
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.projectType.trim()) nextErrors.projectType = "Please select a project type.";
    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      nextErrors.message = "Please provide at least 20 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FormErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors((prev) => ({ ...prev, ...result.errors }));
        }
        setStatus("error");
        setFeedback(result.message ?? "Unable to submit your request. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback(result.message ?? "Message sent. We will get back to you shortly.");
      setForm(initialForm);
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="pb-20 pt-16 md:pb-24 md:pt-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Start your next AI product with Entora.
            </h2>
            <p className="mt-4 text-slate-300">
              Tell us what you&apos;re building and we&apos;ll respond with a practical roadmap for design, development, and
              deployment.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:entoraofficial@gmail.com"
                className="glass-card inline-flex w-full items-center gap-3 rounded-xl p-4 text-slate-200 transition hover:border-cyan-300/30"
              >
                <Mail className="h-4 w-4 text-cyan-200" />
                entoraofficial@gmail.com
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="glass-card inline-flex w-full items-center gap-3 rounded-xl p-4 text-slate-200 transition hover:border-cyan-300/30"
              >
                <Linkedin className="h-4 w-4 text-cyan-200" />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
                    placeholder="Your name"
                    required
                  />
                  {errors.name ? <p className="mt-1 text-xs text-rose-300">{errors.name}</p> : null}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
                    placeholder="you@company.com"
                    required
                  />
                  {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email}</p> : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-slate-200">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={form.projectType}
                    onChange={(event) => updateField("projectType", event.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
                    required
                  >
                    <option>AI Product Development</option>
                    <option>Intelligent Automation Systems</option>
                    <option>Modern Web Platforms</option>
                    <option>Backend & Database Architecture</option>
                    <option>Custom SaaS Solutions</option>
                  </select>
                  {errors.projectType ? <p className="mt-1 text-xs text-rose-300">{errors.projectType}</p> : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
                    placeholder="Tell us about your goals, timeline, and what success looks like."
                    required
                  />
                  {errors.message ? <p className="mt-1 text-xs text-rose-300">{errors.message}</p> : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {feedback ? (
                <p
                  aria-live="polite"
                  className={`mt-3 text-center text-sm ${
                    status === "error" ? "text-rose-300" : "text-emerald-200"
                  }`}
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
