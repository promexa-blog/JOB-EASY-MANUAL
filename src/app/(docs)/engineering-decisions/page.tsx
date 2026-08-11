import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { DecisionCard } from "@/components/ui/decision-card";

export const metadata: Metadata = { title: "Engineering Decisions" };

export default function EngineeringDecisionsPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Engineering Decisions</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Architectural Decision Records (ADRs) and the reasoning behind them.
        </p>
      </div>

      <div className="flex flex-col mt-12 border-b border-[var(--color-border-strong)]">
        <DecisionCard
          title="Raw User-Agent Storage"
          context="We need to track where a session was established (LoginEvent) and where it is currently active (Session)."
          decision="Store the raw User-Agent string (truncated to 512 chars) instead of parsing it into device/browser columns on write."
          reasoning="UA parsing is a heuristic that ages. A label written today by today's regexes can never be re-derived when a new browser ships, whereas the raw string can be re-parsed forever. We parse on read using a utility function."
          tradeoffs={[
            "Requires parsing at render time, slightly increasing CPU load on the sessions page.",
            "Makes it difficult to run SQL aggregations grouping by device type."
          ]}
        />
        
        <DecisionCard
          title="Hashed Session Tokens"
          context="We explicitly model sessions in the database to allow users to see and revoke active sessions on other devices."
          decision="We store a SHA-256 hash of the session token in the database, never the raw token."
          reasoning="If we stored the raw token, the active sessions screen and the audit logs would literally be printing live bearer tokens to the screen. Hashing ensures the database row is inert."
          tradeoffs={[
            "Requires computing a SHA-256 hash on every authenticated request."
          ]}
        />

        <DecisionCard
          title="Tombstoning for Account Deletion"
          context="Deleting a user requires revoking 3rd-party OAuth grants (Google) and purging external assets (Cloudinary). We cannot risk a network failure leaving the user's data orphaned."
          decision="Phase 1 of deletion locks the account and creates an AccountDeletion tombstone with necessary secrets. Phase 2 runs asynchronously to clean up external systems before deleting the user row."
          reasoning="This completely removes the risk of a third-party API timeout leaving a user in a half-deleted state. The tombstone acts as an idempotent retry mechanism."
          tradeoffs={[
            "Complex state management.",
            "Requires temporarily storing a snapshot of an encrypted OAuth token."
          ]}
        />

        <DecisionCard
          title="Queue Claims via Skip Locked"
          context="Background cron jobs need to reliably claim rows from the mail delivery queue without two crons picking up the same row."
          decision="We use raw SQL with FOR UPDATE SKIP LOCKED."
          reasoning="It is the absolute standard for Postgres-backed queues, avoiding the need for a separate Redis instance for locking. Partial indexes on the table ensure the query doesn't scan millions of rows to find pending work."
          tradeoffs={[
            "Forces us to break out of Prisma's type-safety for this specific query.",
            "Requires manual DDL maintenance for the partial indexes."
          ]}
        />

        <DecisionCard
          title="Snapshotting via SetNull Cascades"
          context="When a user deletes a Resume or an EmailTemplate, we cannot allow cascading deletes to destroy historical AuditLogs or EmailLogs associated with them."
          decision="We use SetNull on the foreign keys, and actively take hard snapshots of string data (like the template type and resume name) at execution time."
          reasoning="This ensures compliance logs and historical email records survive the deletion of their parent resources, guaranteeing an unbroken audit trail."
          tradeoffs={[
            "Duplicates data in the database (e.g., storing the resume name in the EmailLog).",
            "Requires careful schema migrations to enforce SetNull instead of Prisma's default Cascade."
          ]}
        />

        <DecisionCard
          title="Fuzzy Search via Postgres GIN Indexes"
          context="Users need millisecond-latency fuzzy search across millions of Companies, Applications, and Resumes."
          decision="We rely entirely on PostgreSQL's native pg_trgm extension and gin_trgm_ops GIN indexes."
          reasoning="It eliminates the operational and financial burden of maintaining a separate Elasticsearch or Algolia cluster, while remaining highly performant for our dataset scale."
          tradeoffs={[
            "GIN indexes are expensive to write to and take up significant disk space.",
            "Slightly higher CPU utilization on the database during heavily filtered text searches."
          ]}
        />
      </div>

      <PrevNextNav />
    </div>
  );
}
