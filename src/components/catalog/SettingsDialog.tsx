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
} from "../ui/drawer";
import { Separator } from "../ui/separator";
import { ProductImage } from "./ProductCard";
import SettingsMultiChoice from "./SettingsMultiChoice";
import SettingsSingleChoice from "./SettingsSingleChoice";
import { ProductsRecord } from "@/api/api_types";
import { ExpandedSettings } from "@/api/custom_types";

interface FormDialogProps {
  product: ProductsRecord;
  settings: ExpandedSettings[];
  isLoading: boolean;
  showImage?: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
}

const SettingsDialog = ({
  product,
  settings,
  isLoading,
  showImage = false,
  onSubmit,
}: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await onSubmit(formData);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="w-24 select-none" disabled={isLoading}>
          {product.price} ₸
        </Button>
      </DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent className="max-w-[400px] flex mx-auto">
        <form onSubmit={Submit} className="w-full">
          <DrawerHeader>
            {showImage && (
              <ProductImage
                settings
                photo={product.photo}
                alt={product.title}
                id={product.id}
              />
            )}
            <h1 className="text-sm font-semibold text-start w-full">
              Описание
            </h1>
            <p className="text-slate-600 text-sm text-start">
              {product.description}
            </p>
          </DrawerHeader>
          <Separator className="w-10/12 mx-auto" />
          <div className="p-5 gap-3 flex flex-col">
            {settings.map((set) =>
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
          <DrawerFooter>
            <Button
              type="submit"
              className="w-full select-none"
              disabled={isLoading}
            >
              В корзину
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDialog;
