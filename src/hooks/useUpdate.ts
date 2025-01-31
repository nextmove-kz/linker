import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useShoppingBasketQuery,
  useShoppingBasketOperations,
} from "./useShoppingBasket";
import { ProductsRecord } from "@/api/api_types";

export function useProductQuantity(
  product: ProductsRecord,
  initialCount: number,
  initialShoppingId: string | undefined,
  businessId: string
) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialCount > 0);
  const [shoppingId, setShoppingId] = useState<string | null | undefined>(
    initialShoppingId
  );
  const { data: shoppingData } = useShoppingBasketQuery(businessId);
  const { updateShoppingBasket, isLoading } = useShoppingBasketOperations();

  const currentRecord = shoppingData?.find(
    (record) => record.product === product.id
  );
  const [count, setCount] = useState(currentRecord?.amount || initialCount);

  useEffect(() => {
    const record = shoppingData?.find((item) => item.product === product.id);
    if (record) {
      setCount(record.amount);
      setShoppingId(record.id);
      setIsActive(true);
    } else {
      setCount(0);
      setShoppingId(null);
      setIsActive(false);
    }
  }, [shoppingData, product.id]);

  async function handleUpdateBasket({
    newCount,
    variants,
  }: {
    newCount: number;
    variants?: string[];
  }) {
    try {
      const result = await updateShoppingBasket({
        newCount,
        productId: product.id,
        shoppingId,
        variantsId: variants,
      });

      if (newCount === 0) {
        setIsActive(false);

        const updatedCart =
          shoppingData?.filter((item) => item.id !== shoppingId) || [];

        if (updatedCart.length === 0) {
          router.push(`/${businessId}/catalog`);
          return;
        }
      }

      setShoppingId(result?.shoppingId ?? null);
      setCount(newCount);
    } catch (error) {
      console.error(error);
    }
  }

  const plus = () => {
    handleUpdateBasket({ newCount: count + 1 });
  };

  const minus = () => {
    if (count > 0) {
      handleUpdateBasket({ newCount: count - 1 });
    }
  };

  const Initial = () => {
    setIsActive(true);
    handleUpdateBasket({ newCount: 1 });
  };

  const createWithSettings = (variants: string[]) => {
    setIsActive(true);
    handleUpdateBasket({ newCount: 1, variants });
  };

  return {
    count,
    isActive,
    isLoading,
    plus,
    minus,
    Initial,
    createWithSettings,
  };
}
