import { useEffect } from "react";

export const ImagePreloader = ({ productData }: { productData: any[] }) => {
  useEffect(() => {
    const preloadImages = () => {
      productData?.forEach((product) => {
        if (product.photo) {
          const img = new Image();
          img.src = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${product.id}/${product.photo}`;
        }
      });
    };

    preloadImages();
  }, [productData]);

  return null; // Этот компонент не возвращает контент, он только инициализирует загрузку изображений
};
