// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Board from "@/model/Board";
import { getData } from "@/utils/boards-fs";
import BoardsModel from "@/database/data";
import connectMongo from "@/database/connectMongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const data = getData();
    let docs = await BoardsModel.find();
    if (docs.length === 0) {
      await BoardsModel.create(data);
      docs = data.boards;
    }

    if (req.method === "GET") {
      res.status(200).json(docs[0]);
    }

    if (req.method === "POST") {
      docs[0].boards.push(req.body);
      await docs[0].save();
      res.status(201).json(req.body);
    }
  } catch (error) {
    res.status(500).json({});
  }
}
