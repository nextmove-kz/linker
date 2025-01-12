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
import { useParams } from "next/navigation";
import { useProductQuantity } from "@/hooks/useUpdate";

export default function Card({
  product,
  initialCount,
  shoppingId: initialShoppingId,
}: {
  product: ProductsRecord;
  initialCount: number;
  shoppingId: string | undefined;
}) {
  const { id } = useParams<{ id: string }>();
  const [image] = useAtom(hasImages);
  const { count, isActive, isLoading, plus, minus, Initial } =
    useProductQuantity(product, initialCount, initialShoppingId, id);

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
        <div className="flex w-full flex-col justify-between">
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
