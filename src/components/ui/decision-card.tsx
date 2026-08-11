interface DecisionCardProps {
  title: string;
  context: string;
  decision: string;
  reasoning: string;
  tradeoffs?: string[];
}

export function DecisionCard({ title, context, decision, reasoning, tradeoffs }: DecisionCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 border-t border-[var(--color-border-strong)] py-8">
      <div className="md:w-1/3 shrink-0">
        <h3 className="text-lg font-medium text-[var(--color-fg)]">{title}</h3>
      </div>
      <div className="md:w-2/3 flex flex-col gap-6">
        <div>
          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg-faint)]">Context</span>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">{context}</p>
        </div>
        <div>
          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg)]">Decision</span>
          <p className="text-[15px] font-medium text-[var(--color-fg)] leading-relaxed">{decision}</p>
        </div>
        <div>
          <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg-faint)]">Why</span>
          <p className="text-[15px] text-[var(--color-fg-muted)] leading-relaxed">{reasoning}</p>
        </div>
        {tradeoffs && tradeoffs.length > 0 && (
          <div>
            <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg-faint)]">Trade-offs</span>
            <ul className="space-y-2">
              {tradeoffs.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[var(--color-fg-muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
