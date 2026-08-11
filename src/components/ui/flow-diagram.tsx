import { ArrowDown } from "lucide-react";

interface FlowStep {
  label: string;
  description?: string;
  accent?: boolean;
}

interface FlowDiagramProps {
  title?: string;
  steps: FlowStep[];
}

export function FlowDiagram({ title, steps }: FlowDiagramProps) {
  return (
    <div className="my-12 w-full max-w-lg">
      {title && (
        <h4 className="mb-8 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-muted)]">
          {title}
        </h4>
      )}
      <div className="flex flex-col gap-0 relative">
        {/* Connecting line behind items */}
        <div className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-[var(--color-border-strong)]" />
        
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center relative z-10">
            <div
              className={`flex w-full flex-col rounded border px-6 py-4 transition-colors ${
                step.accent
                  ? "border-[var(--color-fg)] bg-[var(--color-fg)] text-[var(--color-bg)] shadow-md"
                  : "border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-[var(--color-fg)] hover:border-[var(--color-fg)] hover:shadow-sm"
              }`}
            >
              <span className={`text-sm font-medium ${step.accent ? "text-[var(--color-bg)]" : "text-[var(--color-fg)]"}`}>
                {step.label}
              </span>
              {step.description && (
                <span className={`mt-1 text-[13px] leading-relaxed ${step.accent ? "text-[var(--color-bg)]/80" : "text-[var(--color-fg-muted)]"}`}>
                  {step.description}
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex h-10 items-center justify-center bg-[var(--color-bg)] px-2 my-1 text-[var(--color-border-strong)] z-20">
                <ArrowDown className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
