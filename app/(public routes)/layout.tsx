import { SiteNavbar } from "@/components/blocks/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  console.log(user);
  return (
    <>
      <SiteNavbar user={user} />
      {children}
    </>
  );
}
