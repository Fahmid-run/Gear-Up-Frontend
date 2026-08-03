import { ProviderSidebar } from "@/components/shared/provider-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProviderSidebar>{children}</ProviderSidebar>
    </div>
  );
}
