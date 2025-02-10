"use client";
import { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Separator } from "../ui/separator";
import { ProductImage } from "./ProductCard";
import SettingsMultiChoice from "./SettingsMultiChoice";
import SettingsSingleChoice from "./SettingsSingleChoice";
import { ProductsRecord } from "@/api/api_types";
import { ExpandedSettings } from "@/api/custom_types";
import Counter from "./Counter";
import { useProductQuantity } from "@/hooks/useUpdate";
import { useParams } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

interface FormDialogProps {
  pricePreview?: string | null;
  initialCount: number;
  initialShoppingId: string | undefined;
  product: ProductsRecord;
  settings?: ExpandedSettings[];
  showImage?: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
}

const SettingsDialog = ({
  pricePreview,
  initialCount,
  initialShoppingId,
  product,
  settings,
  showImage = false,
  onSubmit,
  children,
}: FormDialogProps) => {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const {
    count,
    isActive,
    isLoading,
    plus,
    minus,
    Initial,
    createWithSettings,
  } = useProductQuantity(product, initialCount, initialShoppingId, id);

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await onSubmit(formData);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent className="max-w-[400px] mx-auto h-[70vh]">
        <form onSubmit={Submit} className="h-full flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <ProductImage
                photo={product.photo}
                alt={product.title}
                id={product.id}
              />
              <DrawerHeader className="border-none px-0">
                <h1 className="text-sm font-semibold text-start w-full">
                  Описание
                </h1>
                <p className="text-slate-600 text-sm text-start">
                  {product.description}
                </p>
              </DrawerHeader>
              <Separator className="w-10/12 mx-auto" />
              <div className="py-5 gap-3 flex flex-col">
                {settings?.map((set) =>
                  set.type === "single" ? (
                    <SettingsSingleChoice
                      key={set.id}
                      name={set.name}
                      settings={set}
                    />
                  ) : (
                    <SettingsMultiChoice
                      key={set.id}
                      name={set.name}
                      settings={set}
                    />
                  )
                )}
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className="bg-violet100 rounded-t-3xl mt-auto">
            <div className="flex justify-between">
              <h1 className="text-[20px] font-rubik">{product.title}</h1>
              {!count && (
                <div className="font-rubik font-bold text-primary">
                  {product.price} ₸
                </div>
              )}
            </div>
            {count > 0 ? (
              <div className="flex gap-3 items-center justify-between">
                <Counter count={count} plus={plus} minus={minus} />
                {pricePreview && (
                  <span className="text-gray-500">{pricePreview}</span>
                )}
                <Button
                  className="w-1/2"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Готово
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full select-none"
                disabled={isLoading}
              >
                Добавить
              </Button>
            )}
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDialog;
