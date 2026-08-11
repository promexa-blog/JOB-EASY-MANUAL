"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Header } from "./header";
import { SearchDialog } from "@/components/ui/search-dialog";

export function DocsShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] relative">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <main className="flex-1 w-full relative flex flex-col">
        {children}
      </main>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
