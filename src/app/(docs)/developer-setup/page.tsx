import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { CodeBlock } from "@/components/ui/code-block";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Developer Setup" };

export default function DeveloperSetupPage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Developer Setup</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Getting Job-Easy running locally with its required services.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          1. Prerequisites
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Node.js:</strong> v22.x (LTS)</li>
          <li><strong>Database:</strong> PostgreSQL 16+ (running locally or via Docker)</li>
          <li><strong>Package Manager:</strong> npm (v10+)</li>
        </ul>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          2. Environment Variables
        </h2>
        <p>Copy the template and fill in the secrets:</p>
        <CodeBlock language="bash" code="cp .env.example .env" />
        
        <Callout type="warning" title="Cryptographic Keys Required">
          You must generate a secure 32-byte string for both <code>TOKEN_ENCRYPTION_KEY</code> (AES-256-GCM for OAuth) and <code>SESSION_SECRET</code>. 
          Use <code>openssl rand -hex 32</code> to generate these. Never commit these to version control.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          3. Database Initialization
        </h2>
        <p>Apply migrations and run the base seed (which creates the admin user and default system settings):</p>
        <CodeBlock language="bash" code="npm run db:reset" />

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          4. Generating Demo Data
        </h2>
        <p>
          To test the UI with realistic loads (like GIN index search latency), run the demo data seeder. This will insert 10,000+ rows 
          of companies, applications, and email logs.
        </p>
        <CodeBlock language="bash" code="node scripts/seed-demo-data.mjs" />
        
        <Callout type="warning" title="Do not run in Production">
          Never run the demo seeder against a production database. It intentionally bypasses Prisma validations to perform high-speed raw SQL bulk inserts.
        </Callout>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          5. Running the Application
        </h2>
        <p>Start the Next.js development server:</p>
        <CodeBlock language="bash" code="npm run dev" />
        <p>The application will be available at <code>http://localhost:3000</code>.</p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          6. External Services Checklist
        </h2>
        <p>For full functionality, you must configure:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Google Cloud Console:</strong> Create an OAuth Client ID for Web. Add <code>http://localhost:3000/api/auth/google/callback</code> to Authorized redirect URIs. To test Gmail Reply Sync locally, you will need a tool like <code>ngrok</code> to expose your localhost to Google Cloud Pub/Sub webhooks.</li>
          <li><strong>Cloudinary:</strong> Create a Cloudinary account, get the URL, and ensure your upload preset requires <code>authenticated</code> access (for strict HMAC share token validation on resumes).</li>
          <li><strong>Resend:</strong> Create an API key. In development, you can use Resend's test domain (which only sends to the verified owner address).</li>
        </ul>
      </div>

      <PrevNextNav />
    </div>
  );
}
