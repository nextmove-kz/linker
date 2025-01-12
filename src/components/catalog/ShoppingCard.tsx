"use client";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import Image from "next/image";
import Counter from "./Counter";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";
import { useProductQuantity } from "@/hooks/useUpdate";
import { useParams } from "next/navigation";

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
  const { id } = useParams<{ id: string }>();
  const [image] = useAtom(hasImages);

  const { count, isLoading, plus, minus } = useProductQuantity(
    product.expand.product,
    initialCount,
    product.id,
    id
  );

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
