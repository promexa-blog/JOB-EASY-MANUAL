import type { Metadata } from "next";
import { EditorialHeader, VisualSection, EditorialGrid, EditorialCol } from "@/components/ui/editorial";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  return (
    <div className="w-full">
      <EditorialHeader 
        label="System Design"
        title="Architecture"
        description="A strict 5-tier vertical slice monolith. No circular dependencies, no hidden state."
      />

      <VisualSection caption="The 5-Tier Dependency Flow">
        <div className="w-full bg-[var(--color-bg-elevated)] p-8 md:p-16 flex flex-col gap-6 font-mono text-sm border-b border-[var(--color-border)]">
          
          <div className="flex items-center gap-4 group">
            <div className="w-48 text-right font-medium text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">0. Composition</div>
            <div className="flex-1 h-16 rounded border-2 border-dashed border-[var(--color-border-strong)] flex items-center justify-center bg-[var(--color-bg-subtle)] group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)] transition-all">
              <span className="text-[var(--color-fg)]">Routing & Layouts (app/**)</span>
            </div>
          </div>
          
          <div className="flex justify-center text-[var(--color-border-strong)]">↓</div>

          <div className="flex items-center gap-4 group">
            <div className="w-48 text-right font-medium text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">1. Features</div>
            <div className="flex-1 h-20 rounded border border-[var(--color-border-strong)] flex flex-wrap items-center justify-center gap-2 bg-[var(--color-bg-elevated)] group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)] transition-all p-4 shadow-sm">
              <span className="px-3 py-1 bg-[var(--color-bg-muted)] rounded text-[var(--color-fg)]">auth</span>
              <span className="px-3 py-1 bg-[var(--color-bg-muted)] rounded text-[var(--color-fg)]">monitoring</span>
              <span className="px-3 py-1 bg-[var(--color-bg-muted)] rounded text-[var(--color-fg)]">subscriptions</span>
              <span className="text-[var(--color-fg-subtle)]">+ 20 more slices</span>
            </div>
          </div>

          <div className="flex justify-center text-[var(--color-border-strong)]">↓</div>

          <div className="flex items-center gap-4 group">
            <div className="w-48 text-right font-medium text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">2. Shared</div>
            <div className="flex-1 h-16 rounded border border-[var(--color-border-strong)] flex items-center justify-center bg-[var(--color-bg-elevated)] group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)] transition-all">
              <span className="text-[var(--color-fg)]">App-aware, domain-free (shared/**)</span>
            </div>
          </div>

          <div className="flex justify-center text-[var(--color-border-strong)]">↓</div>

          <div className="flex items-center gap-4 group">
            <div className="w-48 text-right font-medium text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">3. UI Kit</div>
            <div className="flex-1 h-16 rounded border border-[var(--color-border-strong)] flex items-center justify-center bg-[var(--color-bg-elevated)] group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)] transition-all">
              <span className="text-[var(--color-fg)]">Domain-free UI (components/**, hooks/**)</span>
            </div>
          </div>
          
          <div className="flex justify-center text-[var(--color-border-strong)]">↓</div>

          <div className="flex items-center gap-4 group">
            <div className="w-48 text-right font-medium text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">4. Foundation</div>
            <div className="flex-1 h-16 rounded border-2 border-[var(--color-border-strong)] flex items-center justify-center bg-[var(--color-bg-subtle)] group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)] transition-all shadow-inner">
              <span className="text-[var(--color-fg)] font-semibold">Publishable utilities (lib/**, config/**)</span>
            </div>
          </div>
        </div>
      </VisualSection>

      <EditorialGrid>
        <EditorialCol span={6}>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Vertical Slicing</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg mb-6">
            Unlike traditional MVC apps where all controllers live in one folder and all models in another, Job-Easy places everything related to a specific domain (e.g., <code>auth</code>) into a single folder. 
            This means the React hooks, Prisma repository calls, UI components, and API controllers for authentication all live together.
          </p>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Prisma Confinement</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg">
            Only <code>**/repositories/**</code> and <code>shared/db/*</code> may import Prisma. This strict isolation prevents Prisma from bleeding into the UI, controllers, or client bundles. Four lint-declared escape hatches exist for raw SQL, cross-feature workflows, model registries, and analytics.
          </p>
        </EditorialCol>
        <EditorialCol span={6}>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Dependency Rules</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg mb-6">
            Features cannot import from other features. If <code>monitoring</code> needs to know about <code>auth</code>, it must go through a strictly defined public barrel file (<code>index.ts</code> or <code>index.server.ts</code>). 
            There are only exactly four explicitly documented and isolated tier violations in the entire platform (e.g., analytics reading across domains).
          </p>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Admin is an Audience</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg">
            Admin code lives in <code>features/&lt;domain&gt;/admin/</code>, never in a global <code>features/admin/</code> folder. The admin panel is treated as an audience of the domain, retaining domain cohesion while utilizing isolated cross-user repositories to prevent tenant-isolation bugs.
          </p>
        </EditorialCol>
      </EditorialGrid>

      <div className="prose mt-12 mb-8">
        <Callout type="note" title="No Re-export Barrels">
          The repo has zero re-export barrels (except the exactly two designated feature indices: <code>index.ts</code> and <code>index.server.ts</code>). You must import files directly (e.g., <code>@/components/ui/button</code>). Never use <code>export *</code>.
        </Callout>
        
        <h2>Routing Rules</h2>
        <p>
          The <code>app/</code> directory is for routing only. Every <code>route.ts</code> simply guards the request and delegates the logic to a controller in the Feature Layer. Route modules export only HTTP handlers (<code>GET</code>, <code>POST</code>, etc.), never helpers or shared logic.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
