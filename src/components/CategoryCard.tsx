"use client";

import { motion } from "motion/react";
import { Images, Play } from "lucide-react";
import { WorkCategory } from "@/data/work";
import { cn } from "@/lib/utils";

const aspectClass = {
  vertical: "aspect-[9/16]",
  square: "aspect-square",
  wide: "aspect-video",
  portrait: "aspect-[4/5]"
};

function thumbnailFor(item: WorkCategory["items"][number]) {
  return item.image || item.cover || item.thumbnail || item.poster;
}

export function CategoryCard({
  category,
  onOpen
}: {
  category: WorkCategory;
  onOpen: (category: WorkCategory) => void;
}) {
  return (
    <motion.article
      className="category-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="preview-collage" aria-hidden="true">
        {category.items.slice(0, 3).map((item) => (
          <div key={item.id} className={cn("preview-tile", aspectClass[category.aspect])}>
            {item.type === "video" ? (
              <>
                {thumbnailFor(item) ? (
                  <img src={thumbnailFor(item)} alt="" loading="lazy" />
                ) : (
                  <span className="placeholder-media">{item.title}</span>
                )}
                <span className="preview-play">
                  <Play size={16} />
                </span>
              </>
            ) : (
              <img src={item.src} alt="" loading="lazy" />
            )}
          </div>
        ))}
        {!category.items.length && (
          <div className={cn("preview-tile", aspectClass[category.aspect])}>
            <Images size={20} />
          </div>
        )}
      </div>
      <div className="category-meta">
        <span>{category.countLabel}</span>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
      <div className="category-actions">
        <button onClick={() => onOpen(category)}>{category.cta}</button>
        <a href="#contact">Contact Me</a>
      </div>
    </motion.article>
  );
}
