import { Sidebar, SidebarProvider } from "@/components/shared/admin-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
