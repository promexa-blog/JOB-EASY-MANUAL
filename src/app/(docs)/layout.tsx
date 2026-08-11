"use client";

import { DocsShell } from "@/components/layout/docs-shell";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 pt-4 lg:pt-8 pb-12 lg:pb-24">
      {children}
    </div>
  );
}
