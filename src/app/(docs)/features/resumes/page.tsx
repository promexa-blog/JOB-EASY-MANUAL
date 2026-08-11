import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrevNextNav } from "@/components/layout/prev-next-nav";
import { Callout } from "@/components/ui/callout";

export const metadata: Metadata = { title: "Resumes" };

export default function ResumesFeaturePage() {
  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[var(--color-fg)]">Resumes</h1>
        <p className="text-xl text-[var(--color-fg-muted)] leading-relaxed">
          Secure object storage, signed URL delivery, and cryptographically safe public sharing.
        </p>
      </div>

      <div className="prose max-w-none text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          The <code>resumes</code> feature slice owns the uploading, versioning, and secure delivery of candidate resumes. Because these files contain highly sensitive PII (addresses, phone numbers, employment history), the slice enforces a strict security posture around asset delivery.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Secure Object Storage
        </h2>
        <p>
          The <code>Resume</code> model stores metadata like the original <code>fileName</code> and <code>mimeType</code>, but the file itself lives in a Cloudinary object storage bucket. 
        </p>
        <Callout type="warning" title="Authenticated-Only Storage">
          Resumes are uploaded to Cloudinary specifically as <code>authenticated</code> asset types. This means that if an attacker were to guess the <code>storageKey</code> and construct a bare Cloudinary URL, the CDN will explicitly return a <code>401 Unauthorized</code>. The file can <em>only</em> be downloaded via a short-lived signed URL minted server-side by our application.
        </Callout>
        
        <p>
          The standard <code>/api/resumes/[id]/download</code> route enforces strict session ownership. If the authenticated user does not own the resume, the request is instantly rejected before the storage key is even queried.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium tracking-tight text-[var(--color-fg)] border-b border-[var(--color-border-strong)] pb-4">
          Public Share Links
        </h2>
        <p>
          Often, users need to generate a link to share their resume externally. This is handled by a specialized <code>shareToken</code> mechanism.
        </p>
        <p>
          Historically, applications might attempt to use the row&apos;s database ID (like a CUID) as the public share URL (e.g. <code>/api/resumes/[cuid]/public</code>). <strong>This is dangerous.</strong> A CUID v1 is heavily composed of a millisecond timestamp, a counter, and a host fingerprint. They are predictable. If an attacker knew roughly when a resume was uploaded, they could enumerate CUIDs to scrape sensitive PII.
        </p>
        
        <h3 className="mt-8 mb-4 text-xl font-medium tracking-tight text-[var(--color-fg)]">The Cryptographic Token</h3>
        <p>
          To solve this enumeration vulnerability, the schema uses a dedicated <code>shareToken</code> field: 32 CSPRNG (Cryptographically Secure Pseudorandom Number Generator) bytes encoded as base64url. 
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Unguessable:</strong> True entropy prevents enumeration attacks.</li>
          <li><strong>Revocable:</strong> A user can disable the share link by simply nulling the <code>shareToken</code>, without having to delete the underlying resume.</li>
          <li><strong>Expirable:</strong> The token optionally supports an expiration timestamp (<code>shareExpiresAt</code>).</li>
        </ul>
        <p>
          The <code>/api/resumes/[token]/public</code> route is the <em>only</em> endpoint specifically exempted from the standard authentication proxy guard, allowing recruiters to download the asset securely without a session.
        </p>
      </div>

      <PrevNextNav />
    </div>
  );
}
