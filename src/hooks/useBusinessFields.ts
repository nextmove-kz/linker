// hooks/useBusinessFields.ts
import { useQuery } from "@tanstack/react-query";
import clientPocketBase from "@/api/client_pb";
import {
  BusinessFieldsResponse,
  FieldTypesResponse,
  BusinessFieldSettingsResponse,
  FieldSettingsResponse,
  FieldOptionsResponse,
  SettingOptionsResponse,
} from "@/api/api_types";

type ExpandedBusinessField = BusinessFieldsResponse<{
  field_type: FieldTypesResponse;
  field_settings: Array<
    BusinessFieldSettingsResponse<{
      setting: FieldSettingsResponse<{
        setting_options: SettingOptionsResponse[];
      }>;
    }>
  >;
  field_options: FieldOptionsResponse[];
}>;

interface Option {
  value: string;
  label: string;
}

export interface FieldData {
  id: string;
  name: string;
  fieldType: string;
  position: number;
  required: boolean;
  settings: Record<string, string>;
  options?: Option[];
}

export function useBusinessFields(businessId: string) {
  return useQuery<FieldData[]>({
    queryKey: ["business-fields", businessId],
    queryFn: async () => {
      const records = await clientPocketBase
        .collection("business_fields")
        .getFullList<ExpandedBusinessField>({
          filter: `business.name="${businessId}"`,
          sort: "position",
          expand:
            "field_type,field_settings.setting.setting_options,field_options",
        });

      return records.map((record) => {
        const settings: Record<string, string> = {};
        record.expand?.field_settings?.forEach((fieldSetting) => {
          if (fieldSetting.expand?.setting) {
            const setting = fieldSetting.expand.setting;
            settings[setting.name] =
              fieldSetting.value || setting.default_value || "";
          }
        });

        const options = record.expand?.field_options?.map((opt) => ({
          value: opt.value,
          label: opt.value,
        }));

        return {
          id: record.id,
          name: record.name,
          fieldType: record.expand?.field_type?.name || "",
          position: record.position,
          required: record.required,
          settings,
          ...(options && { options }),
        };
      });
    },
  });
}
