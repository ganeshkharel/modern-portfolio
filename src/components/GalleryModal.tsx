"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ImageIcon, Play, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { WorkCategory, WorkItem } from "@/data/work";
import { cn } from "@/lib/utils";

const aspectClass = {
  vertical: "aspect-[9/16]",
  square: "aspect-square",
  wide: "aspect-video",
  portrait: "aspect-[4/5]"
};

type PreviewSlot = WorkItem & { placeholder?: boolean };

function videoType(src: string) {
  return src.toLowerCase().includes(".mov") ? "video/quicktime" : "video/mp4";
}

function thumbnailFor(item: WorkItem) {
  return item.image || item.cover || item.thumbnail || item.poster;
}

export function GalleryModal({
  category,
  onClose
}: {
  category: WorkCategory | null;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo<PreviewSlot[]>(() => {
    if (!category) return [];
    if (category.items.length) return category.items;
    return Array.from({ length: 10 }).map((_, index) => ({
      id: `${category.id}-placeholder-${index + 1}`,
      title: `${category.name} ${String(index + 1).padStart(2, "0")}`,
      src: "",
      type: category.id === "videos" || category.id === "motion" ? "video" : "image",
      aspect: category.aspect,
      placeholder: true
    }));
  }, [category]);

  useEffect(() => {
    setActiveIndex(null);
    document.body.classList.toggle("modal-open", Boolean(category));
    return () => document.body.classList.remove("modal-open");
  }, [category]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!category) return;
      if (event.key === "Escape") onClose();
      if (activeIndex === null) return;
      if (event.key === "ArrowRight") setActiveIndex((activeIndex + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, category, items.length, onClose]);

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const activeVideoUrl = activeItem?.type === "video" ? activeItem.src : "";
  const activeVideoType = videoType(activeVideoUrl);

  return (
    <AnimatePresence>
      {category && (
        <motion.div className="gallery-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="gallery-backdrop" onClick={onClose} />
          <motion.div
            className="gallery-panel"
            initial={{ y: 36, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 36, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <div className="gallery-header">
              <div>
                <span>{category.folder}</span>
                <h3>{category.name}</h3>
              </div>
              <button className="icon-button" onClick={onClose} aria-label="Close collection">
                <X size={20} />
              </button>
            </div>

            <div className="profile-grid">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  className={cn("work-tile", aspectClass[item.aspect])}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${item.title}`}
                >
                  {item.placeholder ? (
                    <span className="placeholder-media">
                      {item.type === "video" ? <Play size={24} /> : <ImageIcon size={24} />}
                    </span>
                  ) : item.type === "video" ? (
                    thumbnailFor(item) ? (
                      <img src={thumbnailFor(item)} alt={item.title} loading="lazy" />
                    ) : (
                      <span className="placeholder-media">{item.title}</span>
                    )
                  ) : (
                    <img src={item.src} alt={item.title} loading="lazy" />
                  )}
                  <span className="tile-label">{item.title}</span>
                </button>
              ))}
            </div>

          </motion.div>

          <AnimatePresence>
            {activeItem && (
              <motion.div className="preview-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button className="preview-backdrop" onClick={() => setActiveIndex(null)} aria-label="Close preview" />
                <motion.div
                  className="preview-frame"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <button className="icon-button preview-close" onClick={() => setActiveIndex(null)} aria-label="Close preview">
                    <X size={20} />
                  </button>
                  <button
                    className="icon-button preview-nav left"
                    onClick={() => setActiveIndex((current) => (current === null ? 0 : (current - 1 + items.length) % items.length))}
                    aria-label="Previous item"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <div className={cn("preview-media", aspectClass[activeItem.aspect])}>
                    {activeItem.placeholder ? (
                      <div className="placeholder-media large">
                        {activeItem.type === "video" ? <Play size={32} /> : <ImageIcon size={32} />}
                        <span>{activeItem.title}</span>
                      </div>
                    ) : activeItem.type === "video" ? (
                      <video
                        controls
                        preload="none"
                        playsInline
                        poster={activeItem.cover || activeItem.image || activeItem.thumbnail}
                        className="preview-media"
                      >
                        <source src={activeVideoUrl} type={activeVideoType} />
                      </video>
                    ) : (
                      <img src={activeItem.src} alt={activeItem.title} />
                    )}
                  </div>
                  <button
                    className="icon-button preview-nav right"
                    onClick={() => setActiveIndex((current) => (current === null ? 0 : (current + 1) % items.length))}
                    aria-label="Next item"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="preview-footer">
                    <strong>{activeItem.title}</strong>
                    <a href="#contact" onClick={onClose}>
                      Contact Me
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
