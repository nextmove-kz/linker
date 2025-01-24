"use client";
import { ProductsRecord, ShoppingCartRecord } from "@/api/api_types";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import clientPocketBase from "@/api/client_pb";
import {
  UseMutationResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useDeviceId } from "./useDeviceId";

type ShoppingBasketResponse = {
  id: string;
  product: string;
  amount: number;
};

type DeleteMutationResult = UseMutationResult<
  void,
  Error,
  string,
  { previousItems: ProductsRecord[] | undefined }
>;

type CreateMutationResult = UseMutationResult<
  ShoppingBasketResponse,
  Error,
  Omit<ShoppingCartRecord, "id">,
  { previousItems: ShoppingCartRecord[] | undefined }
>;

type UpdateMutationResult = UseMutationResult<
  ShoppingBasketResponse,
  Error,
  { id: string; newData: Partial<ShoppingCartRecord> },
  { previousItems: ShoppingCartRecord[] | undefined }
>;

export function useShoppingBasketQuery(id: string) {
  const deviceId = useDeviceId();

  return useQuery({
    queryKey: ["shopping_cart"],
    queryFn: async () => {
      const result = await clientPocketBase
        .collection("shopping_cart")
        .getFullList<ExpandedShoppingRecord>({
          expand: "product,selected_variants.setting",
          filter: `product.business.name = "${id}" && device_id = "${deviceId}"`,
        });
      return result;
    },
  });
}

export function useShoppingBasketMutations() {
  const queryClient = useQueryClient();
  const deviceId = useDeviceId();

  const deleteMutation: DeleteMutationResult = useMutation({
    mutationFn: async (id: string) => {
      await clientPocketBase.collection("shopping_cart").delete(id);
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });
      const previousItems = queryClient.getQueryData<ProductsRecord[]>([
        "shopping_cart",
      ]);

      queryClient.setQueryData<ProductsRecord[]>(["shopping_cart"], (old) =>
        old ? old.filter((item) => item.id !== deletedId) : []
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      queryClient.refetchQueries({ queryKey: ["shopping_cart"] });
    },
  });

  const createMutation: CreateMutationResult = useMutation({
    mutationFn: async (newItem: Omit<ShoppingCartRecord, "id">) => {
      const createdItem = { ...newItem, device_id: deviceId || "" };
      return await clientPocketBase
        .collection("shopping_cart")
        .create(createdItem);
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });
      const previousItems = queryClient.getQueryData<ShoppingCartRecord[]>([
        "shopping_cart",
      ]);

      const tempItem: ShoppingCartRecord = {
        ...newItem,
        id: "temp-id",
        device_id: deviceId || "",
      };

      queryClient.setQueryData<ShoppingCartRecord[]>(["shopping_cart"], (old) =>
        old ? [...old, tempItem] : [tempItem]
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      queryClient.refetchQueries({ queryKey: ["shopping_cart"] });
    },
  });

  const updateMutation: UpdateMutationResult = useMutation({
    mutationFn: async ({
      id,
      newData,
    }: {
      id: string;
      newData: Partial<ShoppingCartRecord>;
    }) => {
      return await clientPocketBase
        .collection("shopping_cart")
        .update(id, newData);
    },
    onMutate: async ({ id, newData }) => {
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });
      const previousItems = queryClient.getQueryData<ShoppingCartRecord[]>([
        "shopping_cart",
      ]);

      queryClient.setQueryData<ShoppingCartRecord[]>(
        ["shopping_cart"],
        (old) =>
          old?.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          ) || []
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      queryClient.refetchQueries({ queryKey: ["shopping_cart"] });
    },
  });

  return {
    deleteMutation,
    createMutation,
    updateMutation,
  };
}

export function useShoppingBasketOperations() {
  const { deleteMutation, createMutation, updateMutation } =
    useShoppingBasketMutations();
  const deviceId = useDeviceId();
  const queryClient = useQueryClient();

  const getItemCount = (productId: string) => {
    const data = queryClient.getQueryData<ExpandedShoppingRecord[]>([
      "shopping_cart",
    ]);
    const record = data?.find((item) => item.product === productId);
    return record ? record.amount : 0;
  };

  const updateShoppingBasket = async (params: {
    newCount: number;
    productId: string;
    shoppingId?: string | null;
    variantsId?: string[];
  }) => {
    const { newCount, productId, shoppingId, variantsId } = params;

    try {
      if (newCount === 0) {
        if (shoppingId) {
          await deleteMutation.mutateAsync(shoppingId);
          return { shoppingId: null };
        }
      } else if (shoppingId) {
        const result = await updateMutation.mutateAsync({
          id: shoppingId,
          newData: {
            product: productId,
            amount: newCount,
            selected_variants: variantsId,
          },
        });
        return { shoppingId: result.id };
      } else {
        const result = await createMutation.mutateAsync({
          product: productId,
          amount: newCount,
          selected_variants: variantsId,
          device_id: deviceId || "",
        });
        return { shoppingId: result.id };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    updateShoppingBasket,
    getItemCount,
    isLoading:
      deleteMutation.isPending ||
      createMutation.isPending ||
      updateMutation.isPending,
    isError:
      deleteMutation.isError ||
      createMutation.isError ||
      updateMutation.isError,
  };
}
