import mongoose from "mongoose";

export interface TodoPayload {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  userId?: mongoose.Types.ObjectId | string;
}
