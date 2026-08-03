import { CustomerSidebarProvider } from "@/components/shared/customer-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CustomerSidebarProvider>{children}</CustomerSidebarProvider>
    </div>
  );
}
