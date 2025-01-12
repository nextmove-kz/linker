import { useState, useEffect } from "react";
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

  async function handleUpdateBasket(newCount: number) {
    try {
      const result = await updateShoppingBasket({
        newCount,
        productId: product.id,
        shoppingId,
      });

      if (newCount === 0) {
        setIsActive(false);
      }

      setShoppingId(result?.shoppingId ?? null);
      setCount(newCount);
    } catch (error) {
      console.error(error);
    }
  }

  const plus = () => {
    handleUpdateBasket(count + 1);
  };

  const minus = () => {
    if (count > 0) {
      handleUpdateBasket(count - 1);
    }
  };

  const Initial = () => {
    setIsActive(true);
    handleUpdateBasket(1);
  };

  return {
    count,
    isActive,
    isLoading,
    plus,
    minus,
    Initial,
  };
}
