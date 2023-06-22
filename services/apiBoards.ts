import Board from "@/model/Board";
const BASE_URL = "api/boards";
export const getBoards = async () => {
  const response = await fetch(BASE_URL);
  const data = response.json();
  return data;
};

export const createBoardApi = async (board: Board) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};

export const updateBoardApi = async (id: string, board: Board) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};

export const deleteBoardApi = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
