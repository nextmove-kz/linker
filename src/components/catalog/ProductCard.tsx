"use client";
import { ProductsRecord, SettingVariantRecord } from "@/api/api_types";
import Image from "next/image";
import { Button } from "../ui/button";
import Counter from "./Counter";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";
import { ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useProductQuantity } from "@/hooks/useUpdate";
import { ExpandedSettings } from "@/api/custom_types";
import SettingsDialog from "./SettingsDialog";
import { useShoppingBasketQuery } from "@/hooks/useShoppingBasket";
import { use, useEffect, useState } from "react";

export default function Card({
  product,
  initialCount,
  shoppingId: initialShoppingId,
  settings,
}: {
  product: ProductsRecord;
  initialCount: number;
  shoppingId: string | undefined;
  settings?: ExpandedSettings[];
}) {
  const { id } = useParams<{ id: string }>();
  const [image] = useAtom(hasImages);
  const {
    count,
    isActive,
    isLoading,
    plus,
    minus,
    Initial,
    createWithSettings,
  } = useProductQuantity(product, initialCount, initialShoppingId, id);
  const [pricePreview, setPricePreview] = useState<string | null>(null);
  const { data: shoppingCartData, isLoading: isCartLoading } =
    useShoppingBasketQuery(id);

  useEffect(() => {
    if (!shoppingCartData || isCartLoading || !count) {
      setPricePreview(null);
      return;
    }

    const inCartData = shoppingCartData.find(
      (item) => item.expand?.product.id === product.id
    );

    if (!inCartData) {
      return;
    }

    const priceModifier =
      inCartData.expand?.selected_variants?.reduce(
        (sum, item) => sum + (item.price_change || 0),
        0
      ) ?? 0;

    const totalPrice = (product.price + priceModifier) * count;
    setPricePreview(`${totalPrice} ₸`);
  }, [shoppingCartData, isCartLoading, count, product.id, product.price]);

  const handleFormSubmit = async (formData: FormData) => {
    const formEntries = Object.fromEntries(formData.entries());
    const variants = Object.values(formEntries).map((value) =>
      value.toString()
    );
    await createWithSettings(variants);
  };

  return (
    <div className="py-1">
      <div
        className={`${
          !image ? "border shadow-sm p-3" : "flex gap-2"
        } rounded-lg`}
      >
        {image && (
          <ProductImage
            photo={product.photo}
            alt={product.title}
            id={product.id}
          />
        )}
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold leading-none">{product.title}</p>
            <p className="line-clamp-3 text-sm text-gray-600 break-words pr-2">
              {product.description || "Без описания"}
            </p>
          </div>
          <div
            className={`${
              !image ? "mt-3 justify-end flex" : "justify-start flex"
            }`}
          >
            {count > 0 && isActive ? (
              <div className="flex gap-3 items-center">
                <Counter count={count} plus={plus} minus={minus} />
                {pricePreview && (
                  <span className="text-gray-500">{pricePreview}</span>
                )}
              </div>
            ) : settings ? (
              <SettingsDialog
                product={product}
                settings={settings}
                isLoading={isLoading}
                showImage={image}
                onSubmit={handleFormSubmit}
              />
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

export function ProductImage({
  photo,
  alt,
  id,
  settings = false,
}: {
  photo?: string;
  alt: string;
  id: string;
  settings?: boolean;
}) {
  const photoContainer = `select-none object-cover border rounded min-w-32 ${
    !settings && "h-32"
  } flex items-center justify-center bg-gray-50 ${settings && "aspect-square"}`;

  if (!photo) {
    return (
      <div className={photoContainer}>
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  const photoUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${id}/${photo}`;

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
