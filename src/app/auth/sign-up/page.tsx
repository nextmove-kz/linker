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

export default function SignupForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    const result = clientPocketBase.collection("business").create(data);
    console.log(result);
    console.log(clientPocketBase.authStore.isValid);
    console.log(clientPocketBase.authStore.token);
    console.log(clientPocketBase.authStore.record?.id);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Регистрация для бизнеса
      </h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Зарегестрируйте свой бизнес</CardTitle>
          <CardDescription>Создайте учетную запись для начала</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Название бизнеса</Label>
              <Input
                id="displayName"
                name="displayName"
                required
                placeholder="Asyl Food"
              />
              {/* {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName}</p>
            )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Название бизнеса URL</Label>
              <Input id="name" name="name" required placeholder="asylfood" />
              {/* {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName}</p>
            )} */}
            </div>

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
              <Input id="password" name="password" type="password" required />
              {/* {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Пароль</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
              />
              {/* {errors.passwordConfirm && (
              <p className="text-sm text-red-500">{errors.passwordConfirm}</p>
            )} */}
            </div>

            {/* <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button> */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
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
