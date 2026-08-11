import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Support Tickets" };

export default function SupportTicketsPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Support Tickets</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The built-in help desk, privacy guards, and internal notes.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy has a native support ticket system allowing users to converse with admins without leaving the platform.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Feature Flag
        </h2>
        <p>
          The entire ticket system is governed by a single feature flag: <code>SystemSettings.ticketSystemEnabled</code> (off by default). This flag is enforced in <code>server/guards.ts</code>, which <em>every</em> route calls first. Hiding the sidebar entry and 404-ing the pages is just visual tidiness; the backend guard is the true control.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Privacy Invariants
        </h2>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Query-Level Ownership</h3>
        <p>
          A user must only ever see their own tickets. To guarantee this, user-facing queries take a <code>userId</code> and place it directly into the Postgres <code>WHERE</code> clause. The system deliberately avoids the "fetch-then-compare" anti-pattern, ensuring that a missing authorization check cannot accidentally leak another account's correspondence.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Internal Notes</h3>
        <p>
          Admins can leave <code>internal: true</code> notes on a user's ticket. 
        </p>
        <Callout type="warning" title="Query-level isolation">
          Internal notes are NOT just visually hidden from the user on the frontend. The server employs two entirely different database queries for the two audiences (<code>getUserTicket</code> vs <code>getAdminTicket</code>). The user query explicitly filters out internal notes (<code>internal: false</code>) at the database level, meaning the note is physically absent from the returned payload. No downstream serialization mistake can expose it.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Workflow
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Reopening:</strong> If a user replies to a resolved ticket, the ticket is instantly reopened. Requiring a new ticket for a follow-up discards the history of the problem, and users will naturally reply to the last message they see regardless.</li>
          <li><strong>Transactional Counters:</strong> Denormalized counters (like <code>messageCount</code>, <code>unreadForAdmin</code>, and <code>lastMessageAt</code>) are written <em>only</em> by specific service functions inside a database transaction. A message written without its counter bump would cause the sidebar badge to disagree with the thread.</li>
        </ul>

      </div>

      <PrevNextNav />
    </div>
  );
}
