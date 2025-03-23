import { pocketbase } from "@/api/pocketbase";
import ActiveOrders from "@/components/personal-account/ActiveOrders";
import OrderHistory from "@/components/personal-account/OrderHistory";
import ProfileSummary from "@/components/personal-account/ProfileSummary";
import { cookies } from "next/headers";

const PersonalBusinessPage = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("pocketbase_auth")?.value;

  if (!authToken) {
    return <div>Not authenticated</div>;
  }

  const pb = await pocketbase();
  let businessData;

  try {
    pb.authStore.save(authToken, null);

    if (!pb.authStore.isValid) {
      return <div>Invalid authentication token</div>;
    }
    const businessId = pb.authStore.model?.id;

    if (!businessId) {
      try {
        const authData = await pb.collection("business").authRefresh();
        const refreshedBusinessId = pb.authStore.model?.id;

        if (!refreshedBusinessId) {
          return <div>Unable to retrieve business ID after refresh</div>;
        }

        businessData = await pb
          .collection("business")
          .getOne(refreshedBusinessId);
      } catch (refreshError) {
        console.error("Error refreshing auth:", refreshError);
        return <div>Authentication refresh failed</div>;
      }
    } else {
      businessData = await pb.collection("business").getOne(businessId);
    }

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-briefcase-business"
          >
            <path d="M12 12h.01" />
            <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <path d="M22 13a18.15 18.15 0 0 1-20 0" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
          </svg>{" "}
        </div>

        {/* HEADER */}
        <ProfileSummary business={businessData} />

        {/* ACTIVE ORDERS */}
        <ActiveOrders business={businessData.id} />

        {/* INACTIVE ORDERS */}
        <OrderHistory business={businessData.id} />

        {/* <QuickActions  /> */}
      </div>
    );
  } catch (error) {
    console.error("Error retrieving business info:", error);
    return <div>Authentication error</div>;
  }
};

export default PersonalBusinessPage;
