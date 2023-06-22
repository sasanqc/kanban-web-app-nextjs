import { deleteBoardApi } from "@/services/apiBoards";
import { setActiveBoard, setActiveModal } from "@/store/uiSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isLoading: isDeleting, mutate: deleteBoard } = useMutation({
    mutationFn: (id: string) => deleteBoardApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      dispatch(setActiveModal(undefined));
      dispatch(setActiveBoard(0));
    },
    onError: () => {},
  });
  return { isDeleting, deleteBoard };
};
