import {
  FieldTypesRecord,
  BusinessFieldsRecord,
  SettingVariantRecord,
  SettingsRecord,
  BusinessRecord,
  DetailsRecord,
  OrdersRecord,
  ProductsRecord,
  ShoppingBasketRecord,
} from "@/api/api_types";

export type ExpandedShoppingRecord = ShoppingBasketRecord & {
  expand: {
    product: ProductsRecord;
    selected_variants: ExpandedVariant[];
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
    items: ExpandedShoppingRecord[];
    business: BusinessRecord;
    details: DetailsRecord;
  };
};

export type ExpandedBusinessFields = BusinessFieldsRecord & {
  expand: {
    field_type: FieldTypesRecord;
  };
};
