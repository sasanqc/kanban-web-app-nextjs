import Board from "@/model/Board";
import { createBoardApi } from "@/services/apiBoards";
import { setActiveBoard, setActiveModal } from "@/store/uiSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useCreateBoard = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: createBoard, isLoading: isCreating } = useMutation({
    mutationFn: createBoardApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      const data = queryClient.getQueryData(["boards"]);
      dispatch(setActiveBoard((data as { boards: Board[] }).boards.length - 1));
      dispatch(setActiveModal(undefined));
    },
  });
  return { isCreating, createBoard };
};
