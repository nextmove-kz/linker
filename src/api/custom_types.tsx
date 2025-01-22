import {
  BusinessRecord,
  ProductsRecord,
  ShoppingBasketRecord,
  FieldTypesRecord,
  BusinessFieldsRecord,
} from "@/api/api_types";

export type ExpandedShoppingRecord = ShoppingBasketRecord & {
  expand: { product: ProductsRecord };
};

export type ExpandedBusinessFields = BusinessFieldsRecord & {
  expand: {
    field_type: FieldTypesRecord;
  };
};
