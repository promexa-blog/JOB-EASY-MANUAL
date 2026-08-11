"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export interface Screenshot {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technicalNotes?: string[];
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(screenshots.map((s) => s.category)))];
  const filtered = activeCategory === "All" ? screenshots : screenshots.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter (Stripe-like pill nav) */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
                : "bg-transparent text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cinematic Grid */}
      <div className="flex flex-col gap-24">
        {filtered.map((s, i) => (
          <div key={s.id} className={`flex flex-col gap-6 animate-fade-in`} style={{ animationDelay: (i * 0.05) + "s" }}>
            
            {/* Context/Caption */}
            <div className="max-w-2xl px-2">
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg-faint)]">
                  {s.category}
                </span>
                <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              </div>
              <h3 className="text-2xl font-medium tracking-tight text-[var(--color-fg)]">{s.title}</h3>
              <p className="mt-2 text-lg text-[var(--color-fg-muted)] leading-relaxed">{s.description}</p>
            </div>

            {/* Browser Frame */}
            <button
              onClick={() => setLightboxIdx(i)}
              className="group relative w-full overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] shadow-xl shadow-black/5 dark:shadow-black/40 transition-transform duration-500 hover:scale-[1.01]"
              aria-label={"View " + s.title + " fullscreen"}
            >
              <div className="flex h-10 w-full items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4">
                <div className="h-3 w-3 rounded-full bg-[var(--color-border-strong)] transition-colors group-hover:bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-border-strong)] transition-colors group-hover:bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[var(--color-border-strong)] transition-colors group-hover:bg-[#27c93f]" />
              </div>
              <div className="relative">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/0 backdrop-blur-0 transition-all duration-300 group-hover:bg-[var(--color-bg)]/20 group-hover:backdrop-blur-sm">
                  <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] opacity-0 shadow-2xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </button>

            {/* Tech Notes */}
            {s.technicalNotes && s.technicalNotes.length > 0 && (
              <div className="flex flex-wrap gap-2 px-2">
                {s.technicalNotes.map((note, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-fg-faint)]" />
                    {note}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIdx !== null && (
        <Lightbox
          screenshots={filtered}
          currentIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={setLightboxIdx}
        />
      )}
    </div>
  );
}

function Lightbox({
  screenshots,
  currentIdx,
  onClose,
  onNavigate,
}: {
  screenshots: Screenshot[];
  currentIdx: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}) {
  const s = screenshots[currentIdx];
  if (!s) return null;

  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < screenshots.length - 1;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-bg)]/95 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
      
      <button onClick={onClose} className="absolute right-6 top-6 rounded-full bg-[var(--color-bg-elevated)] p-3 text-[var(--color-fg-muted)] shadow-lg hover:text-[var(--color-fg)] transition-colors">
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative flex w-full max-w-[90vw] flex-col overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] shadow-2xl animate-blur-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-10 w-full items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <div className="mx-auto font-mono text-[10px] text-[var(--color-fg-faint)]">{s.title}</div>
        </div>

        <div className="relative max-h-[80vh] overflow-auto bg-[var(--color-bg-subtle)]">
          <img src={s.image} alt={s.title} className="w-full" />
        </div>
      </div>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx - 1); }}
          className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] shadow-lg text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIdx + 1); }}
          className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] shadow-lg text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
