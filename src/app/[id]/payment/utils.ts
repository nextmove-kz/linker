import {
  OrderItemsRecord,
  SettingVariantRecord,
  ShoppingCartRecord,
} from "@/api/api_types";
import clientPocketBase from "@/api/client_pb";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import { useBusinessByName } from "../form/utils";
import { useShoppingBasketQuery } from "@/hooks/useShoppingBasket";

export const usePaymentFormData = (businessId: string) => {
  // получаем номер телефона бизнеса из базы данных
  const { data: businessData, isLoading: isBusinessLoading } =
    useBusinessByName(businessId);
  const phoneNumber = businessData?.phone_number;

  // получаем общую сумму заказа из базы данных
  const { data: shoppingData, isLoading: isShoppingLoading } =
    useShoppingBasketQuery(businessId);
  const totalSum = shoppingData?.reduce(
    (sum, item) => sum + (item.expand?.product?.price || 0) * item.amount,
    0
  );

  const anyLoading = isBusinessLoading || isShoppingLoading;
  return { phoneNumber, totalSum, anyLoading };
};

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
