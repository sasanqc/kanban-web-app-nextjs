import Board from "@/model/Board";
import { getBoards } from "@/services/apiBoards";
import { useQuery } from "@tanstack/react-query";

export const useBoard = (prefetchedData: { boards: Board[] }) => {
  const {
    data: { boards },
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    initialData: prefetchedData,
  });
  return boards;
};
