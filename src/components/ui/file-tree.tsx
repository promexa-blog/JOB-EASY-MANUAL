import "server-only";
import * as fs from 'fs';
import * as path from 'path';
import { File, Folder } from 'lucide-react';

interface FileTreeProps {
  basePath: string;
}

const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', '.turbo', '.vercel', 'coverage', '.swc']);

function buildTree(dirPath: string): React.ReactNode {
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(dirPath);
  } catch (e) {
    return null;
  }

  // sort directories first, then files
  const items = entries
    .map(name => {
      const fullPath = path.join(dirPath, name);
      let isDir = false;
      try {
        isDir = fs.statSync(fullPath).isDirectory();
      } catch (e) {}
      return { name, fullPath, isDir };
    })
    .filter(item => !IGNORE_DIRS.has(item.name))
    .sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });

  if (items.length === 0) return null;

  return (
    <ul className="pl-4 space-y-1 border-l border-[var(--color-border-subtle)] ml-2">
      {items.map(item => {
        if (item.isDir) {
          return (
            <li key={item.fullPath} className="mt-1">
              <details className="group" open={false}>
                <summary className="flex items-center gap-2 cursor-pointer text-[14px] text-[var(--color-fg)] hover:text-[var(--color-accent)] list-none font-medium">
                  <Folder className="w-4 h-4 text-[var(--color-fg-muted)] group-open:text-[var(--color-accent)] shrink-0" />
                  <span className="truncate">{item.name}</span>
                </summary>
                <div className="mt-1">
                  {buildTree(item.fullPath)}
                </div>
              </details>
            </li>
          );
        } else {
          // It's a file
          const vscodeUrl = `vscode://file/${item.fullPath.replace(/\\/g, '/')}`;
          return (
            <li key={item.fullPath} className="flex items-center gap-2 text-[14px] py-0.5">
              <File className="w-4 h-4 text-[var(--color-fg-subtle)] shrink-0" />
              <a href={vscodeUrl} className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:underline truncate">
                {item.name}
              </a>
            </li>
          );
        }
      })}
    </ul>
  );
}

export function FileTree({ basePath }: FileTreeProps) {
  return (
    <div className="font-mono bg-[var(--color-bg-subtle)] border border-[var(--color-border-strong)] rounded-lg p-4 overflow-auto max-h-[800px]">
      <style dangerouslySetInnerHTML={{ __html: `
        details > summary::-webkit-details-marker { display: none; }
      `}} />
      <details className="group" open={true}>
        <summary className="flex items-center gap-2 cursor-pointer text-[14px] text-[var(--color-fg)] hover:text-[var(--color-accent)] list-none font-medium mb-2">
          <Folder className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
          <span className="truncate">JOB-EASY Repository</span>
        </summary>
        <div className="mt-1">
          {buildTree(basePath)}
        </div>
      </details>
    </div>
  );
}
