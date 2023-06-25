import mongoose from "mongoose";
const { Schema, models } = mongoose;
const dataSchema = new Schema({
  boards: [
    {
      name: String,
      columns: [
        {
          name: String,
          tasks: [
            {
              title: String,
              description: String,
              status: String,
              subtasks: [{ title: String, isCompleted: Boolean }],
            },
          ],
        },
      ],
    },
  ],
});
const BoardsModel =
  models.BoardsModel || mongoose.model("BoardsModel", dataSchema);
export default BoardsModel;
