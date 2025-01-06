"use client";
import { ProductsRecord } from "@/api/api_types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import Counter from "./Counter";

export default function Card({
  product,
  initialCount,
  shoppingId,
}: {
  product: ProductsRecord;
  initialCount: number;
  shoppingId: any;
}) {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialCount > 0);

  const CountChange = (newCount: number) => {
    setCount(newCount);
    if (newCount === 0) {
      setIsActive(false);
    }
  };

  const Initial = () => {
    setIsActive(true);
    setCount(1);
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
        {isActive || count > 0 ? (
          <Counter
            initialCount={count}
            shoppingId={shoppingId}
            product={product}
            onCountChange={CountChange}
          />
        ) : (
          <Button
            onClick={Initial}
            className="w-24 border-primary text-primary"
            variant="outline"
          >
            {product.price}
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
