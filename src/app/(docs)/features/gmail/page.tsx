import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Gmail Integration" };

export default function GmailIntegrationPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Gmail Integration</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Google OAuth, MIME generation, and Pub/Sub webhook synchronization.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>integrations-google</code> feature slice powers the core outreach engine. It owns the Google OAuth flow, raw MIME building for attachments, and the asynchronous webhook sync.
        </p>
        <Callout type="note" title="Architectural Naming">
          The folder is intentionally named <code>integrations-google</code> rather than nested as <code>integrations/google</code>. This enforces a flat architecture, ensuring that every zone glob and public-API path stays exactly one level deep.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Token Encryption (At-Rest)
        </h2>
        <p>
          When a user connects their Gmail account, the system creates a <code>GoogleAccount</code> row. 
          Both the refresh token and the access token are encrypted at rest using AES-256-GCM (via the <code>TOKEN_ENCRYPTION_KEY</code> environment variable).
        </p>
        <Callout type="warning" title="The 20260803 Migration">
          Historically, only the refresh token was encrypted while the <code>accessToken</code> remained plaintext. However, an access token carries the <em>full grant</em> (<code>gmail.send</code> + <code>gmail.readonly</code>) for up to an hour. A database dump could have allowed an attacker to read live mailboxes without needing to decrypt the refresh token. The 20260803 migration fixed this vulnerability by encrypting both.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Sending & MIME Construction
        </h2>
        <p>
          Unlike simple transactional emails, job outreach requires sending PDF resumes as attachments. The slice bypasses high-level abstractions and uses the <code>googleapis</code> package to construct and send raw Base64URL-encoded MIME messages natively. Because it routes through the Gmail API, sent emails are automatically placed in the user's actual "Sent" folder.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Pub/Sub Webhook Syncing
        </h2>
        <p>
          To track incoming replies, the platform relies on Google Cloud Pub/Sub. When the user's mailbox changes, Google fires a webhook payload to the system. 
        </p>
        <p>
          The <code>GoogleAccount</code> model tracks the <code>historyId</code> (a cursor for Gmail changes) and the <code>watchExpiration</code> timestamp. This allows the background cron job to incrementally fetch only the latest thread updates and synchronize them down into the platform's <code>EmailMessage</code> table.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
