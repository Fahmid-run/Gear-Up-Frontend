import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import GearPage, { GearDetails } from "./gear/page";
import GearAdd from "./dashboard/provider/gear/new/page";
import GearEdit from "./dashboard/provider/gear/[id]/edit/page";
import GridList from "@/components/blocks/ecommerce/product-list/grid-list";

export default function Home() {
  return <GridList></GridList>;
}
