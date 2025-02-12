import {
  ProductsRecord,
  SettingsRecord,
  ShoppingCartRecord,
} from "@/api/api_types";
import { ExpandedSettings, ExpandedShoppingRecord } from "@/api/custom_types";
export type CategorizedProducts = Record<string, ExpandedProductsRecord[]>;
type ExpandedProductsRecord = ProductsRecord & {
  expand?: { settings: ExpandedSettings[] };
};
export function getCategorizedProducts(data: ProductsRecord[]) {
  const categorizedProducts =
    data?.reduce((acc, product) => {
      const category = getCategory(product);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as CategorizedProducts) || {};

  const categories = Object.keys(categorizedProducts);

  return {
    categorizedProductsData: categorizedProducts,
    categoriesData: categories,
  };
}

const getCategory = (product: ProductsRecord): string => {
  if (product.category_name !== undefined && product.category_name !== "")
    return product.category_name;
  return "Без категории";
};

export const getCount = (
  shoppingData: ShoppingCartRecord[] | undefined,
  productId: string
) => {
  const record = shoppingData?.find((record) => record.product === productId);
  return {
    amount: record?.amount || 0,
    shoppingId: record?.id,
  };
};

export const getSettingVariants = (
  shoppingData: ExpandedShoppingRecord[] | undefined,
  productId: string
) => {
  const record = shoppingData?.find((record) => record.product === productId);
  return record?.expand.selected_variants;
};
