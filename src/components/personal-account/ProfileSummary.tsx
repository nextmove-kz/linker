import { BusinessRecord } from "@/api/api_types";
import { Badge } from "@/components/ui/badge";
import { PencilLine } from "lucide-react";
import Link from "next/link";

export default function ProfileSummary({
  business,
}: {
  business: BusinessRecord;
}) {
  return (
    <div className="p-6 border-none w-full rounded-lg bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">
              {business.display_name}
            </h2>
            <Link href={`/auth/sign-up/details/${business.id}`}>
              <PencilLine className="cursor-pointer" />
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            телефон: {business.phone_number}
          </p>
          <p className="text-sm text-gray-500">{business.instagram}</p>
          <Badge className="mt-2">Standart subscription</Badge>
        </div>
      </div>
    </div>
  );
}
