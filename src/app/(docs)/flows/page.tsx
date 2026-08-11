import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { FlowDiagram } from "@/components/ui/flow-diagram";

export const metadata: Metadata = { title: "Request & System Flows" };

const authFlow = [
  { label: "Browser", description: "Request arrives" },
  { label: "Edge Middleware", description: "Cookie presence check (fast fail without DB)" },
  { label: "server/guards.ts", description: "Database session hash & expiry verification" },
  { label: "The Gate Chain", description: "Status → Maintenance → Subscription → Legal → Onboarding" },
  { label: "Execution", description: "Route handler or Server Component renders", accent: true },
];

const outreachFlow = [
  { label: "User", description: "Selects company, template, and resume" },
  { label: "MIME Builder", description: "Server parses template and constructs RFC 2822 payload" },
  { label: "Gmail API", description: "Sends email natively via user's OAuth token", accent: true },
  { label: "Database", description: "Writes EmailLog hard snapshot (immune to cascade deletes)" },
  { label: "Pipeline", description: "Creates or links Application with Gmail threadId" },
];

const replySyncFlow = [
  { label: "Pub/Sub Webhook", description: "Google pushes historyId delta notification" },
  { label: "Gmail History API", description: "Fetches explicit message changes since last sync" },
  { label: "Thread Matching", description: "Correlates new message threadIds to known Applications" },
  { label: "State Machine", description: "Updates Application status to 'Replied'", accent: true },
  { label: "Decoupled Alert", description: "notify() fires (failures here don't roll back the DB)" },
];

const deletionFlow = [
  { label: "Trigger", description: "User requests deletion OR Admin executes purge" },
  { label: "Workflow Lock", description: "Status transitions to 'deleting' (irreversible)" },
  { label: "OAuth Revoke", description: "Google access token actively revoked to prevent orphans", accent: true },
  { label: "CDN Purge", description: "Cloudinary assets (resumes, avatars) permanently destroyed" },
  { label: "Database Cascade", description: "Transactions delete User row and associated models" },
];

export default function FlowsPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Request & System Flows</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The exact data pathways for the platform's most critical operations.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy relies on strict pipelines for core operations. These flow diagrams illustrate how data moves through the application, highlighting the specific fail-safes and architectural invariants at each step.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 not-prose my-12">
        <FlowDiagram title="Authentication & Guard Chain" steps={authFlow} />
        <FlowDiagram title="User Outreach Sending" steps={outreachFlow} />
        <FlowDiagram title="Gmail Reply Synchronization" steps={replySyncFlow} />
        <FlowDiagram title="Account Deletion Pipeline" steps={deletionFlow} />
      </div>

      <PrevNextNav />
    </div>
  );
}
