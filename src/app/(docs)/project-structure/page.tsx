import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";

export const metadata: Metadata = { title: "Project Structure" };

export default function ProjectStructurePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Project Structure</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The physical layout of the repository and the anatomy of a vertical slice.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Job-Easy enforces strict dependency tiers. To maintain this, the <code>src/</code> directory is organized into distinct functional folders. Nothing is born in <code>shared/</code> or <code>components/</code>; code starts inside the feature that needs it and is only promoted outwards when a second, unrelated feature requires it.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Root Directory Map
        </h2>
        
        <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border-strong)] rounded-lg p-6 my-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-loose m-0 p-0 bg-transparent text-[var(--color-fg)]">
{`src/
├── app/               Tier 0: Next.js routing, layouts, and API route handlers
├── features/          Tier 1: The 23 vertical domain slices (e.g., auth, mail)
├── shared/            Tier 2: App-aware, domain-free logic (e.g., messaging, db)
├── components/        Tier 3: Domain-free UI kit (buttons, layout shells)
├── hooks/             Tier 3: Domain-free React hooks
├── providers/         Tier 3: Global React context providers
├── lib/               Tier 4: Publishable pure utilities (e.g., parsing, crypto)
├── config/            Tier 4: Deploy-time configuration and env parsing
├── emails/            Side-car: React Email templates
├── middleware/        Side-car: Edge runtime middleware
└── proxy.ts           Next.js middleware entrypoint`}
          </pre>
        </div>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Canonical Feature Shape
        </h2>

        <p>
          The <code>src/features/</code> directory contains exactly 23 completely flat feature slices. We never nest features two levels deep (e.g., it is <code>integrations-google</code>, not <code>integrations/google</code>). Below is the canonical anatomy of a single feature slice.
        </p>
        
        <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border-strong)] rounded-lg p-6 my-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-loose m-0 p-0 bg-transparent text-[var(--color-fg)]">
{`features/<name>/
├── README.md            what it owns, which models, invariants, dependencies
├── index.ts             CLIENT public API — safe for 'use client' components
├── index.server.ts      SERVER public API — imports 'server-only'
├── types/               Prisma-free Typescript interfaces and DTOs
├── constants/           Static configurations, sort maps, defaults
├── schemas/             Zod validation schemas
├── utils/               Pure functions (no I/O, no React)
├── server/
│   ├── repositories/    ONLY files in here may import Prisma
│   ├── mappers/         Map Prisma rows to pure DTOs
│   ├── services/        Business rules, orchestrations, throws AppError
│   ├── controllers/     NextRequest in, NextResponse out
│   ├── queries/         Optimized reads for React Server Components
│   └── jobs/            Cron job entry points
├── api/                 CLIENT fetch wrappers (use SWR / native fetch)
├── hooks/               Client state management; calls api/ wrappers
├── components/          Presentational (dumb) React components
├── containers/          Stateful (smart) React components
├── admin/               Admin-audience mini-slice (inherits domain logic)
└── __tests__/           Colocated node:test unit tests`}
          </pre>
        </div>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The 23 Feature Slices
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          <ul className="list-disc pl-4 space-y-2 m-0">
            <li><code>analytics</code></li>
            <li><code>applications</code></li>
            <li><code>audit</code></li>
            <li><code>auth</code></li>
            <li><code>companies</code></li>
            <li><code>company-discovery</code></li>
            <li><code>global-companies</code></li>
            <li><code>integrations-google</code></li>
            <li><code>landing</code></li>
            <li><code>legal</code></li>
            <li><code>locations</code></li>
            <li><code>mail</code></li>
            <li><code>monitoring</code></li>
            <li><code>newsletter</code></li>
            <li><code>notifications</code></li>
            <li><code>outreach</code></li>
            <li><code>resumes</code></li>
            <li><code>search</code></li>
            <li><code>settings</code></li>
            <li><code>shell</code></li>
            <li><code>subscriptions</code></li>
            <li><code>support</code></li>
            <li><code>users</code></li>
          </ul>
        </div>
      </div>

      <PrevNextNav />
    </div>
  );
}
