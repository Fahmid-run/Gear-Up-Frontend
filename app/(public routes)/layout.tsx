import { SiteNavbar } from "@/components/blocks/navbar";
import { getMe } from "@/service/getMe";
import { Mountain } from "lucide-react";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <>
      <section className="w-full min-h-screen">
        <SiteNavbar user={user} />
        {children}
        <footer
          id="contact"
          className="bg-[#17352b] px-5 pb-8 pt-16 text-[#fffaf0] sm:px-8 lg:px-10 relative bottom-[-100]"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 pb-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
              <div>
                <a href="#top" className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#e8774d]">
                    <Mountain className="size-5" />
                  </span>
                  <span className="font-serif text-2xl font-bold">
                    gear<span className="text-[#e8774d]">up</span>
                  </span>
                </a>
                <p className="mt-5 max-w-xs text-sm leading-6 text-[#b9d0c1]">
                  Quality gear for every kind of outside. Rent less, explore
                  more.
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    className="flex size-9 items-center justify-center rounded-full bg-[#285746] transition-colors hover:bg-[#e8774d]"
                    href="#contact"
                    aria-label="Instagram"
                  >
                    <span className="text-xs font-bold">ig</span>
                  </a>
                  <a
                    className="flex size-9 items-center justify-center rounded-full bg-[#285746] transition-colors hover:bg-[#e8774d]"
                    href="#contact"
                    aria-label="Facebook"
                  >
                    <span className="text-xs font-bold">f</span>
                  </a>
                  <a
                    className="flex size-9 items-center justify-center rounded-full bg-[#285746] transition-colors hover:bg-[#e8774d]"
                    href="#contact"
                    aria-label="YouTube"
                  >
                    <span className="text-[10px] font-bold">yt</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Explore</h3>
                <div className="mt-5 flex flex-col gap-3 text-sm text-[#b9d0c1]">
                  <a href="#about" className="hover:text-white">
                    About us
                  </a>
                  <a href="#categories" className="hover:text-white">
                    All gear
                  </a>
                  <a href="#how-it-works" className="hover:text-white">
                    How it works
                  </a>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Categories</h3>
                <div className="mt-5 flex flex-col gap-3 text-sm text-[#b9d0c1]">
                  <a href="#categories" className="hover:text-white">
                    Camping & hiking
                  </a>
                  <a href="#categories" className="hover:text-white">
                    Cycling
                  </a>
                  <a href="#categories" className="hover:text-white">
                    Water sports
                  </a>
                  <a href="#categories" className="hover:text-white">
                    Adventure essentials
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Say hello</h3>
                <div className="mt-5 flex flex-col gap-3 text-sm text-[#b9d0c1]">
                  <a href="mailto:hello@gearup.co" className="hover:text-white">
                    company@gearup.co
                  </a>
                  <span>Mon–Fri, 9am–6pm</span>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#8eaa9b] sm:flex-row">
              <p>© 2026 GearUp Rentals. Made for the outside.</p>
              <div className="flex gap-5">
                <a href="#contact" className="hover:text-white">
                  Privacy
                </a>
                <a href="#contact" className="hover:text-white">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
