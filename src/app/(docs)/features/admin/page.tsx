import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Admin & Security" };

export default function AdminFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Admin & Security</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Audit trails, the unified deletion pipeline, and GDPR data portability.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Administrative operations and user security lifecycles span multiple feature slices (primarily <code>users</code> and <code>audit</code>). 
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Audit Trail
        </h2>
        <p>
          The <code>features/audit</code> slice owns the admin log viewer. However, the actual writer function (<code>shared/audit/record.ts</code>) is a cross-cutting port used by over 50 endpoints across the platform.
        </p>
        <Callout type="warning" title="No-Throw Invariant">
          The audit writer is engineered to <strong>never throw</strong>. A failure to write a log to the database must never roll back the critical action that it was trying to record (like a password change or payment).
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Account Deletion Pipeline
        </h2>
        <p>
          Deleting a user is a highly destructive, multi-system action. The platform enforces that there is exactly <strong>one deletion path</strong>: <code>accountDeletion.workflow.ts</code>.
        </p>
        <p>
          Whether a user deletes their own account, an admin deletes a single user, or an admin executes a bulk deletion, it all funnels through this one workflow. This guarantees that side-effects are never skipped:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Cloudinary Assets:</strong> Resumes and avatars are aggressively purged from the CDN. Orphaned blobs are billable forever.</li>
          <li><strong>Google Grants:</strong> The user's OAuth refresh token is explicitly revoked at Google. Before this unified pipeline, an admin deleting a user would delete the database row but leave a live token valid at Google indefinitely.</li>
        </ul>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Activity & GDPR Portability
        </h2>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Derived Activity Timeline</h3>
        <p>
          The user's security activity timeline is completely derived. Rather than inserting into a redundant <code>UserActivity</code> table, the system merges four existing sources (<code>AuditLog</code>, <code>LoginEvent</code>, <code>SubscriptionEvent</code>, and <code>LegalAcceptance</code>) on the fly. This means features added today retroactively show history from yesterday.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">The Export Manifest</h3>
        <p>
          The GDPR data export (<code>server/dataExport.ts</code>) intentionally mirrors the exact same models that the deletion workflow destroys. 
        </p>
        <Callout type="note" title="Schema-Bound Testing">
          A strict unit test (<code>__tests__/dataExportManifest.test.ts</code>) reads the raw <code>schema.prisma</code> text file and fails the CI build if a user-owned model is in neither the export manifest nor a deliberate exclusion list. This guarantees that a new feature added to the schema cannot quietly become a GDPR portability gap.
        </Callout>

      </div>

      <PrevNextNav />
    </div>
  );
}
