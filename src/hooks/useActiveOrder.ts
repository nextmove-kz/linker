import { useDeviceId } from "@/hooks/useDeviceId";
import { useQuery } from "@tanstack/react-query";
import clientPocketBase from "@/api/client_pb";
import { BusinessRecord, OrdersRecord } from "@/api/api_types";
import { useParams } from "next/navigation";

type ExpandedOrdersRecord = OrdersRecord & {
  expand: { business: BusinessRecord };
};

export function useActiveOrder() {
  const deviceId = useDeviceId();
  const { id: businessId } = useParams<{ id: string }>();

  return useQuery({
    queryKey: ["activeOrder", deviceId],
    queryFn: async () => {
      const { items } = await clientPocketBase
        .collection("orders")
        .getList<ExpandedOrdersRecord>(1, 1, {
          filter: `device_id = "${deviceId}" && status = false && business.name = "${businessId}"`,
          sort: "-created",
          expand: "business",
        });
      return items[0] || null;
    },
  });
}
