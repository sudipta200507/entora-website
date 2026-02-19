"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
