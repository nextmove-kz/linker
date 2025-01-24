import {
  FieldTypesRecord,
  BusinessFieldsRecord,
  SettingVariantRecord,
  SettingsRecord,
  BusinessRecord,
  DetailsRecord,
  OrdersRecord,
  ProductsRecord,
  ShoppingCartRecord,
  OrderItemsRecord,
} from "@/api/api_types";

export type ExpandedShoppingRecord = ShoppingCartRecord & {
  expand: {
    product: ProductsRecord;
    selected_variants: ExpandedVariant[];
  };
};

export type ExpandedOrderItems = OrderItemsRecord & {
  expand: {
    product: ProductsRecord;
  };
};

type ExpandedVariant = SettingVariantRecord & {
  expand: { setting: SettingsRecord };
};

export type ExpandedSettings = SettingsRecord & {
  expand: { variants: SettingVariantRecord[] };
};

export type ExpandedOrderRecord = OrdersRecord & {
  expand: {
    items: ExpandedOrderItems[];
    business: BusinessRecord;
  };
};

export type ExpandedBusinessFields = BusinessFieldsRecord & {
  expand: {
    field_type: FieldTypesRecord;
  };
};
