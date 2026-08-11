import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = { title: "Global Companies" };

export default function GlobalCompaniesPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Global Companies</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The community-sourced, automatically deduplicated company directory.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Users maintain private <code>Company</code> lists, typically populated via CSV upload. During upload, they can opt-in to share their companies with the community.
          When they do, a distinct <code>GlobalCompany</code> record is created.
        </p>
        <p>
          This is deliberately NOT a view over the <code>Company</code> table. If a user deletes their account, their private <code>Company</code> rows are cascade-deleted, but the <code>GlobalCompany</code> rows survive—only the <code>contributedById</code> is set to null.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Deduplication Probes
        </h2>
        <p>
          To prevent the global pool from filling with duplicates of "Google" or "Amazon", the system uses a 4-branch deduplication probe:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Email:</strong> Match exactly on <code>emailKey</code>.</li>
          <li><strong>Phone:</strong> Match exactly on <code>phoneKey</code>.</li>
          <li><strong>Domain:</strong> The registrable host of the website (e.g., <code>amazon.com</code>). Bypassed for free-mail or ATS domains.</li>
          <li><strong>Name + Location:</strong> A fallback match on <code>nameKey</code> and <code>locationKey</code>. Matching a bare name globally would incorrectly merge unrelated same-named companies.</li>
        </ul>
        <p>
          If a match is found, the existing row's <code>contributionCount</code> is bumped instead of inserting a new row.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          pg_trgm for Fast Search
        </h2>
        <p>
          Users can search the global pool by partial names or locations. Because standard B-Trees cannot index a leading wildcard search (e.g., <code>%dubai%</code>), we manually install the <code>pg_trgm</code> extension via a raw SQL migration and index the <code>locationTokens</code> column.
        </p>
        <CodeBlock
          language="sql"
          title="prisma/migrations/20260721000000_init/migration.sql"
          code={`-- Required for the GIN index on GlobalCompany.locationTokens
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "GlobalCompany_locationTokens_idx" 
ON "GlobalCompany" USING GIN ("locationTokens" gin_trgm_ops);`}
        />

      </div>

      <PrevNextNav 
        prev={{ title: "Authentication", href: "/features/authentication" }}
        next={{ title: "Automated Discovery", href: "/features/discovery" }} 
      />
    </div>
  );
}
