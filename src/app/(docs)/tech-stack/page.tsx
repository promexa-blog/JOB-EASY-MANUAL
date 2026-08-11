import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = { title: "Tech Stack" };

export default function TechStackPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Tech Stack</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The foundation and core infrastructure powering the Job-Easy platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <FeatureCard
          title="Next.js 16 & React 19"
          description="App Router architecture utilizing Server Components, strict route segment configuration, and integrated API endpoints. Boundary rules are enforced by 'server-only'."
        />
        <FeatureCard
          title="PostgreSQL & Prisma 6"
          description="Type-safe ORM layered over a Postgres database. We drop down to raw SQL for advanced features like GIN trigram search and 'FOR UPDATE SKIP LOCKED' job queues."
        />
        <FeatureCard
          title="Tailwind CSS v4 & Framer Motion"
          description="High-performance utility styling powered by the v4 engine, coupled with Framer Motion for fluid layout transitions and micro-animations."
        />
        <FeatureCard
          title="Google OAuth & React Email"
          description="Direct Gmail integration via the official 'googleapis' SDK. Transactional platform emails are built and rendered dynamically using '@react-email/components'."
        />
        <FeatureCard
          title="Zod & TypeScript 5"
          description="End-to-end type safety. Zod enforces strict schema validation and runtime parsing for all incoming API payloads, webhooks, and database mutations."
        />
        <FeatureCard
          title="Cloudinary Asset Storage"
          description="Secure cloud storage infrastructure for user resumes and attachments, heavily gated by signed URLs to ensure privacy and prevent public enumeration."
        />
        <FeatureCard
          title="Svix Webhooks"
          description="Cryptographically secure webhook signature verification used for safely receiving asynchronous events from external infrastructure providers."
        />
        <FeatureCard
          title="Native Node Testing"
          description="A zero-dependency test suite running entirely on the native 'node:test' runner and executed via 'tsx'. No Jest or Vitest required."
        />
      </div>

      <PrevNextNav />
    </div>
  );
}
