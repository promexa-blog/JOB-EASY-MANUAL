import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = { title: "Testing & Quality" };

export default function TestingPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Testing & Quality Assurance</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          How Job-Easy enforces correctness through static boundaries and schema-bound integration harnesses.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The platform ensures correctness through a strict combination of static analysis (TypeScript + ESLint), extremely fast unit tests, and database-backed workflows that protect critical architectural invariants.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Testing Pyramid
        </h2>
      </div>

      <div className="not-prose grid gap-4 sm:grid-cols-3 my-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] font-bold text-lg">
            1
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Static Analysis</h4>
          <p className="mt-1 text-xs text-[var(--color-fg-muted)]">TypeScript strict mode and ESLint boundary rules instantly catch architecture violations.</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] font-bold text-lg">
            658
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Unit Tests</h4>
          <p className="mt-1 text-xs text-[var(--color-fg-muted)]">Pure logic testing (mappers, schemas, parsers) using the Node.js native test runner.</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)] font-bold text-lg">
            14
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Integration Harnesses</h4>
          <p className="mt-1 text-xs text-[var(--color-fg-muted)]">Database-backed workflows guaranteeing invariants like GDPR deletion and queue claiming.</p>
        </div>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Unit Testing (node:test)
        </h2>
        <p>
          We use the native Node.js test runner (<code>node:test</code>) instead of Jest or Vitest. This results in zero configuration, instant execution, and no dependency overhead. Tests are strictly colocated in <code>__tests__</code> directories within each feature slice.
        </p>
        
        <Callout type="warning" title="No Database in Unit Tests">
          Unit tests never touch the database. If a test requires Prisma, it is an integration test and belongs in the isolated <code>/tests/integration</code> directory at the root, ensuring the unit test suite remains blisteringly fast.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Schema-Bound Integration Testing
        </h2>
        <p>
          Integration tests run against a real, isolated PostgreSQL database container. They don't just test basic CRUD operations; they enforce the system's hardest architectural invariants against future regression.
        </p>
        
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>GDPR Deletion Exhaustiveness:</strong> A test actively reflects on the Prisma schema metadata. If a developer adds a new table with a relation to <code>User</code> but forgets to add it to the <code>accountDeletion.workflow.ts</code> cascade transaction, the test suite instantly fails.</li>
          <li><strong>Cron Job Drift:</strong> A test enforces that the internal <code>constants/jobs.ts</code> registry perfectly mirrors the deployment <code>vercel.json</code> file, guaranteeing that a new cron job is never deployed without a backing handler, or vice-versa.</li>
          <li><strong>Mail Queue Concurrency:</strong> Tests simulate concurrent cron invocations to guarantee that the <code>FOR UPDATE SKIP LOCKED</code> queue mechanism never double-sends a transactional email.</li>
        </ul>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          ESLint Boundary Enforcement
        </h2>
        <p>
          The 5-tier architecture is actively enforced by <code>eslint-plugin-import</code> zone rules. For example, if a developer in <code>src/components</code> (Tier 3) attempts to import directly from a database repository in <code>src/features</code> (Tier 1), the build fails. This prevents the codebase from deteriorating into a big ball of mud.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
