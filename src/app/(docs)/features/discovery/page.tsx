import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Automated Discovery" };

export default function DiscoveryPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Automated Discovery</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          The ATS polling engine, AI-caching, and circuit breakers.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Instead of relying entirely on user-uploaded CSVs, Job-Easy continuously polls Applicant Tracking Systems (ATS) like Greenhouse, Lever, Ashby, and SmartRecruiters to discover active job postings and infer company hiring status.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          ATS Polling Engine
        </h2>
        <p>
          The <code>AtsBoard</code> model manages the state of each discovered job board. It is NOT a configuration table; it is observed state. We store conditional request headers (<code>etag</code>, <code>lastModified</code>, <code>contentHash</code>) to aggressively cache requests and avoid unnecessary parsing when a company's job board hasn't changed.
        </p>
        <p>
          The poller features an adaptive schedule: a board posting weekly is not polled at the same cadence as one posting daily.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          AI Verdict Caching
        </h2>
        <p>
          To enrich discovered companies (e.g., guessing HR emails or classifying industries), we use AI models. Because the background cron spins up fresh lambdas on every run, an in-memory cache would be completely ineffective. 
        </p>
        <p>
          Instead, we use the <code>DiscoveryAiCache</code> table to memoize AI verdicts across runs. This is critical for <em>rejected</em> candidates—we cache the rejection so we never pay to ask the model about them again.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Circuit Breakers (DiscoverySourceHealth)
        </h2>
        <p>
          Cross-run health for each data source is tracked in the <code>DiscoverySourceHealth</code> table. If a source repeatedly returns 429s or 5xx errors, the circuit breaker trips, disabling the source (<code>disabledUntil</code>) so we don't hammer struggling APIs or burn compute time on doomed requests.
        </p>

      </div>

      <PrevNextNav 
        prev={{ title: "Global Companies", href: "/features/global-companies" }}
        next={{ title: "Gmail Integration", href: "/features/gmail" }} 
      />
    </div>
  );
}
