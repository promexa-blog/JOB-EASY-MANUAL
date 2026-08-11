import type { Metadata } from "next";
import { EditorialHeader, VisualSection, EditorialGrid, EditorialCol } from "@/components/ui/editorial";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { MermaidDiagram } from "@/components/ui/mermaid-diagram";

export const metadata: Metadata = { title: "Data Model" };

const connectedSchema = `
erDiagram
    %% CORE & IDENTITY
    User ||--o{ Session : "sessions"
    User ||--o| AccountDeletion : "deletes"
    User ||--o| SenderConfig : "config"
    User ||--o| GoogleAccount : "gmail"
    User ||--o{ AuditLog : "acts"
    User ||--o{ LoginEvent : "logins"
    User ||--o{ VerificationToken : "tokens"

    %% JOB TRACKING
    User ||--o{ CompanyList : "lists"
    User ||--o{ Resume : "resumes"
    User ||--o{ Application : "applies"
    CompanyList ||--o{ Company : "companies"
    Company ||--o{ Application : "applications"

    %% DISCOVERY
    User ||--o{ GlobalCompany : "contributes"
    User ||--o{ GlobalCompanyReport : "reports"
    User ||--o{ GlobalCompanyImport : "imports"
    GlobalCompany ||--o{ GlobalCompanyRole : "roles"
    GlobalCompany ||--o{ GlobalCompanyReport : "reports_fk"
    GlobalCompany ||--o{ GlobalCompanyImport : "imports_fk"
    AtsBoard |o--o| GlobalCompany : "produces"

    %% OUTREACH
    User ||--o{ EmailLog : "logs"
    User ||--o{ EmailTemplate : "templates"
    EmailTemplate ||--o{ EmailLog : "template_logs"
    Resume ||--o{ EmailLog : "resume_logs"
    Application ||--o{ EmailLog : "app_logs"
    Application ||--o{ EmailMessage : "messages"

    %% NOTIFICATIONS & COMMS
    User ||--o{ Broadcast : "creates"
    User ||--o{ BroadcastDismissal : "dismisses"
    User ||--o{ UserNotification : "receives"
    User ||--o{ NotificationDelivery : "deliveries"
    User ||--o{ NotificationPreference : "preferences"
    NotificationDelivery ||--o{ NotificationDeliveryEvent : "events"
    Broadcast ||--o{ BroadcastDismissal : "broadcast_dismissals"

    %% SUBSCRIPTIONS & PAYMENTS
    User ||--o| Subscription : "subscription"
    User ||--o{ PaymentRequest : "requests"
    SubscriptionPlan ||--o{ Subscription : "plan_subs"
    SubscriptionPlan ||--o{ PaymentRequest : "plan_requests"
    Subscription ||--o{ SubscriptionEvent : "events"

    %% SUPPORT
    User ||--o{ SupportTicket : "tickets"
    User ||--o{ TicketMessage : "authors"
    SupportTicket ||--o{ TicketMessage : "messages"
    TicketMessage ||--o{ TicketAttachment : "attachments"

    %% LEGAL & COMPLIANCE
    User ||--o{ LegalAcceptance : "accepts"
    LegalDocument ||--o| LegalDocumentVersion : "publishedVersion"
    LegalDocument ||--o{ LegalDocumentVersion : "versions"
    LegalDocument ||--o{ LegalAcceptance : "doc_acceptances"
    LegalDocumentVersion ||--o{ LegalAcceptance : "version_acceptances"

    %% SYSTEM
    User ||--o{ IncidentEvent : "acknowledges"
`;

const standaloneModels = [
  "DiscoveryRun", "JobRun", "HealthCheckResult", "DiscoveryAiCache", 
  "DiscoverySourceHealth", "RateCounter", "SystemSetting", "SubscriptionQrCode", 
  "EmailSuppression", "NotificationTemplate", "LandingSection", "LandingHero", 
  "LandingAnnouncement", "LandingNavItem", "LandingFeature", "LandingStep", 
  "LandingShowcase", "LandingBenefit", "LandingStat", "LandingTestimonial", 
  "LandingFaq", "LandingCta", "LandingTrustedLogo", "LandingSocialLink", 
  "LandingFooterLink", "LandingFooter", "LandingNewsletter", "LandingContact", 
  "LandingBusinessHour", "LandingSeo", "ContactMessage", "NewsletterSubscriber"
];

export default function DataModelPage() {
  return (
    <div className="w-full">
      <EditorialHeader 
        label="System Design"
        title="Data Model"
        description="The complete and exhaustive 69-model schema mapping for Job-Easy."
      />

      <VisualSection caption="Strict Entity Relationship Diagram (Complete Prisma Schema)">
        <div className="w-full bg-[var(--color-bg-elevated)] flex flex-col border-b border-[var(--color-border)]">
          {/* Connected Relational Graph (37 Models) */}
          <div className="w-full p-4 overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]">
            <MermaidDiagram chart={connectedSchema} />
          </div>

          {/* Standalone / Singleton Entities (32 Models) */}
          <div className="p-8 bg-[var(--color-bg-subtle)]">
            <h3 className="font-mono text-sm font-semibold text-[var(--color-fg)] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Standalone & CMS Models (No Direct Foreign Keys)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {standaloneModels.map((model) => (
                <div 
                  key={model} 
                  className="px-3 py-2 text-xs font-mono text-[var(--color-fg-muted)] border border-[var(--color-border-strong)] rounded bg-[var(--color-bg)] hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors truncate"
                  title={model}
                >
                  {model}
                </div>
              ))}
            </div>
          </div>
        </div>
      </VisualSection>

      <EditorialGrid>
        <EditorialCol span={6}>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Cascade Safeties & Snapshots</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg">
            Job-Easy uses deliberate <code>SetNull</code> foreign keys on critical auditing tables like <code>EmailLog</code> and <code>AuditLog</code>. Rather than relying on <code>Cascade</code> which would destroy historical records, the schema takes hard snapshots of data (like the template type, resume name, and company name) at the exact moment of execution, guaranteeing the log survives even if the upstream resource is deleted.
          </p>
        </EditorialCol>
        <EditorialCol span={6}>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-fg)]">Search Indexes</h3>
          <p className="text-[var(--color-fg-muted)] leading-relaxed text-lg">
            PostgreSQL GIN indexes with <code>gin_trgm_ops</code> are heavily utilized on high-volume string fields (like <code>Company</code> name, <code>Application</code> role, and <code>Resume</code> name) to provide millisecond-latency fuzzy search capabilities natively, completely eliminating the need for a separate Elasticsearch cluster.
          </p>
        </EditorialCol>
      </EditorialGrid>

      <PrevNextNav />
    </div>
  );
}
