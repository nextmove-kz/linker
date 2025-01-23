import { useDeviceId } from "@/hooks/useDeviceId";
import { useQuery } from "@tanstack/react-query";
import clientPocketBase from "@/api/client_pb";
import { BusinessRecord, OrdersRecord } from "@/api/api_types";

type ExpandedOrdersRecord = OrdersRecord & {
  expand: { business: BusinessRecord };
};

export function useActiveOrder() {
  const deviceId = useDeviceId();

  return useQuery({
    queryKey: ["activeOrder", deviceId],
    queryFn: async () => {
      const { items } = await clientPocketBase
        .collection("orders")
        .getList<ExpandedOrdersRecord>(1, 1, {
          filter: `device_id = "${deviceId}" && status = false`,
          sort: "-created",
          expand: "business",
        });
      return items[0] || null;
    },
  });
}
