import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = { title: "Features Overview" };

export default function FeaturesPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Features Overview</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Deep dives into the core subsystems that power Job-Easy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <FeatureCard
          title="Authentication"
          description="Custom bcrypt-based auth with explicitly modeled sessions, hashed tokens, and a complete Phase 2 account deletion workflow."
          href="/features/authentication"
        />
        <FeatureCard
          title="Global Companies"
          description="The community-sourced company directory. Features pg_trgm indices, automated deduplication, and a robust reporting mechanism."
          href="/features/global-companies"
        />
        <FeatureCard
          title="Automated Discovery"
          description="The ATS-polling engine. Understand how the system discovers live jobs, leverages AI caching, and manages circuit-breakers."
          href="/features/discovery"
        />
        <FeatureCard
          title="Gmail Integration"
          description="Native Google OAuth integration for sending outreach emails and syncing threads directly via the Gmail API."
          href="/features/gmail"
        />
      <FeatureCard
          title="Monitoring & Health"
          description="The operations console. Explores incident tracking and the honesty rule for upstream integration health."
          href="/features/monitoring"
        />
        <FeatureCard
          title="Subscriptions"
          description="Storage caps, trial logic, the 409 limit rejection, and billing history tracking."
          href="/features/subscriptions"
        />
        <FeatureCard
          title="Support Tickets"
          description="The native help desk, isolated internal notes, and dynamic feature flag enforcement."
          href="/features/support"
        />
      </div>

      <PrevNextNav 
        prev={{ title: "Tech Stack", href: "/tech-stack" }}
        next={{ title: "Authentication", href: "/features/authentication" }} 
      />
    </div>
  );
}
