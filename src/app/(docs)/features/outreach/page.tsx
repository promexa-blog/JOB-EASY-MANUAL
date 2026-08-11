import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Outreach" };

export default function OutreachFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Outreach</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The user's own job outreach: templates, sending, and immutable history.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>outreach</code> slice is the core engine for user-driven job applications. It owns the templates a user writes and the exact logging of what was sent to companies.
        </p>
        
        <Callout type="warning" title="Strict Separation from Mail">
          <strong>This slice is explicitly distinct from the <code>mail</code> slice.</strong><br/>
          The <code>outreach</code> slice uses the <code>integrations-google</code> Gmail OAuth grant to send mail directly <em>from the user&apos;s own inbox</em>. Conversely, the <code>mail</code> slice uses Resend (SMTP) to send transactional platform mail (like password resets) from our corporate domain. <strong>Never route one through the other.</strong>
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Data Model
        </h2>
        <p>
          The slice relies heavily on three core models: <code>EmailTemplate</code>, <code>EmailLog</code>, and <code>EmailMessage</code>.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Email Templates</h3>
        <p>
          User-authored templates (<code>EmailTemplate</code>) are split into a <code>header</code>, <code>content</code>, and <code>footer</code>. They support dynamic <code>{`{{placeholders}}`}</code> (like <code>companyName</code>, <code>hiringRoles</code>, or <code>senderName</code>) which are compiled and injected exactly at send time.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Immutable Email Logs</h3>
        <p>
          The <code>EmailLog</code> table tracks the outgoing dispatch of an application. It has foreign keys to the Template, Resume, and Application involved—but critically, all of these are explicitly <code>onDelete: SetNull</code>.
        </p>
        <p>
          Because of this, the log takes a <strong>hard snapshot</strong> of the <code>templateType</code>, <code>resumeName</code>, <code>companyName</code>, and <code>toEmail</code> at the exact moment of sending. If a user later deletes their resume or edits the template they used, the historical log of exactly what was sent on that day survives untouched.
        </p>
        <Callout type="note" title="Performance Optimization">
          Because <code>EmailLog</code> is the highest-volume table in the schema and uses <code>SetNull</code> foreign keys, explicit Postgres indexes (<code>@@index([templateId])</code>) were manually added. Without these, deleting a template would trigger a full table scan of the entire log history.
        </Callout>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Email Messages (Gmail Sync)</h3>
        <p>
          While the <code>EmailLog</code> tracks the singular <em>outgoing action</em>, the <code>EmailMessage</code> model is a raw replica of the Gmail conversation (subject, snippet, body, and <code>threadId</code>). These are synced asynchronously and cascade directly from the <code>Application</code> model, rendering the full chronological thread in the UI.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
