import Board from "@/model/Board";
import { updateBoardApi } from "@/services/apiBoards";
import { setActiveModal } from "@/store/uiSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: updateBoard, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, board }: { id: string; board: Board }) =>
      updateBoardApi(id, board),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      dispatch(setActiveModal(undefined));
    },
  });
  return { isUpdating, updateBoard };
};
