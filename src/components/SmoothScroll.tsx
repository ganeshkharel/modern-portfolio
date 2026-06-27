"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  function handleAnchorClick(event: React.MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.pushState(null, "", hash);
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.1, smoothWheel: true, anchors: true }}>
      <div onClickCapture={handleAnchorClick}>{children}</div>
    </ReactLenis>
  );
}
