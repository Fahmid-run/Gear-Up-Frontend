import ClassicOverview from "@/components/blocks/ecommerce/product-overview/classic-overview";

const GearItemOverviewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const param = await params;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <ClassicOverview id={param.id}></ClassicOverview>
    </div>
  );
};

export default GearItemOverviewPage;
