import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";

export type ExpandedShoppingRecord = ShoppingBasketRecord & {
  expand: { product: ProductsRecord };
};
