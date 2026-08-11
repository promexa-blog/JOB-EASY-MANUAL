"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { allPages } from "@/content/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const page = allPages.find((p) => p.href === pathname);

  if (!page) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm">
      <Link
        href="/"
        className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
      >
        Docs
      </Link>
      {segments.length > 1 && (
        <>
          <ChevronRight className="h-3 w-3 text-[var(--color-fg-faint)]" />
          <Link
            href={`/${segments[0]}`}
            className="capitalize text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
          >
            {segments[0].replace(/-/g, " ")}
          </Link>
        </>
      )}
      <ChevronRight className="h-3 w-3 text-[var(--color-fg-faint)]" />
      <span className="font-medium text-[var(--color-fg)]">{page.title}</span>
    </nav>
  );
}
