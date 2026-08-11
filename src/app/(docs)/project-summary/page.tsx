import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Project Summary" };

export default function ProjectSummaryPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Project Summary</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          An overview of the Job-Easy platform, its core domains, and technology stack.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy is a complete application management platform designed to help job seekers discover, track, and apply to roles efficiently. 
          Originally built as a simple CRM, it has evolved into a highly scalable, decoupled architecture containing 23 independent feature slices and 59 database models. 
          It features automated job board polling, community-sourced global directories, and a native Gmail OAuth integration for precise MIME-threaded outreach.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Core Domains
        </h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[var(--color-fg)] mb-2">Discovery & Polling</h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              Users can upload private CSVs of companies, and opt-in to share them with the community. 
              The platform also features a robust automated discovery engine that polls ATS job boards to find live postings, utilizing a PostgreSQL <code>pg_trgm</code> GIN index for millisecond-latency fuzzy search.
            </p>
          </div>
          <div className="border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[var(--color-fg)] mb-2">Gmail API & Outreach</h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              We abandoned generic SMTP for a direct Gmail OAuth integration. The app manages AES-256-GCM encrypted refresh tokens and automatically synchronizes email threads with the user's Gmail inbox via Google Cloud Pub/Sub webhooks.
            </p>
          </div>
          <div className="border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[var(--color-fg)] mb-2">Application Tracking & Resumes</h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              Users track their specific applications and manage Cloudinary-hosted resumes. HMAC-signed share tokens allow for temporary, secure external resume views, while automated cron jobs clean up stale attachments.
            </p>
          </div>
          <div className="border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[var(--color-fg)] mb-2">Platform Administration</h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              A comprehensive admin layer handles user approvals, un-deletable audit logging via SetNull snapshots, support tickets, and platform health monitoring (including a custom circuit-breaker system for rate limits).
            </p>
          </div>
        </div>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Technology Stack
        </h2>
        <ul className="list-none pl-0 space-y-4 my-8">
          <li className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-sm font-semibold">1</div>
            <div>
              <strong className="text-[var(--color-fg)] block mb-1">Next.js 15 & React 19</strong>
              <p className="m-0 text-sm">App Router paradigm, strictly enforcing the boundary between client and server components using <code>server-only</code> and ESLint zones.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-sm font-semibold">2</div>
            <div>
              <strong className="text-[var(--color-fg)] block mb-1">Tailwind CSS 4</strong>
              <p className="m-0 text-sm">Using the latest engine for styling, with a highly customized dark/light mode design system built on CSS variables.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-sm font-semibold">3</div>
            <div>
              <strong className="text-[var(--color-fg)] block mb-1">Prisma & PostgreSQL 16</strong>
              <p className="m-0 text-sm">Managing 59 highly normalized models, utilizing raw SQL extensions for SKIP LOCKED queues and trigram searches.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-sm font-semibold">4</div>
            <div>
              <strong className="text-[var(--color-fg)] block mb-1">Node:Test</strong>
              <p className="m-0 text-sm">Lightning-fast unit testing with the native test runner, alongside isolated database-backed integration harnesses.</p>
            </div>
          </li>
        </ul>

        <Callout type="warning" title="Outdated Legacy Information">
          If you see references to NextAuth, generic SMTP configs, or a monolithic database in older documentation, those are outdated. The codebase was completely rebuilt into a decoupled 5-tier architecture to support enterprise-scale constraints.
        </Callout>
      </div>

      <PrevNextNav />
    </div>
  );
}
