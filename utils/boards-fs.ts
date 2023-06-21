import Board from "@/model/Board";
import fs from "fs";
import path from "path";
const filePath = path.join(process.cwd(), "data", "data.json");

export const getData = () => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
};
export const setData = (data: { boards: Board[] }) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};
