import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";

export const metadata: Metadata = { title: "Project Challenges" };

export default function ChallengesPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Project Challenges</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Key technical hurdles overcome during the development of Job-Easy.
        </p>
      </div>
      
      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          1. The "Orphaned Audit Log" Problem
        </h2>
        <p>
          <strong>Problem:</strong> When an admin deletes a user or a company, standard database <code>CASCADE</code> deletes remove all child rows. But the <code>AuditLog</code> and <code>EmailLog</code> tables reference these entities to display their history. If the entity is gone, the log vanishes or breaks, violating compliance requirements.
        </p>
        <p>
          <strong>Solution:</strong> Converted the foreign keys to <code>SetNull</code> rather than <code>Cascade</code>, and altered the logging infrastructure to take hard static snapshots (e.g. saving the string name of the template or company) at the moment the log is created. The audit trail persists intelligibly even when the referenced entity is destroyed.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          2. Serverless Execution Black-Holes
        </h2>
        <p>
          <strong>Problem:</strong> Serverless platforms unceremoniously kill functions when they exceed their maximum execution duration (e.g. 60 seconds). Because the process is externally terminated, a standard <code>try/catch</code> block cannot catch the termination to record a "failed" state in the database, leaving the cron job stuck in a "running" state indefinitely.
        </p>
        <p>
          <strong>Solution:</strong> Designed the <strong>Two-Write Lifecycle</strong>. The <code>cronHandler()</code> wrapper explicitly writes a <code>running</code> status to the database <em>before</em> execution begins, and then attempts to write <code>success</code> or <code>failed</code> at the end. A separate, lightweight <code>purge-stale</code> reaper job runs periodically to sweep any stranded <code>running</code> jobs and mark them as <code>timeout</code>.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          3. Gmail MIME Threading
        </h2>
        <p>
          <strong>Problem:</strong> Sending an email via the Gmail API is straightforward, but making it appear in the same thread as previous messages requires precise MIME header manipulation (<code>In-Reply-To</code> and <code>References</code>) and sending it as an RFC 2822 base64url encoded string, which standard mailer libraries often abstract away incorrectly.
        </p>
        <p>
          <strong>Solution:</strong> Wrote a custom MIME builder service in the Google Integrations slice that manually constructs the multipart boundary payload, allowing precise insertion of the required thread headers alongside user-uploaded PDF resumes.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          4. Side-Effect Heavy Account Deletions
        </h2>
        <p>
          <strong>Problem:</strong> Deleting a user isn't just a database operation. We must actively revoke 3rd-party OAuth grants (Google) and purge external assets (Cloudinary). If we relied on a simple <code>DELETE FROM User</code> and a subsequent API call failed, the user's data would be permanently orphaned on external servers with no way to recover the keys.
        </p>
        <p>
          <strong>Solution:</strong> Built the <code>accountDeletion.workflow.ts</code> lock. Instead of deleting the user immediately, Phase 1 locks the account (preventing login) and creates a tombstone record containing all necessary API identifiers. Phase 2 runs the external purges idempotently. Only when all side-effects succeed does Phase 3 trigger the final database cascade.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
