import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Database, Globe, Mail, Shield, Layers, Code2 } from "lucide-react";
import { EditorialGrid, EditorialCol } from "@/components/ui/editorial";

const metrics = [
  { value: "23", label: "Feature Slices", description: "Vertical-slice architecture" },
  { value: "59", label: "Models", description: "PostgreSQL + Prisma 6" },
  { value: "128", label: "API Routes", description: "REST, guarded & typed" },
  { value: "v16", label: "Next.js", description: "App Router, React 19" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center w-full overflow-hidden">
      
      {/* ── Asymmetric Hero Section ────────────────────────────────────────────── */}
      <section className="relative w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 pt-12 pb-16 md:pt-20 md:pb-20 animate-fade-in border-b border-[var(--color-border-muted)]">
        
        <div className="grid-editorial items-center">
          
          {/* Left Column: Typography */}
          <div className="col-span-12 lg:col-span-5 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-subtle)] bg-[var(--color-accent-muted)] px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--color-accent)] uppercase mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Technical Case Study
            </div>

            <h1 className="text-5xl font-semibold tracking-tighter text-[var(--color-fg)] sm:text-7xl lg:text-[5.5rem] leading-[1.1] mb-2">
              JOB-EASY
            </h1>
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl italic text-[var(--color-fg-muted)] tracking-normal mt-0 mb-6">
              Engineering Manual
            </h2>

            <p className="mt-4 max-w-lg text-lg text-[var(--color-fg-muted)] sm:text-xl leading-relaxed">
              A production-grade platform for job outreach, applications and tracking. Built with strict architectural boundaries.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/overview"
                className="flex h-12 items-center gap-2 rounded border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-6 text-sm font-medium text-[var(--color-fg)] transition-all hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-accent)]"
              >
                Explore Manual
                <ArrowRight className="h-4 w-4 text-[var(--color-accent)]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Dominant Visual */}
          <div className="col-span-12 lg:col-span-7 mt-16 lg:mt-0 relative">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] shadow-2xl shadow-black/10 dark:shadow-black/50 transform lg:translate-x-12 xl:translate-x-20 transition-transform duration-700 hover:-translate-y-2">
              <div className="flex h-10 w-full items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 rounded-t-xl">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="w-full h-full bg-[var(--color-bg)] flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="/images/user_dashboard.png"
                  alt="Requires Image: /images/user_dashboard.png"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-accent-subtle)] to-transparent blur-3xl -z-10 opacity-50" />
          </div>

        </div>
      </section>

      {/* ── Premium Metrics Card ──────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 pt-8 pb-16">
        <div className="relative w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-muted)]/30 p-1.5 shadow-2xl shadow-black/5 dark:shadow-black/40 backdrop-blur-xl">
          {/* Subtle ambient glow behind the card */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/10 blur-xl -z-10 opacity-0 transition-opacity duration-700 hover:opacity-100" />
          
          <div className="w-full overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
            <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-px bg-[var(--color-border)]">
              {metrics.map((m) => (
                <div 
                  key={m.label} 
                  className="relative flex flex-col justify-center bg-[var(--color-bg-elevated)] px-6 sm:px-10 lg:px-12 py-14 transition-all duration-500 hover:bg-[var(--color-bg-subtle)] group h-full overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top highlight line that appears on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-0" />

                  <span className="relative z-10 font-mono text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--color-fg)] mb-5 tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {m.value}
                  </span>
                  
                  <div className="relative z-10 flex items-center gap-2 mb-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)] group-hover:bg-[var(--color-accent)] transition-colors duration-300 shadow-[0_0_8px_rgba(37,99,235,0)] group-hover:shadow-[var(--color-accent)]" />
                    <span className="text-xs font-semibold text-[var(--color-fg)] uppercase tracking-widest">{m.label}</span>
                  </div>
                  
                  <span className="relative z-10 text-[13px] text-[var(--color-fg-muted)] leading-relaxed">{m.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── User Features Header ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-16 text-center border-t border-[var(--color-border-strong)] mt-8 mb-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-fg)]">
          User Experience
        </h2>
        <p className="mt-4 text-lg text-[var(--color-fg-muted)] max-w-2xl mx-auto">
          Powerful tools designed to streamline your job search and give you an unfair advantage.
        </p>
      </section>

      {/* ── UI Showcase: Outreach Composer ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Template Editor
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Build dynamic, reusable email structures with a powerful formatting engine. Instantly see how your outreach looks with real-time variable injection and live split previews.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Drag-and-Drop Placeholders
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Split Preview
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Rich Text Formatting
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/template_editor.png"
                alt="Requires Image: /images/template_editor.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Location Intelligence ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/location.png"
                alt="Requires Image: /images/location.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Location Intelligence
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Target your job search with pinpoint accuracy. Our granular location engine supports country, state, and city-level filtering to match you with opportunities exactly where you want to be.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Granular Region Selection
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Multi-location Targeting
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Global Discovery Routing
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Company Management ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Company Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Manage your target companies effortlessly. Build your directory manually or import thousands of records instantly using our powerful CSV uploader.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Bulk CSV Import
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Custom Tech Stack Tagging
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Advanced Filtering & Search
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/company.png"
                alt="Requires Image: /images/company.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Application Delivery ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-emerald-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/application_sending.png"
                alt="Requires Image: /images/application_sending.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Application Delivery
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Send tailored applications with just a few clicks. Seamlessly pair your custom message templates with the perfect resume variant, all routed directly through your connected Gmail account.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Template Selection
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Resume Variant Matching
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Native Gmail Integration
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Support Helpdesk ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Support Helpdesk
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                The internal admin view for resolving user tickets, embedded directly into the platform without requiring a third-party CRM.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Embedded Admin View
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  User Ticket Resolution
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Zero 3rd-Party Dependencies
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-emerald-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/support_helpdesk.png"
                alt="Requires Image: /images/support_helpdesk.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Resume Management ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/resume.png"
                alt="Requires Image: /images/resume.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Resume Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Easily upload and manage your tailored resumes. Set a default CV for quick applications or choose specific variants for different roles.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Custom Resume Uploads
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Default CV Selection
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Role-specific Variants
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: User Profile Settings ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                User Profile Settings
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Integrated billing portal, OAuth connection manager, and personal preferences isolated by robust edge middleware constraints.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Integrated Billing Portal
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  OAuth Connection Manager
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Edge Middleware Security
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-emerald-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/user_profile.png"
                alt="Requires Image: /images/user_profile.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Subscription Management ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/subscription.png"
                alt="Requires Image: /images/subscription.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Subscription Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Flexible subscription plans tailored to your job search needs. Track your usage limits, upgrade plans seamlessly, and review your complete billing history.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Tiered Subscription Plans
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Usage Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Comprehensive Billing History
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Interactive Kanban Board ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Interactive Kanban Board
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Track every job application end-to-end with our intuitive Kanban interface. Seamlessly drag and drop applications across customizable pipeline stages from Sent to Hired.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Intuitive Drag and Drop
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Comprehensive Stage Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Visual Progress Overview
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-emerald-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/kanban_board.png"
                alt="Requires Image: /images/kanban_board.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-20">
        <div className="grid-editorial">
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--color-fg)] mt-0">
              Engineered for Scale
            </h2>
            <p className="mt-6 text-lg text-[var(--color-fg-muted)] leading-relaxed">
              Job-Easy abandons the traditional layered monolith in favor of a strict vertical-slice architecture. Every feature boundary is enforced by lint rules, ensuring the codebase remains pristine as it scales.
            </p>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[var(--color-accent)] hover:underline underline-offset-4"
            >
              Read the architecture deep-dive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 mt-12 md:mt-0 border-l border-[var(--color-border)] pl-8">
             <div className="space-y-12">
               <div>
                 <h3 className="text-xl font-medium text-[var(--color-fg)] flex items-center gap-3 mt-0">
                   <Layers className="h-5 w-5 text-[var(--color-fg-muted)]" />
                   Strict Feature Isolation
                 </h3>
                 <p className="mt-3 text-[var(--color-fg-muted)] leading-relaxed">
                   23 independent feature slices. No circular dependencies. The UI, Server, and Data layers are explicitly separated and enforced.
                 </p>
               </div>
               <div>
                 <h3 className="text-xl font-medium text-[var(--color-fg)] flex items-center gap-3 mt-0">
                   <Database className="h-5 w-5 text-[var(--color-fg-muted)]" />
                   Resilient Data Layer
                 </h3>
                 <p className="mt-3 text-[var(--color-fg-muted)] leading-relaxed">
                   59 models backed by PostgreSQL. Implements partial unique indexes for alert debouncing and GIN trigram indexes for instantaneous global company search.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>


      {/* ── Admin Features Header ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-16 text-center border-t border-[var(--color-border-strong)] mt-12 mb-4">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-fg)]">
          Admin Capabilities
        </h2>
        <p className="mt-4 text-lg text-[var(--color-fg-muted)] max-w-2xl mx-auto">
          Comprehensive tools for managing users, monitoring health, and analyzing platform growth.
        </p>
      </section>

      {/* ── UI Showcase: Admin Dashboard ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Admin Dashboard
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Get a bird's-eye view of your entire platform. Monitor total users, active subscriptions, pending approvals, and key email delivery metrics in real-time.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Platform Metrics
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  User & Subscription Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Email Delivery Monitoring
                </li>
              </ul>
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
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Global Subscription Control ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_subscriptions.png"
                alt="Requires Image: /images/admin_subscriptions.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Global Subscription Control
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Oversee all user subscriptions, verify payments, and manage subscriber access. Instantly configure active plans and monitor platform revenue.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Tiered Plan Configuration
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Active Subscriber Metrics
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Revenue & Payment Verification
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Discovery Engine Monitoring ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Discovery Engine Monitoring
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Monitor the health and activity of automated company discovery sweeps. Track active boards, provider health, and AI validation metrics in real-time.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Automated Sweep Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Provider Health Monitoring
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  AI Validation Configuration
                </li>
              </ul>
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
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: System Email Templates ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_system_emails.png"
                alt="Requires Image: /images/admin_system_emails.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                System Email Templates
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Manage and configure automated system communications. Customize wording and preview layouts for welcome sequences, account approvals, and password resets.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Centralized Template Library
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Live Subject & Content Preview
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Trigger Configuration
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Centralized Support Helpdesk ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Centralized Support Helpdesk
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Resolve user issues efficiently with a fully integrated support ticketing system. Track open tickets, assign priorities, and categorize requests by bug reports or feature enhancements.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Ticket Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Advanced Filtering & Categorization
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Priority Level Assignments
                </li>
              </ul>
            </div>
          </EditorialCol>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-l from-red-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_support.png"
                alt="Requires Image: /images/admin_support.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Reports & Analytics ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_reports.png"
                alt="Requires Image: /images/admin_reports.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Reports & Analytics
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Gain deep insights into your platform's growth and composition. Visualize user trends, application success rates, and email deliverability with detailed data exports.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Growth Trend Visualization
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Platform Composition Breakdown
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Comprehensive Data Exports
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Dynamic Site Editor ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Dynamic Site Editor
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Manage every section of your public marketing site in real-time. Toggle sections on or off, drag to reorder them, and edit content directly from the admin panel.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Layout Adjustments
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Drag-and-Drop Reordering
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Dynamic Section Toggles
                </li>
              </ul>
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
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Legal Pages Management ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_legal_pages.png"
                alt="Requires Image: /images/admin_legal_pages.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Legal Pages Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Centrally manage all policy documents including Privacy Policies and Terms & Conditions. Track document versions, enforce acceptance requirements, and control public visibility.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Version Control & Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Mandatory Requirement Toggles
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Public Visibility Settings
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Comprehensive Audit Logs ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Comprehensive Audit Logs
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Maintain complete oversight with detailed activity records. Filter through admin actions, user interactions, and login histories for strict security compliance.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  User & Admin Action Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Detailed Login History
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Advanced Security Filtering
                </li>
              </ul>
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
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Platform Monitoring & Health ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_monitor.png"
                alt="Requires Image: /images/admin_monitor.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Platform Monitoring & Health
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Keep a pulse on your platform's infrastructure. Monitor live activity, track application health, and receive alerts for degraded services before they impact users.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Real-time Infrastructure Status
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Live Activity & Session Tracking
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Automated Health Check Alerts
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Global System Settings ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12 bg-[var(--color-bg-subtle)]/30">
        <EditorialGrid>
          <EditorialCol span={5}>
            <div className="sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Global System Settings
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Configure platform-wide controls from a single unified interface. Manage identity, authentication providers, billing parameters, and security policies effortlessly.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Unified Configuration Interface
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Brand & Identity Management
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Security & Privacy Controls
                </li>
              </ul>
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
                quality={100}
              />
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>

      {/* ── UI Showcase: Centralized User Management ────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32 py-8 md:py-12">
        <EditorialGrid>
          <EditorialCol span={7}>
            <div className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] p-2 shadow-xl shadow-black/5 dark:shadow-black/40 aspect-[4/3] lg:aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-transparent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image 
                src="/images/admin_users.png"
                alt="Requires Image: /images/admin_users.png"
                fill
                className="object-contain rounded-lg opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                quality={100}
              />
            </div>
          </EditorialCol>
          <EditorialCol span={5}>
            <div className="pl-0 lg:pl-12 sticky top-32 pb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mt-0 mb-6">
                Centralized User Management
              </h2>
              <p className="text-lg text-[var(--color-fg-muted)] leading-relaxed mb-8">
                Take full control of your user base. Quickly search for accounts, manage access statuses, review recent logins, and enforce suspension or deactivation protocols.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Advanced Search & Filtering
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Status & Access Control
                </li>
                <li className="flex items-center gap-4 text-[var(--color-fg-muted)]">
                  <div className="h-[2px] w-5 bg-[#2563eb]" />
                  Detailed Account Insights
                </li>
              </ul>
            </div>
          </EditorialCol>
        </EditorialGrid>
      </section>



    </div>
  );
}
