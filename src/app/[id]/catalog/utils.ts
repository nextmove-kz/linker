import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
export type CategorizedProducts = Record<string, ProductsRecord[]>;
export function getCategorizedProducts(data: ProductsRecord[]) {
  const categorizedProducts =
    data?.reduce((acc, product) => {
      const category = getCategory(product);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, ProductsRecord[]>) || {};

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
  shoppingData: ShoppingBasketRecord[] | undefined,
  productId: string
) => {
  const record = shoppingData?.find((record) => record.product === productId);
  return {
    amount: record?.amount || 0,
    shoppingId: record?.id,
  };
};
