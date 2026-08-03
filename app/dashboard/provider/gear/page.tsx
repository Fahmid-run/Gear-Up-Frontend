import { GearList } from "@/components/blocks/gearList";
import { getMyGear } from "@/service/gearItem";

const GearPage = async () => {
  const gearItems = await getMyGear();
  return (
    <div className="w-full px-4 py-6">
      <GearList gearList={gearItems.data}></GearList>
    </div>
  );
};

export default GearPage;
