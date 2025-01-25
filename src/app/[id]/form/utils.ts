import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import clientPocketBase from "@/api/client_pb";
import { useDeviceId } from "@/hooks/useDeviceId";

interface BusinessRecord {
  id: string;
  name: string;
}

interface SubmitError {
  error: string;
}

export function useBusinessByName(name: string) {
  return useQuery<BusinessRecord>({
    queryKey: ["business", name],
    queryFn: async () => {
      const records = await clientPocketBase
        .collection("business")
        .getFirstListItem<BusinessRecord>(`name = "${name}"`);
      return records;
    },
  });
}

export const useUniversalSubmit = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const deviceId = useDeviceId();
  const businessQuery = useBusinessByName(id);

  const getFilesFromForm = (form: HTMLFormElement): File[] => {
    const files: File[] = [];
    const fileInputs = form.querySelectorAll('input[type="file"]');

    fileInputs.forEach((input) => {
      const fileList = (input as HTMLInputElement).files;
      if (fileList) {
        files.push(...Array.from(fileList));
      }
    });

    return files;
  };

  const getFormDataAsJson = (formData: FormData): Record<string, any> => {
    const json: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (!json[key]) {
        json[key] = value;
      } else if (Array.isArray(json[key])) {
        json[key].push(value);
      } else {
        json[key] = [json[key], value];
      }
    });

    return json;
  };

  return async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<SubmitError | void> => {
    e.preventDefault();

    if (!businessQuery.data) {
      return { error: "Business data not available" };
    }

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const files = getFilesFromForm(form);
      const formDataJson = getFormDataAsJson(formData);

      const { items } = await clientPocketBase
        .collection("details")
        .getList(0, 0, {
          filter: `device_id = "${deviceId}" && business = "${businessQuery.data.id}"`,
        });

      const detailsData = {
        orderData: formDataJson,
        attachments: files,
        device_id: deviceId,
        business: businessQuery.data.id,
      };

      if (items.length > 0) {
        await clientPocketBase
          .collection("details")
          .update(items[0].id, detailsData);
      } else {
        await clientPocketBase.collection("details").create(detailsData);
      }

      router.push(`/${id}/payment`);
    } catch (error) {
      return { error: "Failed to create order" };
    }
  };
};
