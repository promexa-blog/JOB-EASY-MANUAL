import type { ReactNode } from "react";

export function EditorialHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="w-full border-b border-[var(--color-border-strong)] pb-10 mb-10">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-[var(--color-fg-muted)] uppercase mb-4">
        <span className="h-px w-8 bg-[var(--color-border-strong)]" />
        {label}
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-fg)] mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

export function VisualSection({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <div className="my-16 w-full relative">
      <div className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/40">
        {children}
      </div>
      {caption && (
        <p className="mt-4 text-sm text-[var(--color-fg-subtle)] text-center font-mono">
          {caption}
        </p>
      )}
    </div>
  );
}

export function EditorialGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-16">
      {children}
    </div>
  );
}

export function EditorialCol({
  children,
  span = 6,
}: {
  children: ReactNode;
  span?: 4 | 5 | 6 | 7 | 8 | 12;
}) {
  const spanClasses = {
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };
  return <div className={`${spanClasses[span]}`}>{children}</div>;
}
