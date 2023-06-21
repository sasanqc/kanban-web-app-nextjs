import Board from "@/model/Board";
export const getBoards = async () => {
  const response = await fetch("http://localhost:3000/api/boards");
  const data = response.json();
  return data;
};

export const createBoard = async (board: Board) => {
  const response = await fetch("http://localhost:3000/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};

export const editBoard = async (id: string, board: Board) => {
  const response = await fetch(`http://localhost:3000/api/boards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });
  const data = await response.json();
  return data;
};

export const deleteBoard = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/boards/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
