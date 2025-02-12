"use client";
import {
  ProductsRecord,
  SettingVariantRecord,
  SettingsRecord,
  ShoppingCartRecord,
} from "@/api/api_types";
import Image from "next/image";
import Counter from "./Counter";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";
import { useProductQuantity } from "@/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useShoppingBasketOperations } from "@/hooks/useShoppingBasket";

type ExpandedShoppingRecord = ShoppingCartRecord & {
  expand: {
    product: ProductsRecord;
    selected_variants: ExpandedVariant[];
  };
};
type ExpandedVariant = SettingVariantRecord & {
  expand: { setting: SettingsRecord };
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

  const { isLoadingItem } = useShoppingBasketOperations();
  const { count, plus, minus } = useProductQuantity(
    product.expand.product,
    initialCount,
    product.id,
    id
  );
  const isLoading = isLoadingItem(product.id);

  const totalPrice = () => {
    const initial = (product?.expand?.product?.price || 0) * count;

    const variantPrice =
      product?.expand?.selected_variants?.reduce(
        (sum, item) => sum + (item?.price_change || 0),
        0
      ) || 0;

    return initial + variantPrice;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {image && (
            <div className="flex-shrink-0">
              <ProductImage
                photo={product.expand.product.photo}
                alt={product.expand.product.title}
                id={product.expand.product.id}
              />
            </div>
          )}
          <div className="flex flex-col min-h-full">
            <div className="font-medium mb-1">
              {product.expand.product.title}
            </div>
            <div className="rounded-md text-xs text-ellipsis space-y-0.5">
              {product.expand.selected_variants?.map((variant) => {
                if (variant.expand.setting.type === "single") {
                  return (
                    <div className="flex items-center gap-1" key={variant.id}>
                      <p>{variant.expand.setting.name}:</p>
                      <p>{variant.name}</p>
                      {(variant.price_change || 0) >= 0 ? (
                        <p className="text-primary">+{variant.price_change}</p>
                      ) : (
                        <p className="text-primary">-{variant.price_change}</p>
                      )}
                    </div>
                  );
                }
                return (
                  <div className="flex items-center gap-1" key={variant.id}>
                    <p>{variant.name}</p>
                    {(variant.price_change || 0) >= 0 ? (
                      <p className="text-primary">+{variant.price_change}</p>
                    ) : (
                      <p className="text-primary">-{variant.price_change}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-primary mt-1">{totalPrice()}₸</div>
          </div>
        </div>

        <div className="flex-shrink-0">
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
  const photoUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${id}/${photo}`;

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
