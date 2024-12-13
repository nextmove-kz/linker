import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Branding({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-3xl font-semibold p-4">
      <Link href="/">
        <ArrowLeft className="" />
      </Link>
      <span className="max-w-full text-center flex-1">{title}</span>
      <ShoppingCart className="w-12" />
    </div>
  );
}
