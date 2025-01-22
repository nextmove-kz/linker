"use client";

import { Button } from "@/components/ui/button";
import Branding from "@/components/branding";
import { useUniversalSubmit } from "./utils";
import { useParams } from "next/navigation";
import { useBusinessFields } from "@/hooks/useBusinessFields";
import { FormFieldRenderer } from "@/components/formFields/FormFieldRenderer";

export default function FormPage() {
  const { id: businessId } = useParams<{ id: string }>();
  console.log("busid", businessId);
  const { data: fields, isLoading, isError } = useBusinessFields(businessId);

  const onSubmit = useUniversalSubmit();

  if (isLoading) {
    return <div>Loading form fields...</div>;
  }

  if (isError) {
    return <div>Error loading form fields</div>;
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-[400px] p-2 mx-auto"
      onSubmit={onSubmit}
    >
      <Branding sectionId={1} />

      {fields?.map((field) => {
        return <FormFieldRenderer key={field.id} field={field} />;
      })}

      <Button type="submit" className="mt-6">
        Перейти к оплате
      </Button>
    </form>
  );
}
