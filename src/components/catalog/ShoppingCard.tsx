"use client";
import {
  ProductsRecord,
  SettingVariantRecord,
  SettingsRecord,
  ShoppingBasketRecord,
} from "@/api/api_types";
import Image from "next/image";
import Counter from "./Counter";
import { useAtom } from "jotai";
import { hasImages } from "..//../hooks/jotai/atom";
import { useProductQuantity } from "@/hooks/useUpdate";
import { useParams } from "next/navigation";
import { Divide } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";

type ExpandedShoppingRecord = ShoppingBasketRecord & {
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

  const { count, isLoading, plus, minus } = useProductQuantity(
    product.expand.product,
    initialCount,
    product.id,
    id
  );

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
            <ScrollArea className="max-h-[40px] w-full rounded-md p-1 pr-5 flex flex-col text-xs text-ellipsis">
              {product.expand.selected_variants?.map((variant) => {
                if (variant.expand.setting.type === "single") {
                  return (
                    <div className="flex flex-col gap-1" key={variant.id}>
                      <div className="flex gap-1">
                        <p>{variant.expand.setting.name}:</p>
                        <p>{variant.name}</p>
                        {(variant.price_change || 0) >= 0 ? (
                          <p className="text-primary">
                            +{variant.price_change}
                          </p>
                        ) : (
                          <p className="text-primary">
                            -{variant.price_change}
                          </p>
                        )}
                      </div>
                      <Separator />
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col gap-1" key={variant.id}>
                    <div className="flex gap-1">
                      <p>{variant.name}</p>
                      {(variant.price_change || 0) >= 0 ? (
                        <p className="text-primary">+{variant.price_change}</p>
                      ) : (
                        <p className="text-primary">-{variant.price_change}</p>
                      )}
                    </div>
                    <Separator />
                  </div>
                );
              })}
            </ScrollArea>

            <div className="text-primary">{totalPrice()}₸</div>
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
