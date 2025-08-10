import { useMutation, useQuery } from "@tanstack/react-query";

import { voiceMemosApi, type Memo } from "../../../app/api";
import { useParams } from "react-router";
import { queryClient } from "../../../app/query-client";

export function useVoiceMemo() {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ["memo", id],
    queryFn: async () => {
      if (id === undefined) {
        throw new Error("Memo ID is required");
      }

      return voiceMemosApi.getMemo(id);
    },
  });
}

export function useUpdateMemo() {
  const mutation = useMutation({
    mutationFn: async (memo: Partial<Memo>) => {
      console.log("mut Updating memo:", memo);
      if (memo.id === undefined) {
        throw new Error("Memo ID is required");
      }
      const response = await voiceMemosApi.updateMemo(memo.id, memo);

      return response;
    },
    onSettled: (updatedId) =>
      queryClient.invalidateQueries({ queryKey: ["memo", updatedId] }),
  });

  return mutation;
}
