import { ProductsRecord, ShoppingBasketRecord } from "@/api/api_types";
import { ExpandedShoppingRecord } from "@/api/custom_types";
import clientPocketBase from "@/api/client_pb";
import {
  UseMutationResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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
  Omit<ShoppingBasketRecord, "id">,
  { previousItems: ShoppingBasketRecord[] | undefined }
>;

type UpdateMutationResult = UseMutationResult<
  ShoppingBasketResponse,
  Error,
  { id: string; newData: Partial<ShoppingBasketRecord> },
  { previousItems: ShoppingBasketRecord[] | undefined }
>;

export function useShoppingBasketQuery(id: string) {
  return useQuery({
    queryKey: ["shoppingBasket"],
    queryFn: async () => {
      const result = await clientPocketBase
        .collection("shoppingBasket")
        .getFullList<ExpandedShoppingRecord>({
          expand: "product",
          filter: `product.business.name = "${id}"`,
        });
      return result;
    },
  });
}

export function useShoppingBasketMutations() {
  const queryClient = useQueryClient();

  const deleteMutation: DeleteMutationResult = useMutation({
    mutationFn: async (id: string) => {
      await clientPocketBase.collection("shoppingBasket").delete(id);
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingBasket"] });
      const previousItems = queryClient.getQueryData<ProductsRecord[]>([
        "shoppingBasket",
      ]);

      queryClient.setQueryData<ProductsRecord[]>(["shoppingBasket"], (old) =>
        old ? old.filter((item) => item.id !== deletedId) : []
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shoppingBasket"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
      queryClient.refetchQueries({ queryKey: ["shoppingBasket"] });
    },
  });

  const createMutation: CreateMutationResult = useMutation({
    mutationFn: async (newItem: Omit<ShoppingBasketRecord, "id">) => {
      return await clientPocketBase
        .collection("shoppingBasket")
        .create(newItem);
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingBasket"] });
      const previousItems = queryClient.getQueryData<ShoppingBasketRecord[]>([
        "shoppingBasket",
      ]);

      queryClient.setQueryData<ShoppingBasketRecord[]>(
        ["shoppingBasket"],
        (old) =>
          old
            ? [...old, { ...newItem, id: "temp-id" }]
            : [{ ...newItem, id: "temp-id" }]
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shoppingBasket"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
      queryClient.refetchQueries({ queryKey: ["shoppingBasket"] });
    },
  });

  const updateMutation: UpdateMutationResult = useMutation({
    mutationFn: async ({
      id,
      newData,
    }: {
      id: string;
      newData: Partial<ShoppingBasketRecord>;
    }) => {
      return await clientPocketBase
        .collection("shoppingBasket")
        .update(id, newData);
    },
    onMutate: async ({ id, newData }) => {
      await queryClient.cancelQueries({ queryKey: ["shoppingBasket"] });
      const previousItems = queryClient.getQueryData<ShoppingBasketRecord[]>([
        "shoppingBasket",
      ]);

      queryClient.setQueryData<ShoppingBasketRecord[]>(
        ["shoppingBasket"],
        (old) =>
          old?.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          ) || []
      );

      return { previousItems };
    },
    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["shoppingBasket"], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingBasket"] });
      queryClient.refetchQueries({ queryKey: ["shoppingBasket"] });
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

  const queryClient = useQueryClient();
  const getItemCount = (productId: string) => {
    const data = queryClient.getQueryData<ExpandedShoppingRecord[]>([
      "shoppingBasket",
    ]);
    const record = data?.find((item) => item.product === productId);
    return record ? record.amount : 0;
  };

  const updateShoppingBasket = async (params: {
    newCount: number;
    productId: string;
    shoppingId?: string | null;
  }) => {
    const { newCount, productId, shoppingId } = params;

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
          },
        });
        return { shoppingId: result.id };
      } else {
        const result = await createMutation.mutateAsync({
          product: productId,
          amount: newCount,
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
