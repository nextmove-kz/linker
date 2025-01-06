import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import { pocketbase } from "@/api/pocketbase";
import Branding from "@/components/branding";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const pb = await pocketbase();
  const products = await pb
  .collection("products")
  .getFullList<ProductsRecord>({
      filter: `business.name = "${id}"`,
      expand: "business",
  });

  const shoppingRecords = await pb
    .collection("shoppingBasket")
    .getFullList<ShoppingBasketRecord>();

  const categorizedProducts = products.reduce((acc, product) => {
    const category = getCategory(product);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, ProductsRecord[]>);

  const categories = Object.keys(categorizedProducts);

  const getCount = (productId: any) => {
    const record = shoppingRecords.find(
      (record) => record.product === productId
    );
    if (record === undefined) return { amount: 0, shoppingId: 0 };
    return { amount: record.amount, shoppingId: record.id };
  };
  console.log(products)

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex flex-col">
        <div className="bg-white  border-b-black border-b w-full">
          <Branding></Branding>
          <div className="flex max-w-[400px] overflow-x-scroll">
            {categories.map((category: any) => {
              return (
                <Link href={`${"#"}${category}`} key={category}>
                  <Button className="font-bold uppercase" variant={"ghost"}>
                    {category}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="gap-4 w-full flex flex-col justify-start px-2 mx-auto">
          {Object.entries(categorizedProducts).map(([category, products]) => (
            <div key={category} id={category} className="flex flex-col gap-2">
              <h2 className="font-semibold mt-2">{category}</h2>
              {products.map((product) => {
                const count = getCount(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    initialCount={count.amount}
                    shoppingId={count.shoppingId}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getCategory = (product: ProductsRecord): string => {
  if (product.category_name !== undefined && product.category_name !== "")
    return product.category_name;
  return "Без категории";
};
