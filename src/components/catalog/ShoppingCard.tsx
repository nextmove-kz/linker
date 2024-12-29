"use client";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import Image from "next/image";
import Counter from "./Counter";
import { useState } from "react";

const ShoppingCard = ({
  product,
  initialCount,
}: {
  product: any;
  initialCount: number;
}) => {
  console.log(product);
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(initialCount > 0);

  const CountChange = (newCount: number) => {
    setCount(newCount);
    if (newCount === 0) {
      setIsActive(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProductImage
            photo={product.expand.product.photo}
            alt={product.expand.product.title}
            id={product.expand.product.id}
          />
          <div>
            <div>{product.expand.product.title}</div>
            <div>{product.expand.product.price}</div>
          </div>
        </div>

        <div>
          <Counter
            initialCount={product.amount}
            shoppingId={product.id}
            product={product.expand.product}
            onCountChange={CountChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;

type ImageProps = {
  photo?: string;
  alt: string;
  id: string;
};
function ProductImage({ photo, alt, id }: ImageProps) {
  if (!photo) {
    return (
      <div className="border rounded w-14 h-14 text-center align-middle flex bg-gray-100">
        <span className="m-auto">No Image</span>
      </div>
    );
  }
  const photoUrl = `http://127.0.0.1:8090/api/files/products/${id}/${photo}`;
  console.log("URL", photoUrl);

  return (
    <Image
      src={photoUrl}
      alt={alt}
      width={56}
      height={56}
      className="rounded object-cover w-32 h-32"
    />
  );
}
