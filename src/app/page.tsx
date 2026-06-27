"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IntroLoader } from "@/components/IntroLoader";
import { ProjectCollections } from "@/components/ProjectCollections";
import { ScrollEffects } from "@/components/ScrollEffects";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollEffects />
      <IntroLoader />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <ProjectCollections />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
