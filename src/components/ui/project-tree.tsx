"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react";

export interface TreeNode {
  name: string;
  description?: string;
  children?: TreeNode[];
}

interface ProjectTreeProps {
  data: TreeNode[];
  defaultExpanded?: number;
}

function TreeItem({ node, depth = 0, defaultExpanded = 1 }: { node: TreeNode; depth?: number; defaultExpanded?: number }) {
  const [expanded, setExpanded] = useState(depth < defaultExpanded);
  const [showInfo, setShowInfo] = useState(false);
  const isFolder = !!node.children?.length;

  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) setExpanded(!expanded);
          else setShowInfo(!showInfo);
        }}
        className={`group flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-[13px] transition-colors hover:bg-[var(--color-bg-subtle)] ${
          depth === 0 ? "font-medium" : ""
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={`h-3.5 w-3.5 shrink-0 text-[var(--color-fg-faint)] transition-transform ${
                expanded ? "rotate-90" : ""
              }`}
            />
            {expanded ? (
              <FolderOpen className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
            ) : (
              <Folder className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <FileText className="h-4 w-4 shrink-0 text-[var(--color-fg-faint)]" />
          </>
        )}
        <span className={isFolder ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]"}>
          {node.name}
        </span>
        {node.description && (
          <span className="ml-2 hidden truncate text-xs text-[var(--color-fg-faint)] group-hover:inline">
            {node.description}
          </span>
        )}
      </button>

      {showInfo && node.description && !isFolder && (
        <div
          className="ml-[calc(var(--depth-offset))] mt-1 mb-1 rounded border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-xs text-[var(--color-fg-muted)]"
          style={{ marginLeft: `${depth * 16 + 32}px` }}
        >
          {node.description}
        </div>
      )}

      {expanded && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={`${child.name}-${i}`} node={child} depth={depth + 1} defaultExpanded={defaultExpanded} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectTree({ data, defaultExpanded = 1 }: ProjectTreeProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-2">
        <span className="font-mono text-xs text-[var(--color-fg-subtle)]">Project Structure</span>
      </div>
      <div className="p-2">
        {data.map((node, i) => (
          <TreeItem key={`${node.name}-${i}`} node={node} defaultExpanded={defaultExpanded} />
        ))}
      </div>
    </div>
  );
}
