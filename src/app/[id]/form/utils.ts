import clientPocketBase from "@/api/client_pb";
import { useRouter } from "next/navigation";

export const useUniversalSubmit = () => {
  const router = useRouter();
  return async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fileInputs = e.currentTarget.querySelectorAll('input[type="file"]');
    const files: File[] = [];

    fileInputs.forEach((input) => {
      const fileList = (input as HTMLInputElement).files;
      if (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }
      }
    });

    const formDataJson: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (!formDataJson[key]) {
        formDataJson[key] = value;
      } else if (Array.isArray(formDataJson[key])) {
        formDataJson[key].push(value);
      } else {
        formDataJson[key] = [formDataJson[key], value];
      }
    });
    const data = {
      orderData: Object.fromEntries(formData.entries()),
      finished: false,
      attachments: files,
    };
    try {
      const result = await clientPocketBase
        .collection("orders")
        .create({ orderData: formData, finished: false, attachments: files });
      console.log(result);
      router.push(`/message/${result.id}`);
    } catch (error) {
      console.error("Order error:", error);
      return { error: "Failed to create order" };
    }
  };
};
