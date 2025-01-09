"use client";
import { ProductsRecord } from "@/api/api_types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import {
  useShoppingBasketOperations,
  useShoppingBasketQuery,
} from "@/hooks/useShoppingBasket";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";

export default function Card({
  product,
  initialCount,
  shoppingId: initialShoppingId,
}: {
  product: ProductsRecord;
  initialCount: number;
  shoppingId: string | undefined;
}) {
  const [image, setCountImg] = useAtom(hasImages);
  const [isActive, setIsActive] = useState(initialCount > 0);
  const [shoppingId, setShoppingId] = useState<string | null | undefined>(
    initialShoppingId
  );

  const { data: shoppingData } = useShoppingBasketQuery();

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

  const { updateShoppingBasket, isLoading } = useShoppingBasketOperations();

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

  return (
    <div className="flex gap-2 items-stretch">
      {image && (
        <ProductImage
          photo={product.photo}
          alt={product.title}
          id={product.id}
        />
      )}
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
          <Button
            onClick={Initial}
            className="w-24 select-none"
            disabled={isLoading}
          >
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
      <div className=" select-none border rounded w-32 h-32 text-center align-middle flex bg-gray-100">
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
      className="rounded object-cover w-32 h-32 select-none"
    />
  );
}
