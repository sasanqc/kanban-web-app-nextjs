// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Board from "@/model/Board";
import { getData, setData } from "@/utils/boards-fs";
type Data = {
  boards: Board[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = getData();

  if (req.method === "GET") {
    res.status(200).json(data);
  }

  if (req.method === "POST") {
    data.boards.push(req.body);
    setData(data);
    res.status(201).json(req.body);
  }
}
