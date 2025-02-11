import { pocketbase } from "@/api/pocketbase";
import ActiveOrders from "@/components/personal-account/ActiveOrders";
import OrderHistory from "@/components/personal-account/OrderHistory";
import ProfileSummary from "@/components/personal-account/ProfileSummary";

const PersonalBusinessPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const pb = await pocketbase();
  const business = await pb.collection("business").getList(1, 1, {
    filter: `name = "${id}"`,
  });

  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <div className="flex justify-center items-center mb-2 gap-2">
        <h1 className="text-2xl font-bold">Учетная запись</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-briefcase-business"
        >
          <path d="M12 12h.01" />
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>{" "}
      </div>

      {/* HEADER */}
      <ProfileSummary business={business.items[0]} />

      {/* ACTIVE ORDERS */}
      <ActiveOrders business={business.items[0].id} />

      {/* INACTIVE ORDERS */}
      <OrderHistory business={business.items[0].id} />

      {/* НЕ БЕЙТЕ ЕГО */}
      {/* <QuickActions  /> */}
    </div>
  );
};

export default PersonalBusinessPage;
