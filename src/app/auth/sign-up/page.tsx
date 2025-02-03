"use client";

//TODO: доделать страницу регистрации(использовать server action)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import clientPocketBase from "@/api/client_pb";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      console.log(data);
      const result = await clientPocketBase.collection("business").create(data);
      // console.log(result);
      // console.log(clientPocketBase.authStore.isValid);
      // console.log(clientPocketBase.authStore.token);
      // console.log(clientPocketBase.authStore.record?.id);
      router.push(`/auth/sign-in${result.id}`);
    } catch (error) {
      console.error("Error during authentication:", error);
      throw new Error("Authentication failed");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto p-4">
      <div className="flex gap-2 items-center w-full">
        <svg
          width="50"
          height="50"
          viewBox="0 0 303 303"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shadow-2xl rounded-xl"
        >
          <rect width="303" height="303" rx="72" fill="#6650F2" />
          <path
            d="M147 92L206.293 151.293C206.683 151.683 206.683 152.317 206.293 152.707L147 212"
            stroke="white"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <circle cx="118" cy="152" r="22" fill="white" />
        </svg>
        <div className="flex flex-col ml-3">
          <h1 className="text-xl font-semibold text-center">
            Регистрация бизнеса
          </h1>
          <p className="text-sm text-gray-500 flex justify-center items-center">
            Создайте учетную запись для начала
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Почта
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@mail.com"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Пароль
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
                className="pl-10"
              />
            </div>
          </div>{" "}
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Подтвердите пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Введите пароль еще раз"
                required
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
        <div className="text-center text-sm">
          <Separator className="my-6" />
          <span className="text-gray-500">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/sign-in"
              className="text-blue-500 hover:underline inline-flex items-center"
            >
              Войти
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
