"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { GalleryModal } from "@/components/GalleryModal";
import { WorkCategory, workCategories } from "@/data/work";

export function ProjectCollections() {
  const [active, setActive] = useState<WorkCategory | null>(null);

  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading">
        <span>Selected Systems</span>
        <h2>Projects</h2>
      </div>
      <div className="category-grid">
        {workCategories.map((category) => (
          <CategoryCard key={category.id} category={category} onOpen={setActive} />
        ))}
      </div>
      <GalleryModal category={active} onClose={() => setActive(null)} />
    </section>
  );
}
