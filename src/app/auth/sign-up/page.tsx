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
import { ArrowUpRight } from "lucide-react";
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
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto">
      <div className="flex mb-4 gap-2">
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
            stroke-width="42"
            stroke-linecap="round"
          />
          <circle cx="118" cy="152" r="22" fill="white" />
        </svg>
        <h1 className="text-3xl font-semibold text-center mt-auto">
          Регистрация бизнеса
        </h1>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Зарегестрируйте свой бизнес</CardTitle>
          <CardDescription>Создайте учетную запись для начала</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@mail.com"
              />
              {/* {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
              />
              {/* {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Подтвердите пароль</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Введите пароль еще раз"
                required
              />
              {/* {errors.passwordConfirm && (
              <p className="text-sm text-red-500">{errors.passwordConfirm}</p>
            )} */}
            </div>
            <Separator />
            {/* <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button> */}
            <Button type="submit" className="w-full">
              Зарегистрироваться
            </Button>
            <span className="flex justify-center text-gray-500 gap-1">
              Уже есть аккаунт?
              <Link
                href="/auth/sign-in"
                className="flex underline text-blue-500"
              >
                Войти
                <ArrowUpRight className=" h-4 w-4" />
              </Link>
            </span>
          </form>
        </CardContent>
        <CardFooter>
          {/* {state && state.success && (
          <Alert className="w-full">
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )} */}
        </CardFooter>
      </Card>
    </div>
  );
}
