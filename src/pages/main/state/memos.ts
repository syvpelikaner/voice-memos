import { useQuery, useMutation } from "@tanstack/react-query";
import { createSignal, useSignalValue } from "react-alien-signals";

import { voiceMemosApi, type Memo } from "../../../app/api/index.ts";
import { queryClient } from "../../../app/query-client.ts";

export const $search = createSignal<string>("");
export const $sortOrder = createSignal<"asc" | "desc">("asc");

export function useMemos() {
  const search = useSignalValue($search);
  const sort = useSignalValue($sortOrder);

  const query = useQuery({
    queryKey: ["memos", search, sort],
    queryFn: async () => {
      const response = await voiceMemosApi.getMemos({
        search,
        sort,
      });
      return response;
    },
  });

  return query;
}

export function useCreateMemo() {
  const mutation = useMutation({
    mutationFn: async (memo: Memo) => {
      const response = await voiceMemosApi.addMemo(memo);
      return response;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["memos"] }),
  });

  return mutation;
}

export function useDeleteMemo() {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await voiceMemosApi.deleteMemo(id);
      return response;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["memos"] }),
  });

  return mutation;
}

export function useSearch() {
  const handleSearchChange = (value: string) => {
    $search(value);
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
    $sortOrder(order);
  };

  return {
    handleSearchChange,
    handleSortOrderChange,
    searchValue: useSignalValue($search),
    sortOrder: useSignalValue($sortOrder),
  };
}
