import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Subscriptions" };

export default function SubscriptionsPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Subscriptions</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Storage limits, entitlement enforcement, and billing history.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>subscriptions</code> slice owns platform access, subscription tiers, trial periods, and strict storage caps for resources (like Resumes and Email sends). 
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          The Entitlement Guard
        </h2>
        <p>
          The <code>hasPlatformAccess</code> function is the single source of truth for platform lockouts. It evaluates the user's trial expiration, active subscription state, and admin toggles. If this guard returns false, the user is hard-redirected to the billing portal.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Storage Limit Enforcement
        </h2>
        <p>
          Beyond simple platform access, every tier defines strict numerical caps for resource creation. Paid tiers pull these from <code>SubscriptionPlan</code>, while users on a trial pull from <code>trialMax*</code> keys in <code>SystemSettings</code>.
        </p>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">The LimitMap Mechanism</h3>
        <p>
          The enforcement layer never sees a raw <code>SubscriptionPlan</code> model. It only sees a resolved <code>LimitMap</code>. This is because <code>state.plan</code> can be null in three scenarios: an active trial, an admin activation with no plan attached, or a plan deleted out from under a user (<code>onDelete: SetNull</code>). If the plan is null, the system safely maps the user to the trial limits, preventing a lapsed account from accidentally becoming unlimited.
        </p>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">The Central Registry</h3>
        <p>
          All limits are governed by a single registry in <code>constants/resourceLimits.ts</code>. A strict test (<code>__tests__/resourceLimits.test.ts</code>) parses <code>schema.prisma</code> as text to ensure the registry, the plan columns, and the system setting keys are perfectly aligned. 
        </p>
        <Callout type="note" title="Generated Plan Cards">
          Because the registry is the source of truth, the UI's pricing cards and feature bullets are dynamically generated directly from it. Marketing copy cannot promise a ceiling that the server does not actually enforce.
        </Callout>

        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">Enforcement Rules</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>0 means unlimited:</strong> Across the entire application, a limit of <code>0</code> strictly implies unlimited storage/actions. </li>
          <li><strong>Check before write:</strong> A limit check must run before any database write, including incidental ones (like uploading to Cloudinary or clearing a default flag). Rejecting afterwards leaves debris behind.</li>
          <li><strong>409 Limit Reached:</strong> When a user hits a cap, the API returns a <code>409 Conflict</code> (not a 429). A 429 implies a rate limit with a <code>Retry-After</code> window, but a hard storage cap never magically reopens until the user deletes resources or upgrades.</li>
        </ul>
        <Callout type="tip" title="Downgrades are safe">
          If a user with 50 saved companies downgrades to a tier that only allows 10, nothing is deleted. The UI will simply display their usage as <code>50 / 10</code>, and reject any <em>new</em> company creations.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Billing History
        </h2>
        <p>
          The system maintains a comprehensive timeline combining two interleaved streams:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>PaymentRequest:</strong> Manual records of proof-of-payments submitted by users and the admin's approval/rejection verdict.</li>
          <li><strong>SubscriptionEvent:</strong> The actual entitlement timeline (trial started, activated, renewed, expired, cancelled). This prevents silent expirations where a user suddenly loses access without a paper trail.</li>
        </ul>
      </div>

      <PrevNextNav />
    </div>
  );
}
