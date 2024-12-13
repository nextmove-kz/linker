import { ProductsRecord } from "@/api/api_types";
import { pocketbase } from "@/api/pocketbase";
import ProductCard from "@/components/catalog/ProductCard";

export default async function Home() {
  const pb = await pocketbase();
  const products = await pb
    .collection("products")
    .getFullList<ProductsRecord>();

  return (
    <div className="">
      <div className="flex flex-col gap-4 w-[400px] px-2 mx-auto">
        {products.map((product, id) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
