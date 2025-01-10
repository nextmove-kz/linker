"use client";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import Image from "next/image";
import Counter from "./Counter";
import { useState } from "react";
import { useShoppingBasketOperations } from "@/hooks/useShoppingBasket";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";
type ExpandedShoppingRecord = ShoppingBasketRecord & {
  expand: { product: ProductsRecord };
};

const ShoppingCard = ({
  product,
  initialCount,
}: {
  product: ExpandedShoppingRecord;
  initialCount: number;
}) => {
  const [image, setCountImg] = useAtom(hasImages);
  const { updateShoppingBasket, isLoading } = useShoppingBasketOperations();
  const [count, setCount] = useState(initialCount);

  async function handleUpdateBasket(newCount: number) {
    try {
      await updateShoppingBasket({
        newCount,
        productId: product.expand.product.id,
        shoppingId: product.id,
      });
      if (newCount > 0) {
        setCount(newCount);
      }
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

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {image && (
            <ProductImage
              photo={product.expand.product.photo}
              alt={product.expand.product.title}
              id={product.expand.product.id}
            />
          )}
          <div>
            <div className="font-medium">{product.expand.product.title}</div>
            <div className="text-primary">
              {(product.expand.product.price || 0) * count} ₸
            </div>
          </div>
        </div>

        <div>
          <Counter
            count={count}
            plus={plus}
            minus={minus}
            disabled={isLoading}
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
      <div className="select-none border rounded w-20 h-20 text-center align-middle flex bg-gray-100">
        <span className="m-auto">No Image</span>
      </div>
    );
  }
  const photoUrl = `http://127.0.0.1:8090/api/files/products/${id}/${photo}`;

  return (
    <Image
      src={photoUrl}
      alt={alt}
      width={56}
      height={56}
      className="rounded object-cover w-20 h-20 select-none"
    />
  );
}
