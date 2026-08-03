import { AdminSidebarProvider } from "@/components/shared/admin-sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminSidebarProvider>{children}</AdminSidebarProvider>
    </div>
  );
}
