import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Applications" };

export default function ApplicationsFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Applications</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The core tracking pipeline: threads, statuses, and historical snapshots.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>applications</code> feature slice owns the candidate tracking lifecycle. This includes managing application statuses, rendering conversation threads, and handling bulk application operations.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Creation & Outreach Dependency
        </h2>
        <p>
          Unlike a standard CRUD model where records are manually created, an <code>Application</code> row is intrinsically tied to the <code>outreach</code> slice. When a user sends an outreach email, the system automatically creates the underlying Application row and seeds it with the initial outgoing <code>EmailLog</code>.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Data Model & Snapshots
        </h2>
        <p>
          The <code>Application</code> model is designed to survive destructive upstream actions.
        </p>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Company SetNull Cascade</h3>
        <p>
          In the Prisma schema, the relationship to a <code>Company</code> is explicitly set to <code>onDelete: SetNull</code> rather than <code>Cascade</code>. This is a critical architectural decision: if a user deletes a company list (or a specific company), their historical application data and email threads remain perfectly intact. 
        </p>
        <Callout type="note" title="Preserving Display Context">
          Because the <code>companyId</code> can become null, the Application model stores a hard snapshot of the <code>companyName</code> and <code>toEmail</code> at the time of creation. This guarantees the UI can always render the historical application accurately.
        </Callout>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Status Pipeline</h3>
        <p>
          The <code>status</code> field enforces a strict hiring pipeline state machine: <code>Draft</code>, <code>Sent</code>, <code>Replied</code>, <code>Interview</code>, <code>Offer</code>, <code>Rejected</code>, and <code>Hired</code>. Note that status transitions in the UI's thread view are designed to be append-only, preserving a chronological log of how the candidate progressed.
        </p>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Gmail Threading</h3>
        <p>
          Each application optionally stores a unique <code>threadId</code>. This maps directly to a Gmail thread, allowing the application to aggregate and display all incoming <code>EmailMessage</code> replies chronologically inside the tracking view.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Fuzzy Search (GIN Indexes)
        </h2>
        <p>
          To power the global ⌘K search efficiently, the Application model utilizes raw Postgres GIN trigram indexes on the snapped company name (<code>@@index([companyName(ops: raw("gin_trgm_ops"))], type: Gin)</code>). This ensures instant, fuzzy-matched results across thousands of applications without table scans.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
