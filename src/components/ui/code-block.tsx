"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "text", title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="group overflow-hidden rounded-lg border border-[var(--color-code-border)] shadow-xl shadow-black/10 my-10">
      {(title || language !== "text") && (
        <div className="flex items-center justify-between border-b border-[var(--color-code-border)] bg-[var(--color-code-header)] px-5 py-3">
          <span className="font-mono text-[12px] text-[var(--color-code-comment)]">
            {title || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded text-[var(--color-code-comment)] transition-colors hover:text-[var(--color-code-fg)] hover:bg-[var(--color-code-border)]"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-[var(--color-accent)]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <div className="overflow-x-auto bg-[var(--color-code-bg)] p-6">
        <pre className="font-mono text-[14px] leading-relaxed text-[var(--color-code-fg)]">
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-6 inline-block w-8 select-none text-right text-[var(--color-code-comment)]">
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
