"use client";
import Branding from "@/components/branding";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useShoppingBasketQuery } from "@/hooks/useShoppingBasket";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { getCategorizedProducts, getCount } from "./utils";
import { useMemo } from "react";

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const { data: shoppingData } = useShoppingBasketQuery(id);
  const { data: productData } = useProductsQuery(id);

  const { categorizedProducts, categories } = useMemo(() => {
    if (!productData) {
      return { categorizedProducts: {}, categories: [] };
    }
    const { categorizedProductsData, categoriesData } =
      getCategorizedProducts(productData);
    return {
      categorizedProducts: categorizedProductsData,
      categories: categoriesData,
    };
  }, [productData]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex flex-col pb-10">
        <div className="h-28"></div>
        <div className="bg-white w-[400px] fixed border-b-black border-b h-28">
          <Branding></Branding>
          <div className="flex max-w-[400px] ">
            <ScrollArea className="whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 pb-2">
                {categories?.map((category: any) => {
                  return (
                    <Link
                      href={`${"#"}${category}`}
                      key={category}
                      className="select-none"
                    >
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
        <div className="gap-4 w-full flex flex-col pb-10 justify-start px-2 mx-auto">
          {Object.entries(categorizedProducts).map(([category, products]) => (
            <div key={category} id={category} className="flex flex-col gap-2">
              <h2 className="font-semibold mt-2">{category}</h2>
              {products.map((product) => {
                const count = getCount(shoppingData, product.id);
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
        <Separator />
        <div className="text-center">
          <p className="text-muted-foreground py-2">Конец каталога</p>
        </div>
      </div>
    </div>
  );
}
