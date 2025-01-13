import { ProductsRecord } from "@/api/api_types";
import clientPocketBase from "@/api/client_pb";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { hasImages } from "@/hooks/jotai/atom";

export function useProductsQuery(id: string) {
  const [images, setHasImages] = useAtom(hasImages);
  return useQuery<ProductsRecord[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await clientPocketBase
        .collection("products")
        .getFullList<ProductsRecord>({ filter: `business.name = "${id}"` });

      const imageCount = result?.filter((item) => item.photo).length;
      setHasImages(imageCount > 0);
      return result;
    },
  });
}
