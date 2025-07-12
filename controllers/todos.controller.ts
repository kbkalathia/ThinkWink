import { HttpStatusCode } from "axios";
import { SendResponse } from "../utils/helpers";
import TodoService from "../services/todos.service";
import { TodoPayload } from "../interfaces/todo.interface";

class TodosControllerClass {
  async getTodos(req: any, res: any) {
    try {
      const { userId } = req.params;
      const todo = await TodoService.getTodos(userId);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        data: todo,
        message: "Todos Fetched successfully",
      });
    } catch (error) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + (error as Error).message,
      });
    }
  }

  async createTodo(req: any, res: any) {
    try {
      const { userId } = req.params;
      const { title, description, dueDate, completed } = req.body;
      const payload = {
        title,
        description,
        dueDate,
        completed,
        userId,
      };

      const todo = await TodoService.createTodo(payload);

      return SendResponse({
        res,
        status: HttpStatusCode.Created,
        data: todo,
        message: "Todo Created successfully",
      });
    } catch (error) {
      return SendResponse({
        res,
        status: HttpStatusCode.InternalServerError,
        message: "Error: " + (error as Error).message,
      });
    }
  }

  async updateTodo(req: any, res: any) {
    try {
      const { todoId } = req.params;
      const userId = req.user.id;
      const { title, description, dueDate, completed } = req.body;

      const payload: Partial<TodoPayload> = {};

      if (title) payload.title = title;
      if (description) payload.description = description;
      if (dueDate) payload.dueDate = dueDate;
      if (completed) payload.completed = completed;

      const updatedTodo = await TodoService.updateTodo(todoId, userId, payload);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        data: updatedTodo,
        message: "Todo updated successfully",
      });
    } catch (error) {
      const status =
        (error as Error).message === "Todo not found"
          ? HttpStatusCode.NotFound
          : HttpStatusCode.InternalServerError;

      return SendResponse({
        res,
        status,
        message: "Error: " + (error as Error).message,
      });
    }
  }

  async deleteTodo(req: any, res: any) {
    try {
      const { todoId } = req.params;
      const userId = req.user.id;
      await TodoService.deleteTodo(todoId, userId);

      return SendResponse({
        res,
        status: HttpStatusCode.Ok,
        message: "Todo deleted",
      });
    } catch (error) {
      const status =
        (error as Error).message === "Todo not found"
          ? HttpStatusCode.NotFound
          : HttpStatusCode.InternalServerError;

      return SendResponse({
        res,
        status,
        message: "Error: " + (error as Error).message,
      });
    }
  }
}

const TodosController = new TodosControllerClass();
export default TodosController;
