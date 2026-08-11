import type { Metadata } from "next";
import path from "path";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { FileTree } from "@/components/ui/file-tree";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Directory Tree" };

export default function DirectoryTreePage() {
  // Dynamically resolve the root repository path (one level up from the manual project)
  const rootPath = path.resolve(process.cwd(), "..");

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Directory Tree</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Explore the live, interactive folder structure of the entire Job-Easy repository.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)] mb-12">

        <div className="my-8">
          <FileTree basePath={rootPath} />
        </div>
      </div>

      <PrevNextNav />
    </div>
  );
}
