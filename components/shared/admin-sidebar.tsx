"use client";

import { useState, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Star,
  User,
  LogOut,
  ChevronLeft,
  Menu,
  ListOrdered,
  ToolCase,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/service/getMe";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

export function AdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const sidebarLinks: SidebarLink[] = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
      href: "/dashboard/admin",
    },
    {
      icon: <ToolCase className="w-5 h-5" />,
      label: "Gears",
      href: "/dashboard/admin/gears",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Orders",
      href: "/dashboard/admin/orders",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    // {
    //   icon: <Star className="w-5 h-5" />,
    //   label: "Reviews",
    //   href: "/dashboard/reviews",
    // },
    {
      icon: <User className="w-5 h-5" />,
      label: "Profile",
      href: "/account/profile",
    },
  ];

  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    toast.add({
      type: "success",
      description: "Logout",
    });
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 left-5 z-50 md:hidden p-2 hover:bg-accent hover:text-white rounded-lg transition-colors"
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-background border-r border-border transition-all duration-300 flex flex-col h-screen sticky top-0",
          " top-0 left-0 z-40 md:z-0 md:sticky md:top-0",
          isOpen ? "w-100 md:w-64" : "w-20",
        )}
      >
        <div className="flex flex-col h-full p-4 md:p-3">
          {/* Logo/Header */}
          <div className="mb-8 flex items-center justify-between">
            {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:block p-2 hover:bg-accent rounded-lg transition-colors"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                    "text-foreground",
                    hoveredLink === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  {isOpen && (
                    <span className="text-sm font-medium truncate">
                      {link.label}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className={cn(
              "w-full gap-3 justify-center",
              !isOpen && "p-0 h-10 w-10",
            )}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
}
