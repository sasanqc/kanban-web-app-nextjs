import mongoose from "mongoose";
const connectMongo = async () =>
  mongoose.connect(
    process.env.DB || "mongodb://localhost:27017/kanban-web-app",
    { useNewUrlParser: true }
  );
export default connectMongo;
