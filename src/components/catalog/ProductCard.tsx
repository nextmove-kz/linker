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
import { ImageIcon } from "lucide-react";

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
    <div className="py-1">
      <div
        className={`${
          !image ? "border shadow-sm p-3" : "flex gap-2"
        }  rounded-lg`}
      >
        {image ? (
          <ProductImage
            photo={product.photo}
            alt={product.title}
            id={product.id}
          />
        ) : null}
        <div className="flex w-full flex-col justify-between ">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold leading-none">{product.title}</p>
            <p className="line-clamp-3 text-sm text-gray-600 break-all pr-2">
              {product.description || "Без описания"}
            </p>
          </div>
          <div
            className={`${
              !image ? "mt-3 justify-end flex" : "justify-start flex"
            }`}
          >
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
  const photoContainer =
    "select-none object-cover border rounded min-w-32 h-32 flex items-center justify-center bg-gray-50";

  if (!photo) {
    return (
      <div className={photoContainer}>
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  const photoUrl = `http://127.0.0.1:8090/api/files/products/${id}/${photo}`;

  return (
    <div className={photoContainer}>
      <Image
        src={photoUrl}
        alt={alt}
        width={128}
        height={128}
        className="rounded w-full h-full aspect-square object-cover select-none"
      />
    </div>
  );
}
