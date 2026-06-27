"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const cards = [
  "BSc CSIT, TU",
  "Graphic Designer",
  "Video Editor",
  "Motion Designer",
  "AI Creative Workflow",
  "Available for Projects"
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 70, damping: 24 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 70, damping: 24 });
  const subjectX = useTransform(pointerX, [-1, 1], [-14, 14]);
  const subjectY = useTransform(pointerY, [-1, 1], [-10, 10]);
  const glowX = useTransform(pointerX, [-1, 1], [18, -18]);
  const glowY = useTransform(pointerY, [-1, 1], [12, -12]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section id="top" className="hero-section" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="hero-noise" aria-hidden="true" />
      <motion.div className="hero-ambient hero-ambient-one" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      <motion.div className="hero-ambient hero-ambient-two" style={{ x: subjectX, y: subjectY }} aria-hidden="true" />
      <div className="hero-line-field" aria-hidden="true" />

      <div className="hero-copy">
        <motion.div className="status-pill" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span />
          Available for premium creative work
        </motion.div>
        <motion.div
          className="hero-name"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          Ganesh Kharel
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          Make it clean. Make it convert.
        </motion.h1>
        <motion.div
          className="hero-roles"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          Graphic Designer • Video Editor • Motion Designer • Creative Marketer
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          Clean, modern, conversion-focused visuals for brands, creators, and businesses.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <MagneticButton href="#projects" className="hero-swipe-button">
            Swipe
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        data-parallax
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div className="subject-stage" style={{ x: subjectX, y: subjectY }}>
          <div className="subject-glow" />
          <motion.div
            className="hero-subject-wrap "
            animate={reduceMotion ? undefined : { y: [0, -8, 0], scale: [1, 1.012, 1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/background-subject.png"
              alt="Ganesh Kharel"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 48vw"
              className="hero-subject-image"
            />
          </motion.div>
          <div className="portrait-overlay subject-badge">
            <Sparkles size={18} />
            Clean visuals that convert
          </div>
        </motion.div>
        <div className="floating-card-stack">
          {cards.map((card, index) => (
            <motion.div
              className="floating-card hero-glass-card"
              style={{ ["--float-delay" as string]: `${index * -1.15}s` }}
              key={card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.06 }}
            >
              <span />
              {card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
