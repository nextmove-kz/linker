import clientPocketBase from "@/api/client_pb";
import { useParams } from "next/navigation";

export const useCurrentBusiness = async () => {
  const { id } = useParams<{ id: string }>();
};
