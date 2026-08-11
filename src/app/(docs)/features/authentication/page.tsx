import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Authentication" };

export default function AuthenticationPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Authentication</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Custom credentials auth, explicit sessions, and robust identity lifecycle management.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy does <strong>not</strong> use third-party libraries like NextAuth or Auth.js. Instead, it relies on a bespoke, highly secure credentials-based authentication flow with explicitly modeled sessions.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Session Model & Hashing
        </h2>
        <p>
          When a user logs in, a <code>Session</code> record is created. The browser cookie receives a random secret token, but the database only ever stores a <strong>SHA-256 hash</strong> of that token (<code>tokenHash</code>).
        </p>
        <Callout type="note" title="Why hash session IDs?">
          Because the Active Sessions screen lists a user's other devices. If we stored the raw ID, an admin reading the database or a user viewing their devices could potentially expose live bearer tokens. Hashing the token makes it completely inert—safe to return, log, or embed in an RSC payload.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Route Guards & Status Enforcement
        </h2>
        <p>
          The authoritative check for a protected route is the <code>requireActiveUser</code> guard, which explicitly enforces the user's status. The session loader itself intentionally ignores status so that the application layout can still safely render an <code>&lt;AccountBlocked&gt;</code> screen for suspended users.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">The Status Vocabulary</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong><code>active</code></strong>: Normal operation.</li>
          <li><strong><code>pending</code></strong>: Awaiting admin approval after registration.</li>
          <li><strong><code>suspended</code> / <code>banned</code></strong>: Blocked by an administrator.</li>
          <li><strong><code>deactivated</code></strong>: A reversible pause initiated by the user.</li>
          <li><strong><code>deleting</code></strong>: An irreversible lock indicating the account is being asynchronously purged.</li>
        </ul>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Email Verification (OTP)
        </h2>
        <p>
          Job-Easy uses 6-digit OTP codes rather than magic links to support users opening the mail on a different device than the one they are signing up on. To prevent database collision attacks on the 6-digit space (since <code>sha256("123456")</code> is constant), the digest is explicitly salted with the user's ID (<code>hashScopedToken</code>) before being saved.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Account Deletion (Two-Phase Purge)
        </h2>
        <p>
          Deleting a user is a two-phase process designed to safely revoke all third-party grants without locking the user in a broken state.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-6">
          <li><strong>Phase 1 (Atomic):</strong> The account status flips to <code>deleting</code>. Active sessions are immediately destroyed and the user is logged out. A snapshot of their email and Google Refresh Token is taken.</li>
          <li><strong>Phase 2 (Async):</strong> A background job takes over to fire the farewell email, hit the Google API to revoke OAuth grants, purge private Cloudinary assets, and finally delete the database row.</li>
        </ul>

      </div>

      <PrevNextNav />
    </div>
  );
}
