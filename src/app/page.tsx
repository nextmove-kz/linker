import { ProductsRecord } from "@/api/api_types";
import { pocketbase } from "@/api/pocketbase";
import Branding from "@/components/branding";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const pb = await pocketbase();
  const products = await pb
    .collection("products")
    .getFullList<ProductsRecord>();

  let data = products.map((product) => product.category_name);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[400px] flex flex-col">
        <Branding title="Linkin burger"></Branding>
        <div className="flex">
          {products.map((product) => {
            return (
              <Button key={product.id} variant="ghost">
                {product.category_name}
              </Button>
            );
          })}
        </div>
        <div className="gap-4 w-full  flex flex-col justify-start px-2 mx-auto">
          {products.map((product, id) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* {products.map((product) => {
          if (!data.includes(product.category_name)) {
            data.p;
          }
          return null;
        })} */}
        </div>
      </div>
    </div>
  );
}
