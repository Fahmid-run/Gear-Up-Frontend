"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, Menu, Mountain, User, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/getMe";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export function SiteNavbar({ user }: any) {
  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Dashboard",
      href: `/dashboard/${user?.data?.role.toLowerCase()}`,
    },
    { label: "Register", href: "/auth/register", guestOnly: true },
    { label: "Login", href: "/auth/login", guestOnly: true },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const visibleLinks = user?.success
    ? navLinks.filter((link) => !["Register", "Login"].includes(link.label))
    : navLinks;

  const router = useRouter();

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    await logout();
    toast.add({
      type: "success",
      description: "Logout",
    });
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeSidebar}
        >
          <Mountain className="size-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">Gear Up</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user?.success && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-full md:inline-flex"
              aria-label="Open profile"
            >
              <User aria-hidden="true" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={
              isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
            {isSidebarOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {isSidebarOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 bg-foreground/20 md:hidden"
            aria-label="Close navigation menu"
            onClick={closeSidebar}
          />
          <aside
            id="mobile-navigation"
            className="absolute inset-x-0 top-16 border-b bg-background px-4 py-4 shadow-lg md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user?.success && (
                <li>
                  <Link
                    href="/account/profile"
                    onClick={closeSidebar}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    My Profile
                  </Link>
                </li>
              )}
              {user?.success && (
                <li>
                  <div
                    className="block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground  "
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </div>
                </li>
              )}
            </ul>
          </aside>

          {user.success && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Open profile menu"
                  />
                }
              >
                <User className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/account/profile" />}>
                    <UserCircle className="size-4" />
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <LogOut className="size-4"></LogOut>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </header>
  );
}
