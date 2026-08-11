import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  tags?: string[];
  href?: string;
}

export function FeatureCard({ title, description, icon, tags, href }: FeatureCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`group flex flex-col gap-5 border-t border-[var(--color-border-strong)] bg-transparent pt-6 pb-8 transition-all ${
        href ? "cursor-pointer hover:border-[var(--color-fg)]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-medium tracking-tight text-[var(--color-fg)] transition-colors ${href ? "group-hover:text-[var(--color-fg-muted)]" : ""}`}>
          {title}
        </h3>
        {icon && (
          <div className="text-[var(--color-fg-faint)] transition-colors group-hover:text-[var(--color-fg)]">
            {icon}
          </div>
        )}
      </div>
      
      <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">{description}</p>
      
      {tags && tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-fg-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
