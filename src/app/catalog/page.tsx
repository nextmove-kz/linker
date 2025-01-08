"use client";
import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import { pocketbase } from "@/api/pocketbase";

import Branding from "@/components/branding";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import clientPocketBase from "@/api/client_pb";

export default function Home() {
  const getCount = (productId: any) => {
    const record = shoppingQuery.data?.find(
      (record) => record.product === productId
    );
    if (record === undefined) return { amount: 0, shoppingId: undefined };
    return { amount: record.amount, shoppingId: record.id };
  };

  const getShoppingCarts = async () => {
    const result = await clientPocketBase
      .collection("shoppingBasket")
      .getFullList<ShoppingBasketRecord>({
        expand: "product",
      });
    return result;
  };
  const shoppingQuery = useQuery<ShoppingBasketRecord[]>({
    queryKey: ["shoppingBasket"],
    queryFn: getShoppingCarts,
  });

  const getProducts = async () => {
    const result = await clientPocketBase
      .collection("products")
      .getFullList<ProductsRecord>();
    return result;
  };
  const productQuery = useQuery<ProductsRecord[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categorizedProducts =
    productQuery.data?.reduce((acc, product) => {
      const category = getCategory(product);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, ProductsRecord[]>) || {};

  const categories = Object.keys(categorizedProducts);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex flex-col">
        <div className="h-28"></div>
        <div className="bg-white w-[400px] fixed border-b-black border-b h-28">
          <Branding title="Linkin burger"></Branding>
          <div className="flex max-w-[400px] ">
            <ScrollArea className="whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 pb-2">
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
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
