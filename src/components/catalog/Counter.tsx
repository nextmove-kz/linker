"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import clientPocketBase from "@/api/client_pb";

const Counter = ({
  initialCount,
  shoppingId,
  product,
  onCountChange,
}: {
  initialCount: number;
  shoppingId: string;
  product: ProductsRecord;
  onCountChange: (newCount: number) => void;
}) => {
  const [counter, setCounter] = useState(initialCount);

  useEffect(() => {
    setCounter(initialCount);
  }, [initialCount]);

  async function updateShoppingBasket(newCount: number) {
    if (shoppingId) {
      await clientPocketBase.collection("shoppingBasket").update(shoppingId, {
        product: product.id,
        amount: newCount,
      });
    } else {
      const item: ShoppingBasketRecord = {
        product: product.id,
        id: "",
        amount: newCount,
      };
      await clientPocketBase.collection("shoppingBasket").create(item);
    }
    onCountChange(newCount);
  }

  const CountChange = async (num: number) => {
    const newCount = counter + num;
    setCounter(newCount);
    await updateShoppingBasket(newCount);
  };

  return (
    <Button
      className="w-24 justify-between border-primary text-primary"
      variant="outline"
    >
      <div onClick={() => CountChange(-1)}>-</div>
      <span>{counter}</span>
      <div onClick={() => CountChange(1)}>+</div>
    </Button>
  );
};

export default Counter;
