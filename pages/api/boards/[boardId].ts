// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connectMongo";
import BoardsModel from "@/database/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //validate id
  const id = parseInt(req.query?.boardId as string);
  await connectMongo();
  let data = await BoardsModel.find();
  if (!Number.isInteger(id) || id >= data?.[0]?.boards.length || id < 0) {
    res.status(404).json({ message: "Board not found", status: "failed" });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(data?.[0]?.boards[id]);
  }

  if (req.method === "DELETE") {
    data?.[0]?.boards.splice(id, 1);
    data?.[0].save();
    res.status(200).json({});
  }

  if (req.method === "PATCH") {
    data[0].boards[id] = req.body;
    data?.[0].save();
    res.status(200).json(req.body);
  }
}
