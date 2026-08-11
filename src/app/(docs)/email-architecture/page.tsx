import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Email Architecture" };

export default function EmailArchitecturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Dual Email Architecture</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Platform delivery, the six policy gates, and the modular admin surface.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy operates two entirely separate email systems. This strict physical separation prevents application outreach volume from damaging the platform's core transactional IP reputation, while ensuring recruiters reply directly to the candidate's actual inbox.
        </p>
      </div>

      <div className="not-prose grid gap-6 md:grid-cols-2 my-12">
        {/* User Outreach */}
        <div className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-sm">
          <div className="mb-4 inline-flex items-center self-start rounded-full bg-[var(--color-accent-subtle)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            User Outreach
          </div>
          <p className="text-sm text-[var(--color-fg-muted)] mb-6">
            Job applications sent by the user to recruiters and hiring managers.
          </p>
          
          <div className="flex flex-col gap-2 rounded bg-[var(--color-bg-subtle)] p-4 font-mono text-xs text-[var(--color-fg-subtle)]">
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Slice</span> <code>outreach</code> + <code>integrations-google</code></div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Transport</span> Gmail API</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Sender</span> The User's own Gmail account</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Auth</span> Per-user encrypted OAuth token</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Format</span> Raw MIME string (RFC 2822)</div>
          </div>
        </div>

        {/* Platform Mail */}
        <div className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 shadow-sm">
          <div className="mb-4 inline-flex items-center self-start rounded-full bg-[var(--color-info)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-info)]">
            Platform Mail
          </div>
          <p className="text-sm text-[var(--color-fg-muted)] mb-6">
            Transactional messages sent by the system to its own users (receipts, resets).
          </p>

          <div className="flex flex-col gap-2 rounded bg-[var(--color-bg-subtle)] p-4 font-mono text-xs text-[var(--color-fg-subtle)]">
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Slice</span> <code>mail</code></div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Transport</span> Resend</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Sender</span> The Platform Domain</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Auth</span> Environment API Key</div>
            <div className="flex items-center gap-2"><span className="w-16 font-semibold text-[var(--color-fg)]">Format</span> React Email (HTML)</div>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Platform Mail: The Queue and Policy Gates
        </h2>
        <p>
          Platform mail never fires synchronously. Calling <code>enqueue()</code> writes a <code>NotificationDelivery</code> row to the database. A cron job then periodically processes the queue.
        </p>
        
        <p>Before any message is handed to the transport layer, it must successfully pass six strict policy gates:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li><strong>Address presence:</strong> Does the user have a verified email?</li>
          <li><strong>Kill switch:</strong> Is the global <code>MAIL_ENABLED</code> flag set to false?</li>
          <li><strong>Non-production guard:</strong> Outside production, drops mail unless the recipient is explicitly in <code>MAIL_ALLOWED_RECIPIENTS</code>.</li>
          <li><strong>Suppression list:</strong> Did this address previously hard-bounce or complain?</li>
          <li><strong>User preferences:</strong> Did the user explicitly opt out of this specific notification category?</li>
          <li><strong>Anti-noise caps:</strong> Has the system sent too many messages of this exact category to this user recently?</li>
        </ol>

        <Callout type="tip" title="The enqueue() Invariant">
          <code>enqueue()</code> is designed to <em>never throw</em> for a delivery or policy reason. It only throws for a severe programmer error (like passing a bad template key). If a gate rejects a message, it simply returns a <code>suppressed</code> status. A delivery decision must never be treated as an exception that rolls back a database transaction.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Modular Admin Surface
        </h2>
        <p>
          There is no dedicated <code>/admin/email-settings</code> page anymore. The system splits concerns between the <code>settings</code> slice and the <code>mail</code> slice.
        </p>
        <p>
          The <code>mail</code> slice exports operational components (like <code>MailOperationsProvider</code>, <code>MailStatusBanner</code>, and <code>MailToolsBody</code>) via its <code>index.ts</code>. These are rendered as card <em>bodies</em> inside the global System Settings page.
        </p>
        <p>
          Crucially, every mail diagnostic operation (pause, resume, rotate, test-send) applies immediately. They do not wait for the global "Save changes" bar, preventing a trap where an admin clicks "Test Send" and expects it to respect unsaved changes in the draft.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
