import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Monitoring & Health" };

export default function MonitoringPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Monitoring & Health</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The operations console, the "honesty rule", and incident tracking.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy has a deeply integrated <code>monitoring</code> slice that acts as the platform's operations console. It monitors platform health, PostgreSQL, object storage, integrations, queues, and security.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Honesty Rule
        </h2>
        <p>
          A monitoring panel that reports <code>0 errors</code> because it lacks the credentials to connect is worse than having no panel at all—it converts an unknown into a false reassurance.
        </p>
        <p>
          To prevent this, every monitoring endpoint returns a strict <code>PanelEnvelope&lt;T&gt;</code>:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>ok:</strong> The system is healthy, the metric is real.</li>
          <li><strong>not_configured:</strong> A named credential is missing. This is considered a <code>skipped</code> state, NOT an outage, avoiding a permanently red dashboard for optional integrations.</li>
          <li><strong>unavailable:</strong> The upstream service actually failed.</li>
          <li><strong>unsupported:</strong> The capability doesn't exist on this deployment.</li>
        </ul>
        <Callout type="note" title="Degradation is per-source">
          If the PostgreSQL <code>pg_stat_statements</code> extension isn't installed, only the slow-query card degrades (showing <code>unsupported</code>). The rest of the database panel remains perfectly live.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Secret Redaction
        </h2>
        <p>
          Because failed probes can easily leak sensitive data (e.g. a Prisma error echoing the entire <code>DATABASE_URL</code>), the system relies on a double-redaction process via <code>utils/redact.ts</code>—once before serialization, and once in the JSON viewer. 
        </p>
        <p>
          The Infrastructure view only shows variable names, a boolean presence check, and lengths. Accessors are strongly typed so the raw value can never be leaked to the client, even by accident.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Job History (JobRun)
        </h2>
        <p>
          Every scheduled cron execution is recorded in the <code>JobRun</code> table. The system intentionally performs <strong>two writes per run</strong>: 
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>It writes <code>running</code> at the exact start of the job.</li>
          <li>It writes the final status (<code>success</code> or <code>failed</code>) at the end.</li>
        </ol>
        <p>
          Because serverless functions can be unceremoniously killed when hitting Vercel's execution ceiling, a killed function can't report its own failure. By writing <code>running</code> upfront, a background reaper (<code>/api/cron/purge-stale</code>) can later find these orphaned rows and correctly close them as <code>timeout</code>.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Manual Cron Invocation</h3>
        <p>
          When an admin triggers a job manually, the system makes an <strong>HTTP call to its own cron route</strong> rather than directly importing the handler. This ensures the manual run takes the exact same middleware and instrumentation path as the automated scheduler, producing an identical <code>JobRun</code> row. There is no SSRF surface because the path is strictly resolved against the internal <code>CRON_JOBS</code> registry.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The One Stream
        </h2>
        <p>
          Polling on Vercel is generally safer than Server-Sent Events (SSE). An open <code>EventSource</code> holds a serverless invocation open for its entire lifetime, billing continuously. Therefore, the SSE branch in <code>useLiveData</code> is switched off globally, and all panels poll driven by a single <code>MonitorRefreshProvider</code> clock.
        </p>
        <p>
          There is only one exception: <code>GET /api/admin/monitor/jobs/[job]/stream</code>. Because it only opens when an admin manually clicks "Run" and closes the exact moment the run finishes, it is strictly bounded and safe to use.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Incident Tracking (IncidentEvent)
        </h2>
        <p>
          The <code>/api/cron/health</code> worker is the <em>only</em> writer to the <code>HealthCheckResult</code> and <code>IncidentEvent</code> tables. 
        </p>
        <p>
          To prevent alert spam, the system enforces <strong>at most one open incident per condition</strong>. It leverages a partial unique index in Postgres:
        </p>
        <pre className="my-4 bg-[var(--color-canvas-subtle)] p-4 rounded-md overflow-x-auto text-sm text-[var(--color-fg)]">
          <code>CREATE UNIQUE INDEX ON "IncidentEvent"(key) WHERE "resolvedAt" IS NULL;</code>
        </pre>
        <p>
          Because Postgres treats <code>NULL</code> as distinct from <code>NULL</code>, a standard <code>@@unique</code> constraint wouldn't work. The partial index guarantees the database rejects duplicates at the engine level, so an alert condition that fires for 3 hours only sends one initial email, rather than flooding admin inboxes every minute.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
