"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  Compass,
  Leaf,
  Menu,
  Mountain,
  Search,
  TentTree,
  Waves,
  X,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Camping & Hiking",
    description: "Everything for nights under the stars.",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=900&q=85",
    icon: TentTree,
  },
  {
    name: "Cycling",
    description: "Find your perfect ride for every trail.",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=85",
    icon: Bike,
  },
  {
    name: "Water Sports",
    description: "Make a splash with gear that goes further.",
    image: "https://unsplash.com/photos/woman-on-kayak-qxD1jo7KW70",
    icon: Waves,
  },
  {
    name: "Adventure Essentials",
    description: "Gear up and go beyond the ordinary.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85",
    icon: Compass,
  },
];

const featuredGear = [
  {
    name: "Alpine 2P Tent",
    category: "Camping",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=85",
    tag: "Best seller",
  },
  {
    name: "Summit Trail Bike",
    category: "Cycling",
    price: "$32",
    image:
      "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?auto=format&fit=crop&w=900&q=85",
    tag: "Popular",
  },
  {
    name: "Daybreak Kayak",
    category: "Water sports",
    price: "$28",
    image:
      "https://images.unsplash.com/photo-1601924928374-2e0f3c4f6f45?auto=format&fit=crop&w=900&q=85",
    tag: "New",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover your gear",
    description:
      "Browse our curated collection of equipment, handpicked for great days outside.",
    icon: Search,
  },
  {
    number: "02",
    title: "Pick your dates",
    description:
      "Choose when you need it, book in a few clicks, and we’ll take care of the rest.",
    icon: Check,
  },
  {
    number: "03",
    title: "Get out there",
    description:
      "Collect your gear, make some memories, and return it when your adventure ends.",
    icon: Mountain,
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#17352b]">
      <section
        id="top"
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-28"
      >
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8774d]/30 bg-[#fffaf0] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c05d38]">
            <Leaf className="size-3.5" /> Adventure, made accessible
          </div>
          <h1 className="max-w-xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.25rem]">
            Go further.
            <br />
            <span className="text-[#e8774d]">Pack lighter.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#557067] sm:text-lg">
            Premium outdoor gear for the places you’ve been dreaming about. Rent
            what you need, when you need it, and spend more time making
            memories.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={"/gears"}>
              <Button className="h-12 rounded-full bg-[#e8774d] px-6 text-base text-white shadow-lg shadow-[#e8774d]/20 hover:bg-[#d9673d]">
                Explore gear <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-12 rounded-full border-[#17352b]/20 bg-transparent px-6 text-base text-[#17352b] hover:bg-white"
            >
              How it works <ChevronDown data-icon="inline-end" />
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-8 border-t border-[#17352b]/10 pt-6">
            <div>
              <p className="font-serif text-2xl font-bold">4.9/5</p>
              <p className="text-xs text-[#557067]">from 2,000+ adventurers</p>
            </div>
            <div className="h-8 w-px bg-[#17352b]/15" />
            <div>
              <p className="font-serif text-2xl font-bold">10k+</p>
              <p className="text-xs text-[#557067]">adventures started</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-4 -top-8 size-28 rounded-full bg-[#e6ad57]/30 blur-2xl" />
          <div className="relative aspect-[0.95] overflow-hidden rounded-[2rem] bg-[#dce5dc] shadow-2xl shadow-[#17352b]/10 sm:aspect-[1.08]">
            <img
              className="size-full object-cover"
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=90"
              alt="Tent beside a lake at golden hour"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17352b]/45 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                  Your next escape
                </p>
                <p className="mt-1 font-serif text-2xl">Find your wild</p>
              </div>
              <div className="rounded-full bg-white/15 px-3 py-1.5 text-xs backdrop-blur-md">
                01 / 04
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-[#fffaf0] p-3 pr-5 shadow-xl shadow-[#17352b]/10">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#dfeadd] text-[#285746]">
              <Check className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Gear you can trust</p>
              <p className="text-xs text-[#557067]">
                Cleaned & checked every time
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="bg-[#fffaf0] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8774d]">
                Explore by activity
              </p>
              <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                The right gear for
                <br />
                your kind of outside.
              </h2>
            </div>
            <a
              href="#featured"
              className="flex items-center gap-2 text-sm font-semibold text-[#e8774d]"
            >
              View all gear <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  href="#featured"
                  key={category.name}
                  className="group overflow-hidden rounded-2xl border border-[#17352b]/10 bg-[#f7f5ef] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#17352b]/10"
                >
                  <div className="relative aspect-[1.15] overflow-hidden">
                    <img
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={category.image}
                      alt={category.name}
                    />
                    <div className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#fffaf0]/90 text-[#17352b] backdrop-blur-sm">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#557067]">
                      {category.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e8774d]">
                      Explore{" "}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8774d]">
              Simple by design
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Adventure is
              <br />
              just three steps away.
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-[#557067]">
              No ownership, no clutter, no compromise. Just well-maintained gear
              and more reasons to get outside.
            </p>
            <Button
              variant="outline"
              className="mt-8 rounded-full border-[#17352b]/20 text-[#17352b] hover:bg-white"
            >
              Learn more <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-[#17352b]/10 bg-[#fffaf0] p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#dfeadd] text-[#285746]">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-serif text-3xl text-[#e8774d]/50">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#557067]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="featured"
        className="bg-[#17352b] px-5 py-20 text-[#fffaf0] sm:px-8 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8774d]">
                Ready when you are
              </p>
              <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
                Gear that gets you
                <br />
                out the door.
              </h2>
            </div>
            <Link
              href="/gears"
              className="flex items-center gap-2 text-sm font-semibold text-[#f3b18f]"
            >
              Browse the collection <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredGear.map((gear) => (
              <a
                href="#contact"
                key={gear.name}
                className="group overflow-hidden rounded-2xl bg-[#285746] transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[1.25] overflow-hidden">
                  <img
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={gear.image}
                    alt={gear.name}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#fffaf0] px-3 py-1 text-xs font-bold text-[#17352b]">
                    {gear.tag}
                  </span>
                </div>
                <div className="flex items-end justify-between p-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#b9d0c1]">
                      {gear.category}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl">{gear.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl">{gear.price}</p>
                    <p className="text-xs text-[#b9d0c1]">/ day</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[2rem] bg-[#e5eee3] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8774d]">
              Why GearUp
            </p>
            <h2 className="max-w-lg font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              More exploring.
              <br />
              Less owning.
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-[#557067]">
              We believe the best gear is the gear that gets used. That’s why
              every item in our collection is chosen, cared for, and ready for
              its next story.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#e8774d]" /> Fair, flexible
                prices
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#e8774d]" /> Quality checked gear
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#e8774d]" /> Easy pickup &
                returns
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#e8774d]" /> Less waste, more
                wild
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              className="aspect-square size-full object-cover"
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85"
              alt="Hiker overlooking a mountain valley"
            />
            <div className="absolute bottom-4 left-4 rounded-xl bg-[#fffaf0]/90 px-4 py-3 backdrop-blur-sm">
              <p className="font-serif text-2xl font-bold">10,000+</p>
              <p className="text-xs text-[#557067]">adventures powered</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#e8774d] px-8 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:px-16 lg:py-14">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Your next story starts here
            </p>
            <h2 className="max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Where will you go
              <br />
              when you gear up?
            </h2>
          </div>
          <Link href={"/gears"}>
            <Button className="h-12 shrink-0 rounded-full bg-[#fffaf0] px-6 text-[#17352b] hover:bg-white">
              Start exploring <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
