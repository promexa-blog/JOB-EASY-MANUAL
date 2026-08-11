import { Info, AlertTriangle, Lightbulb, AlertCircle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "note" | "warning" | "tip" | "important";

const config: Record<CalloutType, { icon: LucideIcon; borderColor: string; bgColor: string; iconColor: string; label: string }> = {
  note: {
    icon: Info,
    borderColor: "border-[var(--color-border)]",
    bgColor: "bg-[var(--color-bg-subtle)]/50",
    iconColor: "text-[var(--color-fg)]",
    label: "Note",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
    iconColor: "text-amber-500",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
    iconColor: "text-emerald-500",
    label: "Tip",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-500",
    label: "Important",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "note", title, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`my-6 rounded-lg border ${c.borderColor} ${c.bgColor} p-4`}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`h-4 w-4 shrink-0 ${c.iconColor}`} />
        <p className={`text-sm font-medium ${c.iconColor}`}>{title || c.label}</p>
      </div>
      <div className="text-[13px] text-[var(--color-fg-muted)] leading-relaxed [&>p]:m-0 pl-6">
        {children}
      </div>
    </div>
  );
}
