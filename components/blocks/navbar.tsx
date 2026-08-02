"use client";

import Link from "next/link";
import {
  Mountain,
  User,
  LayoutDashboard,
  UserCircle,
  LogOut,
} from "lucide-react";

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
import { getMe, logout } from "@/service/getMe";
import { toast } from "../ui/toast";

import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register", guestOnly: true },
  { label: "Login", href: "/login", guestOnly: true },
];

export function SiteNavbar({ user }: { user: any }) {
  const router = useRouter();

  console.log(user);

  const visibleLinks = navLinks.filter(
    (link) => !(user?.success && link.guestOnly),
  );
  console.log(visibleLinks);
  const handleLogout = async () => {
    await logout();
    toast.add({
      type: "success",
      description: "Logout",
    });
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-2">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="size-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">Gear Up</span>
        </Link>

        {/* Middle: Nav links */}
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

        {/* Right: Profile menu (opens on hover) */}
        {user.success && (
          <DropdownMenu openOnHover>
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
                <DropdownMenuItem render={<Link href="/profile" />}>
                  <UserCircle className="size-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  <LayoutDashboard className="size-4" />
                  Dashboard
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
      </nav>
    </header>
  );
}
