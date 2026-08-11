interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
}

export function MetricCard({ value, label, description }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded border border-[var(--color-border)] bg-transparent p-6 transition-colors hover:bg-[var(--color-bg-subtle)]">
      <span className="font-mono text-3xl font-medium tracking-tight text-[var(--color-fg)]">
        {value}
      </span>
      <div>
        <span className="block text-sm font-medium text-[var(--color-fg)]">{label}</span>
        {description && (
          <span className="block mt-1 text-xs text-[var(--color-fg-muted)] leading-relaxed">{description}</span>
        )}
      </div>
    </div>
  );
}
