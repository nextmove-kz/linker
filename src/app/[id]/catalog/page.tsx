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
import { getCategorizedProducts, getCount, getSettingVariants } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActiveOrderCheck } from "@/components/shared/ActiveOrderCheck";
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton";
import { ImagePreloader } from "@/components/catalog/ImagePreloader";

export default function Home() {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState<string>();
  const [totalsum, setTotalsum] = useState<number>();
  const { id } = useParams<{ id: string }>();

  const { data: shoppingData, isLoading: isShoppingLoading } =
    useShoppingBasketQuery(id);
  const { data: productData, isLoading: isProductsLoading } =
    useProductsQuery(id);

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

  useEffect(() => {
    const handleScroll = () => {
      let currentCategory = activeCategory;
      categories.forEach((category) => {
        const element = document.getElementById(category);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top >= 0 && top < 120) {
            currentCategory = category;
          }
        }
      });
      if (currentCategory && currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, activeCategory]);

  useEffect(() => {
    if (activeCategory && categoryRefs.current[activeCategory]) {
      categoryRefs.current[activeCategory]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activeCategory]);

  const isLoading = isShoppingLoading || isProductsLoading;

  return (
    <ActiveOrderCheck>
      {productData && <ImagePreloader productData={productData} />}

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[400px] flex flex-col pb-10 relative">
          <div className="h-28" />
          <div className="bg-white fixed border-b border-b-black h-28 w-full max-w-[400px]">
            <Branding sectionId={0} setTotalsum={setTotalsum} />
            <ScrollArea className="whitespace-nowrap rounded-md w-full">
              <div className="flex space-x-4 pb-2">
                {categories?.map((category) => (
                  <div
                    key={category}
                    ref={(el) => {
                      categoryRefs.current[category] = el;
                    }}
                    className="select-none"
                  >
                    <Link href={`#${category}`} replace={true} as="">
                      <Button
                        className={`font-bold uppercase ${
                          activeCategory === category && "bg-secondary"
                        }`}
                        variant="ghost"
                      >
                        {category}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {isLoading ? (
            <CatalogSkeleton />
          ) : (
            <div className="gap-4 w-full flex flex-col pb-10 justify-start px-2">
              {Object.entries(categorizedProducts).map(
                ([category, products]) => (
                  <div
                    key={category}
                    id={category}
                    className="flex flex-col gap-2 scroll-mt-28"
                  >
                    <h2 className="font-semibold mt-2">{category}</h2>
                    {products.map((product) => {
                      const count = getCount(shoppingData, product.id);
                      const selectedVariants = getSettingVariants(
                        shoppingData,
                        product.id
                      );

                      return (
                        <ProductCard
                          selectedVariants={selectedVariants}
                          key={product.id}
                          product={product}
                          initialCount={count.amount}
                          shoppingId={count.shoppingId}
                          settings={product.expand?.settings}
                        />
                      );
                    })}
                  </div>
                )
              )}
            </div>
          )}
          <Separator />
          <div className="text-center">
            <p className="text-muted-foreground py-2">Конец каталога</p>
          </div>
          {shoppingData && shoppingData.length > 0 && (
            <div className="fixed bottom-0 py-5 justify-center items-center rounded-t-3xl bg-violet100 flex gap-2 w-full max-w-[400px] px-4">
              <Link href={`/${id}/form`} className="w-full">
                <Button className="rounded-xl bg-primary hover:bg-purple-600 w-full p-6 font-rubik text-[17px]">
                  Заказ &middot; {totalsum} ₸
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </ActiveOrderCheck>
  );
}
