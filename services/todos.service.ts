import mongoose from "mongoose";
import TodoModel from "../models/todo.model";
import { TodoPayload } from "../interfaces/todo.interface";

class TodoServiceClass {
  async getTodos(userId: mongoose.Types.ObjectId) {
    const todos = await TodoModel.find({
      userId,
    });

    return todos;
  }

  async createTodo(payload: TodoPayload) {
    return await TodoModel.create({
      ...payload,
    });
  }

  async updateTodo(
    todoId: string,
    userId: mongoose.Types.ObjectId,
    payload: Partial<TodoPayload>
  ) {
    const todo = await TodoModel.findById(todoId);

    if (todo && !todo.userId.equals(userId)) {
      throw new Error("You cannot update another user's todo task..!!");
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      throw new Error("Todo not found");
    }

    return updatedTodo;
  }

  async deleteTodo(todoId: string, userId: mongoose.Types.ObjectId) {
    const todo = await TodoModel.findById(todoId);

    if (todo && !todo.userId.equals(userId)) {
      throw new Error("You cannot delete another user's todo task..!!");
    }

    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      throw new Error("Todo not found");
    }

    return deletedTodo;
  }
}

const TodoService = new TodoServiceClass();
export default TodoService;
