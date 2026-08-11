"use client";

import { useState } from 'react';
import { Maximize, Minimize, ChevronRight } from 'lucide-react';
import treeData from '../../tree-data.json';

interface FileTreeProps {
  basePath?: string;
}

type FileNode = {
  name: string;
  isDir: boolean;
  path: string;
  children?: FileNode[];
};

const JOB_EASY_TREE = treeData as FileNode[];

const getFolderIconName = (name: string) => {
  const n = name.toLowerCase();
  if (n === 'src') return 'folder-src';
  if (n === 'app') return 'folder-app';
  if (n === 'components') return 'folder-components';
  if (n === 'config') return 'folder-config';
  if (n === 'public') return 'folder-public';
  if (n === 'prisma') return 'folder-prisma';
  if (n === 'scripts') return 'folder-scripts';
  if (n === 'tests' || n === '__tests__') return 'folder-test';
  if (n === 'docs') return 'folder-docs';
  if (n === '.github') return 'folder-github';
  if (n === 'emails') return 'folder-mail';
  if (n === 'hooks') return 'folder-hook';
  if (n === 'lib' || n === 'utils') return 'folder-lib';
  if (n === 'shared') return 'folder-shared';
  if (n === 'middleware') return 'folder-middleware';
  if (n === 'features') return 'folder-features';
  if (n === 'providers') return 'folder-provider';
  if (n === 'api') return 'folder-api';
  return 'folder-base';
};

const getFileIconName = (name: string) => {
  const n = name.toLowerCase();
  
  if (n === '.gitignore') return 'git';
  if (n === 'package.json' || n === 'package-lock.json') return 'npm';
  if (n === 'next.config.ts') return 'next';
  if (n === 'next-env.d.ts') return 'typescript-def';
  if (n === 'eslint.config.mjs' || n === '.eslintrc.json') return 'eslint';
  if (n === 'postcss.config.mjs') return 'postcss';
  if (n === 'tsconfig.json') return 'tsconfig';
  if (n === 'vercel.json') return 'vercel';
  if (n === 'readme.md') return 'readme';
  if (n === '.nvmrc') return 'nodejs';
  if (n.startsWith('.env')) return 'tune';
  
  if (n.endsWith('.tsx')) return 'react_ts';
  if (n.endsWith('.ts')) return 'typescript';
  if (n.endsWith('.jsx')) return 'react';
  if (n.endsWith('.js') || n.endsWith('.mjs') || n.endsWith('.cjs')) return 'javascript';
  if (n.endsWith('.json')) return 'json';
  if (n.endsWith('.md')) return 'markdown';
  if (n.includes('prisma')) return 'prisma';
  if (n.endsWith('.css')) return 'css';
  if (n.endsWith('.html')) return 'html';
  if (n.endsWith('.svg')) return 'svg';
  if (n.endsWith('.csv')) return 'table';
  
  return 'document';
};

function renderTree(nodes: FileNode[], rootPath: string, depth: number = 0): React.ReactNode {
  if (nodes.length === 0) return null;

  return (
    <ul className="flex flex-col">
      {nodes.map(item => {
        if (item.isDir) {
          const folderIcon = getFolderIconName(item.name);
          return (
            <li key={item.path} className="flex flex-col">
              <details className="group" open={false}>
                <summary 
                  className="flex items-center cursor-pointer text-[13px] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] list-none select-none h-[22px]"
                  style={{ paddingLeft: `${depth * 12 + 8}px` }}
                >
                  <ChevronRight className="w-4 h-4 shrink-0 text-[var(--color-fg-subtle)] transition-transform duration-100 group-open:rotate-90 mr-1" />
                  <img src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/${folderIcon}.svg`} className="w-4 h-4 shrink-0 mr-1.5" alt="folder" />
                  <span className="truncate leading-none pt-0.5">{item.name}</span>
                </summary>
                <div>
                  {renderTree(item.children || [], rootPath, depth + 1)}
                </div>
              </details>
            </li>
          );
        } else {
          // It's a file
          const fileIcon = getFileIconName(item.name);
          return (
            <li key={item.path} className="flex flex-col">
              <div 
                className="flex items-center cursor-pointer text-[13px] text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg)] h-[22px]"
                style={{ paddingLeft: `${depth * 12 + 28}px` }}
              >
                <img src={`https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons/${fileIcon}.svg`} className="w-4 h-4 shrink-0 mr-1.5" alt="file" />
                <span className="truncate leading-none pt-0.5">{item.name}</span>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}

export function FileTree({ basePath = '' }: FileTreeProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const rootPath = basePath ? basePath.replace(/\\/g, '/') : '';
  
  return (
    <>
      {isFullScreen && (
        <div 
          className="fixed inset-0 bg-[var(--color-bg-subtle)] z-40"
          onClick={() => setIsFullScreen(false)}
        />
      )}
      <div className={`font-sans bg-[var(--color-bg-subtle)] flex flex-col transition-all overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'h-[600px] max-h-[800px] rounded-lg border border-[var(--color-border-strong)]'}`}>
        <style dangerouslySetInnerHTML={{ __html: `
          details > summary::-webkit-details-marker { display: none; }
        `}} />
        
        <div className="flex items-center justify-between px-4 py-2 shrink-0 h-[35px]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-fg-muted)]">
            Job-Easy
          </div>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 hover:bg-[var(--color-bg-muted)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] rounded transition-colors"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4">
          {renderTree(JOB_EASY_TREE, rootPath, 0)}
        </div>
      </div>
    </>
  );
}
