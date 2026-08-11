"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, FileText } from "lucide-react";
import { allPages } from "@/content/navigation";
import { useRouter } from "next/navigation";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length > 0
    ? allPages.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.group.toLowerCase().includes(query.toLowerCase())
      )
    : allPages.slice(0, 5); // Show top 5 as "Quick Links" when empty

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      router.push(results[selectedIdx].href);
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      
      {/* Dialog */}
      <div className="fixed inset-x-4 top-[12vh] sm:top-[20vh] z-[101] mx-auto w-full max-w-xl animate-scale-in">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg)]/95 backdrop-blur-2xl shadow-2xl shadow-black/20 dark:shadow-black/60">
          
          {/* Input Header */}
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-4">
            <Search className="h-5 w-5 shrink-0 text-[var(--color-fg-muted)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 bg-transparent text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] outline-none"
            />
            <button
              onClick={onClose}
              className="flex h-6 items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-1.5 font-mono text-[10px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim() === "" && (
              <div className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-fg-subtle)]">
                Quick Links
              </div>
            )}
            
            {results.length === 0 ? (
              <div className="px-4 py-12 text-center text-[13px] text-[var(--color-fg-subtle)]">
                No results found for &ldquo;<span className="text-[var(--color-fg)]">{query}</span>&rdquo;
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {results.map((page, i) => (
                  <button
                    key={page.href}
                    onClick={() => {
                      router.push(page.href);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      i === selectedIdx
                        ? "bg-[var(--color-bg-subtle)]"
                        : "hover:bg-[var(--color-bg-subtle)]/50"
                    }`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      i === selectedIdx 
                        ? "border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-fg)] shadow-sm" 
                        : "border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-fg-muted)]"
                    }`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className={`block text-[14px] font-medium truncate transition-colors ${
                        i === selectedIdx ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)]"
                      }`}>
                        {page.title}
                      </span>
                      <span className="block text-[12px] text-[var(--color-fg-faint)] truncate">
                        {page.group}
                      </span>
                    </div>

                    <ArrowRight className={`h-4 w-4 shrink-0 transition-all ${
                      i === selectedIdx 
                        ? "text-[var(--color-fg-muted)] opacity-100 translate-x-0" 
                        : "text-[var(--color-fg-faint)] opacity-0 -translate-x-2"
                    }`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]/30 px-4 py-3 text-[11px] text-[var(--color-fg-subtle)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1 font-mono text-[9px]">↑</kbd>
                <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1 font-mono text-[9px]">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1 font-mono text-[9px]">↵</kbd>
                <span>to select</span>
              </span>
            </div>
            <span>
              Search powered by Job-Easy
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
