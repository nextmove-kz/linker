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
import { signIn } from "@/app/actions";
import { LogIn, Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto p-4">
      <div className="space-y-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Вход в Linker
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Войдите в свой аккаунт, чтобы продолжить
        </p>
      </div>
      <div className="w-full max-w-md mx-auto mt-4">
        <div className="flex justify-center mb-2">
          <div className="bg-purple-100 p-3 rounded-full">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
        </div>
        <form action={signIn} className="space-y-6">
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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-500 cursor-pointer"
              >
                Запомнить меня
              </Label>
            </div>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Забыли пароль?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
        <Separator className="my-6" />
        <div className="flex justify-center mt-2">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
