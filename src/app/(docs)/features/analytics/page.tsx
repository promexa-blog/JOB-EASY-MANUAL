import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Analytics</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Dashboards, reports, and the explicit cross-domain read model.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>analytics</code> slice powers the user dashboards and admin reports. Uniquely, it is the only feature slice that <strong>owns no database models</strong>.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Cross-Domain Read Exception
        </h2>
        <p>
          In a strictly vertical slice architecture, domains are usually not allowed to query each other's models directly. However, reporting is cross-model by its very nature. Constructing a funnel metric inherently requires querying <code>Company</code>, <code>Application</code>, and <code>EmailLog</code> models simultaneously.
        </p>
        <Callout type="note" title="The Allowlisted Tier Violation">
          To accommodate this, the <code>analytics</code> slice is explicitly <strong>allowlisted</strong> as a cross-domain read model. It is permitted to read across all other feature slices (companies, applications, outreach, subscriptions, users) to construct its charts.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Strict Invariants
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Read-Only:</strong> The analytics slice is strictly read-only. It may never issue a database write under any circumstance.</li>
          <li><strong>Terminal Dependency:</strong> Nothing is allowed to import this slice. It sits at the very top of the dependency tree, consuming data but never providing it to other domains.</li>
        </ul>

      </div>

      <PrevNextNav />
    </div>
  );
}
