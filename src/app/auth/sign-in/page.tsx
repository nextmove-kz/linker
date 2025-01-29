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
import { LogIn } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignupForm() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[400px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-4">Вход в Linker</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col items-center justify-center">
              <LogIn className="h-16 w-16 shadow-md p-3 border-gray-400 rounded-2xl text-gray-500" />
              <span className="text-xl text-gray-400 text-center"></span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@mail.com"
                className="py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Введите пароль"
                required
                className="py-6"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <Checkbox id="remember" name="remember"></Checkbox>
                <p className="text-gray-500">Запомнить меня</p>
              </div>
              <Link href="/" className="underline text-blue-500">
                Забыли пароль?
              </Link>
            </div>
            <Separator />
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
