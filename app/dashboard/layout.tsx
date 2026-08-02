import { Sidebar, SidebarProvider } from "@/components/shared/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
