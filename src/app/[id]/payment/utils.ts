import {
  OrderItemsRecord,
  SettingVariantRecord,
  ShoppingCartRecord,
} from "@/api/api_types";
import clientPocketBase from "@/api/client_pb";
import { ExpandedShoppingRecord } from "@/api/custom_types";

export const createItemsFromCart = async (
  basket: ExpandedShoppingRecord[]
): Promise<OrderItemsRecord[]> => {
  const items = await Promise.all(
    basket.map(async (item) => {
      const variants = item.expand?.selected_variants;
      const orderItem: Omit<OrderItemsRecord, "id"> = {
        product_name: item.expand.product.title,
        amount: item.amount,
        selected_variants: selectedVariantsString(variants),
        device_id: item.device_id,
        price: calculatePrice(item.expand.product.price, variants),
      };
      const created = await clientPocketBase
        .collection("order_items")
        .create(orderItem);
      return created;
    })
  );

  return items;
};

const selectedVariantsString = (
  selectedVariants: SettingVariantRecord[] | undefined
) => {
  if (!selectedVariants) return "";
  return selectedVariants.map((variant) => variant.name).join("; ");
};

const calculatePrice = (
  price: number,
  selectedVariants: SettingVariantRecord[] | undefined
) => {
  if (!selectedVariants) return price;

  const variantPrice =
    selectedVariants.reduce((sum, item) => sum + (item.price_change || 0), 0) ||
    0;

  return price + variantPrice;
};
