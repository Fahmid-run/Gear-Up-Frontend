import GearEdit from "@/components/edit-gear";
import { getGearItemById } from "@/service/gearItem";

export default async function GearEditPage({ params }: any) {
  const param = await params;

  const res = await getGearItemById(param.id);

  return <GearEdit data={res.data}></GearEdit>;
}
