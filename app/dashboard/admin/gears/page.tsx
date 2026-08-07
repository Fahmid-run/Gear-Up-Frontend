import { GearList } from "@/components/blocks/gearList";
import { getAllGears } from "@/service/adminService";

const GearPage = async () => {
  const gearItems = await getAllGears();

  return (
    <div className="flex min-h-svh flex-col bg-muted p-6 md:p-10">
      <GearList userRole="Admin" gearList={gearItems.data}></GearList>
    </div>
  );
};

export default GearPage;
