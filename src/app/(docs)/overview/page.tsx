import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="prose">
      <Breadcrumbs />
      <h1>Project Overview</h1>
      <p>
        <strong>Job-Easy</strong> is a production-grade, multi-tenant platform designed for job application outreach and tracking. Users can manage target companies across different locations, store resumes and email templates, and send highly personalized applications directly <strong>through their own Gmail accounts</strong>. The platform tracks every application as an ongoing conversation, automatically syncing replies from Gmail and moving candidates through a visual hiring pipeline.
      </p>

      <Callout type="note" title="Engineering Showcase">
        This documentation provides a comprehensive technical walkthrough of the architecture, data models, and features built into the platform for engineering evaluation purposes.
      </Callout>

      <h2>What the Platform Does</h2>

      <div className="not-prose grid gap-3 sm:grid-cols-2 my-6">
        {capabilities.map((c) => (
          <div key={c.title} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
            <h4 className="text-sm font-semibold text-[var(--color-fg)]">{c.title}</h4>
            <p className="mt-1 text-xs text-[var(--color-fg-muted)] leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>

      <h2>Multi-Tenant Architecture</h2>
      <p>
        The platform is fully multi-tenant, supported by a comprehensive administrative back-office. Registrations are gated by admin approval, and every database record is securely scoped by <code>userId</code>. Platform-wide behavior—such as branding, feature flags, quotas, subscription plans, legal documents, and the marketing site—is dynamically controlled from the database rather than hardcoded.
      </p>

      <h2>The Two Email Systems</h2>
      <p>
        Job-Easy explicitly separates <strong>user outreach</strong> (using the Gmail API to send applications directly from the user's account) from <strong>platform mail</strong> (using Resend for verification codes, security notices, and billing reminders). These two systems operate on completely different infrastructure, authentication methods, and delivery models.
      </p>

      <h2>Key Technical Characteristics</h2>
      <ul>
        <li>Strict vertical slice architecture containing 23 isolated domain features.</li>
        <li>59 relational database models featuring cascade-safe deletions and GIN trigram indexes.</li>
        <li>Cookie-based sessions with hashed tokens, built without reliance on third-party auth libraries.</li>
        <li>Server-side authorization enforced on every single route and API endpoint.</li>
        <li>Encrypted Google OAuth refresh tokens stored safely at rest.</li>
        <li>Private asset storage via Cloudinary, accessed exclusively through signed URLs.</li>
        <li>Snapshot-based history logs (e.g., EmailLog, Application) that safely survive edits and deletions.</li>
        <li>Database-backed system settings, feature flags, and versioned legal documents.</li>
        <li>Durable background job queues, automated cron scheduling, and robust system monitoring.</li>
      </ul>

      <PrevNextNav />
    </div>
  );
}

const capabilities = [
  { title: "Company Management", description: "Location-bucketed company lists with CSV import, deduplication, and a community-shared pool." },
  { title: "Email Outreach", description: "Template-based personalised emails sent through the user's own Gmail with resume attachment." },
  { title: "Application Tracking", description: "Pipeline from Sent → Replied → Interview → Offer/Rejected/Hired with Gmail thread sync." },
  { title: "Resume Management", description: "Multiple resumes with private Cloudinary storage, signed URLs, and shareable links." },
  { title: "Gmail Integration", description: "OAuth refresh tokens, Gmail API sending, and reply synchronisation via history ID." },
  { title: "Subscription System", description: "Plans, trials, UPI payments, admin verification, entitlement gates, and expiry reminders." },
  { title: "Admin Platform", description: "Full back-office for user approvals, subscriptions, templates, support, legal, and platform settings." },
  { title: "Monitoring & Ops", description: "Operations console tracking database health, queues, scheduled jobs, incidents, and API quotas." },
  { title: "Notifications", description: "In-app notification centre with categories, preferences, digests, broadcasts, and collapse grouping." },
  { title: "Analytics", description: "Dashboards with application stats, outreach charts, pipeline funnels, and conversion metrics." },
  { title: "Support Desk", description: "Threaded support tickets with attachments, internal notes, and SLA tracking." },
  { title: "Legal & Compliance", description: "Versioned policy documents, acceptance records with IP/UA tracking, and re-acceptance gates." },
  { title: "Global Search", description: "⌘K command palette with GIN trigram search across all user-owned entities." },
  { title: "Data Export", description: "GDPR-compliant ZIP export containing JSON records, CSVs, and actual resume files." },
  { title: "Marketing Site", description: "CMS-driven landing page with hero, features, testimonials, pricing, FAQ, and newsletter." },
  { title: "Account Lifecycle", description: "Two-phase deletion workflow with Google token revocation, Cloudinary purge, and farewell mail." },
  { title: "Global Company Pool", description: "Community-contributed company directory with moderation, quality scoring, and role matching." },
  { title: "Automated Discovery", description: "ATS board registry and poller that automatically discovers actively hiring companies." },
  { title: "Audit Log", description: "Immutable chronological record of administrative actions and critical system events." },
];
