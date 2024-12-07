import { ProductsRecord } from "@/api/api_types";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Card({ product }: { product: ProductsRecord }) {
  return (
    <div className="flex gap-2 items-stretch">
      <ProductImage photo={product.photo} alt={product.title} id={product.id} />
      <div className="flex flex-col min-h-full justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">{product.title}</p>
          <p className="line-clamp-3 text-sm">
            {product.description ? product.description : "Без описания"}
          </p>
        </div>
        <Button className="w-24" variant={"outline"}>
          {product.price} ₸
        </Button>
      </div>
    </div>
  );
}

type ImageProps = {
  photo?: string;
  alt: string;
  id: string;
};

function ProductImage({ photo, alt, id }: ImageProps) {
  if (!photo) {
    return (
      <div className="border rounded w-32 h-32 text-center align-middle flex bg-gray-100">
        <span className="m-auto">No Image</span>
      </div>
    );
  }
  const photoUrl = `http://127.0.0.1:8090/api/files/products/${id}/${photo}`;
  console.log("URL", photoUrl);

  return (
    <Image
      src={photoUrl}
      alt={alt}
      width={128}
      height={128}
      className="rounded object-cover w-32 h-32"
    />
  );
}
