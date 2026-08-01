"use client";

import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import GearPage, { GearDetails } from "./gears/page";
import GearAdd from "./provider/gear/add/page";
import GearEdit from "./provider/gear/[id]/edit/page";

export default function Home() {
  return <LoginPage></LoginPage>;
}
