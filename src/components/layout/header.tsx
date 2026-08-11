"use client";

import Link from "next/link";
import { Search, Github, ChevronDown, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { navigation } from "@/content/navigation";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onSearchOpen?: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="no-print sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24 2xl:px-32">
          
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5 transition-opacity">
              <span className="text-sm font-semibold tracking-tight text-[var(--color-fg)]">
                JOB-EASY
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navigation.map((group) => {
                const isActive = group.items.some((i) => pathname === i.href);
                return (
                  <div 
                    key={group.title}
                    className="group/nav relative"
                    onMouseEnter={() => setHoveredMenu(group.title)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button 
                      className={`flex h-14 items-center gap-1.5 px-3 text-[13px] font-medium transition-colors ${
                        isActive || hoveredMenu === group.title 
                          ? "text-[var(--color-fg)]" 
                          : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                      }`}
                    >
                      {group.title}
                      <ChevronDown className={`h-3 w-3 text-[var(--color-fg-subtle)] transition-transform duration-200 ${hoveredMenu === group.title ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown - Uses an invisible top padding bridge to prevent losing hover */}
                    {hoveredMenu === group.title && (
                      <div className="absolute left-0 top-full pt-2 z-50 animate-fade-in-up origin-top-left">
                        <div className="w-56 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/95 backdrop-blur-xl p-1.5 shadow-lg shadow-black/5 dark:shadow-black/20">
                          {group.items.map((item) => {
                            const isItemActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setHoveredMenu(null)}
                                className={`group/item flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] transition-all ${
                                  isItemActive 
                                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)] font-medium" 
                                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
                                }`}
                              >
                                <span>{item.title}</span>
                                {isItemActive && <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg)] opacity-50" />}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onSearchOpen}
              className="group flex h-8 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/50 px-2.5 text-[13px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
            >
              <Search className="h-3.5 w-3.5 text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg)] transition-colors" />
              <span className="hidden sm:inline-block pr-2">Search manual...</span>
              <kbd className="hidden rounded-[4px] border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-fg)] sm:inline-block">
                ⌘K
              </kbd>
            </button>

            <div className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />
            
            <div className="hidden items-center gap-1 sm:flex">
              <ThemeToggle />
              <a
                href="https://job-easy-umber.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-fg-subtle)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
                aria-label="Open App"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-fg-subtle)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm border-l border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-5">
              <span className="text-sm font-semibold tracking-tight text-[var(--color-fg)]">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-fg-subtle)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="flex flex-col gap-6">
                {navigation.map((group) => (
                  <div key={group.title} className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-fg-subtle)]">
                      {group.title}
                    </h4>
                    <div className="flex flex-col gap-1 border-l border-[var(--color-border)] ml-1 pl-3">
                      {group.items.map((item) => {
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`py-1.5 text-[13px] transition-colors ${
                              isItemActive 
                                ? "text-[var(--color-fg)] font-medium" 
                                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                            }`}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] p-5 flex items-center gap-4 bg-[var(--color-bg-subtle)]/30">
              <ThemeToggle />
              <div className="h-4 w-px bg-[var(--color-border)]" />
              <a
                href="https://job-easy-umber.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open Production App</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
