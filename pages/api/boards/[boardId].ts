// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getData, setData } from "@/utils/boards-fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //validate id
  const id = parseInt(req.query?.boardId as string);
  const data = getData();
  if (!Number.isInteger(id) || id >= data.boards.length || id < 0) {
    res.status(404).json({ message: "Board not found", status: "failed" });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(data.boards[id]);
  }

  if (req.method === "DELETE") {
    data.boards.splice(id, 1);
    setData(data);
    res.status(200).json({});
  }

  if (req.method === "PATCH") {
    data.boards[id] = req.body;
    setData(data);
    res.status(200).json(req.body);
  }
}
