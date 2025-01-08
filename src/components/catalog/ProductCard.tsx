"use client";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import Counter from "./Counter";
import clientPocketBase from "@/api/client_pb";
import { useQuery } from "@tanstack/react-query";

export default function Card({
  product,
  initialCount,
  shoppingId: initialShoppingId,
}: {
  product: ProductsRecord;
  initialCount: number;
  shoppingId: any;
}) {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialCount > 0);
  const [shoppingId, setShoppingId] = useState(initialShoppingId);

  // const getShoppingCart = async () => {
  //   const result = await clientPocketBase
  //     .collection("shoppingBasket")
  //     .getFullList<ShoppingBasketRecord>({
  //       filter: `product.id = "${product.id}"`,
  //       expand: "product",
  //     });
  //   return result;
  // };

  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["shoppingBasket"],
  //   queryFn: getShoppingCart,
  // });

  async function updateShoppingBasket(newCount: number) {
    try {
      if (newCount === 0) {
        if (shoppingId) {
          await clientPocketBase
            .collection("shoppingBasket")
            .delete(shoppingId);
          setShoppingId(null);
        }
        setIsActive(false);
      } else if (shoppingId) {
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
        const record = await clientPocketBase
          .collection("shoppingBasket")
          .create(item);
        setShoppingId(record.id);
      }
      setCount(newCount);
    } catch (error) {
      console.log(error);
    }
  }

  const plus = () => {
    updateShoppingBasket(count + 1);
  };

  const minus = () => {
    if (count > 0) {
      updateShoppingBasket(count - 1);
    }
  };

  const Initial = () => {
    setIsActive(true);
    updateShoppingBasket(1);
  };

  return (
    <div className="flex gap-2 items-stretch">
      <ProductImage photo={product.photo} alt={product.title} id={product.id} />
      <div className="flex flex-col min-h-full justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">{product.title}</p>
          <p className="line-clamp-3 text-sm">
            {product.description || "Без описания"}
          </p>
        </div>
        {count > 0 && isActive ? (
          <Counter count={count} plus={plus} minus={minus} />
        ) : (
          <Button onClick={Initial} className="w-24">
            {product.price} ₸
          </Button>
        )}
      </div>
    </div>
  );
}

function ProductImage({
  photo,
  alt,
  id,
}: {
  photo?: string;
  alt: string;
  id: string;
}) {
  if (!photo) {
    return (
      <div className="border rounded w-32 h-32 text-center align-middle flex bg-gray-100">
        <span className="m-auto">No Image</span>
      </div>
    );
  }

  const photoUrl = `http://127.0.0.1:8090/api/files/products/${id}/${photo}`;

  return (
    <Image
      src={photoUrl}
      alt={alt}
      width={128}
      height={128}
      className="rounded object-cover w-32 h-32"
    />
  );
}
