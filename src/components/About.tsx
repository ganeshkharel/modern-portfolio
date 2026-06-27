"use client";

import { motion } from "motion/react";

const info = [
  ["Name", "Ganesh Kharel"],
  ["Age", "20"],
  ["Study", "BSc CSIT, Tribhuvan University"],
  ["Focus", "Design, Editing, Motion, Branding, Marketing"],
  ["Location", "Nepal"]
];

const tools = ["Canva", "Photoshop", "Illustrator", "DaVinci Resolve", "CapCut", "After Effects", "AI Tools"];

export function About() {
  return (
    <section id="about" className="section about-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
      >
        <span>Creative Profile</span>
        <h2>Hi, I&apos;m Ganesh Kharel</h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-portrait"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src="/profile.jpg" alt="Ganesh Kharel" />
        </motion.div>
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>
            I am a 20-year-old Graphic Designer, Video Editor, Motion Designer, and creative digital marketer
            studying BSc CSIT under Tribhuvan University. I help brands, creators, and businesses create clean
            visuals that look premium and help them sell, grow, and communicate better.
          </p>
          <div className="info-grid">
            {info.map(([label, value]) => (
              <div className="info-box" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="tool-chips">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
