import { ProductsRecord } from "@/api/api_types";
import { pocketbase } from "@/api/pocketbase";
import Branding from "@/components/branding";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const pb = await pocketbase();
  const products = await pb
    .collection("products")
    .getFullList<ProductsRecord>();

  const data = [...new Set(products.map((product) => product.category_name))];

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex flex-col">
        <div className="fixed  h-[13%] bg-white  border-b-black border-b">
          <Branding title="Linkin burger"></Branding>
          <div className="flex max-w-[400px] overflow-x-scroll">
            {data.map((category: any) => {
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
        <div className="gap-4 w-full  flex flex-col justify-start px-2 mx-auto mt-[30%]">
          {data.map((category) => {
            return (
              <section id={category} key={category} className="scroll-mt-32">
                <h1 className="mb-2 font-bold uppercase">{category}</h1>
                <div className="flex flex-col gap-3">
                  {products
                    .filter((product) => product.category_name === category)
                    .map((item) => {
                      return <ProductCard key={item.id} product={item} />;
                    })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
