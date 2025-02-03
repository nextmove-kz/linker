"use client";
import AddressField from "@/components/formFields/AddressField";
import InputField from "@/components/formFields/FormInput";
import TextAreaField from "@/components/formFields/TextAreaField";
import PhoneField from "@/components/formFields/phone/PhoneField";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};

export default function Form({ variant }: { variant: number }) {
  return (
    <AlertDialogContent className="w-[350px] tablet:w-[400px]">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex justify-center">
          Подключение {variant === 0 ? "основной" : "пожизненной"} подписки
        </AlertDialogTitle>
        <AlertDialogDescription>
          Работайте быстрее и удобнее с полным набором профессиональных
          инструментов. Попробуйте прямо сейчас.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form
        className="flex flex-col gap-4 w-full p-2 mx-auto"
        onSubmit={onSubmit}
      >
        <InputField name="ФИО" />
        <InputField name="Название организации" />
        <InputField name="Ваш email" />
        <PhoneField />

        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction type="submit">Подключить</AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
}
