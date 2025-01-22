"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ImageUploader from "@/components/formFields/ImageUploader";
import clientPocketBase from "@/api/client_pb";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formEntries = Object.fromEntries(formData.entries());
    console.log(formEntries);
    const businessResponse = await clientPocketBase
      .collection("business")
      .getList(0, 1, { filter: `name = "${id}"` });
    const business = businessResponse.items[0].id;
    const result = await clientPocketBase.collection("products").create({
      title: formEntries.title,
      description: formEntries.description,
      category_name: formEntries.category_name,
      price: formEntries.price,
      business: business,
      photo: formEntries.Изображение_files,
    });
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Добавить товар</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] rounded-md">
          <DialogHeader>
            <DialogTitle>Заполните форму создания товара</DialogTitle>
            <DialogDescription>
              Укажите все необходимые параметры, а после сохраните изменения
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto"
            onSubmit={onSubmit}
          >
            <Label>Название товара</Label>
            <Input name="title" placeholder="Название товара" required />

            <Label>Описание</Label>
            <Input name="description" placeholder="Описание" required />

            <Label>Категория</Label>
            <Input name="category_name" placeholder="Категория"></Input>

            <Label>Цена</Label>
            <Input name="price" placeholder="Цена" type="number" required />

            <ImageUploader variant="single"></ImageUploader>
            <Button type="submit" className="mt-6">
              Создать товар
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
