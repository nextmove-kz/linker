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
  { previousItems: ExpandedShoppingRecord[] | undefined; mutationId: number }
>;

type CreateMutationResult = UseMutationResult<
  ShoppingBasketResponse,
  Error,
  Omit<ShoppingCartRecord, "id">,
  { previousItems: ExpandedShoppingRecord[] | undefined; mutationId: number }
>;

type UpdateMutationResult = UseMutationResult<
  ShoppingBasketResponse,
  Error,
  { id: string; newData: Partial<ShoppingCartRecord> },
  { previousItems: ExpandedShoppingRecord[] | undefined; mutationId: number }
>;
type PendingMutations = number[];

const pendingRequests = new Map<string, Promise<any>>();

export function useShoppingBasketQuery(id: string) {
  const deviceId = useDeviceId();

  return useQuery({
    queryKey: ["shopping_cart"],
    staleTime: 30000, // Consider data fresh for 30 seconds
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
      const key = `delete-${id}`;
      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const promise = clientPocketBase.collection("shopping_cart").delete(id);
      pendingRequests.set(key, promise);

      try {
        await promise;
      } finally {
        pendingRequests.delete(key);
      }
    },
    onMutate: async (deletedId) => {
      const mutationId = Date.now();
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });

      const pendingMutations =
        queryClient.getQueryData<PendingMutations>(["pendingMutations"]) || [];
      queryClient.setQueryData(
        ["pendingMutations"],
        [...pendingMutations, mutationId]
      );

      const previousItems = queryClient.getQueryData<ExpandedShoppingRecord[]>([
        "shopping_cart",
      ]);

      queryClient.setQueryData<ExpandedShoppingRecord[]>(
        ["shopping_cart"],
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );

      return { previousItems, mutationId };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSuccess: (_, __, context) => {
      if (context?.mutationId) {
        const pendingMutations =
          queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
        queryClient.setQueryData(
          ["pendingMutations"],
          pendingMutations.filter((id) => id !== context.mutationId)
        );
      }
    },
    onSettled: (_, __, context) => {
      const pendingMutations =
        queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
      if (pendingMutations.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      }
    },
  });

  const createMutation: CreateMutationResult = useMutation({
    mutationFn: async (newItem: Omit<ShoppingCartRecord, "id">) => {
      const key = `create-${newItem.product}-${newItem.amount}`;
      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const createdItem = { ...newItem, device_id: deviceId || "" };
      const promise = clientPocketBase
        .collection("shopping_cart")
        .create(createdItem);
      pendingRequests.set(key, promise);

      try {
        return await promise;
      } finally {
        pendingRequests.delete(key);
      }
    },
    onMutate: async (newItem) => {
      const mutationId = Date.now();
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });

      const pendingMutations =
        queryClient.getQueryData<PendingMutations>(["pendingMutations"]) || [];
      queryClient.setQueryData(
        ["pendingMutations"],
        [...pendingMutations, mutationId]
      );

      const previousItems = queryClient.getQueryData<ExpandedShoppingRecord[]>([
        "shopping_cart",
      ]);
      const products = queryClient.getQueryData<ProductsRecord[]>(["products"]);
      const product = products?.find((p) => p.id === newItem.product);

      const tempItem: ExpandedShoppingRecord = {
        id: `temp-${mutationId}`,
        device_id: deviceId || "",
        amount: newItem.amount,
        product: newItem.product,
        selected_variants: newItem.selected_variants || [],
        expand: {
          product: product!,
          selected_variants: [],
        },
      };

      queryClient.setQueryData<ExpandedShoppingRecord[]>(
        ["shopping_cart"],
        (old) => (old ? [...old, tempItem] : [tempItem])
      );

      return { previousItems, mutationId };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSuccess: (_, __, context) => {
      if (context?.mutationId) {
        const pendingMutations =
          queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
        queryClient.setQueryData(
          ["pendingMutations"],
          pendingMutations.filter((id) => id !== context.mutationId)
        );
      }
    },
    onSettled: (_, __, context) => {
      const pendingMutations =
        queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
      if (pendingMutations.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      }
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
      const key = `update-${id}-${JSON.stringify(newData)}`;
      if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
      }

      const promise = clientPocketBase
        .collection("shopping_cart")
        .update(id, newData);
      pendingRequests.set(key, promise);

      try {
        return await promise;
      } finally {
        pendingRequests.delete(key);
      }
    },
    onMutate: async ({ id, newData }) => {
      const mutationId = Date.now();
      await queryClient.cancelQueries({ queryKey: ["shopping_cart"] });

      const pendingMutations =
        queryClient.getQueryData<PendingMutations>(["pendingMutations"]) || [];
      queryClient.setQueryData(
        ["pendingMutations"],
        [...pendingMutations, mutationId]
      );

      const previousItems = queryClient.getQueryData<ExpandedShoppingRecord[]>([
        "shopping_cart",
      ]);

      queryClient.setQueryData<ExpandedShoppingRecord[]>(
        ["shopping_cart"],
        (old) =>
          old?.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          ) || []
      );

      return { previousItems, mutationId };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shopping_cart"], context.previousItems);
      }
    },
    onSuccess: (_, __, context) => {
      if (context?.mutationId) {
        const pendingMutations =
          queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
        queryClient.setQueryData(
          ["pendingMutations"],
          pendingMutations.filter((id) => id !== context.mutationId)
        );
      }
    },
    onSettled: (_, __, context) => {
      const pendingMutations =
        queryClient.getQueryData<number[]>(["pendingMutations"]) || [];
      if (pendingMutations.length === 0) {
        queryClient.invalidateQueries({ queryKey: ["shopping_cart"] });
      }
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
    // Fixed the comparison
    isLoadingItem: (productId: string) => {
      const deletingId = deleteMutation.variables;
      return (
        deletingId === productId ||
        createMutation.variables?.product === productId ||
        updateMutation.variables?.newData.product === productId
      );
    },
    isError:
      deleteMutation.isError ||
      createMutation.isError ||
      updateMutation.isError,
  };
}
