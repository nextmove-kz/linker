import {
  BusinessRecord,
  DetailsRecord,
  OrdersRecord,
  ProductsRecord,
  ShoppingBasketRecord,
} from "@/api/api_types";

export type ExpandedShoppingRecord = ShoppingBasketRecord & {
  expand: { product: ProductsRecord };
};

export type ExpandedOrderRecord = OrdersRecord & {
  expand: {
    items: ExpandedShoppingRecord[];
    business: BusinessRecord;
    details: DetailsRecord;
  };
};
