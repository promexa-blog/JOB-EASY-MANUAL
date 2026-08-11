import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";
import { FlowDiagram } from "@/components/ui/flow-diagram";

export const metadata: Metadata = { title: "Security" };

const gateChain = [
  { label: "Valid Session", description: "Hashed token verified against database" },
  { label: "User Status", description: "Must not be suspended, banned, or deactivated" },
  { label: "Maintenance Guard", description: "Blocks all non-admins if active" },
  { label: "Subscription Gate", description: "Requires active plan or trial (if enabled)" },
  { label: "Legal Acceptance", description: "Forces re-consent if policy version incremented" },
  { label: "Onboarding", description: "Forces completion of profile wizard" },
  { label: "Route Access", description: "Request reaches handler", accent: true },
];

export default function SecurityPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Security Architecture</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Defense-in-depth, cryptographic tokens, and strict tenant isolation.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy implements defense-in-depth, relying on strict server-side enforcement
          rather than client-side UI hiding.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Gate Chain
        </h2>
        <p>
          <code>app/(app)/layout.tsx</code> and every <code>/api/*</code> route enforce this strict sequence.
          Failing any step halts the chain. Admins are explicitly exempt from maintenance, subscription, legal, and onboarding gates so they can resolve global lockouts.
        </p>
      </div>
      
      <div className="not-prose my-12 flex justify-center">
        <FlowDiagram steps={gateChain} />
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Authentication & Sessions
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>No Third-Party Auth:</strong> The platform owns its identity store (no dependency on Auth0/Clerk).</li>
          <li><strong>Hashed Tokens:</strong> The browser cookie holds a random secret token; the database stores its SHA-256 hash. A stolen database dump cannot forge live sessions.</li>
          <li><strong>Immediate Revocation:</strong> Deleting a session row revokes access instantly on the next request.</li>
          <li><strong>bcrypt Limits:</strong> Passwords are hashed using bcrypt. The platform explicitly accounts for bcrypt's internal 72-byte ceiling to prevent silent truncation vulnerabilities.</li>
        </ul>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Data Protection
        </h2>
      </div>

      <div className="not-prose grid gap-4 sm:grid-cols-2 my-8">
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Encrypted OAuth Tokens</h4>
          <p className="mt-2 text-xs text-[var(--color-fg-muted)] leading-relaxed">Gmail refresh tokens are symmetrically encrypted at rest using AES-256-GCM. The decryption key never leaves the environment variables.</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Private Resumes & HMAC</h4>
          <p className="mt-2 text-xs text-[var(--color-fg-muted)] leading-relaxed">Resumes are stored as <code>authenticated</code> assets in Cloudinary. Public share links use strict cryptographic HMAC <code>shareTokens</code> to prevent IDOR attacks.</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Strict Tenant Isolation</h4>
          <p className="mt-2 text-xs text-[var(--color-fg-muted)] leading-relaxed">Every user-facing query enforces a <code>userId: session.user.id</code> clause in the WHERE statement, completely avoiding the dangerous fetch-then-compare anti-pattern.</p>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] p-4">
          <h4 className="text-sm font-semibold text-[var(--color-fg)]">Non-Production Mail Guard</h4>
          <p className="mt-2 text-xs text-[var(--color-fg-muted)] leading-relaxed">Platform mail in staging/dev silently drops or redirects all emails unless an explicit whitelist is configured, guaranteeing the platform never accidentally spams real users during testing.</p>
        </div>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Audit Logging
        </h2>
        <p>
          Every significant action—login, setting change, password reset, admin impersonation, or approval—writes an immutable <code>AuditLog</code> row. The admin settings PATCH endpoint dumps the entire diff into the audit log metadata.
        </p>

        <Callout type="warning" title="Secrets never go into SystemSetting">
          Because the settings patch writes its payload to the audit log, and the audit log is visible in the admin UI, storing API keys in <code>SystemSetting</code> would expose them in plain text to all admins. Secrets must only live in environment variables.
        </Callout>
      </div>

      <PrevNextNav />
    </div>
  );
}
