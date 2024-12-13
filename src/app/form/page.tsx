import Branding from "@/components/branding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormPage() {
  return (
    <div className="flex flex-col gap-4 w-[400px] p-2 mx-auto">
      <Branding title="Linkin Burger" />
      <div className="flex flex-col gap-2">
        <p>Адрес</p>
        <Input placeholder="Улица" />
        <div className="flex gap-2">
          <Input placeholder="Дом" />
          <Input placeholder="Квартира" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Телефон</p>
        <Input placeholder="+7 (___) ___ - __ - __" />
      </div>
      <Button type="submit" className="mt-6">
        Перейти к оплате
      </Button>
    </div>
  );
}
