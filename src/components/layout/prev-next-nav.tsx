"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { allPages } from "@/content/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
}

export function PrevNextNav({ prev: _prev, next: _next }: { prev?: NavItem, next?: NavItem } = {}) {
  const pathname = usePathname();
  const idx = allPages.findIndex((p) => p.href === pathname);
  if (idx === -1) return null;

  const prev = idx > 0 ? allPages[idx - 1] : null;
  const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]"
        >
          <span className="flex items-center gap-1 text-xs text-[var(--color-fg-subtle)]">
            <ChevronLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="text-sm font-medium text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-lg border border-[var(--color-border)] p-4 text-right transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]"
        >
          <span className="flex items-center gap-1 text-xs text-[var(--color-fg-subtle)]">
            Next
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
