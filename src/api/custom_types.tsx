import {
  ProductsRecord,
  SettingVariantRecord,
  SettingsRecord,
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
