import BusinessDetailsForm from "@/components/personal-account/BusinessDetailsForm";

const BRANDING_COLOR = "#7b39ed";

export default async function SignupForm({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const businessId = (await params).id;

  return (
    <>
      <BusinessDetailsForm businessId={businessId} />
    </>
  );
}
