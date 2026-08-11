"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";

interface SidebarProps {
  className?: string;
  onNavClick?: () => void;
}

export function Sidebar({ className = "", onNavClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={`flex flex-col gap-6 py-5 ${className}`} aria-label="Documentation">
      {navigation.map((group) => (
        <div key={group.title}>
          <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-fg-faint)]">
            {group.title}
          </h4>
          <ul className="flex flex-col">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavClick}
                    className={`flex items-center rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-fg)]"
                        : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
