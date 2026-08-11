import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata: Metadata = { title: "Scheduled Jobs" };

export default function ScheduledJobsPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Scheduled Jobs</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          How background tasks are orchestrated around execution limits.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy has 14 robust background cron jobs for syncing emails, polling ATS boards, draining mail queues, and cleaning up stale accounts.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Vercel Limitation Bypass
        </h2>
        <p>
          The <code>vercel.json</code> file defines the crons. However, Vercel's Hobby plan rejects any cron expression that would fire more than once a day. The deployment literally fails if you try to deploy a sub-daily cron on a Hobby account. Because of this, the <code>vercel.json</code> expressions are essentially "once-a-day backstops".
        </p>
        <p>
          To restore real cadence (e.g. syncing Gmail replies every 10 minutes, or draining the mail queue every minute), the endpoints accept a secure secret header:
        </p>
        <CodeBlock
          language="http"
          code={`Authorization: Bearer $CRON_SECRET`}
        />
        <p>
          This allows an external scheduler to ping the endpoints securely at their intended frequency, bypassing Vercel's platform limits completely while keeping the jobs serverless.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Two-Write Lifecycle
        </h2>
        <p>
          Every job is wrapped by a strict <code>cronHandler()</code> function that orchestrates the <code>JobRun</code> audit log. Because serverless functions are unceremoniously killed when they hit their execution ceiling, a killed function cannot record its own failure.
        </p>
        <p>
          To solve this, the wrapper explicitly issues <strong>two writes per run</strong>:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>It writes a <code>running</code> status <em>before</em> the handler executes.</li>
          <li>It writes <code>success</code> or <code>failed</code> after completion.</li>
        </ol>
        <p>
          A dedicated reaper job (<code>/api/cron/purge-stale</code>) sweeps the database for old <code>running</code> rows and safely marks them as <code>timeout</code>, cleanly distinguishing a platform execution kill from a code-level exception.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Manual Invocation
        </h2>
        <p>
          When an admin runs a job manually from the Monitoring dashboard (<code>POST /api/admin/monitor/jobs/[job]/run</code>), the system makes an internal HTTP call to the job's public route rather than importing the handler directly.
        </p>
        <p>
          This ensures the manual run traverses the exact same middleware and <code>cronHandler()</code> instrumentation as the automated scheduler. There is no SSRF surface because the requested job key is strictly validated against the internal <code>CRON_JOBS</code> registry before the HTTP call is constructed.
        </p>

        <Callout type="note" title="Queue Concurrency">
          Jobs that pull from a queue (like the mail drain) use a <code>FOR UPDATE SKIP LOCKED</code> raw SQL query to claim rows. This structurally prevents two concurrent cron invocations from accidentally grabbing and double-sending the same message if their execution windows overlap.
        </Callout>
      </div>

      <PrevNextNav />
    </div>
  );
}
