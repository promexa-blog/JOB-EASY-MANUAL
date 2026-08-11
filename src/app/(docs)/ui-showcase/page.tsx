import type { Metadata } from "next";
import Image from "next/image";
import { EditorialHeader, VisualSection, EditorialGrid, EditorialCol } from "@/components/ui/editorial";
import { PrevNextNav } from "@/components/layout/prev-next-nav";

export const metadata: Metadata = { title: "UI Showcase" };

export default function UIShowcasePage() {
  return (
    <div className="w-full">
      <EditorialHeader 
        label="Design System"
        title="UI Showcase"
        description="Premium interfaces designed with intention, precision, and restrained aesthetics."
      />

      {/* Full-width Screenshot */}
      <div className="my-24">
        <h2 className="text-2xl font-medium mb-2 text-[var(--color-fg)]">Dashboard Overview</h2>
        <p className="text-lg text-[var(--color-fg-muted)] mb-8">A complete view of applications, outreach, and activity without overwhelming the user.</p>
        
        <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
          <div className="flex h-8 w-full items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 rounded-t-lg">
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-border-strong)]" />
          </div>
          <div className="aspect-[16/9] w-full bg-[var(--color-bg)] flex items-center justify-center border-t border-[var(--color-border)] relative overflow-hidden">
             <Image 
               src="/images/user_dashboard.png"
               alt="Requires Image: /images/user_dashboard.png"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
        </div>
      </div>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* Full-width Screenshot (Kanban) */}
      <div className="my-24">
        <h2 className="text-2xl font-medium mb-2 text-[var(--color-fg)]">Application Tracking Board</h2>
        <p className="text-lg text-[var(--color-fg-muted)] mb-8">Drag-and-drop kanban interface for visualizing pipeline velocity and interview stages.</p>
        
        <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden">
          <div className="aspect-[16/9] w-full bg-[var(--color-bg)] flex items-center justify-center rounded-lg border border-[var(--color-border)] relative overflow-hidden">
             <Image 
               src="/images/kanban_board.png"
               alt="Requires Image: /images/kanban_board.png"
               fill
               className="object-cover"
               unoptimized
             />
          </div>
        </div>
      </div>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 40/60 Split */}
      <EditorialGrid>
        <EditorialCol span={5}>
          <div className="sticky top-32">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Outreach Composer</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              The outreach composer integrates seamlessly with the Gmail API, offering full AI-assisted template generation without cluttering the viewport.
            </p>
            <ul className="space-y-4 text-[var(--color-fg-subtle)]">
              <li className="flex items-center gap-3">
                <span className="h-px w-4 bg-[var(--color-accent)]" />
                Rich Text Editor
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-4 bg-[var(--color-accent)]" />
                Live Variable Injection
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-4 bg-[var(--color-accent)]" />
                Contextual AI Prompts
              </li>
            </ul>
          </div>
        </EditorialCol>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[600px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/template_editor.png"
               alt="Requires Image: /images/template_editor.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 60/40 Split */}
      <EditorialGrid>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[600px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/admin_monitor.png"
               alt="Requires Image: /images/admin_monitor.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
        <EditorialCol span={5}>
          <div className="pl-8 pt-12">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Operations Console</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              Monitoring is built directly into the admin panel, providing real-time visibility into JobRuns, external integrations, and database health.
            </p>
            <p className="text-lg text-[var(--color-fg-subtle)] leading-relaxed">
              It uses a degraded-source model ensuring that a failure in one integration doesn't blindly report as zero usage.
            </p>
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 50/50 Split */}
      <EditorialGrid>
        <EditorialCol span={5}>
          <div className="sticky top-32">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Company Discovery</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              The global directory leverages pg_trgm GIN indexes for millisecond fuzzy search across millions of records.
            </p>
          </div>
        </EditorialCol>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[400px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/company.png"
               alt="Requires Image: /images/company.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 60/40 Split */}
      <EditorialGrid>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[400px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/resume.png"
               alt="Requires Image: /images/resume.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
        <EditorialCol span={5}>
          <div className="pl-8 pt-12">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Resume Manager</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              A secure interface for managing Cloudinary uploads, featuring one-click HMAC share token generation for external reviewers.
            </p>
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 50/50 Split */}
      <EditorialGrid>
        <EditorialCol span={5}>
          <div className="sticky top-32">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Support Helpdesk</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              The internal admin view for resolving user tickets, embedded directly into the platform without requiring a third-party CRM.
            </p>
          </div>
        </EditorialCol>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[400px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/support_helpdesk.png"
               alt="Requires Image: /images/support_helpdesk.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 60/40 Split */}
      <EditorialGrid>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[400px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/admin_reports.png"
               alt="Requires Image: /images/admin_reports.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
        <EditorialCol span={5}>
          <div className="pl-8 pt-12">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">Analytics Overview</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              Comprehensive telemetry for job seekers. Tracks application success rates, time-to-hire, and interview conversions securely.
            </p>
          </div>
        </EditorialCol>
      </EditorialGrid>

      <hr className="border-t border-[var(--color-border-muted)] my-24" />

      {/* 50/50 Split */}
      <EditorialGrid>
        <EditorialCol span={5}>
          <div className="sticky top-32">
            <h2 className="text-3xl font-medium mb-4 text-[var(--color-fg)] tracking-tight">User Profile Settings</h2>
            <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-6">
              Integrated billing portal, OAuth connection manager, and personal preferences isolated by robust edge middleware constraints.
            </p>
          </div>
        </EditorialCol>
        <EditorialCol span={7}>
          <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 h-[400px] flex items-center justify-center relative overflow-hidden">
             <Image 
               src="/images/user_profile.png"
               alt="Requires Image: /images/user_profile.png"
               fill
               className="object-cover rounded-lg"
               unoptimized
             />
          </div>
        </EditorialCol>
      </EditorialGrid>

      {/* ── Admin Features Header ────────────────────────────────────── */}
      <section className="w-full py-16 text-center border-t border-[var(--color-border-strong)] mt-12 mb-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-fg)]">
          Admin Capabilities
        </h2>
        <p className="mt-4 text-lg text-[var(--color-fg-muted)] max-w-2xl mx-auto">
          Comprehensive tools for managing users, monitoring health, and analyzing platform growth.
        </p>
      </section>

      {/* ── UI Showcase: Admin Dashboard ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 bg-[var(--color-bg-subtle)]/30 rounded-3xl mb-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8 pl-8 pt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Admin Dashboard
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Get a bird's-eye view of your entire platform. Monitor total users, active subscriptions, pending approvals, and key email delivery metrics in real-time.
              </p>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-indigo-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_dashboard.png"
                alt="Requires Image: /images/admin_dashboard.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Global Subscription Control ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 mb-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_subscriptions.png"
                alt="Requires Image: /images/admin_subscriptions.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-8 pt-8 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Global Subscription Control
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Oversee all user subscriptions, verify payments, and manage subscriber access. Instantly configure active plans and monitor platform revenue.
              </p>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Discovery Engine Monitoring ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 bg-[var(--color-bg-subtle)]/30 rounded-3xl mb-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8 pl-8 pt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Discovery Engine Monitoring
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Monitor the health and activity of automated company discovery sweeps. Track active boards, provider health, and AI validation metrics in real-time.
              </p>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-orange-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_discovery.png"
                alt="Requires Image: /images/admin_discovery.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: System Email Templates ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 mb-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_system_emails.png"
                alt="Requires Image: /images/admin_system_emails.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-8 pt-8 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                System Email Templates
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Manage and configure automated system communications. Customize wording and preview layouts for welcome sequences, account approvals, and password resets.
              </p>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Dynamic Site Editor ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 bg-[var(--color-bg-subtle)]/30 rounded-3xl mb-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8 pl-8 pt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Dynamic Site Editor
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Manage every section of your public marketing site in real-time. Toggle sections on or off, drag to reorder them, and edit content directly from the admin panel.
              </p>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-indigo-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_landing_page.png"
                alt="Requires Image: /images/admin_landing_page.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Legal Pages Management ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 mb-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_legal_pages.png"
                alt="Requires Image: /images/admin_legal_pages.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-8 pt-8 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Legal Pages Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Centrally manage all policy documents including Privacy Policies and Terms & Conditions. Track document versions, enforce acceptance requirements, and control public visibility.
              </p>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Comprehensive Audit Logs ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 bg-[var(--color-bg-subtle)]/30 rounded-3xl mb-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8 pl-8 pt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Comprehensive Audit Logs
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Maintain complete oversight with detailed activity records. Filter through admin actions, user interactions, and login histories for strict security compliance.
              </p>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-yellow-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_audit_logs.png"
                alt="Requires Image: /images/admin_audit_logs.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Platform Monitoring & Health ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 mb-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_monitor.png"
                alt="Requires Image: /images/admin_monitor.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-8 pt-8 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Platform Monitoring & Health
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Keep a pulse on your platform's infrastructure. Monitor live activity, track application health, and receive alerts for degraded services before they impact users.
              </p>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Global System Settings ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 bg-[var(--color-bg-subtle)]/30 rounded-3xl mb-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8 pl-8 pt-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Global System Settings
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Configure platform-wide controls from a single unified interface. Manage identity, authentication providers, billing parameters, and security policies effortlessly.
              </p>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-indigo-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_settings.png"
                alt="Requires Image: /images/admin_settings.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Centralized User Management ────────────────────────────────────── */}
      <section className="w-full py-8 md:py-12 mb-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_users.png"
                alt="Requires Image: /images/admin_users.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                unoptimized
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-8 pt-8 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Centralized User Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Take full control of your user base. Quickly search for accounts, manage access statuses, review recent logins, and enforce suspension or deactivation protocols.
              </p>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      <PrevNextNav />
    </div>
  );
}
