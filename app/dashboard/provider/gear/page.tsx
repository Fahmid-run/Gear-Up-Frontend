import { GearList } from "@/components/blocks/gearList";
import { getMyGear } from "@/service/gearItem";

const GearPage = async () => {
  const gearItems = await getMyGear();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <GearList userRole="Provider" gearList={gearItems.data}></GearList>
    </div>
  );
};

export default GearPage;
