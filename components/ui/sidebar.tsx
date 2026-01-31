"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Moon,
  LogOut,
} from "lucide-react";
import { menuSections } from "@/config/menus";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-background bg-base-300 shadow-sm border-divider transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-divider">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                L
              </span>
            </div>
            <span className="font-semibold text-lg">Ledger</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="btn ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {menuSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={cn("mb-6", isCollapsed && "mb-4")}
          >
            {!isCollapsed && (
              <div className="px-4 mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </p>
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <NextLink
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors",
                      "hover:bg-default-100",
                      active && "bg-primary/10 text-primary font-medium",
                      !active && "text-foreground",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        active && "text-primary",
                        !active && "text-default-600",
                      )}
                    />
                    {!isCollapsed && (
                      <span className={cn("text-sm", active && "font-medium")}>
                        {item.name}
                      </span>
                    )}
                  </NextLink>
                );
              })}
            </div>
            {sectionIndex < menuSections.length - 1 && !isCollapsed && (
              <div className="divider mt-4 mx-4" />
            )}
          </div>
        ))}
      </nav>

      {/* System Section */}
      <div className="border-t border-divider pt-4 pb-2">
        <div className="space-y-1">
          <NextLink
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors",
              "hover:bg-default-100 text-foreground",
              isActive("/settings") && "bg-primary/10 text-primary font-medium",
              isCollapsed && "justify-center px-2",
            )}
          >
            <Settings
              className={cn(
                "w-5 h-5",
                isActive("/settings") ? "text-primary" : "text-default-600",
              )}
            />
            {!isCollapsed && (
              <span
                className={cn(
                  "text-sm",
                  isActive("/settings") && "font-medium",
                )}
              >
                Settings
              </span>
            )}
          </NextLink>

          <div
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg",
              isCollapsed && "justify-center px-2",
            )}
          >
            <Moon className="w-5 h-5 text-default-600" />
            {!isCollapsed && (
              <>
                <span className="text-sm text-foreground flex-1">
                  Dark mode
                </span>
                {/* <button
                  isSelected={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  size="sm"
                  aria-label="Toggle dark mode"
                /> */}
              </>
            )}
            {isCollapsed && (
              // <Switch
              //   isSelected={isDarkMode}
              //   onChange={() => setIsDarkMode(!isDarkMode)}
              //   size="sm"
              //   aria-label="Toggle dark mode"
              // />
              <button />
            )}
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-divider p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  User Name
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Admin Manager
                </p>
              </div>
            </div>
            <button
              className="btn w-full justify-start"
              onClick={() => {
                // Handle logout
                console.log("Logout clicked");
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="avatar">
              <div className="w-24 rounded">
                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
              </div>
            </div>
            <button
              aria-label="Log out"
              onClick={() => {
                // Handle logout
                console.log("Logout clicked");
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
