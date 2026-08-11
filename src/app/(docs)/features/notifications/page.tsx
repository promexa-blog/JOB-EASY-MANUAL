import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Notifications</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          In-app alerts, idempotency, collapsing, and system broadcasts.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>notifications</code> slice dictates what to tell a user and when. It owns the in-app notification centre, system-wide broadcasts, and user notification preferences.
        </p>

        <Callout type="warning" title="The Delivery Invariant">
          The <code>notify()</code> service function is designed to <strong>never throw</strong> for a delivery reason. A notification failing to send (e.g. database timeout or email enqueue failure) must not roll back the upstream action that triggered it. Notifications depend on the <code>mail</code> slice one-way to enqueue digests, but the mail slice never depends on notifications.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          UserNotification Invariants
        </h2>
        <p>
          The <code>UserNotification</code> model is heavily engineered to protect users from alert spam and to protect the database from race conditions.
        </p>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Collapsing (<code>groupKey</code>)</h3>
        <p>
          Instead of creating 40 separate rows if a user experiences 40 failed sends, the system uses a <code>groupKey</code> (e.g. <code>reply:{"<applicationId>"}</code>). If an unread notification with the same <code>groupKey</code> already exists within a specific time window, the system simply increments its <code>count</code> field.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Structural Idempotency (<code>dedupeKey</code>)</h3>
        <p>
          To prevent duplicate notifications from race conditions, producers can supply a strict <code>dedupeKey</code> (e.g. <code>reply:{"<gmailMessageId>"}</code>). 
        </p>
        <p>
          This uses a clever database trick: the schema applies a unique constraint on <code>@@unique([userId, dedupeKey])</code>. Because Postgres treats <code>NULL</code> values as distinct in a unique index, producers that don't need idempotency (and pass <code>null</code>) pay no penalty. But for strict events, this constraint <em>structurally</em> fixes live bugs—for example, preventing the Gmail cron job and the real-time Pub/Sub webhook from both firing a notification for the exact same incoming reply.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Rich Metadata</h3>
        <p>
          Every notification stores a JSON <code>metadata</code> blob containing the originating payload. This ensures the UI has all the necessary context to render rich, interactive alerts long after the event occurred.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Broadcasts
        </h2>
        <p>
          System-wide announcements are handled by the <code>Broadcast</code> model (categorized as <code>info</code>, <code>warning</code>, or <code>maintenance</code>). 
        </p>
        <p>
          Because creating a notification row for every single user on the platform would be devastating to the database, Broadcasts are a single row. The system only writes to the <code>BroadcastDismissal</code> join table when a user actively dismisses the banner, maintaining high performance at scale.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
