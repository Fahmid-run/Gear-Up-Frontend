"use client";

import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import GearPage, { GearDetails } from "./gear/page";
import GearAdd from "./dashboard/provider/gear/add/page";
import GearEdit from "./dashboard/provider/gear/[id]/edit/page";

export default function Home() {
  return <LoginPage></LoginPage>;
}
